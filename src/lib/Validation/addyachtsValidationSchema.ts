import * as Yup from "yup";

export const yachtsvalidationSchema = Yup.object().shape({
    "Title": Yup.string().required("Title is required"),
    "Boat Type": Yup.string().required("Boat Type is required"),
    "Category": Yup.string().required("Category is required"),
    "Capacity": Yup.string().required("Capacity is required"),
    "Length": Yup.string(),
    "Length Range": Yup.boolean().required("Length Range is required"),
    "Cabins": Yup.string().required("Cabins is required"),
    "Bathrooms": Yup.string().required("Bathrooms is required"),
    "Passenger Day Trip": Yup.string().required("Passenger Day Trip is required"),
    "Passenger Overnight": Yup.string().required("Passenger Overnight is required"),
    "Guests": Yup.string().required("Guests is required"),
    "Guests Range": Yup.string().required("Guests Range is required"),
    "Day Trip Price": Yup.string().required("Day Trip Price is required"),
    "Overnight Price": Yup.string().required("Overnight Price is required"),
    "Daytrip Price (Euro)": Yup.string().required("Daytrip Price (Euro) is required"),
    "Daytrip Price (THB)": Yup.string().required("Daytrip Price (THB) is required"),
    "Daytrip Price (USD)": Yup.string().required("Daytrip Price (USD) is required"),
    "Price": Yup.string(),
    "Trip Details": Yup.string(),
    "Day Charter": Yup.string(),
    "Overnight Charter": Yup.string(),
    "About this Boat": Yup.string(),
    "Specifications": Yup.string(),
    "Boat Layout": Yup.string(),
    "Video Link": Yup.string().required("Video Link is required"),
    "Video Link 2": Yup.string(),
    "Video Link 3": Yup.string(),
    "Badge": Yup.string(),
    "Design": Yup.string().required("Design is required"),
    "Built": Yup.string().required("Built is required"),
    "Cruising Speed": Yup.string().required("Cruising Speed is required"),
    "Length Overall": Yup.string().required("Length Overall is required"),
    "Fuel Capacity": Yup.string().required("Fuel Capacity is required"),
    "Water Capacity": Yup.string().required("Water Capacity is required"),
    "Code": Yup.string(),
    "Primary Image": Yup.mixed<File>()
      .required("Primary image is required")
      .test("is-file", "Please select a valid file", (value) => {
        return value instanceof File;
      })
      .test("file-size", "File must be 1MB or smaller", (value) => {
        return value instanceof File && value.size <= 1 * 1024 * 1024;
      })
      .test("file-type", "Only JPEG, PNG, or WEBP images are allowed", (value) => {
        if (!(value instanceof File)) return false;
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        return allowedTypes.includes(value.type);
      }),
    "Gallery Images": Yup.array<File>()
      .nullable()
      .test("is-array", "Must be an array of files", (value) => {
        return value === null || Array.isArray(value);
      })
      .test("max-files", "Maximum 10 images allowed", (value) => {
        return value === null || (Array.isArray(value) && value.length <= 10);
      })
      .test("file-size", "Each file must be 1MB or smaller", (value) => {
        return value === null ||
          (Array.isArray(value) && value.every(file => file.size <= 1 * 1024 * 1024));
      })
      .test("file-type", "Only JPEG, PNG, or WEBP images are allowed", (value) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        return value === null ||
          (Array.isArray(value) && value.every(file => allowedTypes.includes(file.type)));
      })
  });
  
export type FormYachtsValues = Yup.InferType<typeof yachtsvalidationSchema>;