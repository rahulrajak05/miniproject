import React, { useState } from "react";
import { 
  HelpCircle, 
  Search, 
  Filter, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Code, 
  ChevronLeft,
  Building,
  Clock,
  Star,
  BookmarkPlus,
  TrendingUp,
  Users,
  Globe,
  Calendar,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

// Enhanced mock API data with more professional details
const mockApiJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Innovators Inc.',
    location: 'Remote',
    salary: '₹18 - 25 LPA',
    type: 'Full Time',
    experience: '5-8 years',
    skills: ['React', 'Node.js', 'AWS', 'GraphQL', 'Microservices', 'Docker'],
    description: 'We are seeking a seasoned Software Engineer to lead the development of our new microservices architecture. Must have a deep understanding of cloud technologies and backend frameworks. Join our dynamic team to build scalable and robust solutions.',
    jobUrl: 'https://www.naukri.com/senior-software-engineer-jobs',
    postedDate: '2 days ago',
    companyLogo: '🏢',
    applicants: '45+',
    rating: 4.5,
    remote: true,
    urgent: true
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Web Solutions Co.',
    location: 'Bangalore, India',
    salary: '₹8 - 12 LPA',
    type: 'Full Time',
    experience: '2-4 years',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Redux'],
    description: 'Looking for a passionate Frontend Developer to build beautiful and responsive user interfaces using modern JavaScript frameworks. Work on exciting new features and collaborate with cross-functional teams.',
    jobUrl: 'https://www.naukri.com/frontend-developer-jobs',
    postedDate: '5 days ago',
    companyLogo: '💻',
    applicants: '120+',
    rating: 4.2,
    remote: false,
    urgent: false
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Data Insights Ltd.',
    location: 'Mumbai, India',
    salary: '₹6 - 9 LPA',
    type: 'Full Time',
    experience: '1-3 years',
    skills: ['SQL', 'Python', 'Pandas', 'Tableau', 'Excel', 'Data Visualization'],
    description: 'Join our team as a Data Analyst and help us turn raw data into actionable business insights. Strong analytical skills and experience with SQL are a must. Contribute to data-driven decision-making processes.',
    jobUrl: 'https://www.naukri.com/data-analyst-jobs',
    postedDate: '1 week ago',
    companyLogo: '📊',
    applicants: '89+',
    rating: 4.0,
    remote: true,
    urgent: false
  },
  // Add more enhanced job data...
];

