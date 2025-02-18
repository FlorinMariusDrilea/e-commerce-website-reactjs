'use client';

import React, { useState } from "react";
import Link from 'next/link';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
  
    // Convert newlines to <br /> tags for better display in the email
    const formattedMessage = formData.message.replace(/\n/g, "<br />");
  
    const formDataToSend = {
      ...formData,
      message: formattedMessage,
    };
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });
  
      if (response.ok) {
        setSubmissionStatus("✅ Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmissionStatus("❌ Failed to send message. Please try again.");
        console.log(response.error);
      }
    } catch (error) {
      setSubmissionStatus("❌ Error sending message. Please check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-700">
      {/* Hero Section with Search Bar */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Contact Form</h1>
      </div>    

      {/* Contact Form */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-600 mb-5 text-lg">Send us a message and we’ll get back to you shortly.</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="font-semibold">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="5"
              className="p-3 border border-gray-300 rounded-lg"
            ></textarea>
          </div>

          {submissionStatus && (
            <div className={`mt-4 p-3 rounded-lg ${submissionStatus.startsWith('✅') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
              {submissionStatus}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-800 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit Request"}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-center">
        <Link href="/contact/faq" className="p-4 border rounded-lg shadow hover:bg-gray-100">
          <h2 className="text-lg font-semibold">📖 FAQs</h2>
          <p className="text-gray-500">Find answers to common questions</p>
        </Link>
      </div>

      {/* Contact Options */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Other Ways to Reach Us</h2>
        <p className="text-gray-600 mb-4">Need immediate help? Try these options.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="p-4 border rounded-lg shadow hover:bg-gray-100">
            <h3 className="text-lg font-semibold">📧 Email Us</h3>
            <p className="text-gray-500">
              <a href="mailto:marius.drilea2016@gmail.com" className="text-gray-500 hover:underline">
                marius.drilea2016@gmail.com
              </a>
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow hover:bg-gray-100">
            <h3 className="text-lg font-semibold">📞 Call Support</h3>
            <p className="text-gray-500">
              <a href="tel:+447716312297" className="text-gray-500 hover:underline">
                +447716312297
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
