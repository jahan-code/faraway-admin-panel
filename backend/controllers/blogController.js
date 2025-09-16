import Blog from '../models/blog.js';
import SuccessHandler from '../utils/SuccessHandler.js';
import ApiError from '../utils/ApiError.js';
import logger from '../functions/logger.js';
import { addBlogSchema, editBlogSchema, getBlogByIdSchema, getAllBlogsSchema, deleteBlogSchema, updateBlogStatusSchema } from '../validations/blog.validation.js';
import paginate from '../utils/paginate.js';
import { clearBlogCache } from '../utils/cache.js';

// Add a new blog
export const addBlog = async (req, res, next) => {
  try {
    logger.info('📝 Add blog request received');

    let blogData = req.body;

    // Check if image is uploaded
    if (!req.files || !req.files.image || !req.files.image[0]) {
      return next(new ApiError('Blog image is required', 400));
    }

    // Get S3 URL from uploaded file (multer-s3 automatically uploads to S3)
    if (req.files && req.files.image && req.files.image[0]) {
      try {
        const file = req.files.image[0];
        
        // Check file size (max 12MB)
        const maxSize = 12 * 1024 * 1024; // 12MB in bytes
        if (file.size > maxSize) {
          return next(new ApiError(`Image file size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size of 12MB`, 400));
        }
        
        logger.info(`📸 Blog image uploaded to S3: ${file.originalname}`);
        
        // The file.location contains the S3 URL (set by multer-s3)
        blogData.image = file.location;
        logger.info(`✅ Blog image S3 URL: ${blogData.image}`);
      } catch (uploadError) {
        logger.error(`❌ Blog image upload failed:`, uploadError);
        return next(new ApiError(`Failed to upload blog image: ${uploadError.message}`, 400));
      }
    }

    // Now validate blogData
    const { error } = addBlogSchema.validate(blogData);
    if (error) {
      logger.warn({
        message: error.details[0].message
      });
      return next(new ApiError(error.details[0].message, 400));
    }

    // Check if slug already exists
    if (blogData.slug) {
      const slugExists = await Blog.findOne({ slug: blogData.slug });
      if (slugExists) {
      return next(new ApiError('Blog with this slug already exists', 409));
      }
    }

    // Create the blog
    const blog = new Blog(blogData);
    await blog.save();

    // Clear blog cache
    await clearBlogCache();
    
    logger.info('✅ Blog created successfully');
    return SuccessHandler(blog, 201, 'Blog created successfully', res);

  } catch (err) {
    logger.error('❌ Error creating blog:', err);
    return next(new ApiError(err.message || 'Internal server error', 500));
  }
};

// Get all blogs
export const getAllBlogs = async (req, res, next) => {
  try {
    logger.info('📄 Get all blogs request received');

    const { page = 1, limit = 10, status } = req.query;
    const { skip, limit: parsedLimit } = paginate(page, limit);

    // Build query filter
    const filter = {};
    if (status && ['draft', 'published'].includes(status)) {
      filter.status = status;
    }

    // Use Promise.all for parallel execution and lean() for better performance
    const [blogs, total, recentlyUpdated] = await Promise.all([
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit)
        .lean()
        .exec(),
      Blog.countDocuments(filter).exec(),
      Blog.find(filter)
        .sort({ updatedAt: -1, createdAt: -1 })
        .limit(5)
        .lean()
        .exec()
    ]);

    const response = {
      blogs,
      page: Number(page),
      limit: parsedLimit,
      total,
      totalPages: Math.ceil(total / parsedLimit),
      hasNextPage: Number(page) < Math.ceil(total / parsedLimit),
      hasPrevPage: Number(page) > 1,
      recentlyUpdated
    };

    return SuccessHandler(response, 200, 'Blogs fetched successfully', res);
  } catch (err) {
    logger.error('❌ Get all blogs error:', err);
    next(new ApiError(err.message || 'Internal server error', 500));
  }
};

