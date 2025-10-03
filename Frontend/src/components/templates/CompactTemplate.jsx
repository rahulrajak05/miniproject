// src/components/templates/CompactTemplate.jsx
import React from "react";
import { FaEnvelope, FaPhone, FaLink } from "react-icons/fa";

const CompactTemplate = ({ data }) => {
  const { Preferences, educationList, workList, abilities, portfolioList } = data;

  return (
    <div className="p-6 bg-white text-gray-800 font-sans text-sm max-w-4xl mx-auto border-t-4 border-gray-900 shadow-md">
      {/* Header & Contact */}
      <header className="flex justify-between items-center mb-4 pb-2 border-b">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{Preferences?.name || "Mr. RAHUL RAJAK"}</h1>
          <p className="text-lg text-gray-600">{Preferences?.title || "Software Engineer"}</p>
        </div>
        <div className="text-right text-xs space-y-1">
          {Preferences?.email && (
            <a href={`mailto:${Preferences.email}`} className="flex items-center justify-end gap-1 hover:underline">
              <FaEnvelope />{Preferences.email}
            </a>
          )}
          {Preferences?.mobile && (
            <a href={`tel:${Preferences.mobile}`} className="flex items-center justify-end gap-1 hover:underline">
              <FaPhone />{Preferences.mobile}
            </a>
          )}
          {Preferences?.linkedIn && (
            <a href={Preferences.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-1 hover:underline">
              <FaLink />LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-4">
        <h2 className="text-base font-bold text-gray-700 pb-1 border-b mb-2">Summary</h2>
        <p className="leading-snug">{Preferences?.aboutMe || "A highly skilled and motivated software engineer with 5+ years of experience in full-stack development..."}</p>
      </section>

      {/* Skills */}
      {abilities?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-bold text-gray-700 pb-1 border-b mb-2">Skills</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-xs">
            {abilities.map((skill, index) => (
              <li key={index}>
                <span className="font-medium text-gray-900">{skill.name}:</span> {skill.level}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Work Experience */}
      {workList?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-bold text-gray-700 pb-1 border-b mb-2">Experience</h2>
          {workList.map((work, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <div className="flex justify-between items-start">
                <h3 className="font-bold">{work.jobTitle} at {work.company}</h3>
                <span className="text-xs text-gray-500">{work.startDate} - {work.endDate}</span>
              </div>
              {work.description && <p className="text-xs mt-1 whitespace-pre-wrap">{work.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {educationList?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-bold text-gray-700 pb-1 border-b mb-2">Education</h2>
          {educationList.map((edu, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <h3 className="font-bold">{edu.degree} in {edu.specialization}</h3>
              <p className="text-xs text-gray-600">{edu.school} - {edu.startDate} to {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {portfolioList?.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-gray-700 pb-1 border-b mb-2">Projects</h2>
          {portfolioList.map((project, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <h3 className="font-bold">{project.projectName}</h3>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Technologies:</span> {project.technologiesUsed}
              </p>
              {project.projectLink && (
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default CompactTemplate;