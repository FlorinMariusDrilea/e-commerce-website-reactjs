import { createClient } from 'redis';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Initialize Redis client safely
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

// Helper function to handle API responses
const handleResponse = (status, message, data = null) => {
  return NextResponse.json({ message, data }, { status });
};

// Fetch product from local JSON (server-side)
const fetchProductFromJson = async (id) => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'products.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(fileData);

    return products.find((product) => product.id === id) || null;
  } catch (error) {
    console.error("Error reading products.json:", error);
    return null;
  }
};

// Fetch product from Redis
const fetchProductFromRedis = async (id) => {
  try {
    await connectRedis();
    const product = await redisClient.get(`product:${id}`);
    return product ? JSON.parse(product) : null;
  } catch (error) {
    console.error("Error fetching product from Redis:", error);
    return null;
  }
};

// Store product in Redis (1-hour expiration)
const storeProductInRedis = async (id, product) => {
  try {
    await connectRedis();
    await redisClient.set(`product:${id}`, JSON.stringify(product), { EX: 3600 });
  } catch (error) {
    console.error("Error storing product in Redis:", error);
  }
};

// API Route: GET /api/product/[id]
export async function GET(_, { params }) {
  try {
    const { id } = params;
    if (!id) return handleResponse(400, "Missing product ID");

    console.log("Fetching product with ID:", id);

    // 1️⃣ Check Redis cache first
    let product = await fetchProductFromRedis(id);

    // 2️⃣ If not in Redis, check local JSON
    if (!product) {
      console.log("Product not found in Redis, checking local JSON...");
      product = await fetchProductFromJson(id);

      if (product) {
        await storeProductInRedis(id, product); // Cache in Redis for future use
      }
    }

    return product ? handleResponse(200, "Product found", product) 
                   : handleResponse(404, "Product not found");

  } catch (error) {
    console.error("Error fetching product:", error);
    return handleResponse(500, "Internal Server Error", { error: error.message });
  }
}