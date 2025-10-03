import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useProfile } from "../context/ProfileContext"; // <-- Add this

const EditHobbies = () => {
  const [hobbies, setHobbies] = useState([{ category: "", description: "" }]);
  const navigate = useNavigate();
  const { updateInterestActivities } = useProfile(); // <-- Add this

  const handleChange = (index, field, value) => {
    const updated = [...hobbies];
    updated[index][field] = value;
    setHobbies(updated);
  };

  const handleAddHobby = () => {
    setHobbies([...hobbies, { category: "", description: "" }]);
  };

  const handleSave = () => {
    // Save hobbies to context and redirect
    updateInterestActivities(
      hobbies
        .filter((h) => h.category.trim() !== "")
        .map((h) => ({
          activityType: h.category,
          description: h.description,
        }))
    );
    navigate("/myprofile");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white max-w-5xl mx-auto p-8 rounded-2xl shadow-md">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-600 hover:text-black"
        >
          ←
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">
            Edit Interest and Activities – Hobbies
          </h1>
          <p className="text-gray-600 mt-1">
            Add details about your hobbies to showcase your interests beyond work
            or study.
          </p>
        </div>

        {/* Section title */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Hobbies</h2>
          <button
            onClick={handleAddHobby}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Hobby inputs */}
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          >
            <div>
              <input
                type="text"
                placeholder="Category *"
                value={hobby.category}
                onChange={(e) =>
                  handleChange(index, "category", e.target.value)
                }
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Select the category that best describes this hobby
              </p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Description"
                value={hobby.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="bg-gray-800 text-white px-6 py-2 rounded-full shadow hover:bg-gray-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="border px-6 py-2 rounded-full shadow hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHobbies;
