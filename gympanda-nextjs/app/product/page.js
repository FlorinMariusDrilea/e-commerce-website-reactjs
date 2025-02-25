'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Attempt to fetch products from the database
    const fetchProducts = async () => {
      const apiUrl = '/api/product';
      const jsonUrl = '/products.json';

      // Timeout utility to handle slow API calls
      const timeout = (ms) => new Promise((resolve, reject) => setTimeout(reject, ms, 'timeout'));

      const fetchApiData = fetch(apiUrl).then(res => res.ok ? res.json() : Promise.reject('Failed to fetch API'));
      const fetchJsonData = fetch(jsonUrl).then(res => res.json());

      try {
        // Fetch both concurrently and set products from whichever comes first
        let data = await Promise.race([fetchApiData, timeout(2000).then(() => fetchJsonData)]);

        // Check if data is valid
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        // Fallback to loading the local JSON if API fetch fails or takes too long
        if (err === 'timeout') {
          try {
            let data = await fetchJsonData; // Fallback to product.json
            setProducts(data);
          } catch (jsonError) {
            setError('Failed to load products from both API and local JSON');
          }
        } else {
          setError('Failed to load products from API');
        }
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 px-8 md:px-16 py-16 text-white">
          <h1 className="text-5xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Gear Up for Your Best Workout Yet
          </h1>
          <p className="text-lg md:text-xl font-medium mb-8">
            Shop the highest-quality gym gear and apparel for every workout.
          </p>
          <Link href="#products" className="inline-block bg-orange-500 hover:bg-orange-700 text-white text-lg font-semibold py-4 px-10 rounded-full shadow-md hover:shadow-xl transition-all duration-300">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Product Grid Section */}
      <div id="products" className="max-w-screen-xl mx-auto px-5 py-24">
        <h2 className="text-3xl mb-10">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`${product.quantity === 0 ? 'bg-gray-300' : ''}`}>
                <img
                  src={product.image || '/default-image.jpg'}
                  alt={product.name}
                  className={`w-full h-80 object-cover group-hover:scale-105 transition-all duration-300 ${product.quantity === 0 ? 'grayscale opacity-50' : ''}`}
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="mt-auto space-y-6">
                  <div className="flex items-center space-x-2">
                    {/* Price */}
                    <p className="text-orange-600 font-bold">${product.price ? product.price.toFixed(2) : 'N/A'}</p>

                    {/* Stock warning for low stock */}
                    {product.quantity > 0 && product.quantity < 4 && (
                      <div className="text-sm text-red-500 font-semibold">
                        Hurry! Only {product.quantity} left in stock!
                      </div>
                    )}
                  </div>

                  {/* Buttons - Only show if in stock */}
                  {product.quantity > 0 ? (
                    <div className="flex space-x-6">
                      <Link
                        href={`/product/${product.id}`}
                        className="inline-block bg-orange-500 hover:bg-orange-700 text-white text-sm font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Buy Now
                      </Link>
                      <button
                        onClick={() => alert('Added to cart')} // Placeholder functionality for adding to cart
                        className="inline-block bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-500 mt-4">
                      <span>Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
