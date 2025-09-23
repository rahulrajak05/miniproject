import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const AwardForm = () => {
  const [formData, setFormData] = useState({
    type: "Award",
    awardName: "",
    issueDate: "",
    issueAuthority: "",
    description: "",
    referenceLink: "",
  });

  const { addRecognition } = useProfile();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecognition(formData);
    navigate("/myprofile");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-black">←</button>


        <h1 className="text-2xl font-semibold mb-1">Edit Recognition</h1>
        <p className="text-gray-700 mb-6">
          Provide details about each recognition item, including type, name, date, and issuing authority.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Recognition Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Award">Award</option>
              <option value="Achievement">Achievement</option>
            </select>
          </div>

          {/* Name + Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {formData.type} Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="awardName"
                value={formData.awardName}
                onChange={handleChange}
                placeholder={`Enter the official name of the ${formData.type.toLowerCase()}`}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Authority */}
          <div>
            <label className="block text-sm font-medium mb-1">Issue Authority</label>
            <input
              type="text"
              name="issueAuthority"
              value={formData.issueAuthority}
              onChange={handleChange}
              placeholder="Enter issuing organization or entity"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs text-gray-500">
                Describe the significance of this {formData.type.toLowerCase()} and why it was given
              </p>
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline disabled:opacity-50"
                disabled
              >
                <span className="material-icons text-base mr-1 align-middle">smart_toy</span>
                Generate with AI
              </button>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

          {/* Reference Link */}
          <div>
            <label className="block text-sm font-medium mb-1">Reference Link</label>
            <input
              type="url"
              name="referenceLink"
              value={formData.referenceLink}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate("/myprofile")}
              className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AwardForm;
