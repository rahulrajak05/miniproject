import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const EditLearningCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    authority: "",
    url: "",
    location: "",
    remote: false,
    startDate: "",
    endDate: "",
    certificate: null,
    description: "",
    portfolioItems: ""
  });
  const { addLearning } = useProfile();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, certificate: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLearning(formData);
    navigate("/myprofile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-orange-50 px-4 py-10 md:px-10">
      
      <div className="max-w-5xl mx-auto space-y-8 bg-white p-8 rounded-xl shadow-md">
                <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-black">←</button>

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Learning - Course</h1>
          <p className="text-gray-600 mt-1 text-base">
            Provide details about the course you've completed.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Name & Authority */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="Course Name *"
              className="w-full border p-3 rounded text-sm focus:outline-blue-500"
              required
            />
            <input
              type="text"
              name="authority"
              value={formData.authority}
              onChange={handleChange}
              placeholder="Issuing Authority *"
              className="w-full border p-3 rounded text-sm focus:outline-blue-500"
              required
            />
          </div>

          {/* URL, Location, Remote */}
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Course URL"
              className="w-full border p-3 rounded text-sm"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border p-3 rounded text-sm"
            />
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="remote"
                checked={formData.remote}
                onChange={handleChange}
                className="accent-blue-700"
              />
              Remote Learning
            </label>
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-3 rounded text-sm"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border p-3 rounded text-sm"
            />
          </div>

          {/* Certificate Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Certificate (optional)
            </label>
            <input
              type="file"
              name="certificate"
              onChange={handleChange}
              className="w-full border p-3 rounded text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={5}
              className="w-full border p-3 rounded text-sm"
            />
          </div>

          {/* Portfolio Selection */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Link Portfolio Items</h2>
            <select
              name="portfolioItems"
              value={formData.portfolioItems}
              onChange={handleChange}
              className="w-full border p-3 rounded text-sm"
            >
              <option value="">Select Portfolio Item</option>
              {/* Dynamically render from state/props */}
            </select>
            <p className="text-sm text-blue-700 mt-2">
              Only existing items are available. Add new work to your portfolio first.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
              onClick={() => navigate("/myprofile")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLearningCourse;
