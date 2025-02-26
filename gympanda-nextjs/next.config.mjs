// next.config.js

export default {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Exclude 'net' and 'tls' when building for the client
    if (!isServer) {
      config.resolve.fallback = {
        net: false,
        tls: false,
      };
    }
    return config;
  },
};
