"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/product") // ✅ Fetch from Next.js API Route
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (products.length === 0) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-lg">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
          <h2 className="text-xl font-bold mt-4">{product.name}</h2>
          <p>{product.description}</p>
          <p className="font-bold text-xl mt-4">${product.price.toFixed(2)}</p>
          <Link href={`/product/${product.id}`} className="bg-blue-500 text-white px-4 py-2 inline-block mt-4 rounded-lg">
            View Product Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;