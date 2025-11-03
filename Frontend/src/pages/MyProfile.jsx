import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import { useProfile } from "../context/ProfileContext";
import Sidebar from "../components/Sidebar";

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaPhone,
  FaBookOpen,
  FaLightbulb,
  FaTrashAlt,
  FaRegSave,
} from "react-icons/fa";
import { FiPlus, FiSettings, FiArrowLeft } from "react-icons/fi";
import { BsQuestionCircle, BsChevronDown } from "react-icons/bs";
import {
  HiOutlineFolderOpen,
  HiOutlineShoppingBag,
  HiOutlineCog,
} from "react-icons/hi";
import { GiHearts } from "react-icons/gi";

const MyProfile = () => {
  const navigate = useNavigate();
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

  const [isDeleted, setIsDeleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Mr RAHUL RAJAK");
  const [title, setTitle] = useState(
    "Aspiring Full Stack Developer with a Passion for Agri-Tech Innovations"
  );
  const [summary, setSummary] = useState(
    `Machine Learning Engineer with a year of experience in developing predictive models at Amazon,
enhancing supply chain efficiency. Proven track record in implementing data-driven solutions at an
agri-tech startup, optimizing crop yields. Eager to leverage full stack development skills to drive
impactful innovations in the agriculture sector.`
  );

  const [email, setEmail] = useState("rajakrahul@gmail.com");
  const [phone, setPhone] = useState("8969463558");
  const [Location, setLocation] = useState("Gaya");
  const [yearofExperience, setYearofExperience] = useState("1 year, 1month");

  const handleEdit = () => setIsEditing(true);
  const handleSaveEdit = () => setIsEditing(false);
  const handleCancelEdit = () => setIsEditing(false);
  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setIsDeleted(true);
    }
  };

  const handleCopy = () => {
    const profileText =
      `${name}\n${title}\n\n${summary}\n\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Location: ${Location}\n` +
      `Experience: ${yearofExperience}`;
    navigator.clipboard.writeText(profileText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const handleAlert = () =>
    alert("This could be used to show a flag, feedback, or report action.");

  const handleAdd = (section) => {
    switch (section) {
      case "Information":
        navigate("/information");
        break;
      case "Education":
        navigate("/educationsetup1");
        break;
      case "Work Experience":
        navigate("/workexperiencestep3");
        break;
      case "Abilities":
        navigate("/abilities-edit");
        break;
      case "Portfolio":
        navigate("/portfolio-form");
        break;
      case "Recognition":
        navigate("/award-form");
        break;
      case "Intellectual Property":
        navigate("/intellectual-form");
        break;
      case "Offerings":
        navigate("/editoffering-form");
        break;
      case "Preferences":
        navigate("/editpreferences-form");
        break;
      case "Interest and Activities":
        navigate("/edithobbies-form");
        break;
      default:
        alert(`Add Instance to ${section}`);
    }
  };
  
  const handleDelete = (section) => {
    alert(`Delete ${section} Section`);
  };

  if (isDeleted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Fixed Sidebar */}
      <Sidebar />
      
  <div className="ml-0 md:ml-32 lg:ml-40 p-6">
        {/* Page Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your professional information and career details</p>
          </div>
        </div>

        {/* Grid Layout for Sections */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Information Section */}
          <div className="h-[420px] flex flex-col border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaEnvelope className="text-blue-600 text-xl" />
                </div>
                <span>Information</span>
              </div>
              <button
                onClick={() => handleAdd("Information")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <FiPlus /> Add Instance
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {(!informationList || informationList.length === 0) ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="text-5xl mb-4">📋</div>
                  <p className="text-lg font-medium mb-2">No Information Found</p>
                  <p className="text-sm">Get started by adding your personal details</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {informationList.map((info, index) => (
                    <li key={index} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="font-bold text-lg text-gray-900 mb-2">{info.fullName || "-"}</div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-700 flex items-center gap-2">
                          <FaEnvelope className="text-gray-400" />
                          {info.email || "-"}
                        </div>
                        <div className="text-gray-700 flex items-center gap-2">
                          <FaPhone className="text-gray-400" />
                          {info.phone || "-"}
                        </div>
                        <div className="text-gray-700 flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" />
                          {info.address || "-"}
                        </div>
                      </div>
                      {info.socialLinks && (
                        <div className="mt-3 flex gap-3">
                          {Object.entries(info.socialLinks).map(([key, link]) =>
                            link ? (
                              <a
                                key={key}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
                              >
                                {key}
                              </a>
                            ) : null
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="h-[420px] flex flex-col border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaGraduationCap className="text-blue-600 text-xl" />
                </div>
                <span>Education</span>
              </div>
              <button
                onClick={() => handleAdd("Education")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <FiPlus /> Add Instance
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {educationList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="text-5xl mb-4">🎓</div>
                  <p className="text-lg font-medium mb-2">No Education Found</p>
                  <p className="text-sm">Add your educational background</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {educationList.map((edu, idx) => (
                    <li key={idx} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="font-bold text-lg text-gray-900">
                        {edu.degree} {edu.specialization && `- ${edu.specialization}`}
                      </div>
                      <div className="text-gray-700 font-medium">{edu.school}</div>
                      <div className="text-gray-500 text-sm mt-1">
                        {edu.startDate} - {edu.endDate || "Present"} | {edu.location} {edu.remote && "(Remote)"}
                      </div>
                      {edu.description && (
                        <div className="text-gray-600 text-sm mt-2">{edu.description}</div>
                      )}
                      {edu.grade && (
                        <div className="text-gray-600 text-sm mt-1">
                          <span className="font-medium">Grade:</span> {edu.grade}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="h-[420px] flex flex-col border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaBriefcase className="text-blue-600 text-xl" />
                </div>
                <span>Work Experience</span>
              </div>
              <button
                onClick={() => handleAdd("Work Experience")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <FiPlus /> Add Instance
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {workList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="text-5xl mb-4">💼</div>
                  <p className="text-lg font-medium mb-2">No Work Experience</p>
                  <p className="text-sm">Add your professional experience</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {workList.map((work, idx) => (
                    <li key={idx} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="font-bold text-lg text-gray-900">
                        {work.jobTitle} at {work.company}
                      </div>
                      <div className="text-gray-500 text-sm mt-1">
                        {work.startDate} - {work.current ? "Present" : work.endDate} | {work.location} {work.remote && "(Remote)"}
                      </div>
                      {work.responsibilities && (
                        <div className="text-gray-600 text-sm mt-2 whitespace-pre-line">
                          {work.responsibilities}
                        </div>
                      )}
                      {work.skills && (
                        <div className="text-gray-600 text-sm mt-2">
                          <b>Skills:</b> {work.skills}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Learning Section */}
          <div className="h-[420px] flex flex-col border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaBookOpen className="text-blue-600 text-xl" />
                </div>
                <span>Learning</span>
              </div>
              <button
                onClick={() => handleAdd("Abilities")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <FiPlus /> Add Instance
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {!abilities || abilities.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="text-5xl mb-4">🧠</div>
                  <p className="text-lg font-medium mb-2">No Skills Found</p>
                  <p className="text-sm">Add your skills and abilities</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {abilities.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <span className="font-semibold text-gray-900">{skill.name}</span>
                      <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="h-[420px] flex flex-col border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HiOutlineFolderOpen className="text-blue-600 text-xl" />
                </div>
                <span>Projects</span>
              </div>
              <button
                onClick={() => handleAdd("Portfolio")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <FiPlus /> Add Project
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {!portfolioList || portfolioList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="text-5xl mb-4">📁</div>
                  <p className="text-lg font-medium mb-2">No Projects Found</p>
                  <p className="text-sm">Showcase your work and projects</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {portfolioList.map((item, idx) => (
                    <li key={idx} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="font-bold text-lg text-gray-900">{item.projectType}</div>
                      {item.projectName && (
                        <div className="text-gray-700 font-medium mt-1">{item.projectName}</div>
                      )}
                      {item.summary && (
                        <div className="text-gray-600 text-sm mt-2">{item.summary}</div>
                      )}
                      {item.keyLinks && (
                        <div className="text-blue-600 text-sm mt-2">
                          <a
                            href={item.keyLinks}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            View Project
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Recognition Section */}
          <div className="h-[420px] flex flex-col border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-xl">🏆</span>
                </div>
                <span>Recognition</span>
              </div>
              <button
                onClick={() => handleAdd("Recognition")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <FiPlus /> Add Instance
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {!recognitions || recognitions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="text-5xl mb-4">🏆</div>
                  <p className="text-lg font-medium mb-2">No Awards Found</p>
                  <p className="text-sm">Add your achievements and awards</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {recognitions.map((item, idx) => (
                    <li key={idx} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="font-bold text-lg text-gray-900">
                        {item.type}: {item.awardName}
                      </div>
                      <div className="text-gray-700 font-medium">{item.issueAuthority}</div>
                      <div className="text-gray-500 text-sm">{item.issueDate}</div>
                      {item.description && (
                        <div className="text-gray-600 text-sm mt-2">{item.description}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Intellectual Property Section */}
          <div className="h-[420px] flex flex-col border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaLightbulb className="text-blue-600 text-xl" />
                </div>
                <span>Intellectual Property</span>
              </div>
              <button
                onClick={() => handleAdd("Intellectual Property")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <FiPlus /> Add Instance
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {!intellectualList || intellectualList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="text-5xl mb-4">💡</div>
                  <p className="text-lg font-medium mb-2">No IP Found</p>
                  <p className="text-sm">Add your intellectual property</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {intellectualList.map((item, idx) => (
                    <li key={idx} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="font-bold text-lg text-gray-900">
                        {item.recognitionType}: {item.title}
                      </div>
                      {item.description && (
                        <div className="text-gray-600 text-sm mt-2">{item.description}</div>
                      )}
                      {item.url && (
                        <div className="text-blue-600 text-sm mt-2">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            View Details
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Offerings Section */}
          <div className="h-[420px] flex flex-col border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HiOutlineShoppingBag className="text-blue-600 text-xl" />
                </div>
                <span>Offerings</span>
              </div>
              <button
                onClick={() => handleAdd("Offerings")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <FiPlus /> Add Offering
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {!Offerings || Offerings.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-lg font-medium mb-2">No Offerings Found</p>
                  <p className="text-sm">Add your services and offerings</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {Offerings.map((item, idx) => (
                    <li key={idx} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="font-bold text-lg text-gray-900">{item.title}</div>
                      <div className="text-gray-700 text-sm mt-1">{item.description}</div>
                      <div className="text-gray-500 text-sm mt-1">
                        {item.startDate} - {item.endDate || "Present"} | {item.location} {item.remote && "(Remote)"}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Preferences Section */}
          <div className="h-[420px] flex flex-col border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HiOutlineCog className="text-blue-600 text-xl" />
                </div>
                <span>Preferences</span>
              </div>
              <button
                onClick={() => handleAdd("Preferences")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <FiPlus /> Edit Preferences
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {!Preferences || Object.keys(Preferences).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="text-5xl mb-4">⚙️</div>
                  <p className="text-lg font-medium mb-2">No Preferences Found</p>
                  <p className="text-sm">Set your job preferences</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">Locations</div>
                    <div className="text-sm text-gray-700">
                      {Array.isArray(Preferences.locations)
                        ? Preferences.locations.join(", ")
                        : Preferences.locations}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">Work Mode</div>
                    <div className="text-sm text-gray-700">{Preferences.workMode}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">Employment Type</div>
                    <div className="text-sm text-gray-700">{Preferences.employmentType}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">Expected CTC</div>
                    <div className="text-sm text-gray-700">
                      {Preferences.currency} {Preferences.income} / {Preferences.frequency}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interest and Activities Section */}
          <div className="h-[420px] flex flex-col border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GiHearts className="text-blue-600 text-xl" />
                </div>
                <span>Interest & Activities</span>
              </div>
              <button
                onClick={() => handleAdd("Interest and Activities")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <FiPlus /> Add Interest/Activity
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {!InterestActivities || InterestActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="text-5xl mb-4">🎭</div>
                  <p className="text-lg font-medium mb-2">No Activities Found</p>
                  <p className="text-sm">Add your interests and activities</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {InterestActivities.map((item, idx) => (
                    <li key={idx} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="font-bold text-lg text-gray-900">{item.activityType}</div>
                      <div className="text-gray-700 text-sm mt-1">{item.description}</div>
                      <div className="text-gray-500 text-sm mt-1">
                        {item.startDate} - {item.endDate || "Present"} | {item.location} {item.remote && "(Remote)"}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Preview Button */}
        <div className="max-w-6xl mx-auto mt-8 text-center">
          <button
            onClick={() => navigate("/resume-preview")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Preview Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;