const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  output: "export",
  distDir: "out",
  // reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  transpilePackages: ["react-syntax-highlighter"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port:'',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        port:'',
        pathname: '/id/**'
      }
    ]
  }
};

module.exports = withMDX(nextConfig);
