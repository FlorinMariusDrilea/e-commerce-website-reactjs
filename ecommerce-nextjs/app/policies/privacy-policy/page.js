"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // Set the last updated date when the component mounts
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <>
      <Head>
        <title>Privacy Policy | GymPanda</title>
        <meta
          name="description"
          content="Learn how GymPanda collects and protects your personal data."
        />
      </Head>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12 text-gray-700">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At GymPanda, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and protect your information.
          </p>
        </div>

        {/* 1. Information We Collect */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We may collect personal data such as your name, email address, phone number, and payment information when you use our website.
          </p>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-4 text-lg text-gray-600">
            <li>To process your orders and transactions.</li>
            <li>To send updates on new arrivals, promotions, and offers.</li>
            <li>To improve our website and customer service.</li>
            <li>To comply with legal requirements.</li>
          </ul>
        </section>

        {/* 3. Data Protection & Security */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">3. Data Protection & Security</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We implement security measures to protect your personal information from unauthorized access, alteration, or disclosure.
          </p>
        </section>

        {/* 4. Sharing Your Data */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">4. Sharing Your Data</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We do not sell or rent your personal data. However, we may share information with trusted third-party service providers for payment processing, order fulfillment, and marketing purposes.
          </p>
        </section>

        {/* 5. Cookies & Tracking Technologies */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">5. Cookies & Tracking Technologies</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We use cookies and tracking technologies to enhance user experience, analyze website traffic, and personalize content. You can adjust your cookie preferences in your browser settings.
          </p>
        </section>

        {/* 6. Your Rights */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
          <p className="text-lg text-gray-600 leading-relaxed">You have the right to:</p>
          <ul className="list-disc pl-5 space-y-4 text-lg text-gray-600">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Opt-out of marketing communications at any time.</li>
          </ul>
        </section>

        {/* 7. Changes to This Policy */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">7. Changes to This Policy</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
          </p>
        </section>

        {/* 8. Contact Us */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@gympanda.com" className="text-blue-600 hover:underline">privacy@gympanda.com</a>.
          </p>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12">
          Last updated: {lastUpdated}
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
