'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const ShopPage = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/product');
      const data = await res.json();
      if (data?.data) setProducts(data.data);
      else throw new Error('Invalid data format');
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
  
    try {
      setLoading(true);  // Show loading spinner while deleting
      await fetch(`/api/product`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // Send ID in request body
      });
    
      setProducts(products.filter(product => product.id !== id)); // Remove from state after deletion
      setLoading(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product");
      setLoading(false);
    }
  };

  // Add to Cart Function
  const addToCart = async (product) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price,
        }),
      });
  
      if (response.ok) {
        alert('Added to cart');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };  

  if (loading) return <div className="text-center text-2xl py-10">Loading products...</div>;

  return (
    <div className="bg-gray-100">
      {/* Banner Section */}
      <div className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 px-8 md:px-16 py-16 text-white">
          <h1 className="text-5xl font-extrabold mb-6">Gear Up for Your Best Workout Yet</h1>
          <p className="text-lg md:text-xl font-medium mb-8">Shop the highest-quality gym gear and apparel.</p>
          <Link href="#products" className="bg-orange-500 hover:bg-orange-700 text-white py-4 px-10 rounded-full shadow-md">Shop Now</Link>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="max-w-screen-xl mx-auto px-5 py-24">
        <h2 className="text-3xl mb-10">All Products</h2>

        {/* Admin Add Product Button */}
        {session?.user?.email === "administrator@gmail.com" && (
          <div className="mb-6">
            <Link href="/add-product" className="bg-orange-500 hover:bg-orange-700 text-white py-3 px-6 rounded-lg shadow-md">Add Product</Link>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
            >
              {/* Product Image + Delete Button */}
              <div className='relative overflow-hidden'>
                <img 
                  src={product.image || '/default-image.jpg'} 
                  alt={product.name} 
                  className={`w-full h-80 object-cover rounded-lg transition-all duration-300 group-hover:scale-105 ${parseInt(product.quantity) === 0 ? 'grayscale opacity-50' : ''}`}
                  onError={(e) => e.target.src = '/default-image.jpg'}
                />
            
                {/* Admin Delete Button */}
                {session?.user?.email === "administrator@gmail.com" && (
                  <div className="absolute top-2 right-2 group">
                    <button 
                      onClick={() => handleDelete(product.id)} 
                      className="bg-orange-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all duration-200 hover:bg-orange-800 hover:scale-110"
                      title="Delete product"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            
              {/* Product Info */}
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
                      <Link href={`/product/${product.id}`} className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-3 rounded-lg shadow-md">Buy Now</Link>
                      <button onClick={() => addToCart(product)} className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-3 rounded-lg shadow-md">Add to Cart</button>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-500 mt-4">Out of Stock</div>
                  )}
                </div>
              </div>
            </div>          
          ))}
        </div>

        {/* Error Display */}
        {error && <div className="text-center text-red-600 mt-6">{error}</div>}
      </div>
    </div>
  );
};

export default ShopPage;
