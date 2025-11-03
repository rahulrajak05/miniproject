import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaSave, 
  FaTimes, 
  FaTrophy, 
  FaMedal,
  FaCalendarAlt,
  FaBuilding,
  FaLink,
  FaRobot
} from "react-icons/fa";
import { useProfile } from "../context/ProfileContext";
import Sidebar from "../components/Sidebar";

const AwardForm = () => {
  const [formData, setFormData] = useState({
    type: "Award",
    awardName: "",
    issueDate: "",
    issueAuthority: "",
    description: "",
    referenceLink: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { addRecognition } = useProfile();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.awardName.trim()) {
      newErrors.awardName = `${formData.type} name is required`;
    }
    
    if (formData.referenceLink && !/^https?:\/\/.+/.test(formData.referenceLink)) {
      newErrors.referenceLink = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name] && value.trim()) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAIGenerate = async () => {
    if (!formData.awardName.trim()) {
      alert('Please enter the award/achievement name first to generate a description');
      return;
    }
    
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const generatedDescription = `This ${formData.type.toLowerCase()} recognizes exceptional performance and outstanding contributions in the field. It demonstrates a high level of expertise, dedication, and impact that sets the recipient apart from peers. The recognition reflects significant achievements and serves as a testament to professional excellence and commitment to quality work.`;
      
      setFormData(prev => ({ ...prev, description: generatedDescription }));
    } catch (error) {
      console.error("Error generating description:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      addRecognition(formData);
      navigate("/myprofile");
    } catch (error) {
      console.error("Error saving recognition:", error);
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

  const getRecognitionIcon = () => {
    return formData.type === 'Award' ? 
      <FaTrophy className="text-yellow-600 text-xl" /> : 
      <FaMedal className="text-blue-600 text-xl" />;
  };

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
                {getRecognitionIcon()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Add {formData.type}
                </h1>
                <p className="text-gray-600">
                  Share your achievements and recognitions to showcase your professional accomplishments
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <form onSubmit={handleSubmit}>
              {/* Basic Information Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  {/* {getRecognitionIcon()} */}
                  Recognition Details
                </h2>
                
                {/* Recognition Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recognition Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={selectClasses('type')}
                  >
                    <option value="Award">Award</option>
                    <option value="Achievement">Achievement</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Honor">Honor</option>
                    <option value="Recognition">Recognition</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Select the type that best describes this recognition
                  </p>
                </div>

                {/* Name and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {formData.type} Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="awardName"
                      value={formData.awardName}
                      onChange={handleChange}
                      placeholder={`Enter the official name of the ${formData.type.toLowerCase()}`}
                      className={inputClasses('awardName')}
                    />
                    {errors.awardName && (
                      <p className="text-red-500 text-sm mt-1">{errors.awardName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Issue Date
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleChange}
                        className={`${inputClasses('issueDate')} pl-10`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      When was this recognition received?
                    </p>
                  </div>
                </div>

                {/* Issue Authority */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Issuing Authority
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="issueAuthority"
                      value={formData.issueAuthority}
                      onChange={handleChange}
                      placeholder="Enter issuing organization or entity"
                      className={`${inputClasses('issueAuthority')} pl-10`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    The organization or entity that granted this recognition
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Description
                    </label>
                    <button
                      type="button"
                      onClick={handleAIGenerate}
                      disabled={!formData.awardName.trim() || isGenerating}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <FaRobot className="text-sm" />
                          Generate with AI
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClasses('description')} min-h-[120px] resize-y`}
                    placeholder={`Describe the significance of this ${formData.type.toLowerCase()}, what it recognizes, and why it was awarded to you...`}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Include the criteria, your achievements, and the impact this recognition represents
                  </p>
                </div>

                {/* Reference Link */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reference Link
                  </label>
                  <div className="relative">
                    <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      name="referenceLink"
                      value={formData.referenceLink}
                      onChange={handleChange}
                      placeholder="https://example.com/certificate or news article"
                      className={`${inputClasses('referenceLink')} pl-10`}
                    />
                  </div>
                  {errors.referenceLink && (
                    <p className="text-red-500 text-sm mt-1">{errors.referenceLink}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Link to certificate, news article, or official announcement (optional)
                  </p>
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
                      Save {formData.type}
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

export default AwardForm;