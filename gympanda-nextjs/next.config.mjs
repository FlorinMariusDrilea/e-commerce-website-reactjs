/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude 'net' and 'tls' when building for the client
    if (!isServer) {
      config.resolve.fallback = {
        net: false,
        tls: false,
      };
    }

    // Add couchbase to externals on server-side
    if (isServer) {
      config.externals = [...config.externals, 'couchbase'];
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
