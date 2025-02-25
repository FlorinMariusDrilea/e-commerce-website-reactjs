'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AddProduct = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
    image: ''
  });

  const [message, setMessage] = useState(null);

  // Redirect unauthorized or unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/'); // Redirect unauthenticated users
    }
    if (status === 'authenticated' && session?.user?.email !== 'administrator@gmail.com') {
      router.push('/'); // Redirect users who are not admin
    }
  }, [session, status, router]);

  // Show loading state while authentication is in progress
  if (status === 'loading') {
    return <p className="text-center text-gray-600">Checking authentication...</p>;
  }

  // Show message if unauthorized (fallback in case useEffect doesn't work)
  if (status === 'unauthenticated' || session?.user?.email !== 'administrator@gmail.com') {
    return <p className="text-center text-red-500">Unauthorized Access</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Ensure price and quantity are numbers
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10)
    };

    try {
      const res = await fetch('/api/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unexpected server error' }));
        throw new Error(errorData.error || 'Failed to add product');
      }

      const data = await res.json();
      setMessage({ type: 'success', text: data.message });

      // Reset form
      setFormData({ name: '', price: '', description: '', quantity: '', image: '' });

    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      {message && (
        <div className={`p-3 mb-4 text-white rounded ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="w-full p-2 border rounded" required />
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />

        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
