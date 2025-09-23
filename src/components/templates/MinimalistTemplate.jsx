// src/components/templates/MinimalistTemplate.jsx
import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const MinimalistTemplate = ({ data }) => {
  const { Preferences, abilities, educationList, workList } = data;

  return (
    <div className="p-8 bg-gray-50 text-gray-800 font-sans max-w-3xl mx-auto shadow-xl flex">
      {/* Left Column (Contact & Skills) */}
      <div className="w-1/3 pr-6 border-r border-gray-300">
        <h2 className="text-2xl font-bold mb-4">{Preferences?.name || "Mr RAHUL RAJAK"}</h2>
        <p className="text-sm text-gray-600 mb-4">{Preferences?.title || "Aspiring Developer"}</p>
        
        {/* Contact Info */}
        <div className="space-y-2 text-sm mb-6">
          {Preferences?.email && <div className="flex items-center gap-2"><FaEnvelope /><span>{Preferences.email}</span></div>}
          {Preferences?.mobile && <div className="flex items-center gap-2"><FaPhone /><span>{Preferences.mobile}</span></div>}
        </div>

        {/* Skills */}
        {abilities?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-2 border-b-2 border-gray-300 pb-1">Skills</h3>
            <ul className="text-sm space-y-1">
              {abilities.map((skill, index) => (
                <li key={index}>{skill.name} ({skill.level})</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column (Experience & Education) */}
      <div className="w-2/3 pl-6">
        {/* Profile Summary */}
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">Profile</h3>
          <p className="text-sm">{Preferences?.aboutMe || "A highly motivated individual with a passion for web development."}</p>
        </section>

        {/* Work Experience */}
        {workList?.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">Experience</h3>
            {/* ... map through workList here ... */}
          </section>
        )}
        
        {/* Education */}
        {educationList?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">Education</h3>
            {/* ... map through educationList here ... */}
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalistTemplate;