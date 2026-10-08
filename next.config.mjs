/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable production browser source maps to protect source code and reduce client bundle size
  productionBrowserSourceMaps: false,

  // Remove X-Powered-By header for security obscurity
  poweredByHeader: false,

  // React Strict Mode for detecting side effects
  reactStrictMode: true,

  // Optimize bundle and compiler options
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Optimize package imports to tree-shake large icon sets and speed up compile time
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Comprehensive HTTP Security Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Enforce HTTPS across all subdomains for 2 years
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Prevent MIME-sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Prevent clickjacking by denying iframe embedding
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Restrict referrer information when navigating to other origins
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Disable unneeded browser features and sensors
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()",
          },
          // Enable DNS prefetching for performance
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ]
              .join("; ")
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
