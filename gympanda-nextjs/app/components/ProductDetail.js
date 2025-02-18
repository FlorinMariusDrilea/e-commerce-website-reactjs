"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/product?id=${id}`) // ✅ Fetch a single product by ID
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!product) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="max-w-md mx-auto border rounded-lg p-4 shadow-lg">
      <img src={product.image} alt={product.name} className="h-64 w-full object-cover rounded-lg" />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductDetail;
