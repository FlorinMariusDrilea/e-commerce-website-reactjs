import { notFound } from "next/navigation";

// Fetch product from API
const fetchProduct = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/product/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching product from API:", error);
    return null;
  }
};

// Fallback: Fetch product from local JSON file
const fetchProductFromJson = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/products.json`);
    if (!res.ok) throw new Error("Failed to load local products.json");

    const data = await res.json();
    if (!Array.isArray(data)) return null;

    return data.find((item) => item.id === id) || null;
  } catch (error) {
    console.error("Error fetching product from JSON:", error);
    return null;
  }
};

export default async function ProductPage({ params }) {
  const { id } = params; // No need for `await`
  if (!id) return notFound();

  let product = await fetchProduct(id);
  if (!product) {
    console.warn("Falling back to local JSON...");
    product = await fetchProductFromJson(id);
  }

  if (!product) return notFound(); // Ensure product exists

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image ? `/${product.image}` : "/default-image.jpg"}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
          {product.quantity > 0 && product.quantity < 3 && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md">
              Hurry! Only {product.quantity} left!
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{product.name}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>

          {/* Price & Stock */}
          <div className="mt-6">
            <p className="text-3xl font-bold text-orange-600">${product.price}</p>
            <span className={product.quantity > 0 ? "text-green-600 font-medium text-lg" : "text-red-500 font-medium text-lg"}>
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Add to Cart */}
          <div className="mt-4">
            {product.quantity > 0 ? (
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