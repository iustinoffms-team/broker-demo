import type { NextConfig } from "next";

// Demo: export static, servit de Vercel fără server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
