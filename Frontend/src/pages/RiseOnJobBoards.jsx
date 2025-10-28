import React, { useState } from "react";
import { HelpCircle, Search, Filter, Briefcase, DollarSign, MapPin, Code, ChevronLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";

// Mock API response for demonstration. This expanded data mimics a real API's response.
const mockApiJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Innovators Inc.',
    location: 'Remote',
    salary: '₹18 - 25 LPA',
    type: 'Full Time',
    skills: ['React', 'Node.js', 'AWS', 'GraphQL', 'Microservices', 'Docker'],
    description: 'We are seeking a seasoned Software Engineer to lead the development of our new microservices architecture. Must have a deep understanding of cloud technologies and backend frameworks. Join our dynamic team to build scalable and robust solutions.',
    jobUrl: 'https://www.naukri.com/senior-software-engineer-jobs', // Placeholder URL
    postedDate: '2 days ago'
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Web Solutions Co.',
    location: 'Bangalore, India',
    salary: '₹8 - 12 LPA',
    type: 'Full Time',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Redux'],
    description: 'Looking for a passionate Frontend Developer to build beautiful and responsive user interfaces using modern JavaScript frameworks. Work on exciting new features and collaborate with cross-functional teams.',
    jobUrl: 'https://www.naukri.com/frontend-developer-jobs', // Placeholder URL
    postedDate: '5 days ago'
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Data Insights Ltd.',
    location: 'Mumbai, India',
    salary: '₹6 - 9 LPA',
    type: 'Full Time',
    skills: ['SQL', 'Python', 'Pandas', 'Tableau', 'Excel', 'Data Visualization'],
    description: 'Join our team as a Data Analyst and help us turn raw data into actionable business insights. Strong analytical skills and experience with SQL are a must. Contribute to data-driven decision-making processes.',
    jobUrl: 'https://www.naukri.com/data-analyst-jobs', // Placeholder URL
    postedDate: '1 week ago'
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'CloudOps Group',
    location: 'Hyderabad, India',
    salary: '₹15 - 20 LPA',
    type: 'Full Time',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform', 'Ansible'],
    description: 'We need an experienced DevOps Engineer to manage our CI/CD pipelines and ensure the reliability and scalability of our infrastructure on cloud platforms. Drive automation and streamline development cycles.',
    jobUrl: 'https://www.naukri.com/devops-engineer-jobs',
    postedDate: '3 days ago'
  },
  {
    id: 5,
    title: 'UI/UX Designer',
    company: 'Creative Hub Designs',
    location: 'Pune, India',
    salary: '₹7 - 11 LPA',
    type: 'Contract',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping', 'Wireframing'],
    description: 'A talented UI/UX Designer is needed to create intuitive and engaging user experiences for our next-generation mobile applications. Translate concepts into user flows, wireframes, mockups and prototypes.',
    jobUrl: 'https://www.naukri.com/ui-ux-designer-jobs',
    postedDate: '4 days ago'
  },
  {
    id: 6,
    title: 'Backend Developer (Node.js)',
    company: 'API Solutions Inc.',
    location: 'Chennai, India',
    salary: '₹10 - 15 LPA',
    type: 'Full Time',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'JWT', 'TypeScript'],
    description: 'Build robust and scalable backend systems using Node.js and Express. Experience with NoSQL databases and secure API development is highly valued. Contribute to high-performance microservices.',
    jobUrl: 'https://www.naukri.com/backend-developer-jobs',
    postedDate: '6 days ago'
  },
  {
    id: 7,
    title: 'Junior Software Engineer',
    company: 'Innovate Startups',
    location: 'Remote',
    salary: '₹4 - 7 LPA',
    type: 'Full Time',
    skills: ['JavaScript', 'HTML', 'CSS', 'Git', 'Problem Solving', 'Data Structures'],
    description: 'An excellent opportunity for a fresh graduate to kickstart their career. You will be working on a variety of projects, learning new technologies, and contributing to a fast-paced environment.',
    jobUrl: 'https://www.naukri.com/junior-software-engineer-jobs',
    postedDate: '1 day ago'
  },
  {
    id: 8,
    title: 'Quality Assurance Engineer',
    company: 'App Testing Co.',
    location: 'Bangalore, India',
    salary: '₹5 - 8 LPA',
    type: 'Full Time',
    skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'JIRA', 'Agile Methodologies'],
    description: 'Ensure the quality of our mobile and web applications by performing manual and automated tests. Attention to detail is crucial. Work closely with development teams to ensure bug-free releases.',
    jobUrl: 'https://www.naukri.com/qa-engineer-jobs',
    postedDate: '8 days ago'
  },
  {
    id: 9,
    title: 'Cloud Architect',
    company: 'Enterprise Cloud Solutions',
    location: 'Delhi, India',
    salary: '₹25 - 40 LPA',
    type: 'Full Time',
    skills: ['AWS', 'Azure', 'GCP', 'Cloud Architecture', 'Security', 'Scalability'],
    description: 'We are looking for an experienced Cloud Architect to design and implement robust, scalable, and secure cloud solutions for our enterprise clients. Strong expertise in at least one major cloud provider is essential.',
    jobUrl: 'https://www.naukri.com/cloud-architect-jobs',
    postedDate: '2 days ago'
  },
  {
    id: 10,
    title: 'Product Manager',
    company: 'Growth Technologies',
    location: 'Bangalore, India',
    salary: '₹17 - 28 LPA',
    type: 'Full Time',
    skills: ['Product Management', 'Market Research', 'Agile', 'Roadmapping', 'User Stories'],
    description: 'Seeking a dynamic Product Manager to define product vision, strategy, and roadmap. Collaborate with engineering, design, and marketing teams to deliver exceptional products.',
    jobUrl: 'https://www.naukri.com/product-manager-jobs',
    postedDate: '5 days ago'
  },
];

// JobCard component to display job summary
const JobCard = ({ job, onClick }) => (
  <div 
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl cursor-pointer"
    onClick={() => onClick(job)}
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{job.company}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 mt-4">
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
    </div>
  </div>
);

// JobDetailPage component to display a single job's details
const JobDetailPage = ({ job, onBack }) => {
  const handleApplyClick = () => {
    const url = job.jobUrl || 'https://www.naukri.com/';
    window.open(url, '_blank');
  };

  return (

    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
      <button 
        onClick={onBack}
        className="text-gray-600 hover:text-blue-600 flex items-center gap-2 mb-6"
      >
        
        <ChevronLeft size={20} /> Back to Search Results
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{job.company}</h2>

      <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-700 mb-6">
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
      </div>

      <div className="prose max-w-none text-gray-700">
        <h3 className="text-lg font-bold">Job Description</h3>
        <p>{job.description}</p>
      </div>
      
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold mb-2">Required Skills</h3>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <button 
        onClick={handleApplyClick}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors hover:bg-blue-700 w-full md:w-auto"
      >
        Apply Now
      </button>
    </div>
  )
};


  


// Main component containing all the application logic
const RiseOnJobBoards = () => {
  // State for search form inputs
  const [profile, setProfile] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [jobBoard, setJobBoard] = useState("");
  
  // State for fetched jobs and UI status
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for navigation between views
  const [selectedJob, setSelectedJob] = useState(null);
  const [showResultsPage, setShowResultsPage] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setJobs([]);
    setSelectedJob(null);
    setShowResultsPage(false); // Hide results page during search
    
    // Simulate an API call with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setJobs(mockApiJobs);
      setShowResultsPage(true); // Show results page after successful fetch
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
    setShowResultsPage(false); // Go back to the form view
  };
  
  const handleJobCardClick = (job) => {
    setSelectedJob(job);
  };
  
  const handleBackToSearch = () => {
    setSelectedJob(null);
    setShowResultsPage(false);
  }

  // Helper function to render the correct view based on state
  const renderContent = () => {
    if (selectedJob) {
      return <JobDetailPage job={selectedJob} onBack={() => setSelectedJob(null)} />;
    } else if (showResultsPage) {
      return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <button 
            onClick={handleBackToSearch}
            className="text-gray-600 hover:text-blue-600 flex items-center gap-2 mb-6"
          >
            <ChevronLeft size={20} /> Back to Search
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Search size={24} /> Search Results
          </h2>
          {isLoading ? (
            <div className="text-center p-10 text-gray-600">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
              <p className="mt-4">Loading job listings...</p>
            </div>
          ) : error ? (
            <div className="text-center p-10 text-red-600 bg-red-100 rounded-lg">
              <p className="font-semibold">{error}</p>
              <p className="text-sm mt-1">Please try again later or check your API configuration.</p>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map(job => <JobCard key={job.id} job={job} onClick={handleJobCardClick} />)}
            </div>
          ) : (
            <div className="text-center p-10 text-gray-500 bg-white rounded-lg shadow-sm">
              <p className="text-lg">No jobs found. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        
        // The main search form is rendered here
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-6">
       
          {/* Form UI from previous versions */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Job Postings</h2>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all text-sm">
              Saved Jobs
            </button>
        </div>
       

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Job Title <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              >
                <option value="" disabled>Enter or select a job title</option>
                <optgroup label="Management & Leadership">
                    <option>Chief Information Officer (CIO)</option>
                    <option>Chief Technology Officer (CTO)</option>
                    <option>Chief Information Security Officer (CISO)</option>
                    <option>IT Director</option>
                    <option>IT Manager</option>
                    <option>VP of Engineering</option>
                    <option>Product Manager</option>
                </optgroup>
                <optgroup label="Engineering & Development">
                    <option>Software Engineer/Developer</option>
                    <option>Cloud Architect</option>
                    <option>DevOps Engineer</option>
                    <option>Artificial Intelligence (AI) Engineer</option>
                    <option>Web Developer</option>
                    <option>Computer Programmer</option>
                    <option>Application Developer</option>
                    <option>Mobile Applications Developer</option>
                </optgroup>
                <optgroup label="Data & Analytics">
                    <option>Data Scientist</option>
                    <option>Data Analyst</option>
                    <option>Machine Learning Engineer</option>
                    <option>Business Intelligence (BI) Analyst</option>
                </optgroup>
                <optgroup label="Cloud & Infrastructure">
                    <option>Cloud Engineer</option>
                    <option>Site Reliability Engineer (SRE)</option>
                    <option>System Administrator</option>
                </optgroup>
                <optgroup label="Cybersecurity">
                    <option>Cybersecurity Analyst</option>
                    <option>Penetration Tester</option>
                    <option>Security Engineer</option>
                    <option>Threat Intelligence Analyst</option>
                </optgroup>
                <optgroup label="Design">
                    <option>UI/UX Designer</option>
                    <option>Graphic Designer</option>
                </optgroup>
                <optgroup label="Other IT Roles">
                    <option>IT Support Specialist</option>
                    <option>Network Administrator</option>
                    <option>Database Administrator</option>
                    <option>Project Manager</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Employment Type
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
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

          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Preferred Location
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter your preferred location"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <label className="text-sm font-medium text-gray-700">Remote</label>
              <button
                onClick={() => setIsRemote((r) => !r)}
                className={`w-10 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
                  isRemote ? 'bg-blue-700 justify-end' : 'bg-gray-300 justify-start'
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Company Name</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              >
                <option value="" disabled>Select a company</option>
                <option>Amazon</option>
                <option>Google</option>
                <option>Microsoft</option>
                <option>Apple</option>
                <option>Meta</option>
                <option>Netflix</option>
                <option>Adobe</option>
                <option>Salesforce</option>
                <option>Oracle</option>
                <option>IBM</option>
                <option>TCS</option>
                <option>HCL</option>
                <option>Cognizant</option>
                <option>Accenture</option>
                <option>Tech Mahindra</option>
                <option>Wipro</option>
                <option>Capgemini</option>
                <option>Coforge</option>
                <option>Sonata Software</option>
                <option>Oracle</option>
                <option>Persistent Systems</option>
                <option>HCLTech</option>
                <option>Microsoft</option>
                <option>Cisco</option>
                <option>Cyient</option>
                <option>Infosys</option>
                <option>L&T Technology Services</option>
                <option>LTIMindtree</option>
                <option>Mphasis</option>
                <option>C-DAC</option>
                <option>NTT Data Payment Services</option>
                <option>Coforge</option>
                <option>DXC Technology</option>
                <option>Firstsource</option>
                <option>Honeywell</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Experience Level</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter years of experience"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Job Boards</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={jobBoard}
                onChange={(e) => setJobBoard(e.target.value)}
              >
                <option value="" disabled>Select a job board</option>
                <option>LinkedIn</option>
                <option>Indeed</option>
                <option>Glassdoor</option>
                <option>Monster</option>
                <option>Dice</option>
                <option>Naukri</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-lg font-medium shadow hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : `Submit`}
            </button>
            <button
              onClick={handleReset}
              className="border border-gray-400 px-6 py-2 rounded-lg hover:bg-gray-100"
            >
              Reset Filters
            </button>
          </div>
        </div>
      );
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#e3f2fd] flex">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content Area */}
    
    
<main className="flex-1 ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10 px-3 sm:px-6 md:px-10 py-10 flex justify-center items-start bg-gradient-to-br from-[#f9fafb] to-[#f0f4f8] min-h-screen">

  {/* 🔹 University Heading Section */}
  {/* 🔹 University Heading Section */}
<div className="absolute top-20 left-1/2 transform -translate-x-[38%] text-center">
  <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 text-transparent bg-clip-text drop-shadow-sm">
    Pondicherry University
  </h2>
  <p className="text-xl md:text-2xl text-gray-700 font-medium mt-3 tracking-wide">
    Department of Computer Science
  </p>
  <div className="mt-2 h-1 w-32 bg-gradient-to-r from-orange-500 to-yellow-400 mx-auto rounded-full"></div>
</div>




  {/* 🔸 Main Card */}
  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mt-44 space-y-8">
    
    {/* Header */}
    <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
      Job Boards
    </h1>

    {/* Profile Selector */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Profile <span className="text-red-500">*</span>
      </label>
      <select
        className="w-full border border-orange-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      >
        <option value="" disabled>Select Profile</option>
        <optgroup label="Software Engineering">
          <option>Junior Software Engineer</option>
          <option>Senior Software Engineer</option>
          <option>Full Stack Developer</option>
          <option>MERN Stack Developer</option>
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
        <optgroup label="Cybersecurity">
          <option>Cybersecurity Analyst</option>
          <option>Penetration Tester</option>
          <option>Security Engineer</option>
        </optgroup>
        <optgroup label="Management & Leadership">
          <option>Product Manager</option>
          <option>IT Manager</option>
          <option>IT Director</option>
          <option>VP of Engineering</option>
        </optgroup>
        <optgroup label="Design">
          <option>UI/UX Designer</option>
          <option>Graphic Designer</option>
        </optgroup>
      </select>
      <p className="text-xs text-gray-500 mt-1">Please select your profile.</p>
    </div>

    {/* Main Content Rendering */}
    {renderContent()}
  </div>
</main>

  </div>
);

};

export default RiseOnJobBoards;
