import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const Intellectual = () => {
  const [formData, setFormData] = useState({
    recognitionType: "Patent",
    title: "",
    url: "",
    status: "",
    applicationNumber: "",
    issueDate: "",
    inventors: [{ name: "", url: "" }],
    description: "",
  });

  const { addIntellectual } = useProfile();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInventorChange = (index, field, value) => {
    const updatedInventors = [...formData.inventors];
    updatedInventors[index][field] = value;
    setFormData((prev) => ({ ...prev, inventors: updatedInventors }));
  };

  const addInventor = () => {
    setFormData((prev) => ({
      ...prev,
      inventors: [...prev.inventors, { name: "", url: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIntellectual(formData);
    navigate("/myprofile");
  };

  const isPatent = formData.recognitionType === "Patent";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
                <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-black">←</button>

        <h1 className="text-2xl font-semibold mb-1">
          Edit Intellectual Property - {formData.recognitionType}
        </h1>
        <p className="text-gray-700 mb-6">
          Enter details about your {formData.recognitionType.toLowerCase()}, including the title,
          URL, contributors, and relevant identifiers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recognition Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="recognitionType"
              value={formData.recognitionType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Patent">Patent</option>
              <option value="Publication">Publication</option>
            </select>
          </div>

          {/* Title and URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {formData.recognitionType} Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={`Enter the full title of your ${formData.recognitionType.toLowerCase()}`}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {formData.recognitionType} URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder={`Provide a URL to access the ${formData.recognitionType.toLowerCase()}`}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Patent-specific Fields */}
          {isPatent && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Patent Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select status</option>
                    <option value="Granted">Granted</option>
                    <option value="Pending">Pending</option>
                    <option value="Filed">Filed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Patent Application Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="applicationNumber"
                    value={formData.applicationNumber}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g., US1234567B1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date of Issue</label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </>
          )}

          {/* Inventors / Authors */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              {isPatent ? "Inventors" : "Authors"}
              <span className="text-blue-500 text-xs">(Add all contributors)</span>
              <button
                type="button"
                onClick={addInventor}
                className="text-blue-600 hover:underline text-sm"
              >
                + Add
              </button>
            </label>

            {formData.inventors.map((contributor, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={contributor.name}
                  onChange={(e) =>
                    handleInventorChange(index, "name", e.target.value)
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  type="url"
                  placeholder="Profile URL"
                  value={contributor.url}
                  onChange={(e) =>
                    handleInventorChange(index, "url", e.target.value)
                  }
                  className="border rounded px-3 py-2"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs text-gray-500">
                Provide a summary of this {formData.recognitionType.toLowerCase()}.
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
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Save
            </button>
            <button
              type="button"
              className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-100"
              onClick={() => navigate("/myprofile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Intellectual;
