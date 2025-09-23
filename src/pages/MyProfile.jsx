import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "../components/Toolbar";
// import { FiPlus } from "react-icons/fi";
import { useProfile } from "../context/ProfileContext";

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
} from "react-icons/fa";0
import { FiPlus, FiSettings } from "react-icons/fi";
import { BsQuestionCircle, BsChevronDown } from "react-icons/bs";
import {
  HiOutlineFolderOpen,
  HiOutlineShoppingBag,
  HiOutlineCog,
} from "react-icons/hi";
import { GiHearts } from "react-icons/gi";

// Reusable SectionCard for all sections except Education
const SectionCard = ({ title, icon, onAdd, onDelete, darkHeader = false }) => (
  <div className="mb-8 border rounded-lg bg-white shadow-sm">
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
        {icon}
        <span>{title}</span>
        <BsQuestionCircle className="text-sky-600 text-lg cursor-pointer" />
        <BsChevronDown className="text-gray-600 text-lg cursor-pointer" />
        <button
          title="Settings"
          className={`p-2 rounded-full ${
            darkHeader ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
          } hover:bg-gray-500`}
        >
          <FiSettings />
        </button>
        <button
          onClick={onDelete}
          className="bg-red-700 text-white px-3 py-1.5 rounded flex items-center gap-2 ml-2 hover:bg-red-800"
        >
          <FaTrashAlt /> Delete Section
        </button>
      </div>
      <button
        onClick={onAdd}
        className="border px-4 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
      >
        <FiPlus /> Add Instance
      </button>
    </div>
    <div className="flex items-center justify-center py-8 px-4">
      <div className="text-center text-gray-600">
        <div className="text-6xl text-orange-400 mb-3">🧾</div>
        <p className="text-md font-medium">No Instance Found!</p>
        <p className="text-xl font-bold mt-1">
          Get started by adding new instance to this section
        </p>
      </div>
    </div>
  </div>
);

