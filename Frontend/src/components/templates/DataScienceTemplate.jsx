// src/components/templates/DataScienceTemplate.jsx
import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLink } from "react-icons/fa";

const DataScienceTemplate = ({ data }) => {
  const { Preferences, educationList, workList, abilities, portfolioList } = data;
  return (
    <div className="p-10 bg-white text-gray-800 font-sans max-w-4xl mx-auto shadow-xl">
      <header className="mb-6 border-b-4 border-teal-500 pb-4">
        <h1 className="text-4xl font-extrabold text-teal-600">{Preferences?.name || "RAHUL RAJAK"}</h1>
        <p className="text-xl text-gray-600">{Preferences?.title || "Data Scientist"}</p>
        <div className="flex justify-end gap-x-4 text-sm text-gray-500 mt-2">
          {Preferences?.email && <a href={`mailto:${Preferences.email}`} className="flex items-center gap-1 hover:text-teal-500"><FaEnvelope />{Preferences.email}</a>}
          {Preferences?.mobile && <a href={`tel:${Preferences.mobile}`} className="flex items-center gap-1 hover:text-teal-500"><FaPhone />{Preferences.mobile}</a>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-3 text-teal-600 border-b-2 pb-1">Skills</h2>
          {abilities?.length > 0 && (
            <ul className="text-sm space-y-1 mb-6">
              {abilities.map((skill, index) => (
                <li key={index}>{skill.name} ({skill.level})</li>
              ))}
            </ul>
          )}

          <h2 className="text-xl font-bold mb-3 text-teal-600 border-b-2 pb-1">Education</h2>
          {educationList?.length > 0 && (
            <ul className="text-sm space-y-4">
              {educationList.map((edu, index) => (
                <li key={index}>
                  <h3 className="font-bold">{edu.degree} in {edu.specialization}</h3>
                  <p>{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-3 text-teal-600 border-b-2 pb-1">Summary</h2>
          <p className="text-sm mb-6">{Preferences?.aboutMe || "Highly analytical data scientist with experience in machine learning and statistical modeling..."}</p>

          <h2 className="text-xl font-bold mb-3 text-teal-600 border-b-2 pb-1">Work Experience</h2>
          {workList?.length > 0 && (
            <div className="space-y-6 mb-6">
              {workList.map((work, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold">{work.jobTitle} at {work.company}</h3>
                  <p className="text-sm text-gray-600">{work.startDate} - {work.endDate}</p>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{work.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DataScienceTemplate;