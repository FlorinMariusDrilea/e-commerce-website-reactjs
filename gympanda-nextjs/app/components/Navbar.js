'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const { data: session, status } = useSession();
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

        {/* Icons & Authentication Button */}
        <div className="flex space-x-6 items-center">
          <Link href="/cart">
            <FaShoppingCart className="cursor-pointer hover:text-orange-600 transition" size={22} />
          </Link>

          {/* Authentication Button */}
          {status === "loading" ? (
            <p>Loading...</p>
          ) : session ? (
            <div className="hidden md:flex space-x-4 items-center">
              <Link href="/account">
                <FaUser className="cursor-pointer hover:text-orange-600 transition" size={22} />
              </Link>
              <button 
                onClick={() => signOut()} 
                className="flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signIn()} 
              className="hidden md:flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              <FaSignInAlt className="mr-2" /> Login / Register
            </button>
          )}

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

          {/* Mobile Authentication Buttons */}
          <div className="px-6 py-3">
            {session ? (
              <button 
                onClick={() => { signOut(); setMenuOpen(false); }} 
                className="w-full flex items-center justify-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            ) : (
              <button 
                onClick={() => { signIn(); setMenuOpen(false); }} 
                className="w-full flex items-center justify-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              >
                <FaSignInAlt className="mr-2" /> Login / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
