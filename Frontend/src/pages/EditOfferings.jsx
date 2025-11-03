import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaSave, 
  FaTimes, 
  FaCog, 
  FaPlus,
  FaTrash,
  FaRobot,
  FaBriefcase
} from "react-icons/fa";
import { useProfile } from "../context/ProfileContext";
import Sidebar from "../components/Sidebar";

const EditOfferings = () => {
  const navigate = useNavigate();
  const { Offerings: initialOfferings, updateOfferings } = useProfile();

  const [offerings, setOfferings] = useState(
    initialOfferings && initialOfferings.length > 0
      ? initialOfferings
      : [{ name: "", description: "" }]
  );

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    offerings.forEach((offering, index) => {
      if (!offering.name.trim()) {
        newErrors[`name_${index}`] = "Offering name is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (index, field, value) => {
    const updated = [...offerings];
    updated[index][field] = value;
    setOfferings(updated);
    
    // Clear error for this field
    if (errors[`${field}_${index}`] && value.trim()) {
      setErrors(prev => ({ ...prev, [`${field}_${index}`]: '' }));
    }
  };

  const handleAddOffering = () => {
    setOfferings([...offerings, { name: "", description: "" }]);
  };

  const handleRemoveOffering = (index) => {
    if (offerings.length > 1) {
      const updated = offerings.filter((_, idx) => idx !== index);
      setOfferings(updated);
      
      // Clear errors for removed offering
      const newErrors = { ...errors };
      delete newErrors[`name_${index}`];
      delete newErrors[`description_${index}`];
      setErrors(newErrors);
    }
  };

  const handleAIGenerate = async (index) => {
    if (!offerings[index].name.trim()) {
      alert('Please enter the offering name first to generate a description');
      return;
    }
    
    setIsGenerating(index);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const generatedDescription = `This comprehensive ${offerings[index].name.toLowerCase()} service delivers exceptional value through innovative approaches and proven methodologies. Our expert team provides tailored solutions that meet specific client needs while ensuring quality, efficiency, and measurable results. This offering combines industry best practices with cutting-edge techniques to drive success and exceed expectations.`;
      
      const updated = [...offerings];
      updated[index].description = generatedDescription;
      setOfferings(updated);
    } catch (error) {
      console.error("Error generating description:", error);
    } finally {
      setIsGenerating(null);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      updateOfferings(offerings);
      navigate("/myprofile");
    } catch (error) {
      console.error("Error saving offerings:", error);
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
                <FaBriefcase className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                Offerings
                </h1>
                <p className="text-gray-600">
                  Define the services, products, or capabilities you offer to clients and customers
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              {/* Offerings Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    {/* <FaCog className="text-blue-600" /> */}
                    Your Offerings
                  </h2>
                  <button
                    type="button"
                    onClick={handleAddOffering}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    <FaPlus className="text-sm" />
                    Add Offering
                  </button>
                </div>

                <div className="space-y-6">
                  {offerings.map((offering, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-6 relative"
                    >
                      {/* Remove button */}
                      {offerings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOffering(index)}
                          className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove offering"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      )}

                      <div className="grid grid-cols-1 gap-6">
                        {/* Offering Name */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Offering Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={offering.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                            className={inputClasses(`name_${index}`)}
                            placeholder="e.g., Web Development, Graphic Design, Marketing Strategy"
                          />
                          {errors[`name_${index}`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`name_${index}`]}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Enter a clear, concise name for this offering
                          </p>
                        </div>

                        {/* Description */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Description
                            </label>
                            <button
                              type="button"
                              onClick={() => handleAIGenerate(index)}
                              disabled={!offering.name.trim() || isGenerating === index}
                              className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                            >
                              {isGenerating === index ? (
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
                            value={offering.description}
                            onChange={(e) => handleChange(index, "description", e.target.value)}
                            className={`${inputClasses(`description_${index}`)} min-h-[100px] resize-y`}
                            rows={4}
                            placeholder="Describe this offering in detail - include key features, benefits, and what makes it unique..."
                          />
                          {errors[`description_${index}`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`description_${index}`]}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Provide a detailed description including key features, benefits, and target audience
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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
                      Save Offerings
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

export default EditOfferings;