import arcjetMiddleware from './middleware/arcjetProtection';
import cacheControlMiddleware from './middleware/cacheControl';

// Combine Arcjet and Cache middleware
export default async function middleware(req) {
  // Run Arcjet protection first
  const arcjetResponse = await arcjetMiddleware(req);
  if (arcjetResponse) return arcjetResponse; // If blocked, return the response immediately

  // Then apply cache logic
  return cacheControlMiddleware(req);
}
