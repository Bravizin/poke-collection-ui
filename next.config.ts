import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/poke-collection-ui', // Necessário para imagens/scripts não darem 404 no Github pages!
  images: {
    unoptimized: true, // Required for static export on Github Pages
  },
};

export default nextConfig;
