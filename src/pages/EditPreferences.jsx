import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext"; // <-- Add this

const EditPreferences = () => {
  const navigate = useNavigate();
  const { Preferences: initialPreferences, updatePreferences } = useProfile(); // <-- Add this

  const [preferences, setPreferences] = useState(
    initialPreferences && Object.keys(initialPreferences).length > 0
      ? initialPreferences
      : {
          locations: "",
          startTime: "09:00 AM",
          endTime: "06:00 PM",
          timezone: "",
          workMode: "",
          employmentType: "",
          industries: "",
          currency: "",
          income: "",
          frequency: "",
          jobRoles: "",
          noticePeriod: "",
          travel: "",
          relocate: "",
          companySize: "",
        }
  );

  const handleChange = (field, value) => {
    setPreferences({ ...preferences, [field]: value });
  };

  const handleSave = () => {
    const updatedPreferences = {
      ...preferences,
      locations: preferences.locations.split(",").map((loc) => loc.trim()),
      industries: preferences.industries.split(",").map((ind) => ind.trim()),
      jobRoles: preferences.jobRoles.split(",").map((role) => role.trim()),
    };
    updatePreferences(updatedPreferences); // <-- Save to context
    navigate("/myprofile"); // <-- Redirect to MyProfile
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white rounded-2xl shadow-md max-w-5xl mx-auto p-8">
        <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-black">
          ←
        </button>

        <h1 className="text-3xl font-semibold mb-2">Edit Preferences</h1>
        <p className="text-gray-600 mb-6">
          Customize your preferences by specifying your preferred work locations, hours, roles, and industries.
        </p>

        {/* Preferred Locations */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Preferred Locations (comma-separated)"
            value={preferences.locations || ""}
            onChange={(e) => handleChange("locations", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-sm text-gray-500 mt-1">Enter up to 3 preferred locations (comma separated).</p>
        </div>

        {/* Working Time */}
        <div className="mb-6">
          <label className=" text-gray-800 font-medium mb-1 flex items-center gap-1">
            Preferred Working Time <HelpCircle className="w-4 h-4 text-gray-400" />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Start Time"
              value={preferences.startTime || ""}
              onChange={(e) => handleChange("startTime", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="End Time"
              value={preferences.endTime || ""}
              onChange={(e) => handleChange("endTime", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <select
              value={preferences.timezone || ""}
              onChange={(e) => handleChange("timezone", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option disabled value="">Select Timezone</option>
              <option>GMT</option>
              <option>EST</option>
              <option>PST</option>
            </select>
          </div>
        </div>

        {/* Work Mode & Employment Type */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={preferences.workMode || ""}
            onChange={(e) => handleChange("workMode", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option disabled value="">Ways of Working</option>
            <option>On-site</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
          <select
            value={preferences.employmentType || ""}
            onChange={(e) => handleChange("employmentType", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option disabled value="">Employment Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contractual</option>
          </select>
        </div>

        {/* Industry */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Preferred Industries (comma-separated)"
            value={preferences.industries || ""}
            onChange={(e) => handleChange("industries", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-sm text-gray-500 mt-1">Enter up to 3 industries.</p>
        </div>

        {/* Expected CTC */}
        <div className="mb-6">
          <label className=" font-medium mb-1 flex items-center gap-1">
            Expected CTC <HelpCircle className="w-4 h-4 text-gray-400" />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={preferences.currency || ""}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option disabled value="">Currency</option>
              <option>USD</option>
              <option>INR</option>
            </select>
            <input
              type="text"
              placeholder="Income"
              value={preferences.income || ""}
              onChange={(e) => handleChange("income", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <select
              value={preferences.frequency || ""}
              onChange={(e) => handleChange("frequency", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option disabled value="">Frequency</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>

        {/* Job Roles */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Preferred Job Roles (comma-separated)"
            value={preferences.jobRoles || ""}
            onChange={(e) => handleChange("jobRoles", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <p className="text-sm text-gray-500 mt-1">Enter up to 3 roles you are interested in.</p>
        </div>

        {/* Notice Period, Travel, Relocate */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={preferences.noticePeriod || ""}
            onChange={(e) => handleChange("noticePeriod", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option disabled value="">Notice Period</option>
            <option>Immediate</option>
            <option>15 Days</option>
            <option>30 Days</option>
          </select>
          <select
            value={preferences.travel || ""}
            onChange={(e) => handleChange("travel", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option disabled value="">Willingness to Travel</option>
            <option>Yes</option>
            <option>No</option>
            <option>Sometimes</option>
          </select>
          <select
            value={preferences.relocate || ""}
            onChange={(e) => handleChange("relocate", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option disabled value="">Willingness to Relocate</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* Company Size */}
        <div className="mb-6">
          <select
            value={preferences.companySize || ""}
            onChange={(e) => handleChange("companySize", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option disabled value="">Preferred Company Size</option>
            <option>Startup</option>
            <option>Mid-size</option>
            <option>Large Enterprise</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">Select the size of the company you prefer to work for.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
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

export default EditPreferences;
