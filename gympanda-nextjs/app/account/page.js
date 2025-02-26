'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AccountInfo = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
  });

  const [message, setMessage] = useState(null);

  const [isClient, setIsClient] = useState(false);

  // Initialize loading state
  const isLoading = status === 'loading';
  const isUnauthenticated = status === 'unauthenticated';

  // Always call hooks in the same order and ensure session is available
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
      });
    }
  }, [session]);

  // Set the client-side state after component mount
  useEffect(() => {
    setIsClient(true); // Ensuring we're on the client-side
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
  
    // Check if the new name is the same as the old one
    if (formData.name === session?.user?.name) {
      setMessage({ type: 'info', text: 'Your name is already up to date.' });
      return; // Do nothing if the name is the same
    }
  
    try {
      const res = await fetch('/api/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unexpected server error' }));
        throw new Error(errorData.error || 'Failed to update account');
      }
  
      const data = await res.json();
      setMessage({ type: 'success', text: data.message });
  
      // Log out after account update
      signOut({ callbackUrl: '/' }); // Redirect to home or sign-in page after logout
  
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };  

  // Render loading state and unauthorized message
  if (isLoading) {
    return <p className="text-center text-gray-600">Checking authentication...</p>;
  }

  if (isUnauthenticated) {
    return <p className="text-center text-red-500">Unauthorized Access</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Account Information</h1>

      {message && (
        <div className={`p-3 mb-4 text-white rounded ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Name" 
          className="w-full p-2 border rounded" 
          required 
        />
        <button 
          type="submit" 
          className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded">
          Update Account
        </button>
      </form>
    </div>
  );
};

export default AccountInfo;
