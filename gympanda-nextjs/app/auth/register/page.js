'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaUserPlus } from "react-icons/fa";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      router.push("/auth/signin"); // Redirect to Sign In
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50 dark:bg-gray-900 px-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">Create an Account</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mt-2">Sign up to get started</p>

        {/* Google Sign-Up */}
        <button
          onClick={() => signIn("google")}
          className="mt-6 flex items-center justify-center w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <FaGoogle className="mr-2" /> Sign up with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <p className="px-3 text-gray-500 dark:text-gray-400">or</p>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Email & Password Sign-Up */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring focus:ring-orange-400"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition flex items-center justify-center"
            disabled={loading}
          >
            <FaUserPlus className="mr-2" /> {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account? <Link href="/auth/signin" className="text-orange-500 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
