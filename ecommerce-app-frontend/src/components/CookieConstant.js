import React, { useState, useEffect } from "react";

const CookieConsent = ({ showModal, setShowModal }) => {
  // State to manage cookie preferences
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: false,
    marketing: false,
  });

  // Load saved preferences from local storage
  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem("cookiePreferences"));
    
    if (!savedPreferences) {
      setShowModal(true); // Show modal if no preferences are saved
    } else {
      setPreferences(savedPreferences);
    }
  }, [setShowModal]);

  // Accept cookies and save preferences
  const handleAccept = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    setShowModal(false);
  };

  // Decline optional cookies and save default settings
  const handleDecline = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        essential: true,
        functional: false,
        marketing: false,
      })
    );
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
            >
              ✖
            </button>

            {/* Title & Description */}
            <h2 className="text-xl font-bold text-gray-900">Manage Cookie Preferences</h2>
            <p className="text-gray-600 text-sm mt-2">
              We use cookies to enhance your experience. Manage your preferences below.
            </p>

            {/* Cookie Options */}
            <div className="mt-4 space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" checked disabled className="form-checkbox text-blue-600" />
                <span className="text-gray-800 font-medium">Essential Cookies (Required)</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={() => setPreferences({ ...preferences, functional: !preferences.functional })}
                  className="form-checkbox text-blue-600"
                />
                <span className="text-gray-700">Functional Cookies</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                  className="form-checkbox text-blue-600"
                />
                <span className="text-gray-700">Marketing Cookies</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;