// Get blog by ID
export const getBlogById = async (req, res, next) => {
  try {
    logger.info('🔍 Get blog by ID request received');

    // Validate the query using Joi
    const { error } = getBlogByIdSchema.validate(req.query);
    if (error) {
      return next(new ApiError(error.details[0].message, 400));
    }

    const { id } = req.query;
    
    // Use lean() for better performance and return all fields
    const blog = await Blog.findById(id)
      .lean()
      .exec();
    
    if (!blog) {
      logger.warn({
        message: `❌ Blog not found for ID: ${id}`,
        timestamp: new Date().toISOString(),
      });
      return next(new ApiError('Blog not found', 404));
    }

    return SuccessHandler(blog, 200, 'Blog fetched successfully', res);
  } catch (err) {
    logger.error('❌ Get blog by ID error:', err);
    next(new ApiError(err.message || 'Internal server error', 500));
  }
};
// Edit blog by ID
export const editBlog = async (req, res, next) => {
  try {
    logger.info('✏️ Edit blog request received');

    const { id } = req.query;
    let blogData = req.body;

    // Validate blog ID
    const { error: idError } = getBlogByIdSchema.validate({ id });
    if (idError) {
      return next(new ApiError(idError.details[0].message, 400));
    }

    // Check if blog exists
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return next(new ApiError('Blog not found', 404));
    }

    // Handle image upload if provided (multer-s3 automatically uploads to S3)
    if (req.files && req.files.image && req.files.image[0]) {
      try {
        const file = req.files.image[0];
        
        // Check file size (max 12MB)
        const maxSize = 12 * 1024 * 1024;
        if (file.size > maxSize) {
          return next(new ApiError(`Image file size exceeds maximum allowed size of 12MB`, 400));
        }
        
        // The file.location contains the S3 URL
        blogData.image = file.location;
        logger.info(`✅ Blog image updated successfully: ${blogData.image}`);
      } catch (uploadError) {
        logger.error(`❌ Blog image upload failed:`, uploadError);
        return next(new ApiError(`Failed to upload blog image: ${uploadError.message}`, 400));
      }
    }

    // Validate blog data
    const { error: validationError } = editBlogSchema.validate(blogData);
    if (validationError) {
      return next(new ApiError(validationError.details[0].message, 400));
    }

    // Check if slug is being updated and if it already exists
    if (blogData.slug && blogData.slug !== existingBlog.slug) {
      const slugExists = await Blog.findOne({ 
        slug: blogData.slug, 
        _id: { $ne: id } 
      });
      if (slugExists) {
        return next(new ApiError('Blog with this slug already exists', 409));
      }
    }

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      blogData,
      { new: true, runValidators: true }
    );

    // Clear blog cache
    await clearBlogCache();

    logger.info({
      message: `✅ Blog updated successfully: ${updatedBlog.title}`
    });
    return SuccessHandler(updatedBlog, 200, 'Blog updated successfully', res);

  } catch (err) {
    logger.error('❌ Error updating blog:', err);
    return next(new ApiError(err.message || 'Internal server error', 500));
  }
};

// Delete blog
export const deleteBlog = async (req, res, next) => {
  try {
    logger.info('🗑️ Delete blog request received');

    const { error } = deleteBlogSchema.validate(req.query);
    if (error) {
      return next(new ApiError(error.details[0].message, 400));
    }

    const { id } = req.query;
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return next(new ApiError('Blog not found', 404));
    }

    logger.info({
      message: `✅ Blog deleted successfully: ${blog.title}`,
      timestamp: new Date().toISOString(),
    });

    // Invalidate blog caches after delete
    await clearBlogCache();
    return SuccessHandler(null, 200, 'Blog deleted successfully', res);
  } catch (err) {
    logger.error('❌ Delete blog error:', err);
    next(new ApiError(err.message || 'Internal server error', 500));
  }
};

// Update blog status (publish/unpublish)
export const updateBlogStatus = async (req, res, next) => {
  try {
    logger.info('🔄 Update blog status request received');

    const { id } = req.query;
    const { status } = req.body;

    // Validate blog ID
    const { error: idError } = getBlogByIdSchema.validate({ id });
    if (idError) {
      return next(new ApiError(idError.details[0].message, 400));
    }

    // Validate status
    const { error: statusError } = updateBlogStatusSchema.validate({ status });
    if (statusError) {
      return next(new ApiError(statusError.details[0].message, 400));
    }

    // Check if blog exists
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return next(new ApiError('Blog not found', 404));
    }

    // Update the blog status
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    logger.info({
      message: `✅ Blog status updated to ${status}: ${updatedBlog.title}`,
      timestamp: new Date().toISOString(),
    });

    // Invalidate blog caches after status change
    await clearBlogCache();
    return SuccessHandler(
      updatedBlog, 
      200, 
      `Blog ${status === 'published' ? 'published' : 'unpublished'} successfully`, 
      res
    );
  } catch (err) {
    logger.error('❌ Update blog status error:', err);
    next(new ApiError(err.message || 'Internal server error', 500));
  }
};

export default {
  addBlog,
  getAllBlogs,
  getBlogById,

  editBlog,
  deleteBlog,
  updateBlogStatus,
};