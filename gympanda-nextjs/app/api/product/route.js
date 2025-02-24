import { getProductsCollection } from "../../../db/db";

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
  const { cluster } = await getProductsCollection(); // Ensure cluster is retrieved

  try {
    if (id) {
      // Fetch a single product by ID
      const { collection } = await getProductsCollection();
      const result = await collection.get(id);
      return handleResponse(200, "Product fetched successfully", {
        id,
        ...result.value,
      });
    } else {
      // Fetch all products from the "ecommerce" bucket and "products" collection
      const query = `
        SELECT meta(p).id AS id, p.* 
        FROM \`ecommerce\`.\`_default\`.\`products\` p
      `;
      const result = await cluster.query(query);
      console.log(result);

      const products = result.rows.map((row) => ({
        id: row.id,
        name: row.name || "Unnamed Product",
        description: row.description || "No description available",
        price: row.price ?? 0, // Default price to 0 if missing
        quantity: row.quantity ?? 0, // Default quantity to 0 if missing
        image: row.image || "/default-image.jpg",
      }));

      console.log(products);

      return handleResponse(200, "Products fetched successfully", products);
    }
  } catch (error) {
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