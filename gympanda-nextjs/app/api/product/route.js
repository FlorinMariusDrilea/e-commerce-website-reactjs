import { connectDB, deleteProduct, getAllProducts } from "../../../db/db";
import { NextResponse } from 'next/server';

// Helper function to handle responses
const handleResponse = (status, message, data = null) => {
  return new Response(JSON.stringify({ message, data }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

// GET: Fetch a single product or all products
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    // If an id is provided, fetch the single product
    if (id) {
      const product = await getProduct(id); // getProduct function (not included here) should handle fetching a single product
      if (!product) {
        return handleResponse(404, "Product not found");
      }
      return handleResponse(200, "Product fetched successfully", product);
    }

    // If no id is provided, fetch all products
    const products = await getAllProducts();
    if (!products || products.length === 0) {
      return handleResponse(404, "No products found");
    }

    return handleResponse(200, "Products fetched successfully", products);
  } catch (error) {
    console.error("Error processing request:", error);
    return handleResponse(500, "Failed to fetch products", { error: error.message });
  }
}

// POST: Create a new product
export async function POST(request) {
  const client = await connectDB();
  const { id, name, price, description, quantity, image } = await request.json();

  try {
    const exists = await client.exists(`product:${id}`);
    if (exists) return handleResponse(409, "Product already exists");
    
    await client.hSet(`product:${id}`, { name, price, description, quantity, image });
    return handleResponse(201, "Product created successfully");
  } catch (error) {
    return handleResponse(500, "Failed to create product", { error: error.message });
  }
}

// DELETE: Remove a product by ID
export async function DELETE(req) {
  try {
    const client = await connectDB();
    const { id } = await req.json(); // Get ID from request body

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const exists = await deleteProduct(id);
    if (!exists) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    await client.del(`product:${id}`);
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("❌ Error deleting product:", error);
    return NextResponse.json({ message: "Failed to delete product", error: error.message }, { status: 500 });
  }
}


