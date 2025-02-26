import arcjetMiddleware from './middleware/arcjetProtection';
import cacheControlMiddleware from './middleware/cacheControl';

export default async function middleware(req) {

  // Run Arcjet protection first
  const arcjetResponse = await arcjetMiddleware(req);
  if (arcjetResponse) return arcjetResponse; // If blocked, return the response immediately

  // Then apply cache logic
  const cacheResponse = await cacheControlMiddleware(req);

  return cacheResponse;
}
