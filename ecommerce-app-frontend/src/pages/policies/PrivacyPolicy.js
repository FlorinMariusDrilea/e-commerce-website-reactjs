import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At GymPanda, we respect your privacy and are committed to protecting your personal data. 
        This Privacy Policy explains how we collect, use, and protect your information.
      </p>

      {/* 1. Information We Collect */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Information We Collect</h2>
        <p>
          We may collect personal data such as your name, email address, phone number, and payment information when you use our website.
        </p>
      </section>

      {/* 2. How We Use Your Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To process your orders and transactions.</li>
          <li>To send updates on new arrivals, promotions, and offers.</li>
          <li>To improve our website and customer service.</li>
          <li>To comply with legal requirements.</li>
        </ul>
      </section>

      {/* 3. Data Protection & Security */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Data Protection & Security</h2>
        <p>
          We implement security measures to protect your personal information from unauthorized access, alteration, or disclosure.
        </p>
      </section>

      {/* 4. Sharing Your Data */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Sharing Your Data</h2>
        <p>
          We do not sell or rent your personal data. However, we may share information with trusted third-party service providers for payment processing, order fulfillment, and marketing purposes.
        </p>
      </section>

      {/* 5. Cookies & Tracking Technologies */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Cookies & Tracking Technologies</h2>
        <p>
          We use cookies and tracking technologies to enhance user experience, analyze website traffic, and personalize content. You can adjust your cookie preferences in your browser settings.
        </p>
      </section>

      {/* 6. Your Rights */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Request access to the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Opt-out of marketing communications at any time.</li>
        </ul>
      </section>

      {/* 7. Changes to This Policy */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
        </p>
      </section>

      {/* 8. Contact Us */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:privacy@gympanda.com" className="text-blue-600 hover:underline">privacy@gympanda.com</a>.
        </p>
      </section>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default PrivacyPolicy;