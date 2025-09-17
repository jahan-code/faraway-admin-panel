import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone for server-side rendering in Tauri sidecar
  output: "standalone",
  images: {
    domains: ['res.cloudinary.com'],
    // Keep unoptimized to avoid depending on Next image optimizer in prod
    unoptimized: true,
  },
};

export default nextConfig;
