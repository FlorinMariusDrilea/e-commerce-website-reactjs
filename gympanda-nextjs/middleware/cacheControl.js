import { NextResponse } from "next/server";

// Cache middleware for API responses and static assets
export default async function cacheControlMiddleware(req) {
  const url = req.nextUrl.pathname;

  // Cache for API responses (10 minutes cache with stale-while-revalidate)
  if (url.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "public, max-age=600, stale-while-revalidate=3600");
    return response;
  }

  // Cache for static assets (1 day cache with immutable)
  if (url.startsWith("/static/") || url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".js") || url.endsWith(".css" || url.endsWith(".webp"))) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "public, max-age=86400, immutable");
    return response;
  }

  return NextResponse.next();
}