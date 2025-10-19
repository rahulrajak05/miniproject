import React from "react";
import { useProfile } from "../context/ProfileContext";

const ResumePreview = () => {
  const {
    informationList,
    educationList,
    workList,
    abilities,
    recognitions,
    intellectualList,
    portfolioList,
    Offerings,
    Preferences,
    InterestActivities,
  } = useProfile();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md">
        {/* Personal Info */}
        {informationList && informationList.length > 0 && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              {informationList[0].fullName}
            </h1>
            <p className="text-gray-700">{informationList[0].email} | {informationList[0].phone}</p>
            <p className="text-gray-700">{informationList[0].address}</p>
          </div>
        )}

        {/* Summary */}
        {informationList && informationList[0]?.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Summary</h2>
            <p className="text-gray-700 whitespace-pre-line">{informationList[0].summary}</p>
          </div>
        )}

        {/* Education */}
        {educationList && educationList.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Education</h2>
            <ul className="space-y-2">
              {educationList.map((edu, idx) => (
                <li key={idx}>
                  <strong>{edu.degree} {edu.specialization && `- ${edu.specialization}`}</strong>, {edu.school} ({edu.startDate} - {edu.endDate || "Present"})
                  <p className="text-gray-700">{edu.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Work Experience */}
        {workList && workList.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Work Experience</h2>
            <ul className="space-y-2">
              {workList.map((work, idx) => (
                <li key={idx}>
                  <strong>{work.jobTitle}</strong> at {work.company} ({work.startDate} - {work.current ? "Present" : work.endDate})
                  <p className="text-gray-700 whitespace-pre-line">{work.responsibilities}</p>
                  {work.skills && <p>Skills: {work.skills}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Abilities */}
        {abilities && abilities.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Abilities</h2>
            <ul className="flex flex-wrap gap-4">
              {abilities.map((skill, idx) => (
                <li key={idx} className="bg-gray-200 px-2 py-1 rounded">
                  {skill.name} ({skill.level})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects / Portfolio */}
        {portfolioList && portfolioList.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Projects</h2>
            {portfolioList.map((item, idx) => (
              <div key={idx} className="mb-2">
                <strong>{item.projectType}</strong> - {item.projectName}
                <p>{item.summary}</p>
                {item.details && <p className="text-gray-700 whitespace-pre-line">{item.details}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Recognition */}
        {recognitions && recognitions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Recognition</h2>
            <ul className="space-y-2">
              {recognitions.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.type}</strong>: {item.awardName} ({item.issueDate})
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Intellectual Property */}
        {intellectualList && intellectualList.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Intellectual Property</h2>
            {intellectualList.map((item, idx) => (
              <div key={idx} className="mb-2">
                <strong>{item.recognitionType}</strong>: {item.title}
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Offerings */}
        {Offerings && Offerings.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Offerings</h2>
            {Offerings.map((item, idx) => (
              <div key={idx} className="mb-2">
                <strong>{item.title}</strong>: {item.description}
              </div>
            ))}
          </div>
        )}

        {/* Preferences */}
        {Preferences && Object.keys(Preferences).length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Preferences</h2>
            <ul className="space-y-1">
              <li><strong>Locations:</strong> {Array.isArray(Preferences.locations) ? Preferences.locations.join(", ") : Preferences.locations}</li>
              <li><strong>Work Mode:</strong> {Preferences.workMode}</li>
              <li><strong>Job Roles:</strong> {Array.isArray(Preferences.jobRoles) ? Preferences.jobRoles.join(", ") : Preferences.jobRoles}</li>
            </ul>
          </div>
        )}

        {/* Interests */}
        {InterestActivities && InterestActivities.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Interests & Activities</h2>
            <ul className="space-y-1">
              {InterestActivities.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.activityType}</strong>: {item.description}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResumePreview;
