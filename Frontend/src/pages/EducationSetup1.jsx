import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaMapMarkerAlt, 
  FaArrowLeft, 
  FaSave, 
  FaTimes, 
  FaGraduationCap,
  FaCalendarAlt,
  FaGlobe,
  FaClipboardList
} from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useProfile } from "../context/ProfileContext";
import Sidebar from "../components/Sidebar";

const EducationSetup1 = () => {
  const [activeTab, setActiveTab] = useState("Portfolio");
  const [selectedLevel, setSelectedLevel] = useState("");
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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { addEducation } = useProfile();

  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedLevel.trim() || selectedLevel === "Select") {
      newErrors.selectedLevel = "Please select an education level";
    }
    
    if (!degree.trim()) {
      newErrors.degree = "Degree is required";
    }
    
    if (!school.trim()) {
      newErrors.school = "School/College/University is required";
    }
    
    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }
    
    if (url && !/^https?:\/\/.+/.test(url)) {
      newErrors.url = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
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
    } catch (error) {
      console.error("Error saving education:", error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main content shifted to clear sidebar */}
      <div className="ml-28 md:ml-32 lg:ml-40 p-6">
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
                <FaGraduationCap className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Add Education {selectedLevel && `- ${selectedLevel}`}
                </h1>
                <p className="text-gray-600">
                  Provide detailed information about your educational background, including key projects and co-curricular activities
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              {/* Education Level Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FaGraduationCap className="text-blue-600" />
                  Education Level
                </h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Education Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={selectClasses('selectedLevel')}
                    value={selectedLevel}
                    onChange={(e) => {
                      setSelectedLevel(e.target.value);
                      if (errors.selectedLevel) setErrors({...errors, selectedLevel: ''});
                    }}
                  >
                    <option value="">Select Education Level</option>
                    <option value="PhD">PhD</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Higher Secondary">Higher Secondary</option>
                    <option value="Secondary School">Secondary School</option>
                  </select>
                  {errors.selectedLevel && (
                    <p className="text-red-500 text-sm mt-1">{errors.selectedLevel}</p>
                  )}
                </div>
              </div>

              {/* Basic Information Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FaClipboardList className="text-blue-600" />
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClasses('degree')}
                      placeholder="Enter full degree (e.g., B.Sc., MBA)"
                      value={degree}
                      onChange={(e) => {
                        setDegree(e.target.value);
                        if (errors.degree) setErrors({...errors, degree: ''});
                      }}
                    />
                    {errors.degree && (
                      <p className="text-red-500 text-sm mt-1">{errors.degree}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specialization
                    </label>
                    <input
                      type="text"
                      className={inputClasses('specialization')}
                      placeholder="e.g., Computer Science"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      School / College / University <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClasses('school')}
                      placeholder="Enter institution name"
                      value={school}
                      onChange={(e) => {
                        setSchool(e.target.value);
                        if (errors.school) setErrors({...errors, school: ''});
                      }}
                    />
                    {errors.school && (
                      <p className="text-red-500 text-sm mt-1">{errors.school}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Institution Website
                    </label>
                    <div className="relative">
                      <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        className={`${inputClasses('url')} pl-10`}
                        placeholder="https://university-website.com"
                        value={url}
                        onChange={(e) => {
                          setUrl(e.target.value);
                          if (errors.url) setErrors({...errors, url: ''});
                        }}
                      />
                    </div>
                    {errors.url && (
                      <p className="text-red-500 text-sm mt-1">{errors.url}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        className={`${inputClasses('startDate')} pl-10`}
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          if (errors.startDate) setErrors({...errors, startDate: ''});
                        }}
                      />
                    </div>
                    {errors.startDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        className={`${inputClasses('endDate')} pl-10`}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">Leave empty if currently studying</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CGPA / Grade / Percentage
                    </label>
                    <input
                      type="text"
                      className={inputClasses('grade')}
                      placeholder="e.g., 8.5 CGPA, 85%, A Grade"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex flex-col md:flex-row md:items-end gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Location
                        </label>
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            className={`${inputClasses('location')} pl-10`}
                            placeholder="City, State, Country"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 pb-3">
                        <input
                          type="checkbox"
                          id="remote"
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          checked={remote}
                          onChange={(e) => setRemote(e.target.checked)}
                        />
                        <label htmlFor="remote" className="text-sm font-medium text-gray-700">
                          Remote Learning
                        </label>
                        <AiOutlineInfoCircle className="text-blue-500 cursor-help" title="Check if this was online/distance learning" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className={`${inputClasses('description')} min-h-[120px] resize-y`}
                  rows="5"
                  placeholder="Provide additional details about coursework, projects, achievements, or any relevant information..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-gray-500 text-xs mt-1">
                  Include relevant coursework, projects, thesis work, achievements, or extracurricular activities
                </p>
              </div>

              {/* Additional Info Tabs */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Additional Information Sections (Optional)
                </h3>
                
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    {["Portfolio", "Courses Completed", "Topics of Interest"].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                          activeTab === tab
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="bg-gray-50 rounded-lg p-6">
                  {activeTab === "Portfolio" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Link Portfolio Items
                      </label>
                      <select className={selectClasses('portfolio')}>
                        <option>Select Portfolio Items</option>
                      </select>
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AiOutlineInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-blue-700">
                            Only existing portfolio items are available to link. To link new work, first add it to your portfolio section.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "Courses Completed" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Course/Elective <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={inputClasses('elective')}
                          placeholder="Enter course name"
                        />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">AI Suggestions</h4>
                        <input
                          type="text"
                          placeholder="Enter Degree and Specialization"
                          className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
                        />
                        <button
                          type="button"
                          className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium"
                          disabled
                        >
                          Generate with AI ❤️
                        </button>
                        <p className="text-xs text-gray-500 mt-2">Feature coming soon</p>
                      </div>
                    </div>
                  )}

                  {activeTab === "Topics of Interest" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Select Topic <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={inputClasses('topic')}
                          placeholder="Enter topic of interest"
                        />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">AI Suggestions</h4>
                        <input
                          type="text"
                          placeholder="Enter Degree and Specialization"
                          className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
                        />
                        <button
                          type="button"
                          className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium"
                          disabled
                        >
                          Generate with AI ❤️
                        </button>
                        <p className="text-xs text-gray-500 mt-2">Feature coming soon</p>
                      </div>
                    </div>
                  )}
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
                      <FaSave className="text-sm" />
                      Save Education
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate("/myprofile")}
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

export default EducationSetup1;