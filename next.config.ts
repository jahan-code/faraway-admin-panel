import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use static export so `next build` writes to ./out (used by Tauri CI)
  output: "export",
  images: {
    domains: ['res.cloudinary.com'],
    // Disable next/image optimization in static export mode
    unoptimized: true,
  },
};

export default nextConfig;
