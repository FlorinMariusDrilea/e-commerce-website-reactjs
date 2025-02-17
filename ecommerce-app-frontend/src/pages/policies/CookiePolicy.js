import React, { useState } from "react";
import CookieConsent from '../../components/CookieConstant';

const CookiePolicy = () => {
    
    const [showCookieModal, setShowCookieModal] = useState(false); // Manage cookie modal state

    return (
        <div className="max-w-4xl mx-auto p-6 text-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>

        <p className="mb-4">
            This Cookie Policy explains how GymPanda uses cookies and similar technologies 
            to improve your browsing experience on our website.
        </p>

        {/* 1. What Are Cookies? */}
        <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">1. What Are Cookies?</h2>
            <p>
            Cookies are small text files stored on your device when you visit a website. 
            They help improve functionality, personalize experiences, and analyze traffic.
            </p>
        </section>

        {/* 2. Types of Cookies We Use */}
        <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Types of Cookies We Use</h2>
            <ul className="list-disc pl-5 space-y-2">
            <li><strong>Essential Cookies:</strong> Necessary for website functionality.</li>
            <li><strong>Performance Cookies:</strong> Help us analyze site performance.</li>
            <li><strong>Functional Cookies:</strong> Enable personalized content and settings.</li>
            <li><strong>Advertising Cookies:</strong> Used for targeted ads and marketing.</li>
            </ul>
        </section>

        {/* 3. How We Use Cookies */}
        <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">3. How We Use Cookies</h2>
            <p>
            We use cookies to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
            <li>Remember user preferences and settings.</li>
            <li>Analyze website traffic and user behavior.</li>
            <li>Provide personalized product recommendations.</li>
            <li>Deliver relevant advertisements.</li>
            </ul>
        </section>

        {/* 4. Managing Your Cookie Preferences */}
        <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Managing Your Cookie Preferences</h2>
            <p>
            You can manage cookies through your browser settings. You may also opt-out of certain 
            cookies, but doing so may affect site functionality.
            </p>
        </section>

        {/* 5. Third-Party Cookies */}
        <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Third-Party Cookies</h2>
            <p>
            We may use third-party services, such as Google Analytics, which set their own cookies 
            to track interactions and improve services.
            </p>
        </section>

        {/* 6. Updates to This Cookie Policy */}
        <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Updates to This Cookie Policy</h2>
            <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page 
            with an updated date.
            </p>
        </section>

        {/* 7. Contact Us */}
        <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Contact Us</h2>
            <p>
            If you have any questions about our Cookie Policy, please contact us at{" "}
            <a href="mailto:privacy@gympanda.com" className="text-blue-600 hover:underline">privacy@gympanda.com</a>.
            </p>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
            Last updated: {new Date().toLocaleDateString()}
        </div>

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

        </div>
    );
};

export default CookiePolicy;
