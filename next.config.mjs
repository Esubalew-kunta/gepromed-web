/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pdfkit (used by /api/congress-recap) loads its built-in font metrics
  // (.afm) files via relative paths at runtime. Webpack-bundling it breaks
  // that lookup ("Helvetica.afm ENOENT"), so it must stay a native require.
  // Next 14 uses the experimental key; the gepromed-ai-console repo (Next 15)
  // uses the stable top-level `serverExternalPackages` for the same fix.
  experimental: {
    serverComponentsExternalPackages: ["pdfkit"],
  },
};

export default nextConfig;
