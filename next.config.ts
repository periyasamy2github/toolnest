import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // static export for Firebase Hosting; COOP/COEP headers live in firebase.json
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
