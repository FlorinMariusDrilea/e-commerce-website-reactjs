'use client'

import { useState, useEffect } from 'react';
import { useSession, getSession, signOut } from 'next-auth/react'; // Add getSession import

const AccountInfo = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Added email to formData
    birthday: '', // Initially empty
    sex: '', // Initially empty
  });

  const [initialData, setInitialData] = useState({
    name: '',
    email: '', // Added email to initialData
    birthday: '', // Initially empty
    sex: '', // Initially empty
  });

  const [message, setMessage] = useState(null);

  const isLoading = status === 'loading';
  const isUnauthenticated = status === 'unauthenticated';

  // Populate user data from session
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '', // Populate email
        birthday: session.user.birthday || '',
        sex: session.user.sex || '',
      });
      setInitialData({
        name: session.user.name || '',
        email: session.user.email || '', // Set email in initialData
        birthday: session.user.birthday || '',
        sex: session.user.sex || '',
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Check if form data is different from initial data
    const isDataChanged = Object.keys(formData).some((key) => formData[key] !== initialData[key]);

    if (!isDataChanged) {
      setMessage({ type: 'info', text: 'Nothing has changed.' });
      return;
    }

    // Create an object with only non-empty values
    const updatedData = {};
    if (formData.name) updatedData.name = formData.name;
    if (formData.birthday) updatedData.birthday = formData.birthday;
    if (formData.sex) updatedData.sex = formData.sex;

    if (Object.keys(updatedData).length === 0) {
      setMessage({ type: 'error', text: 'At least one field (name, birthday, sex) must be filled to update your account.' });
      return;
    }

    try {
      const res = await fetch('/api/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unexpected server error' }));
        throw new Error(errorData.error || 'Failed to update account');
      }

      const data = await res.json();
      setMessage({ type: 'success', text: data.message });
  
      await getSession();
      // Log out after account update
      signOut({ callbackUrl: '/' }); // Redirect to home or sign-in page after logout
  
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-600">Checking authentication...</p>;
  }

  if (isUnauthenticated) {
    return <p className="text-center text-red-500">Unauthorized Access</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg mb-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Account Information</h1>

      {message && (
        <div className={`p-3 mb-4 text-white rounded ${message.type === 'success' ? 'bg-green-500' : message.type === 'info' ? 'bg-blue-500' : 'bg-red-500'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email field - Disabled with description */}
        <div>
          <label htmlFor="email" className="block text-gray-800 font-semibold text-md mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
            className="w-full p-2 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" 
            disabled 
          />
          <small className="text-gray-500 text-xs">Your registered email address (cannot be changed).</small>
        </div>

        {/* Name field with description */}
        <div>
          <label htmlFor="name" className="block text-gray-800 font-semibold text-md mb-2">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Name" 
            className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" 
            required 
          />
          <small className="text-gray-500 text-xs">Your full name as it appears on your account.</small>
        </div>

        {/* Birthday field with description */}
        <div>
          <label htmlFor="birthday" className="block text-gray-800 font-semibold text-md mb-2">Birthday</label>
          <input 
            type="date" 
            name="birthday" 
            value={formData.birthday} 
            onChange={handleChange} 
            placeholder="Birthday" 
            className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" 
          />
          <small className="text-gray-500 text-xs">Your date of birth.</small>
        </div>

        {/* Sex field with description */}
        <div>
          <label 
            htmlFor="sex" 
            className="block text-gray-800 font-semibold text-md mb-2"
          >
            Sex
          </label>
          <div className="relative">
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full p-2 pl-4 pr-10 border-2 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
            >
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {/* Custom arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <small className="text-gray-500 text-sm mt-1 block">Select your gender identity.</small>
        </div>

        <button 
          type="submit" 
          className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 rounded mt-4 transition duration-200">
          Update Account
        </button>
      </form>
    </div>
  );
};

export default AccountInfo;
