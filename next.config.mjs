/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow remote screenshots (e.g. Supabase Storage public buckets) to be used later.
    // Add your Supabase project hostname here once configured, e.g.:
    // { protocol: 'https', hostname: '<your-project-ref>.supabase.co' }
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};

export default nextConfig;
