// src/components/templates/TwoColumnTemplate.jsx
import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLink } from "react-icons/fa";

const TwoColumnTemplate = ({ data }) => {
  const { Preferences, educationList, workList, abilities, portfolioList } = data;
  return (
    <div className="p-8 bg-gray-50 text-gray-800 font-sans max-w-4xl mx-auto shadow-xl">
      <header className="mb-8 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">{Preferences?.name || "RAHUL RAJAK"}</h1>
        <p className="text-md text-gray-600">{Preferences?.title || "Experienced Professional"}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          {Preferences?.email && <a href={`mailto:${Preferences.email}`} className="flex items-center gap-1 hover:underline"><FaEnvelope />{Preferences.email}</a>}
          {Preferences?.mobile && <a href={`tel:${Preferences.mobile}`} className="flex items-center gap-1 hover:underline"><FaPhone />{Preferences.mobile}</a>}
          {Preferences?.address && <div className="flex items-center gap-1"><FaMapMarkerAlt />{Preferences.address}</div>}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-3 border-b pb-1">Experience</h2>
          {workList?.length > 0 && (
            <div className="space-y-4 text-sm">
              {workList.map((work, index) => (
                <div key={index}>
                  <h3 className="font-bold">{work.jobTitle} at {work.company}</h3>
                  <p className="text-gray-600">{work.startDate} - {work.endDate}</p>
                  <p className="mt-1 whitespace-pre-wrap">{work.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-3 border-b pb-1">Skills</h2>
          {abilities?.length > 0 && (
            <ul className="text-sm space-y-1 mb-6">
              {abilities.map((skill, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{skill.name}</span>
                  <span className="text-xs text-gray-500">({skill.level})</span>
                </li>
              ))}
            </ul>
          )}

          <h2 className="text-xl font-bold mb-3 border-b pb-1">Education</h2>
          {educationList?.length > 0 && (
            <div className="space-y-4 text-sm">
              {educationList.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold">{edu.degree} in {edu.specialization}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TwoColumnTemplate;