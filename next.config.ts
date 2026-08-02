import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "supqektbrprrnmecerik.supabase.co",
      },
    ],
  },

};

export default nextConfig;