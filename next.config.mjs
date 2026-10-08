/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// Content Security Policy: Strict in production (no 'unsafe-eval'), allows Fast Refresh in dev
const cspDirectives = [
  "default-src 'self'",
  isProd
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' blob: data: https:",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
];

const nextConfig = {
  // Disable production browser source maps to protect source code and reduce client bundle size
  productionBrowserSourceMaps: false,

  // Remove X-Powered-By header for security obscurity
  poweredByHeader: false,

  // React Strict Mode for detecting side effects
  reactStrictMode: true,

  // Optimize bundle and compiler options
  compiler: {
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
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
          // Enforce HTTPS across all subdomains (preload omitted for initial launch phase)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
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
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // Enable DNS prefetching for performance
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: cspDirectives.join("; ").trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
