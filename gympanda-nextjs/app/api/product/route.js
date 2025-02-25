import { getProductsCollection } from "../../../db/db";
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

// Helper function to fetch a single product from products.json
const fetchProductFromJson = async (id) => {
  try {
    const filePath = path.resolve("public", "products.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(rawData);

    const product = products.find((product) => product.id === id);
    return product || null;
  } catch (error) {
    console.error("Error reading products.json:", error);
    return null;
  }
};

// GET: Fetch a single product or all products
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const { cluster } = await getProductsCollection();

    // If ID is provided, try to fetch the single product from Couchbase
    if (id) {
      const { collection } = await getProductsCollection();
      try {
        const result = await collection.get(id);
        return handleResponse(200, "Product fetched successfully", {
          id,
          ...result.value,
        });
      } catch (error) {
        console.error("Error fetching product from Couchbase:", error);

        // Fallback to fetching from products.json if Couchbase fails
        const productFromJson = await fetchProductFromJson(id);
        if (productFromJson) {
          return handleResponse(200, "Product fetched from local JSON", productFromJson);
        }

        return handleResponse(404, "Product not found");
      }
    }

    // If no ID, try to fetch all products from Couchbase
    const query = `
      SELECT meta(p).id AS id, p.* 
      FROM \`ecommerce\`.\`_default\`.\`products\` p
    `;
    try {
      const result = await cluster.query(query);
      const products = result.rows.map((row) => ({
        id: row.id,
        name: row.name || "Unnamed Product",
        description: row.description || "No description available",
        price: row.price ?? 0,
        quantity: row.quantity ?? 0,
        image: row.image || "/default-image.jpg",
      }));

      return handleResponse(200, "Products fetched successfully", products);
    } catch (error) {
      console.error("Error fetching products from Couchbase:", error);

      // Fallback to fetching all products from products.json if Couchbase fails
      const productsFromJson = await fetchProductsFromJson();
      if (productsFromJson) {
        return handleResponse(200, "Products fetched from local JSON", productsFromJson);
      }

      return handleResponse(500, "Failed to fetch products");
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return handleResponse(500, "Failed to fetch products", { error: error.message });
  }
}

// POST: Create a new product
export async function POST(request) {
  const { collection } = await getProductsCollection();
  const { id, name, price, description } = await request.json();

  try {
    // Check if the document already exists
    await collection.get(id);
    return handleResponse(409, "Product already exists"); // 409 Conflict
  } catch (error) {
    if (error?.cause?.code === 105) {
      return handleResponse(409, "Product already exists");
    }

    try {
      await collection.insert(id, { name, price, description });
      return handleResponse(201, "Product created successfully"); // 201 Created
    } catch (insertError) {
      return handleResponse(500, "Failed to create product", { error: insertError.message });
    }
  }
}

// PUT: Update an existing product
export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { collection } = await getProductsCollection();
  const { name, price, description } = await request.json();

  try {
    await collection.upsert(id, { name, price, description });
    return handleResponse(200, "Product updated successfully");
  } catch (error) {
    return handleResponse(500, "Failed to update product", { error: error.message });
  }
}

// DELETE: Delete a product
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { collection } = await getProductsCollection();

  try {
    await collection.remove(id);
    return handleResponse(200, "Product deleted successfully");
  } catch (error) {
    return handleResponse(500, "Failed to delete product", { error: error.message });
  }
}
