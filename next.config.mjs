/** @type {import('next').NextConfig} */

const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL);

const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", ""),
        hostname: apiUrl.hostname,
      },
    ],
  },
};

// const nextConfig = {
//   images: {
//     dangerouslyAllowLocalIP: true,
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/uploads/**",
//       },
//     ],
//   },
// };

export default nextConfig;
