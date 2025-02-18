'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-gray-900">
          <span className="text-orange-600">G</span>ym
          <span className="text-orange-600">P</span>anda
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-gray-700 text-lg">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="hover:text-orange-600 transition font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons & Mobile Menu Toggle */}
        <div className="flex space-x-6 items-center">
          <Link href="/account">
            <FaUser className="cursor-pointer hover:text-orange-600 transition" size={22} />
          </Link>

          <Link href="/cart" className="relative">
            <FaShoppingCart className="cursor-pointer hover:text-orange-600 transition" size={22} />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden focus:outline-none"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`absolute top-full left-0 w-full bg-white shadow-md py-4 transition-transform duration-300 ease-in-out md:hidden ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="block py-3 px-6 text-gray-700 text-lg hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default Navbar;
