import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

// Fetch product data from the API using dynamic environment variables
const fetchProduct = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/product/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching product from API:", error);
    return null;
  }
};

// Fallback to product.json if the API fetch fails
const fetchProductFromJson = async (id) => {
  try {
    // Fetch the products.json from the public directory (client-side)
    const res = await fetch('/products.json'); 
    console.log("res", res);
    if (!res.ok) throw new Error("Failed to load local products.json");

    const data = await res.json(); // Parse the JSON response

    // Check if 'data' is an array
    if (!Array.isArray(data)) {
      console.error("Expected an array, but got:", data);
      return null; // Return null if data is not an array
    }

    // Find the item in the local JSON data by matching the ID
    const item = data.find((item) => item.id === id); 
    return item ? { data: item } : null; // Return item instead of product
  } catch (error) {
    console.error("Error fetching item from local JSON:", error);
    return null;
  }
};


export default async function ProductPage({ params }) {
  // Ensure `params` are available and await the correct usage
  const { id } = await params;
  
  if (!id) return notFound();

  // Try to fetch product data from API
  let product = await fetchProduct(id);

  // If product is not found or API call failed, fallback to the local JSON
  if (!product) {
    console.log("Falling back to local JSON for product data...");
    product = await fetchProductFromJson(id);
  }

  // If still no product found, return not found
  if (!product || !product.data) return notFound();
  
  console.log("Product:", product);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative">
          <img
            src={"/" + product.data.image}
            alt={product.data.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
          {product.data.quantity < 3 && product.data.quantity > 0 && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md">
              Hurry! Only {product.data.quantity} left!
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{product.data.name}</h1>
          <p className="text-gray-600 text-lg">{product.data.description}</p>

          {/* Price & Stock */}
          <div className="mt-6 items-center">
            <p className="text-3xl font-bold text-orange-600">${product.data.price?.toFixed(2)}</p>
            {product.data.quantity > 0 ? (
              <span className="text-green-600 font-medium text-lg">In Stock</span>
            ) : (
              <span className="text-red-500 font-medium text-lg">Out of Stock</span>
            )}
          </div>

          {/* Add to Cart */}
          <div className="mt-4">
            {product.data.quantity > 0 ? (
              <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-orange-700 transition">
                🛒 Add to Cart
              </button>
            ) : (
              <p className="text-red-500 text-lg font-semibold">⚠️ This product is out of stock</p>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-6 border-t pt-4 text-gray-600 text-sm">
            <p>🚀 Free shipping on orders over <strong>$100</strong></p>
            <p>📦 Estimated delivery: <strong>3-5 business days</strong></p>
            <p>🔄 30-day return policy, hassle-free returns</p>
          </div>
        </div>
      </div>
    </div>
  );
}