// Animation variants
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  hover: { y: -5, transition: { duration: 0.2 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Enhanced JobCard component
const JobCard = ({ job, onClick }) => (
  <motion.div 
    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 cursor-pointer group relative overflow-hidden"
    variants={cardVariants}
    whileHover="hover"
    onClick={() => onClick(job)}
  >
    {/* Urgent Badge */}
    {job.urgent && (
      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
        Urgent
      </div>
    )}
    
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
          {job.companyLogo}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            <Building size={14} />
            {job.company}
          </p>
        </div>
      </div>
      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-full">
        <BookmarkPlus size={16} className="text-gray-600" />
      </button>
    </div>

    {/* Job Info */}
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
      <span className="flex items-center gap-2">
        <MapPin size={16} className="text-gray-500" />
        {job.location}
      </span>
      <span className="flex items-center gap-2">
        <DollarSign size={16} className="text-gray-500" />
        {job.salary}
      </span>
      <span className="flex items-center gap-2">
        <Briefcase size={16} className="text-gray-500" />
        {job.type}
      </span>
      <span className="flex items-center gap-2">
        <Clock size={16} className="text-gray-500" />
        {job.experience}
      </span>
    </div>

    {/* Skills */}
    <div className="flex flex-wrap gap-2 mb-4">
      {job.skills.slice(0, 3).map((skill, index) => (
        <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
          {skill}
        </span>
      ))}
      {job.skills.length > 3 && (
        <span className="text-xs text-gray-500">+{job.skills.length - 3} more</span>
      )}
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Users size={12} />
          {job.applicants} applicants
        </span>
        <span className="flex items-center gap-1">
          <Star size={12} className="text-yellow-500 fill-current" />
          {job.rating}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {job.remote && (
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            Remote
          </span>
        )}
        <span className="text-xs text-gray-500">{job.postedDate}</span>
      </div>
    </div>
  </motion.div>
);

// Enhanced JobDetailPage component
const JobDetailPage = ({ job, onBack }) => {
  const handleApplyClick = () => {
    const url = job.jobUrl || 'https://www.naukri.com/';
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <button 
          onClick={onBack}
          className="text-white/80 hover:text-white flex items-center gap-2 mb-6 transition-colors"
        >
          <ChevronLeft size={20} /> Back to Search Results
        </button>
        
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
            {job.companyLogo}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <h2 className="text-xl opacity-90 mb-4">{job.company}</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <DollarSign size={16} />
                {job.salary}
              </span>
              <span className="flex items-center gap-2">
                <Briefcase size={16} />
                {job.type}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {job.experience}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Job Description */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-500" size={20} />
            Job Description
          </h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>
        </div>
        
        {/* Required Skills */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Code className="text-blue-500" size={20} />
            Required Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="text-blue-600" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{job.rating}</div>
            <div className="text-sm text-gray-600">Company Rating</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="text-green-600" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{job.applicants}</div>
            <div className="text-sm text-gray-600">Applicants</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="text-purple-600" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{job.postedDate}</div>
            <div className="text-sm text-gray-600">Posted</div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex gap-4">
          <button 
            onClick={handleApplyClick}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            Apply Now <ArrowRight size={20} />
          </button>
          <button className="px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            Save Job
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main component with enhanced UI
const RiseOnJobBoards = () => {
  // State management (same as before)
  const [profile, setProfile] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [jobBoard, setJobBoard] = useState("");
  
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [showResultsPage, setShowResultsPage] = useState(false);

  // Handlers (same logic as before)
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setJobs([]);
    setSelectedJob(null);
    setShowResultsPage(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setJobs(mockApiJobs);
      setShowResultsPage(true);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs. Please try again later.");
      setShowResultsPage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setJobTitle("");
    setEmploymentType("");
    setPreferredLocation("");
    setIsRemote(false);
    setCompanyName("");
    setExperienceLevel("");
    setJobBoard("");
    setJobs([]);
    setSelectedJob(null);
    setError(null);
    setShowResultsPage(false);
  };
  
  const handleJobCardClick = (job) => {
    setSelectedJob(job);
  };
  
  const handleBackToSearch = () => {
    setSelectedJob(null);
    setShowResultsPage(false);
  };

  // Enhanced render content function
  const renderContent = () => {
    if (selectedJob) {
      return <JobDetailPage job={selectedJob} onBack={() => setSelectedJob(null)} />;
    } else if (showResultsPage) {
      return (
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            onClick={handleBackToSearch}
            className="text-gray-600 hover:text-blue-600 flex items-center gap-2 mb-6 transition-colors"
          >
            <ChevronLeft size={20} /> Back to Search
          </button>
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Search size={28} className="text-blue-600" /> 
              Search Results
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp size={16} />
              Found {jobs.length} jobs
            </div>
          </div>

          {isLoading ? (
            <div className="text-center p-20 text-gray-600">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-lg">Loading job listings...</p>
            </div>
          ) : error ? (
            <div className="text-center p-20 text-red-600 bg-red-50 rounded-xl">
              <p className="font-semibold text-lg">{error}</p>
              <p className="text-sm mt-2">Please try again later or check your API configuration.</p>
            </div>
          ) : jobs.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {jobs.map(job => <JobCard key={job.id} job={job} onClick={handleJobCardClick} />)}
            </motion.div>
          ) : (
            <div className="text-center p-20 text-gray-500 bg-gray-50 rounded-xl">
              <Search className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-xl">No jobs found. Try adjusting your search criteria.</p>
            </div>
          )}
        </motion.div>
      );
    } else {
      return (
        <motion.div 
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Briefcase className="text-blue-600" size={24} />
              Job Search
            </h2>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all text-sm font-medium">
              Saved Jobs
            </button>
          </div>

          {/* Enhanced Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Job Title <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              >
                <option value="" disabled>Enter or select a job title</option>
                <optgroup label="Management & Leadership">
                  <option>Chief Information Officer (CIO)</option>
                  <option>Chief Technology Officer (CTO)</option>
                  <option>Product Manager</option>
                </optgroup>
                <optgroup label="Engineering & Development">
                  <option>Software Engineer/Developer</option>
                  <option>Cloud Architect</option>
                  <option>DevOps Engineer</option>
                  <option>Web Developer</option>
                </optgroup>
                <optgroup label="Data & Analytics">
                  <option>Data Scientist</option>
                  <option>Data Analyst</option>
                  <option>Machine Learning Engineer</option>
                </optgroup>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Employment Type
              </label>
              <select
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <option value="" disabled>Select type</option>
                <option>Full Time</option>
                <option>Contract</option>
                <option>Part Time</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          {/* Location and Remote */}
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Preferred Location
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter your preferred location"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">Remote Work</label>
              <button
                onClick={() => setIsRemote((r) => !r)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
                  isRemote ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Company Name</label>
              <select
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              >
                <option value="" disabled>Select a company</option>
                <option>Google</option>
                <option>Microsoft</option>
                <option>Amazon</option>
                <option>Apple</option>
                <option>Meta</option>
                <option>TCS</option>
                <option>Infosys</option>
                <option>Wipro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Experience Level</label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., 2-5 years"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Job Boards</label>
              <select
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                value={jobBoard}
                onChange={(e) => setJobBoard(e.target.value)}
              >
                <option value="" disabled>Select a job board</option>
                <option>LinkedIn</option>
                <option>Indeed</option>
                <option>Glassdoor</option>
                <option>Naukri</option>
                <option>Monster</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Search size={20} />
                  Search Jobs
                </span>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex pt-20">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-28 md:ml-32 lg:ml-40 px-3 sm:px-6 md:px-10 py-10 flex justify-center items-start min-h-screen">
        
        {/* University Heading Section */}
        <motion.div 
          className="absolute top-24 md:top-28 lg:top-32 left-1/2 transform -translate-x-[38%] text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text drop-shadow-sm">
            Pondicherry University
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mt-3 tracking-wide">
            Department of Computer Science
          </p>
          <div className="mt-2 h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 mt-44 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3 text-gray-800 mb-4">
              {/* <Briefcase className="text-blue-600" size={36} /> */}
              Job Boards
            </h1>
            <p className="text-gray-600 text-lg">Find your dream job with our comprehensive job search platform</p>
          </div>

          {/* Profile Selector */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Select Your Profile <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border-2 border-blue-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            >
              <option value="" disabled>Select Your Professional Profile</option>
              <optgroup label="Software Engineering">
                <option>Junior Software Engineer</option>
                <option>Senior Software Engineer</option>
                <option>Full Stack Developer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
              </optgroup>
              <optgroup label="Data & Analytics">
                <option>Data Analyst</option>
                <option>Data Scientist</option>
                <option>Machine Learning Engineer</option>
              </optgroup>
              <optgroup label="Cloud & DevOps">
                <option>DevOps Engineer</option>
                <option>Cloud Architect</option>
                <option>Site Reliability Engineer (SRE)</option>
              </optgroup>
              <optgroup label="Management & Leadership">
                <option>Product Manager</option>
                <option>IT Manager</option>
                <option>VP of Engineering</option>
              </optgroup>
            </select>
            <p className="text-xs text-gray-500 mt-2">Choose the profile that best matches your career goals.</p>
          </div>

          {/* Main Content Rendering */}
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

export default RiseOnJobBoards;