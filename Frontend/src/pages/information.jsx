import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import { useProfile } from "../context/ProfileContext";

const Information = () => {
  const navigate = useNavigate();
  const { addInformation } = useProfile();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const handleSave = () => {
    addInformation({ fullName, address, email, phone, socialLinks });
    navigate("/myprofile");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md mt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-600 hover:text-black"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-1">Personal Information</h1>
      <p className="text-gray-700 mb-6">
        Please fill in your basic details for your resume profile.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className="w-full border rounded px-3 py-2"
            placeholder="+91 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="City, State, Country"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
        <FaLink className="text-gray-600" /> Social Links
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="LinkedIn URL"
          value={socialLinks.linkedin}
          onChange={(e) =>
            setSocialLinks({ ...socialLinks, linkedin: e.target.value })
          }
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="GitHub URL"
          value={socialLinks.github}
          onChange={(e) =>
            setSocialLinks({ ...socialLinks, github: e.target.value })
          }
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Portfolio / Website URL"
          value={socialLinks.portfolio}
          onChange={(e) =>
            setSocialLinks({ ...socialLinks, portfolio: e.target.value })
          }
        />
      </div>

      <div className="flex justify-start gap-4 mt-6">
        <button
          className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          onClick={() => navigate("/myprofile")}
          className="border border-gray-400 text-gray-800 px-5 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Information;
