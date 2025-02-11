import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide uppercase">
          E-commerce Store
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 text-lg">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <Link to="/products" className="hover:text-black transition">Shop</Link>
          <Link to="/about" className="hover:text-black transition">About</Link>
          <Link to="/contact" className="hover:text-black transition">Contact</Link>
        </div>

        {/* Icons */}
        <div className="flex space-x-6 text-gray-700">
          <FaUser className="cursor-pointer hover:text-black transition" size={20} />
          <FaShoppingCart className="cursor-pointer hover:text-black transition" size={20} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;