const MyProfile = () => {
  const navigate = useNavigate();
  const {
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

// Added a comment HEllo
// ANother comment

  const handleAdd = (section) => {
    switch (section) {
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
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      <div className="max-w-6xl mx-auto mb-6">
        <Toolbar />
      </div>

      {/* Profile Summary */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow mb-6">
        <div className="border border-orange-300 rounded p-6 relative">
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            <button
              onClick={handleEdit}
              title="Edit"
              className="text-gray-500 hover:text-black"
            >
              ✏️
            </button>
            <button
              onClick={handleAlert}
              title="Alert"
              className="text-gray-500 hover:text-black"
            >
              ⚠️
            </button>
            <button
              onClick={handleCopy}
              title="Copy"
              className="text-gray-500 hover:text-black"
            >
              📋
            </button>
            <button
              onClick={handleDeleteProfile}
              title="Delete"
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
          {copied && (
            <div className="absolute top-2 right-4 text-sm text-green-600 font-medium">
              📋 Copied!
            </div>
          )}

          <div className="pl-10">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-2xl font-bold mb-1 w-full border rounded px-3 py-2"
                  placeholder="Full Name"
                />

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-gray-800 font-medium mb-2 w-full border rounded px-3 py-2"
                  placeholder="Professional Title"
                />

                <textarea
                  rows="5"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="text-sm text-gray-700 w-full border rounded px-3 py-2 mb-2"
                  placeholder="Professional Summary"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm text-gray-700 w-full border rounded px-3 py-2 mb-2"
                  placeholder="Email"
                />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-sm text-gray-700 w-full border rounded px-3 py-2 mb-2"
                  placeholder="Phone Number"
                />

                <input
                  type="text"
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="text-sm text-gray-700 w-full border rounded px-3 py-2 mb-2"
                  placeholder="Address / Location"
                />

                <input
                  type="text"
                  value={yearofExperience}
                  onChange={(e) => setYearofExperience(e.target.value)}
                  className="text-sm text-gray-700 w-full border rounded px-3 py-2 mb-2"
                  placeholder="Years of Experience"
                />
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-950"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="border border-gray-400 px-5 py-2 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-1">{name}</h2>
                <p className="text-gray-800 font-medium mb-2">{title}</p>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {summary}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-8 text-sm text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaEnvelope className="text-green-500" /> {email}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaPhone className="text-green-500" /> {phone}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-500" /> {Location}
                  </span>
                  <span className="flex items-center gap-2">
                    <b>YOE:</b>{" "}
                    <span className="text-gray-800">{yearofExperience}</span>
                  </span>
                </div>

                {/* <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaEnvelope className="text-green-500" />{" "}
                    rahulrajak@gmail.com
                  </span>
                  <span className="flex items-center gap-2">
                  <FaPhone className="text-green-500" /> 8969463558
                  </span>


                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-500" /> Gaya
                  </span>
                  <span className="ml-auto font-semibold text-sm">
                    YOE: <span className="text-gray-800">1 year, 1 month</span>
                  </span>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>

      

      {/* Education Section - Dynamic Rendering -------------------------------------------------------------------------*/}
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-8 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <FaGraduationCap className="text-2xl" />
              <span>Education</span>
            </div>
            <button
              onClick={() => handleAdd("Education")}
              className="border px-4 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
            >
              <FiPlus /> Add Instance
            </button>
          </div>
          <div className="py-8 px-4">
            {educationList.length === 0 ? (
              <div className="text-center text-gray-600">
                <div className="text-6xl text-orange-400 mb-3">🧾</div>
                <p className="text-md font-medium">No Instance Found!</p>
                <p className="text-xl font-bold mt-1">
                  Get started by adding new instance to this section
                </p>
              </div>
            ) : (
              <ul>
                {educationList.map((edu, idx) => (
                  <li key={idx} className="mb-4 border-b pb-4">
                    <div className="font-bold text-lg">
                      {edu.degree}{" "}
                      {edu.specialization && `- ${edu.specialization}`}
                    </div>
                    <div className="text-gray-700">{edu.school}</div>
                    <div className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.endDate || "Present"} |{" "}
                      {edu.location} {edu.remote && "(Remote)"}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {edu.description}
                    </div>
                    {edu.grade && (
                      <div className="text-gray-600 text-sm">
                        Grade: {edu.grade}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Work Experience Section---------------------------------------------------------------- */}
        <div className="mb-8 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <FaBriefcase className="text-2xl" />
              <span>Work Experience</span>
            </div>
            <button
              onClick={() => handleAdd("Work Experience")}
              className="border px-4 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
            >
              <FiPlus /> Add Instance
            </button>
          </div>
          <div className="py-8 px-4">
            {workList.length === 0 ? (
              <div className="text-center text-gray-600">
                <div className="text-6xl text-orange-400 mb-3">🧾</div>
                <p className="text-md font-medium">No Instance Found!</p>
                <p className="text-xl font-bold mt-1">
                  Get started by adding new instance to this section
                </p>
              </div>
            ) : (
              <ul>
                {workList.map((work, idx) => (
                  <li key={idx} className="mb-4 border-b pb-4">
                    <div className="font-bold text-lg">
                      {work.jobTitle} at {work.company}
                    </div>
                    <div className="text-gray-700">
                      {work.companyUrl && (
                        <a
                          href={work.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {work.companyUrl}
                        </a>
                      )}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {work.startDate} -{" "}
                      {work.current ? "Present" : work.endDate} |{" "}
                      {work.location} {work.remote && "(Remote)"}
                    </div>
                    <div className="text-gray-600 text-sm whitespace-pre-line">
                      {work.responsibilities}
                    </div>
                    {work.skills && (
                      <div className="text-gray-600 text-sm mt-2">
                        <b>Skills Learned:</b> {work.skills}
                      </div>
                    )}
                    {work.recognition && (
                      <div className="text-gray-600 text-sm mt-2">
                        <b>Recognition:</b> {work.recognition}
                      </div>
                    )}
                    {work.tools && (
                      <div className="text-gray-600 text-sm mt-2">
                        <b>Tools Used:</b> {work.tools}
                      </div>
                    )}
                    {work.testimonials && (
                      <div className="text-gray-600 text-sm mt-2">
                        <b>Testimonials:</b> {work.testimonials}
                      </div>
                    )}
                    {work.portfolio && (
                      <div className="text-gray-600 text-sm mt-2">
                        <b>Portfolio:</b> {work.portfolio}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/*Learnings Section --------------------------------------------------------------------------------------------*/}
      
        {/* Abilities Section ---------------------------------------------------------------------------------------*/}
        <div className="mb-8 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <span>Learning</span>
            </div>
            <button
              onClick={() => handleAdd("Abilities")}
              className="border px-4 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
            >
              <FiPlus /> Add Instance
            </button>
          </div>
          <div className="py-8 px-4">
            {!abilities || abilities.length === 0 ? (
              <div className="text-center text-gray-600">
                <div className="text-6xl text-orange-400 mb-3">🧾</div>
                <p className="text-md font-medium">No Instance Found!</p>
                <p className="text-xl font-bold mt-1">
                  Get started by adding new instance to this section
                </p>
              </div>
            ) : (
              <ul>
                {abilities.map((skill, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="ml-2 text-gray-600 text-sm">
                      ({skill.level})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Portfolio Section------------------------------------------------------------- */}

        <div className="mb-8 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <span>Project</span>
            </div>
            <button
              onClick={() => handleAdd("Portfolio")}
              className="border px-4 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
            >
              <FiPlus /> Add Project
            </button>
          </div>
          <div className="py-8 px-4">
            {!portfolioList || portfolioList.length === 0 ? (
              <div className="text-center text-gray-600">
                <div className="text-6xl text-blue-400 mb-3">📁</div>
                <p className="text-md font-medium">
                  No Portfolio Projects Found!
                </p>
                <p className="text-xl font-bold mt-1">
                  Get started by adding a new project to this section
                </p>
              </div>
            ) : (
              <ul>
                {portfolioList.map((item, idx) => (
                  <li key={idx} className="mb-4 border-b pb-4">
                    <div className="font-bold text-lg">{item.projectType}</div>

                    {item.projectName && (
                      <div className="text-gray-700 text-sm mt-1">
                        <strong>Project Name:</strong> {item.projectName}
                      </div>
                    )}

                    {item.summary && (
                      <div className="text-gray-700 text-sm mt-1">
                        <strong>Summary:</strong> {item.summary}
                      </div>
                    )}

                    {item.details && (
                      <div className="text-gray-700 text-sm mt-1 whitespace-pre-line">
                        <strong>Details:</strong> {item.details}
                      </div>
                    )}



                    {item.clientName && (
                      <div className="text-gray-700 text-sm mt-1">
                        <strong>Client:</strong> {item.clientName}
                      </div>
                    )}

                    {item.multimediaUrl && (
                      <div className="text-blue-700 text-sm mt-1">
                        <strong>Multimedia:</strong>{" "}
                        <a
                          href={item.multimediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.multimediaUrl}
                        </a>
                      </div>
                    )}

                    {(item.collaboratorName || item.collaboratorUrl) && (
                      <div className="text-gray-700 text-sm mt-1">
                        <strong>Collaborator:</strong> {item.collaboratorName}
                        {item.collaboratorUrl && (
                          <a
                            href={item.collaboratorUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 ml-1"
                          >
                            (Profile)
                          </a>
                        )}
                      </div>
                    )}

                    {item.keyLinks && (
                      <div className="text-blue-700 text-sm mt-1">
                        <strong>Key Links:</strong>{" "}
                        <a
                          href={item.keyLinks}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.keyLinks}
                        </a>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

        {/* Recognition Section ----------------------------------------------------------------------------------------*/}
        <div className="mb-8 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <span>Recognition</span>
            </div>
            <button
              onClick={() => handleAdd("Recognition")}
              className="border px-4 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
            >
              <FiPlus /> Add Instance
            </button>
          </div>
          <div className="py-8 px-4">
            {!recognitions || recognitions.length === 0 ? (
              <div className="text-center text-gray-600">
                <div className="text-6xl text-orange-400 mb-3">🏆</div>
                <p className="text-md font-medium">No Instance Found!</p>
                <p className="text-xl font-bold mt-1">
                  Get started by adding new instance to this section
                </p>
              </div>
            ) : (
              <ul>
                {recognitions.map((item, idx) => (
                  <li key={idx} className="mb-4 border-b pb-4">
                    <div className="font-bold text-lg">
                      {item.type}: {item.awardName}
                    </div>
                    <div className="text-gray-700">{item.issueAuthority}</div>
                    <div className="text-gray-500 text-sm">
                      {item.issueDate}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {item.description}
                    </div>
                    {item.referenceLink && (
                      <div className="text-blue-700 text-sm">
                        <a
                          href={item.referenceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.referenceLink}
                        </a>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Intellectual Property Section------------------------------------------------------------- */}
        <div className="mb-8 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <span>Intellectual Property</span>
            </div>
            <button
              onClick={() => handleAdd("Intellectual Property")}
              className="border px-4 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
            >
              <FiPlus /> Add Instance
            </button>
          </div>
          <div className="py-8 px-4">
            {!intellectualList || intellectualList.length === 0 ? (
              <div className="text-center text-gray-600">
                <div className="text-6xl text-orange-400 mb-3">💡</div>
                <p className="text-md font-medium">No Instance Found!</p>
                <p className="text-xl font-bold mt-1">
                  Get started by adding new instance to this section
                </p>
              </div>
            ) : (
              <ul>
                {intellectualList.map((item, idx) => (
                  <li key={idx} className="mb-4 border-b pb-4">
                    <div className="font-bold text-lg">
                      {item.recognitionType}: {item.title}
                    </div>
                    {item.url && (
                      <div className="text-blue-700 text-sm">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.url}
                        </a>
                      </div>
                    )}
                    {item.recognitionType === "Patent" && (
                      <>
                        <div className="text-gray-700 text-sm">
                          Status: {item.status}
                        </div>
                        <div className="text-gray-700 text-sm">
                          Application #: {item.applicationNumber}
                        </div>
                        <div className="text-gray-700 text-sm">
                          Issue Date: {item.issueDate}
                        </div>
                      </>
                    )}
                    <div className="text-gray-700 text-sm">
                      {item.recognitionType === "Patent"
                        ? "Inventors"
                        : "Authors"}
                      :
                      {item.inventors &&
                        item.inventors.map((inv, i) => (
                          <span key={i} className="ml-2">
                            {inv.name}
                            {inv.url && (
                              <a
                                href={inv.url}
                                className="text-blue-600 ml-1"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                (Profile)
                              </a>
                            )}
                            {i < item.inventors.length - 1 ? "," : ""}
                          </span>
                        ))}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {item.description}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        </div>

        {/* Offerings Section --------------------------------------------------------------------- */}
        <div className="mb-8 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <HiOutlineShoppingBag className="text-2xl" />
              <span>Offerings</span>
            </div>
            <button
              onClick={() => handleAdd("Offerings")}
              className="border px-4 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
            >
              <FiPlus /> Add Offering
            </button>
          </div>
          <div className="py-8 px-4">
            {!Offerings || Offerings.length === 0 ? (
              <div className="text-center text-gray-600">
                <div className="text-6xl text-orange-400 mb-3">🛒</div>
                <p className="text-md font-medium">No Offerings Found!</p>
                <p className="text-xl font-bold mt-1">
                  Get started by adding new offerings to this section
                </p>
              </div>
            ) : (
              <ul>
                {Offerings.map((item, idx) => (
                  <li key={idx} className="mb-4 border-b pb-4">
                    <div className="font-bold text-lg">{item.title}</div>
                    <div className="text-gray-700">{item.description}</div>
                    <div className="text-gray-500 text-sm">
                      {item.startDate} - {item.endDate || "Present"} |{" "}
                      {item.location} {item.remote && "(Remote)"}
                    </div>
                    {item.url && (
                      <div className="text-blue-700 text-sm">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.url}
                        </a>
                      </div>
                    )}
                    {item.portfolioItems && (
                      <div className="text-gray-600 text-sm">
                        Portfolio: {item.portfolioItems}
                      </div>
                    )}
                    {/* Optionally show certificate name */}
                    {item.certificate && (
                      <div className="text-gray-600 text-sm">
                        Certificate: {item.certificate.name}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Preferences Section --------------------------------------------------------------------- */}
        <div className="mb-8 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <HiOutlineCog className="text-2xl" />
              <span>Preferences</span>
            </div>
            <button
              onClick={() => handleAdd("Preferences")}
              className="border px-4 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
            >
              <FiPlus /> Edit Preferences
            </button>
          </div>
          <div className="py-8 px-4">
            {!Preferences || Object.keys(Preferences).length === 0 ? (
              <div className="text-center text-gray-600">
                <div className="text-6xl text-orange-400 mb-3">⚙️</div>
                <p className="text-md font-medium">No Preferences Found!</p>
                <p className="text-xl font-bold mt-1">
                  Get started by adding your preferences to this section
                </p>
              </div>
            ) : (
              <ul>
                <li className="mb-2">
                  <b>Locations:</b>{" "}
                  {Array.isArray(Preferences.locations)
                    ? Preferences.locations.join(", ")
                    : Preferences.locations}
                </li>
                <li className="mb-2">
                  <b>Working Time:</b> {Preferences.startTime} -{" "}
                  {Preferences.endTime} ({Preferences.timezone})
                </li>
                <li className="mb-2">
                  <b>Work Mode:</b> {Preferences.workMode}
                </li>
                <li className="mb-2">
                  <b>Employment Type:</b> {Preferences.employmentType}
                </li>
                <li className="mb-2">
                  <b>Industries:</b>{" "}
                  {Array.isArray(Preferences.industries)
                    ? Preferences.industries.join(", ")
                    : Preferences.industries}
                </li>
                <li className="mb-2">
                  <b>Expected CTC:</b> {Preferences.currency}{" "}
                  {Preferences.income} / {Preferences.frequency}
                </li>
                <li className="mb-2">
                  <b>Job Roles:</b>{" "}
                  {Array.isArray(Preferences.jobRoles)
                    ? Preferences.jobRoles.join(", ")
                    : Preferences.jobRoles}
                </li>
                <li className="mb-2">
                  <b>Notice Period:</b> {Preferences.noticePeriod}
                </li>
                <li className="mb-2">
                  <b>Willingness to Travel:</b> {Preferences.travel}
                </li>
                <li className="mb-2">
                  <b>Willingness to Relocate:</b> {Preferences.relocate}
                </li>
                <li className="mb-2">
                  <b>Company Size:</b> {Preferences.companySize}
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Interest and Activities Section --------------------------------------------------------------------- */}
        <div className="mb-8 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <GiHearts className="text-2xl" />
              <span>Interest and Activities</span>
            </div>
            <button
              onClick={() => handleAdd("Interest and Activities")}
              className="border px-4 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-700"
            >
              <FiPlus /> Add Interest/Activity
            </button>
          </div>
          <div className="py-8 px-4">
            {!InterestActivities || InterestActivities.length === 0 ? (
              <div className="text-center text-gray-600">
                <div className="text-6xl text-orange-400 mb-3">🎭</div>
                <p className="text-md font-medium">
                  No Interests/Activities Found!
                </p>
                <p className="text-xl font-bold mt-1">
                  Get started by adding new interests or activities to this
                  section
                </p>
              </div>
            ) : (
              <ul>
                {InterestActivities.map((item, idx) => (
                  <li key={idx} className="mb-4 border-b pb-4">
                    <div className="font-bold text-lg">{item.activityType}</div>
                    <div className="text-gray-700">{item.description}</div>
                    <div className="text-gray-500 text-sm">
                      {item.startDate} - {item.endDate || "Present"} |{" "}
                      {item.location} {item.remote && "(Remote)"}
                    </div>
                    {item.url && (
                      <div className="text-blue-700 text-sm">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.url}
                        </a>
                      </div>
                    )}
                    {item.portfolioItems && (
                      <div className="text-gray-600 text-sm">
                        Portfolio: {item.portfolioItems}
                      </div>
                    )}
                    {/* Optionally show certificate name */}
                    {item.certificate && (
                      <div className="text-gray-600 text-sm">
                        Certificate: {item.certificate.name}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
