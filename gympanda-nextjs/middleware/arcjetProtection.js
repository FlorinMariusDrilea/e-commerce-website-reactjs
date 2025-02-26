import arcjet, { createMiddleware, detectBot, tokenBucket } from "@arcjet/next";

// Define which routes the middleware should apply to
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|healthz).*)"],
};

// Set up Arcjet with the desired rules
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    detectBot({
      mode: "LIVE", // Mode for blocking bots (use "DRY_RUN" to log only)
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "CATEGORY:MONITOR", // Uncomment if you want to allow uptime monitoring services
      ],
    }),
    tokenBucket({
      mode: "LIVE", // Enable rate limiting for API requests
      refillRate: 5, // 5 requests per second
      interval: 1,
      capacity: 30, // Max 30 requests stored
    }),
  ],
});

// Create middleware using Arcjet
export default createMiddleware(aj);