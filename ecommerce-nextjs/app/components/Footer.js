'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import CookieConsent from '../components/CookieConstant';  // Corrected path to the CookieConsent component

export default function Footer() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [currentYear, setCurrentYear] = useState(null);  // State for dynamic year

  useEffect(() => {
    // Check if we are in the browser environment
    setIsBrowser(typeof window !== 'undefined');
    
    // Set the dynamic year after the component mounts
    setCurrentYear(new Date().getFullYear());
    
    // Check if the user has already given cookie consent
    const hasGivenConsent = localStorage.getItem('cookieConsent') === 'true';
    setShowCookieModal(!hasGivenConsent);  // Show modal if consent not given
  }, []);  // Run only once after mounting

  // Handle user consent
  const handleCookieConsent = (consent) => {
    if (isBrowser) {
      localStorage.setItem('cookieConsent', consent ? 'true' : 'false');
    }
    setShowCookieModal(false);  // Close the modal once consent is given
  };

  // Check if the current route is the cookie policy page
  const isCookiePolicyPage = isBrowser && window.location.pathname === '/policies/cookie-policy';

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="container mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-semibold uppercase">Customer Service</h3>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/shipping-returns" className="hover:text-white transition">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/contact/faq" className="hover:text-white transition">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2 - Legal Side */}
        <div>
          <h3 className="text-lg font-semibold uppercase">Legal</h3>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>
              <Link href="/policies/terms-and-conditions" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/policies/cookie-policy" className="hover:text-white transition">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/policies/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold uppercase">Follow Us</h3>
          <p className="mt-4 text-gray-300">Get updates on new arrivals and offers.</p>
          <form className="mt-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="mt-2 w-full bg-gray-700 hover:bg-gray-600 transition p-2 rounded"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-4 flex justify-end space-x-6 text-gray-300">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Youtube size={20} />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-300 text-sm py-4 border-t border-gray-800">
        {/* Dynamically rendered year */}
        © {new Date().getFullYear()}, GymPanda Official Store
      </div>

      {/* Fixed Manage Cookie Preferences Button - Only shown on the cookie policy page */}
      {isCookiePolicyPage && (
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            onClick={() => setShowCookieModal(true)} 
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition flex items-center"
          >
            <span className="mr-2">Manage Cookies</span> 🍪
          </button>
        </div>
      )}

      {/* Cookie Consent Modal */}
      {showCookieModal && (
        <CookieConsent onConsent={handleCookieConsent} />
      )}
    </footer>
  );
}
