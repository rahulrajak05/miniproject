import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useProfile } from "../context/ProfileContext";

const EducationSetup1 = () => {
  const [activeTab, setActiveTab] = useState("Portfolio");
  const [selectedLevel, setSelectedLevel] = useState(" ");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [school, setSchool] = useState("");
  const [url, setUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { addEducation } = useProfile();

  const handleSave = () => {
    addEducation({
      degree,
      specialization,
      school,
      url,
      startDate,
      endDate,
      grade,
      location,
      remote,
      description,
      level: selectedLevel,
    });
    navigate("/myprofile");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-md mt-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-black">←</button>
      <h1 className="text-2xl font-bold mb-1">Edit Education - {selectedLevel}</h1>
      <p className="text-gray-700 mb-6">
        Provide detailed information about your educational background, including key projects and co-curricular activities
      </p>

      {/* Education Level Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Education Level <span className="text-red-500">*</span></label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option>Select</option>
          <option>PhD</option>
          <option>Postgraduate</option>
          <option>Graduate</option>
          <option>Higher Secondary</option>
          <option>Secondary School</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Degree <span className="text-red-500">*</span></label>
          <input className="w-full border rounded px-3 py-2 mt-1" placeholder="Enter full degree (e.g., B.Sc., MBA)" value={degree} onChange={e => setDegree(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Specialization</label>
          <input className="w-full border rounded px-3 py-2 mt-1" placeholder="e.g., Computer Science" value={specialization} onChange={e => setSpecialization(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">School / College / University <span className="text-red-500">*</span></label>
          <input className="w-full border rounded px-3 py-2 mt-1" value={school} onChange={e => setSchool(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">URL</label>
          <input className="w-full border rounded px-3 py-2 mt-1" placeholder="Official website URL" value={url} onChange={e => setUrl(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Date <span className="text-red-500">*</span></label>
          <input type="date" className="w-full border rounded px-3 py-2 mt-1" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input type="date" className="w-full border rounded px-3 py-2 mt-1" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">CGPA / Grade / Percentage</label>
          <input className="w-full border rounded px-3 py-2 mt-1" value={grade} onChange={e => setGrade(e.target.value)} />
        </div>

        <div className="md:col-span-2 flex items-center justify-between">
          <div className="w-full">
            <label className="block text-sm font-medium">Location</label>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-600" />
              <input className="w-full border rounded px-3 py-2 mt-1" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
          </div>
          <div className="ml-4 flex items-center gap-2 mt-6">
            <input type="checkbox" id="remote" className="h-4 w-4" checked={remote} onChange={e => setRemote(e.target.checked)} />
            <label htmlFor="remote" className="text-sm font-medium">Remote Learning</label>
            <AiOutlineInfoCircle className="text-blue-500" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          rows="4"
          placeholder="Provide additional details about coursework, projects, or achievements"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Additional Info Tabs */}
      <div className="mb-6">
        <p className="font-semibold text-sm mb-2">Additional Information Sections (Add Up to 3)</p>
        <div className="flex border-b mb-4">
          {["Portfolio", "Courses Completed", "Topics of Interest"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-b-2 border-blue-700 text-blue-700"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tabs Content */}
        {activeTab === "Portfolio" && (
          <div className="bg-gray-100 border p-4 rounded">
            <label className="block text-sm font-medium mb-1">Link Portfolio Items</label>
            <select className="w-full border rounded px-3 py-2 mb-2">
              <option>Select Portfolio Items</option>
            </select>
            <div className="text-sm text-white bg-blue-400 px-3 py-2 rounded">
              Only existing portfolio items are available to link. To link new work, first add it to your portfolio.
            </div>
          </div>
        )}

        {activeTab === "Courses Completed" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Elective <span className="text-red-500">*</span></label>
              <input className="w-full border rounded px-3 py-2" />
            </div>
            <div className="border rounded p-4 bg-gray-100">
              <p className="font-semibold mb-2">AI Suggestions</p>
              <input
                placeholder="Degree and Specialization *"
                className="w-full border rounded px-3 py-2 mb-2"
              />
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded mt-2" disabled>
                Generate with AI ❤️
              </button>
              <p className="text-sm mt-2">No courses available</p>
            </div>
          </div>
        )}

        {activeTab === "Topics of Interest" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Select Topic <span className="text-red-500">*</span></label>
              <input className="w-full border rounded px-3 py-2" />
            </div>
            <div className="border rounded p-4 bg-gray-100">
              <p className="font-semibold mb-2">AI Suggestions</p>
              <input
                placeholder="Degree and Specialization *"
                className="w-full border rounded px-3 py-2 mb-2"
              />
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded mt-2" disabled>
                Generate with AI ❤️
              </button>
              <p className="text-sm mt-2">No Topics of Interest available</p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-start gap-4 mt-6">
        <button className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900" onClick={handleSave}>Save</button>
        <button onClick={() => navigate("/myprofile")} className="border border-gray-400 text-gray-800 px-5 py-2 rounded hover:bg-gray-100">Cancel</button>
      </div>
    </div>
  );
};

export default EducationSetup1;
