import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-semibold uppercase">Customer Service</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="/" className="hover:text-white transition">Shipping & Returns</a></li>
            <li><a href="/" className="hover:text-white transition">Track Order</a></li>
            <li><a href="/" className="hover:text-white transition">FAQs</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold uppercase">Follow Us</h3>
          <p className="mt-4 text-gray-400">Get updates on new arrivals and offers.</p>
          <input type="email" placeholder="Enter your email" className="mt-3 w-full p-2 rounded bg-gray-800 text-white"/>
          <button className="mt-2 w-full bg-gray-700 hover:bg-gray-600 transition p-2 rounded">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-800">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;