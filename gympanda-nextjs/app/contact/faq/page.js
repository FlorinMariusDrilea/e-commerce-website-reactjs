'use client'
import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What products does GymPanda offer?",
      answer: "GymPanda offers a wide range of high-quality gym clothing including leggings, sports bras, shorts, t-shirts, and accessories such as gym bags and water bottles."
    },
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our shop, add products to your cart, and proceed to checkout. We accept various payment methods including credit/debit cards and PayPal."
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes! We offer free shipping on all orders over $50 within the US. For international shipping, rates may vary based on your location."
    },
    {
      question: "Can I return an item?",
      answer: "Yes! We accept returns within 30 days of purchase as long as the items are unused, in original packaging, and have all tags attached."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you will receive an email with a tracking number and a link to track the delivery status."
    },
    {
      question: "Do you offer gift cards?",
      answer: "Yes, we offer gift cards in various denominations. You can purchase them directly from our shop page."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-sm rounded-lg overflow-hidden">
            <button
              className="w-full text-left py-4 px-6 bg-gray-100 text-gray-900 font-semibold"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="py-4 px-6 text-gray-600 bg-gray-50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
