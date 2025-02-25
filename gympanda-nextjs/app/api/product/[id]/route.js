import { createClient } from 'redis';

// Initialize Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL, // Ensure you set REDIS_URL in your environment variables
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();

// Helper function to handle responses
const handleResponse = (status, message, data = null) => {
  return new Response(JSON.stringify({ message, data }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

// Helper function to fetch product from products.json located in the public folder
const fetchProductFromJson = async (id) => {
  try {
    const res = await fetch('/products.json');

    if (!res.ok) {
      throw new Error("Failed to load local products.json");
    }

    const data = await res.json();
    const product = data.find((product) => product.id === id);

    return product ? { data: product } : null;
  } catch (error) {
    console.error("Error fetching product from local JSON:", error);
    return null;
  }
};

// Fetch product from Redis
const fetchProductFromRedis = async (id) => {
  try {
    const product = await redisClient.get(`product:${id}`);

    return product ? JSON.parse(product) : null;
  } catch (error) {
    console.error("Error fetching product from Redis:", error);
    return null;
  }
};

// Store product in Redis
const storeProductInRedis = async (id, product) => {
  try {
    await redisClient.set(`product:${id}`, JSON.stringify(product), {
      EX: 3600, // Cache expiry time in seconds (1 hour)
    });
  } catch (error) {
    console.error("Error storing product in Redis:", error);
  }
};

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    console.log("Fetching product with ID:", id);

    // First, try to fetch the product from Redis
    let product = await fetchProductFromRedis(id);

    if (!product) {
      console.log("Product not found in Redis, falling back to local JSON...");
      product = await fetchProductFromJson(id);

      if (product) {
        // Store product in Redis for future requests
        await storeProductInRedis(id, product.data);
      }
    }

    if (product) {
      return handleResponse(200, "Product fetched successfully", product.data);
    }

    return handleResponse(404, "Product not found", { error: "Product not found" });

  } catch (error) {
    console.error("Error fetching product:", error);
    return handleResponse(500, "Error fetching product", { error: error.message });
  }
}
