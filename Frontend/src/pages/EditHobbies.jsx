import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaSave, 
  FaTimes, 
  FaPlus,
  FaTrash,
  FaRobot,
  FaHeart,
  FaGamepad,
  FaMusic,
  FaPalette,
  FaRunning
} from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useProfile } from "../context/ProfileContext";
import Sidebar from "../components/Sidebar";

const EditHobbies = () => {
  const navigate = useNavigate();
  const { InterestActivities: initialHobbies, updateInterestActivities } = useProfile();

  const [hobbies, setHobbies] = useState(
    initialHobbies && initialHobbies.length > 0
      ? initialHobbies.map(hobby => ({
          category: hobby.activityType || "",
          description: hobby.description || ""
        }))
      : [{ category: "", description: "" }]
  );

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(null);

  const hobbyCategories = [
    { value: "Sports & Fitness", icon: <FaRunning className="text-green-600" />, description: "Physical activities and sports" },
    { value: "Music & Arts", icon: <FaMusic className="text-purple-600" />, description: "Musical instruments, singing, performing arts" },
    { value: "Creative Arts", icon: <FaPalette className="text-orange-600" />, description: "Drawing, painting, crafts, design" },
    { value: "Gaming", icon: <FaGamepad className="text-blue-600" />, description: "Video games, board games, puzzles" },
    { value: "Reading & Writing", icon: <FaHeart className="text-red-600" />, description: "Books, writing, blogging" },
    { value: "Technology", icon: <FaHeart className="text-gray-600" />, description: "Programming, gadgets, tech projects" },
    { value: "Cooking & Food", icon: <FaHeart className="text-yellow-600" />, description: "Cooking, baking, food exploration" },
    { value: "Travel & Adventure", icon: <FaHeart className="text-teal-600" />, description: "Traveling, hiking, outdoor activities" },
    { value: "Learning", icon: <FaHeart className="text-indigo-600" />, description: "Languages, courses, skill development" },
    { value: "Social & Community", icon: <FaHeart className="text-pink-600" />, description: "Volunteering, community service" },
    { value: "Other", icon: <FaHeart className="text-gray-500" />, description: "Other interests not listed above" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    hobbies.forEach((hobby, index) => {
      if (!hobby.category.trim()) {
        newErrors[`category_${index}`] = "Hobby category is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (index, field, value) => {
    const updated = [...hobbies];
    updated[index][field] = value;
    setHobbies(updated);
    
    // Clear error for this field
    if (errors[`${field}_${index}`] && value.trim()) {
      setErrors(prev => ({ ...prev, [`${field}_${index}`]: '' }));
    }
  };

  const handleAddHobby = () => {
    setHobbies([...hobbies, { category: "", description: "" }]);
  };

  const handleRemoveHobby = (index) => {
    if (hobbies.length > 1) {
      const updated = hobbies.filter((_, idx) => idx !== index);
      setHobbies(updated);
      
      // Clear errors for removed hobby
      const newErrors = { ...errors };
      delete newErrors[`category_${index}`];
      delete newErrors[`description_${index}`];
      setErrors(newErrors);
    }
  };

  const handleAIGenerate = async (index) => {
    if (!hobbies[index].category.trim()) {
      alert('Please enter a hobby category first to generate a description');
      return;
    }
    
    setIsGenerating(index);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const generatedDescription = `I am passionate about ${hobbies[index].category.toLowerCase()} and enjoy exploring different aspects of this interest. This hobby allows me to express creativity, develop new skills, and connect with like-minded individuals. I regularly engage in activities related to this field and find it both relaxing and intellectually stimulating.`;
      
      const updated = [...hobbies];
      updated[index].description = generatedDescription;
      setHobbies(updated);
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
      const validHobbies = hobbies
        .filter((h) => h.category.trim() !== "")
        .map((h) => ({
          activityType: h.category,
          description: h.description,
        }));
      
      updateInterestActivities(validHobbies);
      navigate("/myprofile");
    } catch (error) {
      console.error("Error saving hobbies:", error);
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
                <FaHeart className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Interests & Activities
                </h1>
                <p className="text-gray-600">
                  Showcase your hobbies and interests to give others a glimpse into your personality
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              {/* Hobbies Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    {/* <FaHeart className="text-red-500" /> */}
                    Your Hobbies & Interests
                  </h2>
                  <button
                    type="button"
                    onClick={handleAddHobby}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    <FaPlus className="text-sm" />
                    Add Hobby
                  </button>
                </div>

                <div className="space-y-6">
                  {hobbies.map((hobby, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-6 relative"
                    >
                      {/* Remove button */}
                      {hobbies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveHobby(index)}
                          className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove hobby"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      )}

                      <div className="grid grid-cols-1 gap-6">
                        {/* Category Input */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Hobby Category <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={hobby.category}
                            onChange={(e) => handleChange(index, "category", e.target.value)}
                            className={inputClasses(`category_${index}`)}
                            placeholder="e.g., Sports & Fitness, Music & Arts, Creative Arts, Gaming, etc."
                          />
                          {errors[`category_${index}`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`category_${index}`]}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Enter the category that best describes your hobby
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
                              disabled={!hobby.category.trim() || isGenerating === index}
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
                            value={hobby.description}
                            onChange={(e) => handleChange(index, "description", e.target.value)}
                            className={`${inputClasses(`description_${index}`)} min-h-[100px] resize-y`}
                            rows={4}
                            placeholder="Describe your hobby in detail - what you enjoy about it, how long you've been doing it, any achievements or interesting experiences..."
                          />
                          {errors[`description_${index}`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`description_${index}`]}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Share what makes this hobby special to you and any notable experiences
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
                      Save Hobbies
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

export default EditHobbies;