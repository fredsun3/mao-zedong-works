import type { NextConfig } from 'next';
import path from 'path';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  output: isGitHubPages ? 'export' : undefined,
  basePath: isGitHubPages ? '/mao-zedong-works' : undefined,
  images: {
    unoptimized: isGitHubPages ? true : undefined,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['*.dev.coze.site'],
};

export default nextConfig;
