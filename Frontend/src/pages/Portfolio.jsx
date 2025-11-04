import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaSave, 
  FaTimes, 
  FaFileAlt, 
  FaUsers,
  FaBuilding,
  FaLink
} from "react-icons/fa";
import { useProfile } from '../context/ProfileContext';
import Sidebar from '../components/Sidebar';

const Portfolio = () => {
  const navigate = useNavigate();
  const { addPortfolioItem } = useProfile();

  // Form state
  const [projectType, setProjectType] = useState('Project');
  const [projectName, setProjectName] = useState('');
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  
  const [collaboratorName, setCollaboratorName] = useState('');
  const [collaboratorUrl, setCollaboratorUrl] = useState('');
  const [clientName, setClientName] = useState('');
  const [keyLinks, setKeyLinks] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }
    
    if (!summary.trim()) {
      newErrors.summary = "Project summary is required";
    }
    
    if (!details.trim()) {
      newErrors.details = "Project details are required";
    }

    if (collaboratorUrl && !/^https?:\/\/.+/.test(collaboratorUrl)) {
      newErrors.collaboratorUrl = "Please enter a valid URL";
    }

    if (keyLinks && !/^https?:\/\/.+/.test(keyLinks)) {
      newErrors.keyLinks = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const newItem = {
        projectType,
        projectName,
        summary,
        details,
        collaboratorName,
        collaboratorUrl,
        clientName,
        keyLinks,
      };

      addPortfolioItem(newItem);
      navigate('/myprofile');
    } catch (error) {
      console.error("Error saving portfolio item:", error);
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

  

  const getProjectIcon = () => {
    switch (projectType) {
      case 'Case Study':
        return <FaFileAlt className="text-green-600 text-xl" />;
      case 'Article':
        return <FaFileAlt className="text-purple-600 text-xl" />;
      default:
        return <FaFileAlt className="text-blue-600 text-xl" />;
    }
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
                {getProjectIcon()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Add {projectType}
                </h1>
                <p className="text-gray-600">
                  Showcase your best work and achievements in your professional portfolio
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              {/* Basic Information Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FaFileAlt className="text-blue-600" />
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className={selectClasses('projectType')}
                    >
                      <option value="Project">Project</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Article">Article</option>
                    </select>
                  </div>

                  {/* Project Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your project name"
                      value={projectName}
                      onChange={(e) => {
                        setProjectName(e.target.value);
                        if (errors.projectName && e.target.value.trim()) {
                          setErrors({...errors, projectName: ''});
                        }
                      }}
                      className={inputClasses('projectName')}
                    />
                    {errors.projectName && (
                      <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>
                    )}
                  </div>
                </div>

                {/* Project Summary */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={summary}
                    onChange={(e) => {
                      setSummary(e.target.value);
                      if (errors.summary && e.target.value.trim()) {
                        setErrors({...errors, summary: ''});
                      }
                    }}
                    className={`${inputClasses('summary')} min-h-[100px] resize-y`}
                    rows={3}
                    placeholder="Craft a concise and compelling project summary or headline..."
                  />
                  {errors.summary && (
                    <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Keep it concise and highlight the key value proposition
                  </p>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => {
                      setDetails(e.target.value);
                      if (errors.details && e.target.value.trim()) {
                        setErrors({...errors, details: ''});
                      }
                    }}
                    className={`${inputClasses('details')} min-h-[150px] resize-y`}
                    rows={6}
                    placeholder="Describe the project in detail - include objectives, approach, challenges, solutions, and outcomes..."
                  />
                  {errors.details && (
                    <p className="text-red-500 text-sm mt-1">{errors.details}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Include objectives, methodology, challenges overcome, and measurable results
                  </p>
                </div>
              </div>

              

              {/* Collaboration & Links Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FaUsers className="text-blue-600" />
                  Collaboration & Links
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Collaborators */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Collaborator Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter collaborator's name"
                      value={collaboratorName}
                      onChange={(e) => setCollaboratorName(e.target.value)}
                      className={inputClasses('collaboratorName')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Collaborator Profile URL
                    </label>
                    <div className="relative">
                      <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="https://linkedin.com/in/collaborator"
                        value={collaboratorUrl}
                        onChange={(e) => {
                          setCollaboratorUrl(e.target.value);
                          if (errors.collaboratorUrl && e.target.value.trim()) {
                            setErrors({...errors, collaboratorUrl: ''});
                          }
                        }}
                        className={`${inputClasses('collaboratorUrl')} pl-10`}
                      />
                    </div>
                    {errors.collaboratorUrl && (
                      <p className="text-red-500 text-sm mt-1">{errors.collaboratorUrl}</p>
                    )}
                  </div>

                  {/* Client */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Client / Company Name
                    </label>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className={`${inputClasses('clientName')} pl-10`}
                        placeholder="e.g. OpenAI, Google, Freelance Client"
                      />
                    </div>
                  </div>

                  {/* Key Links */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Key Links
                    </label>
                    <div className="relative">
                      <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={keyLinks}
                        onChange={(e) => {
                          setKeyLinks(e.target.value);
                          if (errors.keyLinks && e.target.value.trim()) {
                            setErrors({...errors, keyLinks: ''});
                          }
                        }}
                        placeholder="e.g. GitHub repo, live demo, case study"
                        className={`${inputClasses('keyLinks')} pl-10`}
                      />
                    </div>
                    {errors.keyLinks && (
                      <p className="text-red-500 text-sm mt-1">{errors.keyLinks}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Add links to GitHub, live demos, or case studies
                    </p>
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
                      <FaSave className="text-sm" />
                      Save Portfolio Item
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/myprofile')}
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

export default Portfolio;