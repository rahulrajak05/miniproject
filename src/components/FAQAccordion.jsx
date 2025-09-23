import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Does Happy People AI offer a free trial for Placement Guaidance Resume ?",
    answer: null,
  },
  {
    question: "What is included in the Placement Guaidance Resume subscription?",
    answer: `ThePlacement Guaidance Resume subscription offers an all-in-one career enhancement platform. 
It includes AI-powered tools for creating ATS-compliant resumes, dynamic interactive resume websites with multimedia support, and Profile IQ for responding to recruiter queries. 
You’ll also get mock interview preparation, personalized career guidance, job application management, and performance analytics.`,
  },
  {
    question: "How is the Placement Guaidance Resume unique compared to other tools in the market?",
    answer: null,
  },
  {
    question: "How does an interactive resume website help me?",
    answer: null,
  },
  {
    question: "What is Profile IQ, and how does it help me?",
    answer: null,
  },
  {
    question: "What are AI Gems and Profile IQ Gems?",
    answer: null,
  },
  {
    question: "How many profiles can I create with Placement Guaidance Resume?",
    answer: null,
  },
  {
    question: `Do I need to pay for the "Coming Soon" features in thePlacement Guaidance Resume?`,
    answer: null,
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(1); // second one open by default

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h2>
      <p className="text-center text-gray-600 mb-8">
        Everything you need to know about using  Placement Guaidance Resume of products.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg bg-white shadow-sm">
            <button
              className="flex items-center justify-between w-full px-4 py-4 text-left font-medium text-gray-800 hover:bg-gray-50"
              onClick={() => toggleIndex(index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {openIndex === index && faq.answer && (
              <div className="px-4 pb-4 text-sm text-gray-700">
                <p className="font-semibold text-[#2CA5F6] mb-2">{faq.question}</p>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
