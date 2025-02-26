'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { use } from 'react';  // Import the use hook to unwrap the Promise

const ProductPage = ({ params }) => {
  // Unwrap params using React.use()
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch product data
  useEffect(() => {
    if (!id) {
      setError('Product ID is missing');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle not found
  if (!id || error) {
    return notFound();
  }

  // Loading state
  if (loading) {
    return <div className="text-center text-2xl py-10">Loading product...</div>;
  }

  // Product not found
  if (!product) {
    return notFound();
  }

  console.log('Product fetched successfully:', product);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.data.image}
            alt={product.data.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
          {product.data.quantity > 0 && product.data.quantity < 3 && (
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
          <div className="mt-6">
            <p className="text-3xl font-bold text-orange-600">${product.data.price}</p>
            <span className={product.data.quantity > 0 ? 'text-green-600 font-medium text-lg' : 'text-red-500 font-medium text-lg'}>
              {product.data.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
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
};

export default ProductPage;
