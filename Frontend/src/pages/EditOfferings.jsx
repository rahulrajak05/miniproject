import React, { useState } from "react";
import { ArrowLeft, HelpCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext"; // <-- Add this

const EditOfferings = () => {
  const navigate = useNavigate();
  const { Offerings: initialOfferings, updateOfferings } = useProfile(); // <-- Add this

  const [offerings, setOfferings] = useState(
    initialOfferings && initialOfferings.length > 0
      ? initialOfferings
      : [{ name: "", description: "" }]
  );

  const handleChange = (index, field, value) => {
    const updated = [...offerings];
    updated[index][field] = value;
    setOfferings(updated);
  };

  const handleAddOffering = () => {
    setOfferings([...offerings, { name: "", description: "" }]);
  };

  const handleSave = () => {
    updateOfferings(offerings); // <-- Save to context
    navigate("/myprofile"); // <-- Redirect to MyProfile
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-black">
          ←
        </button>

        {/* Header */}
        <h1 className="text-2xl font-semibold mb-2">Edit Offerings</h1>
        <p className="text-gray-600 mb-6">
          Enter the specific service, product, or capability you offer (e.g., Graphic Design, Web Development, Marketing Strategy).
        </p>

        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Offerings</h2>
          <HelpCircle className="w-5 h-5 text-gray-500" />
          <button onClick={handleAddOffering} className="hover:text-black text-gray-600">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Offering Inputs */}
        {offerings.map((offering, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-xl mb-6 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-gray-800 mb-1 font-medium">
                  Offering Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={offering.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Offering Name"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-800 mb-1 font-medium">
                  Description
                </label>
                <textarea
                  value={offering.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Offering Description"
                  rows={4}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Provide a brief description of this offering, including key details or unique aspects.
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="bg-gray-800 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-700 transition"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="border border-gray-400 text-gray-700 px-6 py-2 rounded-full shadow-sm hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOfferings;
