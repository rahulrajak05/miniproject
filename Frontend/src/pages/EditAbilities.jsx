import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaSave, 
  FaTimes, 
  FaPlus, 
  FaTrash, 
  FaBrain, 
  FaUsers 
} from "react-icons/fa";
 
import { useProfile } from "../context/ProfileContext";
import Sidebar from "../components/Sidebar";

const EditAbilities = () => {
  const [skills, setSkills] = useState([{ name: "" }]);
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  

  const { addAbilities } = useProfile();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    skills.forEach((skill, index) => {
      if (!skill.name.trim()) {
        newErrors[`skill_${index}`] = "Skill name is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSkillChange = (index, value) => {
    const updated = [...skills];
    updated[index].name = value;
    setSkills(updated);
    
    // Clear error for this field
    if (errors[`skill_${index}`] && value.trim()) {
      const newErrors = { ...errors };
      delete newErrors[`skill_${index}`];
      setErrors(newErrors);
    }
  };

  const addSkill = () => {
    setSkills([...skills, { name: "" }]);
  };

  const removeSkill = (index) => {
    if (skills.length > 1) {
      const updated = skills.filter((_, idx) => idx !== index);
      setSkills(updated);
      
      // Clear error for removed skill
      const newErrors = { ...errors };
      delete newErrors[`skill_${index}`];
      setErrors(newErrors);
    }
  };

  

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      addAbilities(skills);
      navigate("/myprofile");
    } catch (error) {
      console.error("Error saving abilities:", error);
    } finally {
      setIsLoading(false);
    }
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
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Add Skills
                </h1>
                <p className="text-gray-600">
                  List your key  skills, such as react js, programming language, leadership, communication, and teamwork
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Skills Input Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                </div>

                <div className="space-y-4">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Skill <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => handleSkillChange(idx, e.target.value)}
                          className={inputClasses(`skill_${idx}`)}
                          placeholder="e.g., React.js, Java, MongoDB"
                        />
                        {errors[`skill_${idx}`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`skill_${idx}`]}</p>
                        )}
                      </div>

                      {skills.length > 1 && (
                        <button
                          onClick={() => removeSkill(idx)}
                          className="mt-8 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove skill"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={addSkill}
                  className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <FaPlus className="text-sm" />
                  Add Another Skill
                </button>

                
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
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
                
                    Save Abilities
                  </>
                )}
              </button>
              
              <button
                onClick={() => navigate("/myprofile")}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FaTimes className="text-sm" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAbilities;