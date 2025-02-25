import { getProductsCollection } from "../../../../db/db";

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
    // Fetch the products.json from the public directory
    const res = await fetch('/products.json');

    if (!res.ok) {
      throw new Error("Failed to load local products.json");
    }

    const data = await res.json(); // Parse the JSON response

    // Find the product by its ID
    const product = data.find((product) => product.id === id);

    return product ? { data: product } : null;
  } catch (error) {
    console.error("Error fetching product from local JSON:", error);
    return null;
  }
};


export async function GET(request, { params }) {
  try {
    // Ensure `params` is available and await it to get the `id`
    const { id } = await params;

    console.log("Fetching product with ID:", id);

    // First, try to fetch the product from Couchbase (or your primary database)

    // If the product is not found or there's an error, fallback to local JSON
    console.log("Fallback to local JSON for product data...");
    const product = await fetchProductFromJson(id);

    if (product) {
      return handleResponse(200, "Product fetched from local JSON", product.data);
    }

    // If no product is found, return an error
    return handleResponse(500, "Product not found", { error: "Product not found" });

  } catch (error) {
    console.error("Error fetching product:", error);
    return handleResponse(500, "Error fetching product", { error: error.message });
  }
}
