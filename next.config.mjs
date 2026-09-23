/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/blogs/**",   // blogs folder
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/categories/**",  // categories folder
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/products/**",  // products folder
      },
      {
        protocol: "https",
        hostname: "recreatorsdesign.com",
        pathname: "/**", // allow all images from your domain
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // allow any path under this domain
      },
    ],
  },
};

export default nextConfig;
