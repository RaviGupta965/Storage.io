import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'static.vecteezy.com'
      },
      {
        protocol:'https',
        hostname:'cloud.appwrite.io'
      }
    ]
  }
};

export default nextConfig;
