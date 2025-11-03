import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { 
  FaBriefcase, 
  FaBuilding, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaGlobe,
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaClipboardList
} from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useProfile } from '../context/ProfileContext';
import Sidebar from '../components/Sidebar';

const tabSections = ['Portfolio', 'Skills Learned', 'Testimonials', 'Recognition', 'Tools Used'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const WorkExperienceStep3 = () => {
  const navigate = useNavigate();
  const { addWork } = useProfile();

  // Form state for all fields
  const [employmentType, setEmploymentType] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [current, setCurrent] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);
  const [responsibilities, setResponsibilities] = useState('');
  
  // Tabs
  const [portfolio, setPortfolio] = useState('');
  const [skills, setSkills] = useState('');
  const [testimonials, setTestimonials] = useState('');
  const [recognition, setRecognition] = useState('');
  const [tools, setTools] = useState('');

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTabs] = useState(tabSections);

  const validateForm = () => {
    const newErrors = {};
    
    if (!employmentType.trim()) {
      newErrors.employmentType = "Employment type is required";
    }
    
    if (!jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    
    if (!company.trim()) {
      newErrors.company = "Company name is required";
    }
    
    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }
    
    if (!responsibilities.trim()) {
      newErrors.responsibilities = "Job responsibilities are required";
    }
    
    if (companyUrl && !/^https?:\/\/.+/.test(companyUrl)) {
      newErrors.companyUrl = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      addWork({
        employmentType,
        jobTitle,
        company,
        companyUrl,
        current,
        startDate,
        endDate,
        location,
        remote,
        responsibilities,
        portfolio,
        skills,
        testimonials,
        recognition,
        tools,
      });
      navigate('/myprofile');
    } catch (error) {
      console.error("Error saving work experience:", error);
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
                <FaBriefcase className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Add Work Experience{employmentType ? ` - ${employmentType}` : ''}
                </h1>
                <p className="text-gray-600">
                  Fill out your work experience details, including your role, responsibilities, and achievements
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Basic Information Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FaClipboardList className="text-blue-600" />
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Employment Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Employment Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={selectClasses('employmentType')}
                      value={employmentType}
                      onChange={(e) => {
                        setEmploymentType(e.target.value);
                        if (errors.employmentType) setErrors({...errors, employmentType: ''});
                      }}
                    >
                      <option value="">Select employment type</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Contractual">Contractual</option>
                      <option value="Internship">Internship</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Freelancer">Freelancer</option>
                    </select>
                    {errors.employmentType && (
                      <p className="text-red-500 text-sm mt-1">{errors.employmentType}</p>
                    )}
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      className={inputClasses('jobTitle')}
                      placeholder="Enter your job title"
                      value={jobTitle} 
                      onChange={(e) => {
                        setJobTitle(e.target.value);
                        if (errors.jobTitle) setErrors({...errors, jobTitle: ''});
                      }} 
                    />
                    {errors.jobTitle && (
                      <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
                    )}
                  </div>

                  {/* Company and URL */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          className={`${inputClasses('company')} pl-10`}
                          placeholder="Enter company name"
                          value={company} 
                          onChange={(e) => {
                            setCompany(e.target.value);
                            if (errors.company) setErrors({...errors, company: ''});
                          }} 
                        />
                      </div>
                      {errors.company && (
                        <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Enter the full name of the company</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company Website
                      </label>
                      <div className="relative">
                        <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                          type="url" 
                          className={`${inputClasses('companyUrl')} pl-10`}
                          placeholder="https://company-website.com"
                          value={companyUrl} 
                          onChange={(e) => {
                            setCompanyUrl(e.target.value);
                            if (errors.companyUrl) setErrors({...errors, companyUrl: ''});
                          }} 
                        />
                      </div>
                      {errors.companyUrl && (
                        <p className="text-red-500 text-sm mt-1">{errors.companyUrl}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Include a link to the company's website or LinkedIn profile
                      </p>
                    </div>
                  </div>

                  {/* Current Employment Checkbox */}
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="current"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={current} 
                      onChange={(e) => setCurrent(e.target.checked)} 
                    />
                    <label htmlFor="current" className="text-sm font-medium text-gray-700">
                      I am currently working in this role
                    </label>
                  </div>

                  {/* Start and End Date */}
                  <div className="grid md:grid-cols-2 gap-6">
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
                          className={`${inputClasses('endDate')} pl-10 ${current ? 'bg-gray-100' : ''}`}
                          value={endDate} 
                          onChange={(e) => setEndDate(e.target.value)} 
                          disabled={current}
                        />
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        {current ? "Disabled because you're currently working here" : "Leave empty if currently employed"}
                      </p>
                    </div>
                  </div>

                  {/* Location and Remote */}
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
                        Remote Work
                      </label>
                      <AiOutlineInfoCircle className="text-blue-500 cursor-help" title="Check if this was remote work" />
                    </div>
                  </div>

                  {/* Job Responsibilities */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Responsibilities <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className={`${inputClasses('responsibilities')} min-h-[150px] resize-y`}
                      rows="6"
                      placeholder="Describe your key contributions, achievements, and the impact you had in this role..."
                      value={responsibilities}
                      onChange={(e) => {
                        setResponsibilities(e.target.value);
                        if (errors.responsibilities) setErrors({...errors, responsibilities: ''});
                      }}
                    />
                    {errors.responsibilities && (
                      <p className="text-red-500 text-sm mt-1">{errors.responsibilities}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Focus on measurable results and specific projects. Use bullet points for better readability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information Sections
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Additional Information Sections (Optional)
                </h3>

                <Tab.Group>
                  <Tab.List className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
                    {selectedTabs.map((tab) => (
                      <Tab
                        key={tab}
                        className={({ selected }) =>
                          classNames(
                            'py-2 px-4 text-sm font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap',
                            selected 
                              ? 'border-blue-500 text-blue-600 bg-blue-50' 
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          )
                        }
                      >
                        {tab}
                      </Tab>
                    ))}
                  </Tab.List>
                  
                  <Tab.Panels className="bg-gray-50 rounded-lg p-6">
                    <Tab.Panel>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Link Portfolio Items
                        </label>
                        <select 
                          className={selectClasses('portfolio')}
                          value={portfolio} 
                          onChange={(e) => setPortfolio(e.target.value)}
                        >
                          <option value="">Select Portfolio Items</option>
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
                    </Tab.Panel>
                    
                    <Tab.Panel>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Skills Learned
                        </label>
                        <textarea
                          className={`${inputClasses('skills')} min-h-[100px] resize-y`}
                          rows="4"
                          placeholder="List key skills you learned during this role..."
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Include both technical and soft skills gained
                        </p>
                      </div>
                    </Tab.Panel>
                    
                    <Tab.Panel>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Testimonials
                        </label>
                        <textarea
                          className={`${inputClasses('testimonials')} min-h-[100px] resize-y`}
                          rows="4"
                          placeholder="Write any testimonials or feedback received from colleagues, supervisors, or clients..."
                          value={testimonials}
                          onChange={(e) => setTestimonials(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Include the name and position of the person who gave the testimonial
                        </p>
                      </div>
                    </Tab.Panel>
                    
                    <Tab.Panel>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Recognition & Awards
                        </label>
                        <textarea
                          className={`${inputClasses('recognition')} min-h-[100px] resize-y`}
                          rows="4"
                          placeholder="Mention any recognition, awards, or achievements received during this role..."
                          value={recognition}
                          onChange={(e) => setRecognition(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Include employee of the month, performance awards, etc.
                        </p>
                      </div>
                    </Tab.Panel>
                    
                    <Tab.Panel>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tools & Technologies Used
                        </label>
                        <textarea
                          className={`${inputClasses('tools')} min-h-[100px] resize-y`}
                          rows="4"
                          placeholder="List tools, technologies, software, and platforms used in this role..."
                          value={tools}
                          onChange={(e) => setTools(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Include programming languages, frameworks, software, etc.
                        </p>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div> */}

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
                      
                      Save Work Experience
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

export default WorkExperienceStep3;