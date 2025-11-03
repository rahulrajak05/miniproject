import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaTimes, 
  FaLightbulb, 
  FaFileAlt,
  FaCalendarAlt,
  FaLink,
  FaUsers,
  FaTrash,
  FaPlus,
  FaRobot,
  FaIdCard
} from "react-icons/fa";
import { useProfile } from "../context/ProfileContext";
import Sidebar from "../components/Sidebar";

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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { addIntellectual } = useProfile();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = `${formData.recognitionType} title is required`;
    }
    
    if (formData.url && !/^https?:\/\/.+/.test(formData.url)) {
      newErrors.url = "Please enter a valid URL";
    }

    if (isPatent && !formData.status) {
      newErrors.status = "Patent status is required";
    }

    if (isPatent && !formData.applicationNumber.trim()) {
      newErrors.applicationNumber = "Patent application number is required";
    }

    // Validate inventor URLs
    formData.inventors.forEach((inventor, index) => {
      if (inventor.url && !/^https?:\/\/.+/.test(inventor.url)) {
        newErrors[`inventor_url_${index}`] = "Please enter a valid URL";
      }
    });

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

  const handleInventorChange = (index, field, value) => {
    const updatedInventors = [...formData.inventors];
    updatedInventors[index][field] = value;
    setFormData((prev) => ({ ...prev, inventors: updatedInventors }));
    
    // Clear error for this field
    if (errors[`inventor_${field}_${index}`] && value.trim()) {
      setErrors(prev => ({ ...prev, [`inventor_${field}_${index}`]: '' }));
    }
  };

  const addInventor = () => {
    setFormData((prev) => ({
      ...prev,
      inventors: [...prev.inventors, { name: "", url: "" }],
    }));
  };

  const removeInventor = (index) => {
    if (formData.inventors.length > 1) {
      const updatedInventors = formData.inventors.filter((_, idx) => idx !== index);
      setFormData((prev) => ({ ...prev, inventors: updatedInventors }));
      
      // Clear errors for removed inventor
      const newErrors = { ...errors };
      delete newErrors[`inventor_name_${index}`];
      delete newErrors[`inventor_url_${index}`];
      setErrors(newErrors);
    }
  };

  const handleAIGenerate = async () => {
    if (!formData.title.trim()) {
      alert(`Please enter the ${formData.recognitionType.toLowerCase()} title first to generate a description`);
      return;
    }
    
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const generatedDescription = isPatent 
        ? `This patent presents an innovative solution that addresses key challenges in the field. The invention introduces novel methodologies and technical approaches that improve efficiency and functionality. The patent demonstrates significant technical merit and potential for commercial application, representing a valuable contribution to intellectual property in this domain.`
        : `This publication contributes valuable research findings and insights to the academic and professional community. The work presents comprehensive analysis, methodology, and results that advance understanding in the field. The research demonstrates rigorous scientific approach and provides practical implications for future work and applications.`;
      
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
      addIntellectual(formData);
      navigate("/myprofile");
    } catch (error) {
      console.error("Error saving intellectual property:", error);
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

  const isPatent = formData.recognitionType === "Patent";

  const getIPIcon = () => {
    return isPatent ? 
      <FaLightbulb className="text-yellow-600 text-xl" /> : 
      <FaFileAlt className="text-blue-600 text-xl" />;
  };

  const statusOptions = [
    { value: "Granted", label: "Granted", description: "Patent has been officially granted" },
    { value: "Pending", label: "Pending", description: "Application is under review" },
    { value: "Filed", label: "Filed", description: "Application has been submitted" },
    { value: "Published", label: "Published", description: "Application has been published" }
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
                {getIPIcon()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Add {formData.recognitionType}
                </h1>
                <p className="text-gray-600">
                  Document your intellectual property contributions and research publications
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
                  {/* {getIPIcon()} */}
                  Basic Information
                </h2>
                
                {/* Recognition Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="recognitionType"
                    value={formData.recognitionType}
                    onChange={handleChange}
                    className={selectClasses('recognitionType')}
                  >
                    <option value="Patent">Patent</option>
                    <option value="Publication">Publication</option>
                    <option value="Research Paper">Research Paper</option>
                    <option value="Journal Article">Journal Article</option>
                    <option value="Conference Paper">Conference Paper</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Select the type of intellectual property
                  </p>
                </div>

                {/* Title and URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {formData.recognitionType} Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder={`Enter the full title of your ${formData.recognitionType.toLowerCase()}`}
                      className={inputClasses('title')}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {formData.recognitionType} URL
                    </label>
                    <div className="relative">
                      <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        placeholder={`URL to access the ${formData.recognitionType.toLowerCase()}`}
                        className={`${inputClasses('url')} pl-10`}
                      />
                    </div>
                    {errors.url && (
                      <p className="text-red-500 text-sm mt-1">{errors.url}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Link to official publication or patent office
                    </p>
                  </div>
                </div>

                {/* Patent-specific Fields */}
                {isPatent && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Patent Status <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className={selectClasses('status')}
                        >
                          <option value="">Select status</option>
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.status && (
                          <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Current status of the patent application
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Patent Application Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="applicationNumber"
                            value={formData.applicationNumber}
                            onChange={handleChange}
                            className={`${inputClasses('applicationNumber')} pl-10`}
                            placeholder="e.g., US1234567B1, EP1234567A1"
                          />
                        </div>
                        {errors.applicationNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.applicationNumber}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Official patent or application number
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date of Issue
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
                        Date when the patent was granted (if applicable)
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Contributors Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    {/* <FaUsers className="text-blue-600" /> */}
                    {isPatent ? "Inventors" : "Authors"}
                  </h2>
                  <button
                    type="button"
                    onClick={addInventor}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    <FaPlus className="text-sm" />
                    Add {isPatent ? "Inventor" : "Author"}
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.inventors.map((contributor, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name {index === 0 && <span className="text-red-500">*</span>}
                          </label>
                          <input
                            type="text"
                            placeholder="Enter full name"
                            value={contributor.name}
                            onChange={(e) =>
                              handleInventorChange(index, "name", e.target.value)
                            }
                            className={inputClasses(`inventor_name_${index}`)}
                          />
                          {errors[`inventor_name_${index}`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`inventor_name_${index}`]}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Profile URL
                          </label>
                          <div className="relative">
                            <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="url"
                              placeholder="https://linkedin.com/in/profile"
                              value={contributor.url}
                              onChange={(e) =>
                                handleInventorChange(index, "url", e.target.value)
                              }
                              className={`${inputClasses(`inventor_url_${index}`)} pl-10`}
                            />
                          </div>
                          {errors[`inventor_url_${index}`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`inventor_url_${index}`]}</p>
                          )}
                        </div>
                      </div>

                      {formData.inventors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInventor(index)}
                          className="mt-8 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title={`Remove ${isPatent ? 'inventor' : 'author'}`}
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Add all contributors to this {formData.recognitionType.toLowerCase()}
                </p>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <button
                    type="button"
                    onClick={handleAIGenerate}
                    disabled={!formData.title.trim() || isGenerating}
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
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className={`${inputClasses('description')} min-h-[120px] resize-y`}
                  placeholder={`Provide a comprehensive summary of this ${formData.recognitionType.toLowerCase()}, including its significance, methodology, and impact...`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Describe the innovation, research methodology, key findings, and potential applications
                </p>
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
                      Save {formData.recognitionType}
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

export default Intellectual;