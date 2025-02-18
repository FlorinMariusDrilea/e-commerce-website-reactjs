import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
      
      <p className="mb-4">
        Welcome to GymPanda! These Terms & Conditions outline the rules and regulations for the use of our website and services.
      </p>

      {/* 1. Introduction */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
        <p>
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use GymPanda if you do not agree to all the terms stated here.
        </p>
      </section>

      {/* 2. User Accounts */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. User Accounts</h2>
        <p>
          To access certain features of the site, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials.
        </p>
      </section>

      {/* 3. Purchases & Payments */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Purchases & Payments</h2>
        <p>
          All purchases made on GymPanda are subject to availability. Prices are subject to change without notice. Payments are securely processed through third-party providers.
        </p>
      </section>

      {/* 4. Returns & Refunds */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Returns & Refunds</h2>
        <p>
          Our return policy allows you to return items within 14 days of receipt. Products must be unused and in original packaging to qualify for a refund.
        </p>
      </section>

      {/* 5. Intellectual Property */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, and images, is the property of GymPanda and is protected by copyright laws.
        </p>
      </section>

      {/* 6. Limitation of Liability */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Limitation of Liability</h2>
        <p>
          GymPanda shall not be held liable for any direct, indirect, or consequential damages arising from the use of our services.
        </p>
      </section>

      {/* 7. Governing Law */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">7. Governing Law</h2>
        <p>
          These terms are governed by the laws of the country in which GymPanda operates. Any disputes shall be resolved in the courts of the respective jurisdiction.
        </p>
      </section>

      {/* 8. Contact Information */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">8. Contact Information</h2>
        <p>
          If you have any questions about these Terms & Conditions, please contact us at <a href="mailto:support@gympanda.com" className="text-blue-600 hover:underline">support@gympanda.com</a>.
        </p>
      </section>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default TermsAndConditions;
