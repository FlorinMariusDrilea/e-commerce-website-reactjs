import { getProductsCollection } from "../../../../db/db";

// Helper function to handle responses
const handleResponse = (status, message, data = null) => {
  return new Response(JSON.stringify({ message, data }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

// GET: Fetch a single product by ID using N1QL
export async function GET(request, { params }) {
  try {
    const { id } = params;
    console.log("Fetching product with ID:", id);

    const { cluster } = await getProductsCollection();

    // Use a parameterized N1QL query
    const query = `
      SELECT meta(p).id AS id, p.* 
      FROM \`ecommerce\`.\`_default\`.\`products\` p
      WHERE meta(p).id = $1
    `;

    const result = await cluster.query(query, { parameters: [id] });

    if (result.rows.length === 0) {
      return handleResponse(404, "Product not found");
    }

    return handleResponse(200, "Product fetched successfully", result.rows[0]);
  } catch (error) {
    console.error("Error fetching aproduct:", error);
    return handleResponse(500, "Error fetching product", { error: error.message });
  }
}
