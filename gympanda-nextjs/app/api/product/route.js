import { connectDB } from "../../../db/db";
import fs from "fs";
import path from "path";

// Helper function to handle responses
const handleResponse = (status, message, data = null) => {
  return new Response(JSON.stringify({ message, data }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

// Helper function to fetch all products from products.json
const fetchProductsFromJson = async () => {
  try {
    const filePath = path.resolve("public", "products.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(rawData);

    return products;
  } catch (error) {
    console.error("Error reading products.json:", error);
    return null;
  }
};

// GET: Fetch a single product or all products
export async function GET(request) {
  const client = await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      try {
        const product = await client.hGetAll(`product:${id}`);
        if (Object.keys(product).length === 0) throw new Error("Product not found");
        return handleResponse(200, "Product fetched successfully", product);
      } catch (error) {
        console.error("Error fetching product from Redis:", error);
        return handleResponse(404, "Product not found");
      }
    }
    
    const keys = await client.keys("product:*");
    const products = await Promise.all(keys.map(async (key) => {
      const product = await client.hGetAll(key);
      return { id: key.split(":")[1], ...product };
    }));

    return handleResponse(200, "Products fetched successfully", products);
  } catch (error) {
    console.error("Error processing request:", error);
    return handleResponse(500, "Failed to fetch products", { error: error.message });
  }
}

// POST: Create a new product
export async function POST(request) {
  const client = await connectDB();
  const { id, name, price, description } = await request.json();

  try {
    const exists = await client.exists(`product:${id}`);
    if (exists) return handleResponse(409, "Product already exists");
    
    await client.hSet(`product:${id}`, { name, price, description });
    return handleResponse(201, "Product created successfully");
  } catch (error) {
    return handleResponse(500, "Failed to create product", { error: error.message });
  }
}

// PUT: Update an existing product
export async function PUT(request) {
  const client = await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { name, price, description } = await request.json();

  try {
    const exists = await client.exists(`product:${id}`);
    if (!exists) return handleResponse(404, "Product not found");

    await client.hSet(`product:${id}`, { name, price, description });
    return handleResponse(200, "Product updated successfully");
  } catch (error) {
    return handleResponse(500, "Failed to update product", { error: error.message });
  }
}

// DELETE: Delete a product
export async function DELETE(request) {
  const client = await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const exists = await client.exists(`product:${id}`);
    if (!exists) return handleResponse(404, "Product not found");
    
    await client.del(`product:${id}`);
    return handleResponse(200, "Product deleted successfully");
  } catch (error) {
    return handleResponse(500, "Failed to delete product", { error: error.message });
  }
}