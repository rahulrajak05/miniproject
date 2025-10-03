// src/components/templates/ModernTemplate.jsx
import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ModernTemplate = ({ data }) => {
  const { Preferences, educationList, workList, abilities, portfolioList } = data;

  // Destructure with fallbacks
  const { name, title, email, mobile, address } = Preferences || {};

  // Construct a dynamic profile summary
  const profileSummary = `${name || "Mr RAHUL RAJAK"} is an aspiring ${title || "Software Developer"} skilled in ${
    abilities?.[0]?.name || "JavaScript"
  }, with a degree in ${educationList?.[0]?.degree || "Computer Science"} from ${
    educationList?.[0]?.school || "a reputed university"
  }.`;

  return (
    <div className="min-h-screen p-10 bg-white text-gray-800 font-sans max-w-3xl mx-auto shadow-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-1">{name || "Mr RAHUL RAJAK"}</h1>
      <p className="italic text-lg text-gray-600 mb-3">{title || "Aspiring Full Stack Developer"}</p>
      
      {/* Contact Info */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 mb-6 border-b pb-4">
        {email && <div className="flex items-center gap-2"><FaEnvelope className="text-blue-600" /><a href={`mailto:${email}`} className="hover:underline">{email}</a></div>}
        {mobile && <div className="flex items-center gap-2"><FaPhone className="text-green-600" /><a href={`tel:${mobile}`} className="hover:underline">{mobile}</a></div>}
        {address && <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-600" /><span>{address}</span></div>}
      </div>

      {/* Profile Summary */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Profile Summary</h2>
        <p className="text-base leading-relaxed text-gray-700">{profileSummary}</p>
      </section>

      {/* ... other sections (Skills, Education, etc.) would go here ... */}
    </div>
  );
};

export default ModernTemplate;