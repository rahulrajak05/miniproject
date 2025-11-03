import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaTimes, 
  FaCog, 
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaDollarSign,
  FaBuilding,
  FaPlane,
  FaHome,
  FaGlobe
} from "react-icons/fa";
import { useProfile } from "../context/ProfileContext";
import Sidebar from "../components/Sidebar";

const EditPreferences = () => {
  const navigate = useNavigate();
  const { Preferences: initialPreferences, updatePreferences } = useProfile();

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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (preferences.income && !preferences.currency) {
      newErrors.currency = "Please select a currency when income is specified";
    }
    
    if (preferences.income && !preferences.frequency) {
      newErrors.frequency = "Please select a frequency when income is specified";
    }

    if (preferences.income && isNaN(preferences.income)) {
      newErrors.income = "Please enter a valid number for income";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setPreferences({ ...preferences, [field]: value });
    
    // Clear error for this field
    if (errors[field] && value.trim()) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const updatedPreferences = {
        ...preferences,
        locations: preferences.locations ? preferences.locations.split(",").map((loc) => loc.trim()) : [],
        industries: preferences.industries ? preferences.industries.split(",").map((ind) => ind.trim()) : [],
        jobRoles: preferences.jobRoles ? preferences.jobRoles.split(",").map((role) => role.trim()) : [],
      };
      updatePreferences(updatedPreferences);
      navigate("/myprofile");
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const inputClasses = (fieldName) => `
    w-full border-2 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200 ${errors[fieldName] ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}
  `;

  const selectClasses = (fieldName) => `
    w-full border-2 rounded-lg px-4 py-3 text-gray-900 bg-white
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200 ${errors[fieldName] ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}
  `;

  const timezones = [
    { value: "GMT", label: "GMT (Greenwich Mean Time)" },
    { value: "EST", label: "EST (Eastern Standard Time)" },
    { value: "PST", label: "PST (Pacific Standard Time)" },
    { value: "IST", label: "IST (India Standard Time)" },
    { value: "CET", label: "CET (Central European Time)" },
    { value: "JST", label: "JST (Japan Standard Time)" },
    { value: "AEST", label: "AEST (Australian Eastern Standard Time)" }
  ];

  const currencies = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "INR", label: "INR - Indian Rupee" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "AUD", label: "AUD - Australian Dollar" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main content shifted to clear sidebar */}
  <div className="ml-0 md:ml-32 lg:ml-40 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaCog className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                Preferences
                </h1>
                <p className="text-gray-600">
                  Customize your work preferences to help us match you with the right opportunities
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              {/* Location Preferences */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  {/* <FaMapMarkerAlt className="text-blue-600" /> */}
                  Location Preferences
                </h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Work Locations
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., New York, San Francisco, Remote"
                    value={preferences.locations || ""}
                    onChange={(e) => handleChange("locations", e.target.value)}
                    className={inputClasses('locations')}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter up to 3 preferred locations (comma separated). Include "Remote" if you're open to remote work.
                  </p>
                </div>
              </div>

              {/* Work Schedule */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  {/* <FaClock className="text-blue-600" /> */}
                  Work Schedule
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Start Time
                    </label>
                    <input
                      type="time"
                      value={preferences.startTime ? preferences.startTime.replace(' AM', '').replace(' PM', '') : "09:00"}
                      onChange={(e) => handleChange("startTime", e.target.value)}
                      className={inputClasses('startTime')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred End Time
                    </label>
                    <input
                      type="time"
                      value={preferences.endTime ? preferences.endTime.replace(' AM', '').replace(' PM', '') : "18:00"}
                      onChange={(e) => handleChange("endTime", e.target.value)}
                      className={inputClasses('endTime')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Timezone
                    </label>
                    <div className="relative">
                      <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={preferences.timezone || ""}
                        onChange={(e) => handleChange("timezone", e.target.value)}
                        className={`${selectClasses('timezone')} pl-10`}
                      >
                        <option value="">Select Timezone</option>
                        {timezones.map(tz => (
                          <option key={tz.value} value={tz.value}>{tz.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Arrangement */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  {/* <FaBriefcase className="text-blue-600" /> */}
                  Work Arrangement
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Work Mode
                    </label>
                    <div className="relative">
                      <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={preferences.workMode || ""}
                        onChange={(e) => handleChange("workMode", e.target.value)}
                        className={`${selectClasses('workMode')} pl-10`}
                      >
                        <option value="">Select Work Mode</option>
                        <option value="On-site">On-site</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Employment Type
                    </label>
                    <select
                      value={preferences.employmentType || ""}
                      onChange={(e) => handleChange("employmentType", e.target.value)}
                      className={selectClasses('employmentType')}
                    >
                      <option value="">Select Employment Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Career Preferences */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  {/* <FaBriefcase className="text-blue-600" /> */}
                  Career Preferences
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Industries
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Technology, Healthcare, Finance"
                      value={preferences.industries || ""}
                      onChange={(e) => handleChange("industries", e.target.value)}
                      className={inputClasses('industries')}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter up to 3 industries you're interested in (comma separated)
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Job Roles
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Software Engineer, Product Manager, Designer"
                      value={preferences.jobRoles || ""}
                      onChange={(e) => handleChange("jobRoles", e.target.value)}
                      className={inputClasses('jobRoles')}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter up to 3 roles you're interested in (comma separated)
                    </p>
                  </div>
                </div>
              </div>

              {/* Compensation */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  {/* <FaDollarSign className="text-blue-600" /> */}
                  Expected Compensation
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={preferences.currency || ""}
                      onChange={(e) => handleChange("currency", e.target.value)}
                      className={selectClasses('currency')}
                    >
                      <option value="">Select Currency</option>
                      {currencies.map(currency => (
                        <option key={currency.value} value={currency.value}>{currency.label}</option>
                      ))}
                    </select>
                    {errors.currency && (
                      <p className="text-red-500 text-sm mt-1">{errors.currency}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expected Amount
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 75000"
                      value={preferences.income || ""}
                      onChange={(e) => handleChange("income", e.target.value)}
                      className={inputClasses('income')}
                    />
                    {errors.income && (
                      <p className="text-red-500 text-sm mt-1">{errors.income}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Frequency
                    </label>
                    <select
                      value={preferences.frequency || ""}
                      onChange={(e) => handleChange("frequency", e.target.value)}
                      className={selectClasses('frequency')}
                    >
                      <option value="">Select Frequency</option>
                      <option value="Hourly">Hourly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                    {errors.frequency && (
                      <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Preferences */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  {/* <FaBuilding className="text-blue-600" /> */}
                  Additional Preferences
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notice Period
                    </label>
                    <select
                      value={preferences.noticePeriod || ""}
                      onChange={(e) => handleChange("noticePeriod", e.target.value)}
                      className={selectClasses('noticePeriod')}
                    >
                      <option value="">Select Notice Period</option>
                      <option value="Immediate">Immediate</option>
                      <option value="15 Days">15 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="60 Days">60 Days</option>
                      <option value="90 Days">90 Days</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Willingness to Travel
                    </label>
                    <div className="relative">
                      <FaPlane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={preferences.travel || ""}
                        onChange={(e) => handleChange("travel", e.target.value)}
                        className={`${selectClasses('travel')} pl-10`}
                      >
                        <option value="">Select Travel Preference</option>
                        <option value="Yes">Yes, frequently</option>
                        <option value="Sometimes">Sometimes</option>
                        <option value="Rarely">Rarely</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Willingness to Relocate
                    </label>
                    <select
                      value={preferences.relocate || ""}
                      onChange={(e) => handleChange("relocate", e.target.value)}
                      className={selectClasses('relocate')}
                    >
                      <option value="">Select Relocation Preference</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Company Size
                    </label>
                    <select
                      value={preferences.companySize || ""}
                      onChange={(e) => handleChange("companySize", e.target.value)}
                      className={selectClasses('companySize')}
                    >
                      <option value="">Select Company Size</option>
                      <option value="Startup (1-50)">Startup (1-50 employees)</option>
                      <option value="Small (51-200)">Small (51-200 employees)</option>
                      <option value="Medium (201-1000)">Medium (201-1000 employees)</option>
                      <option value="Large (1000+)">Large (1000+ employees)</option>
                    </select>
                  </div>
                </div>
              </div>

              

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      {/* <FaSave className="text-sm" /> */}
                      Save Preferences
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <FaTimes className="text-sm" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPreferences;