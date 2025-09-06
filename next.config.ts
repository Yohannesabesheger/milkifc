
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,

  // Disable eslint/type-check failures on builds
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

// Detect if Turbopack is enabled
const isTurbopack = process.env.TURBOPACK === "1";

// If running with Turbopack → skip withPWA wrapper
module.exports = isTurbopack ? baseConfig : withPWA(baseConfig);
