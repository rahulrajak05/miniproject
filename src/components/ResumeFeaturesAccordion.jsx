import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import resumePreview from '../images/resumePreview.png';
// Feature list with filled descriptions
const features = [
  {
    title: "Quick Profile Setup",
    description: "Get your resume-ready profile live in just a few guided steps.",
  },
  {
    title: "Professional Templates and Formats",
    description: "Choose from a curated set of clean, modern templates optimized for hiring managers.",
  },
  {
    title: "Profile IQ Chatbot",
    description: "Let our smart assistant help you build and improve your profile interactively.",
  },
  {
    title: "Comprehensive Section Library",
    description: "Access a library of customizable sections tailored to diverse career paths.",
  },
  {
    title: "ATS-Compliant Downloadable Resumes",
    description: "Customize resumes with formatting integrity while staying ATS-friendly.",
  },
];

const ResumeFeaturesAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#faf0e6] flex flex-col lg:flex-row items-start gap-8 py-16 px-6 lg:px-20">
      {/* Accordion Section */}
      <div className="flex-1 w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => toggle(index)}
            className={`border rounded-lg p-4 mb-4 cursor-pointer transition-all duration-300 ${
              openIndex === index ? "bg-white shadow-md border-orange-500" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <FaChevronDown
                className={`transition-transform duration-200 ${
                  openIndex === index ? "rotate-180 text-orange-500" : "text-gray-400"
                }`}
              />
            </div>
            {openIndex === index && (
              <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Image Section */}
      <div className="flex-1 max-w-xl mx-auto">
        <img
        
          src={resumePreview} 
 // Ensure this exists in /public/images
          alt="Resume Preview"
          className="rounded-xl shadow-lg w-full"
        />
        <p className="text-center text-gray-600 mt-4 italic text-sm">
          “Get started fast with our step-by-step profile generator—no complex forms, just easy-to-follow prompts.”
        </p>
      </div>
    </section>
  );
};

export default ResumeFeaturesAccordion;
