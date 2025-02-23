/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, "couchbase"];
    }
    return config;
  },
  env: {
    COUCHBASE_HOST: process.env.COUCHBASE_HOST,
    COUCHBASE_USER: process.env.COUCHBASE_USER,
    COUCHBASE_BUCKET: process.env.COUCHBASE_BUCKET,
    COUCHBASE_PASSWORD: process.env.COUCHBASE_PASSWORD,
  },
};
export default nextConfig;
