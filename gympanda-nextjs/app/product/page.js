'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const ShopPage = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = '/api/product';
      const jsonUrl = '/products.json';
      const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject('timeout'), ms));

      const fetchApiData = fetch(apiUrl).then(res => res.ok ? res.json() : Promise.reject('Failed to fetch API'));
      const fetchJsonData = fetch(jsonUrl).then(res => res.json());

      try {
        let data = await Promise.race([fetchApiData, timeout(2000).then(() => fetchJsonData)]);
        if (Array.isArray(data)) setProducts(data);
        else if (data?.data && Array.isArray(data.data)) setProducts(data.data);
        else throw new Error('Invalid data format');
      } catch (err) {
        if (err === 'timeout') {
          try {
            let data = await fetchJsonData;
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
      <div className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 px-8 md:px-16 py-16 text-white">
          <h1 className="text-5xl font-extrabold mb-6">Gear Up for Your Best Workout Yet</h1>
          <p className="text-lg md:text-xl font-medium mb-8">Shop the highest-quality gym gear and apparel.</p>
          <Link href="#products" className="bg-orange-500 hover:bg-orange-700 text-white py-4 px-10 rounded-full shadow-md">Shop Now</Link>
        </div>
      </div>
      <div id="products" className="max-w-screen-xl mx-auto px-5 py-24">
        <h2 className="text-3xl mb-10">All Products</h2>
        {session?.user?.email === "administrator@gmail.com" && (
          <div className="mb-6">
            <Link href="/add-product" className="bg-orange-500 hover:bg-orange-700 text-white py-3 px-6 rounded-lg shadow-md">Add Product</Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <div className={product.quantity === 0 ? 'bg-gray-300' : ''}>
                <img src={product.image || '/default-image.jpg'} alt={product.name} className={`w-full h-80 object-cover transition-all ${product.quantity === 0 ? 'grayscale opacity-50' : ''}`} />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="mt-auto space-y-6">
                  <div className="flex items-center space-x-2">
                    <p className="text-orange-600 font-bold">${parseInt(product.price).toFixed(2)}</p>
                    {product.quantity > 0 && product.quantity < 4 && <div className="text-sm text-red-500 font-semibold">Hurry! Only {product.quantity} left!</div>}
                  </div>
                  {product.quantity > 0 ? (
                    <div className="flex space-x-6">
                      <Link href={`/product/${product.id}`} className="bg-orange-500 hover:bg-orange-700 text-white py-3 px-6 rounded-lg shadow-md">Buy Now</Link>
                      <button onClick={() => alert('Added to cart')} className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg shadow-md">Add to Cart</button>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-500 mt-4">Out of Stock</div>
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
