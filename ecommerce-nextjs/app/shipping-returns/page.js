"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

const ShippingReturns = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // Ensure the date is rendered only on the client to prevent hydration issues
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <>
      <Head>
        <title>Shipping & Returns | GymPanda</title>
        <meta name="description" content="Learn about GymPanda's shipping policies, delivery times, and return process." />
      </Head>

      <div className="max-w-4xl mx-auto p-6 text-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping & Returns</h1>

        {/* Shipping Policy */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Shipping Policy</h2>
          <p>
            We offer worldwide shipping with fast and reliable delivery. All orders are processed within 
            1-2 business days and shipped via trusted carriers.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>Standard Shipping:</strong> 5-7 business days</li>
            <li><strong>Express Shipping:</strong> 2-3 business days</li>
            <li><strong>International Shipping:</strong> 7-14 business days</li>
          </ul>
          <p className="mt-3">
            Shipping costs are calculated at checkout based on your location and shipping method.
          </p>
        </section>

        {/* Returns & Exchanges */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Returns & Exchanges</h2>
          <p>
            We want you to love your GymPanda gear! If you're not satisfied, you can return or exchange 
            your order within <strong>30 days</strong> of purchase.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>Items must be in their original condition (unworn, unwashed, with tags).</li>
            <li>Returns are processed within 5-7 business days after receiving the item.</li>
            <li>Exchanges are subject to availability.</li>
          </ul>
        </section>

        {/* How to Return an Item */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">How to Return an Item</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Email <a href="mailto:support@gympanda.com" className="text-blue-600 hover:underline">support@gympanda.com</a> with your order details.</li>
            <li>We’ll provide you with a return shipping label and instructions.</li>
            <li>Send the package back using the provided label.</li>
            <li>Once received, we’ll process your refund or exchange.</li>
          </ol>
          <p className="mt-3">
            Please note that return shipping costs are the responsibility of the customer unless the 
            item is defective or incorrect.
          </p>
        </section>

        {/* Refund Policy */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Refund Policy</h2>
          <p>
            Refunds are processed to the original payment method within 3-5 business days after the return 
            is approved. You’ll receive an email confirmation once the refund has been issued.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Need Help?</h2>
          <p>
            Have questions about shipping or returns? Reach out to our support team at{" "}
            <a href="mailto:support@gympanda.com" className="text-blue-600 hover:underline">
              support@gympanda.com
            </a>
            .
          </p>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          Last updated: {lastUpdated}
        </div>
      </div>
    </>
  );
};

export default ShippingReturns;
