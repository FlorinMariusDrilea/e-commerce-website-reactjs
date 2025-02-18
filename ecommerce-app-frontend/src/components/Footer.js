import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import CookieConsent from "./CookieConstant";

function Footer() {
  const [showCookieModal, setShowCookieModal] = useState(false); // Manage cookie modal state

  return (
    <footer className="bg-gray-900 text-white mt-10 relative">
      <div className="container mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-semibold uppercase">Customer Service</h3>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="/shipping-returns" className="hover:text-white transition">Shipping & Returns</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQs</a></li>
          </ul>
        </div>

        {/* Column 2 - Legal Side */}
        <div>
          <h3 className="text-lg font-semibold uppercase">Legal</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><a href="/policies/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</a></li>
            <li><a href="/policies/cookie-policy" className="hover:text-white transition">Cookie Policy</a></li>
            <li><a href="/policies/privacy-policy" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold uppercase">Follow Us</h3>
          <p className="mt-4 text-gray-300">Get updates on new arrivals and offers.</p>
          <input type="email" placeholder="Enter your email" className="mt-3 w-full p-2 rounded bg-gray-800 text-white"/>
          <button className="mt-2 w-full bg-gray-700 hover:bg-gray-600 transition p-2 rounded">
            Subscribe
          </button>
          <div className="mt-4 flex justify-end space-x-6 text-gray-300">
            <a href="https://facebook.com" className="hover:text-white transition"><FaFacebook size={20} /></a>
            <a href="https://instagram.com" className="hover:text-white transition"><FaInstagram size={20} /></a>
            <a href="https://twitter.com" className="hover:text-white transition"><FaTwitter size={20} /></a>
            <a href="https://youtube.com" className="hover:text-white transition"><FaYoutube size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-300 text-sm py-4 border-t border-gray-800">
        © {new Date().getFullYear()}, GymPanda Official Store
      </div>

      {/* Fixed Manage Cookie Preferences Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setShowCookieModal(true)} 
          className="px-4 py-2 text-sm bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition flex items-center"
        >
          <span className="mr-2">Manage Cookies</span> 🍪
        </button>
      </div>

      {/* Cookie Consent Modal */}
      <CookieConsent showModal={showCookieModal} setShowModal={setShowCookieModal} />
    </footer>
  );
}

export default Footer;