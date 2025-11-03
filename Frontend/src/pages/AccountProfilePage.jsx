import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import bgImage from "../assets/background.jpg";
import { useProfile } from "../context/ProfileContext";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";
import pro from "../assets/profile.png";
import logo from "../assets/logo.png";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

export default function AccountProfilePage() {
  const { profile, setProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  // State for all form fields
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    pronoun: "",
    nationality: "",
    city: "",
    address: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    education: "",
    university: "",
    graduationYear: "",
    technicalSkills: "",
    softSkills: ""
  });

  // Get logged-in user's email from localStorage or context
  const loggedInEmail = localStorage.getItem('userEmail') || profile?.email;

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      if (loggedInEmail) {
        try {
          const res = await axios.get(`http://localhost:8081/get-profile/${loggedInEmail}`);
          if (res.data.success) {
            setFormData(res.data.profile);
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
        }
      }
    };

    fetchProfileData();
  }, [loggedInEmail]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile handler
  const handleSaveProfile = async () => {
    try {
      const profileData = {
        ...formData,
        email: loggedInEmail
      };

      const res = await axios.post("http://localhost:8081/save-profile", profileData);
      
      if (res.data.success) {
        alert(res.data.message || "Profile saved successfully!");
        setProfile(profileData);
        setIsEditing(false);
      } else {
        alert("Error saving profile");
      }
    } catch (err) {
      console.error("Error saving profile:", err.response?.data || err);
      alert("Error saving profile");
    }
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  // Format date for display
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : 'Not specified';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 pt-20">
      {/* Sidebar */}
      <aside className="fixed left-0 top-20 w-28 md:w-32 lg:w-40 h-[calc(100vh-5rem)] bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-4 md:p-6 border-r border-gray-600 flex flex-col items-center z-40">
        <div className="flex flex-col items-center gap-2 mb-6">
          {/* <img
            src={logo}
            alt="University Logo"
            className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-full shadow-md"
          />
          <h1 className="text-lg font-bold text-yellow-300 tracking-wide">PU</h1> */}
        </div>

        <nav className="flex-1 space-y-6 text-center mt-2">
          <Link to="/myaccount" className="flex flex-col items-center text-yellow-300 transition-all duration-300">
            <img src={pro} alt="Profile" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Account</span>
          </Link>
          <Link to="/dashboard" className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300">
            <img src={resume} alt="resume" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link to="/riseon-coverletter" className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300">
            <img src={letter} alt="letter" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Letter</span>
          </Link>
          <Link to="/riseon-interview" className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300">
            <img src={interview} alt="interview" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Interview</span>
          </Link>
          <Link to="/riseon-job-boards" className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300">
            <img src={job} alt="job" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Jobs</span>
          </Link>
          <Link to="/riseon-quiz" className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300">
            <img src={quiz} alt="quiz" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Quiz</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <motion.main className="flex-1 ml-28 md:ml-32 lg:ml-40 p-6 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        
        {/* Profile Header Card */}
        <motion.div 
          className="bg-white rounded-3xl shadow-lg p-8 mb-8 relative overflow-hidden"
          variants={cardVariants} 
          initial="hidden" 
          animate="visible"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Profile Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {getInitials(formData.fullName)}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {formData.fullName || 'Your Name'}
                </h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
              
              <div className="space-y-2 text-gray-600">
                <p className="text-lg">
                  <span className="font-medium">{formData.education || 'Education'}</span>
                  {formData.university && ` at ${formData.university}`}
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {formData.city || 'Location'}, {formData.nationality || 'Country'}
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {loggedInEmail || 'Email not provided'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {isEditing ? (
          /* Edit Mode - Form Layout */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Personal Details */}
            <motion.div className="bg-white p-8 rounded-3xl shadow-lg" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Personal Details
              </h2>
              <div className="space-y-4">
                <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                <input name="dob" value={formData.dob} onChange={handleChange} type="date" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                <input name="pronoun" value={formData.pronoun} onChange={handleChange} placeholder="Pronoun (He/She/They)" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                <input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                <input name="city" value={formData.city} onChange={handleChange} placeholder="Current City" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" rows="3" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none" />
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div className="bg-white p-8 rounded-3xl shadow-lg" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact Information
              </h2>
              <div className="space-y-4">
                <input 
                  name="email" 
                  value={loggedInEmail || formData.email} 
                  placeholder="Email Address" 
                  className="w-full border border-gray-300 p-4 rounded-xl bg-gray-100 cursor-not-allowed" 
                  readOnly 
                />
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn Profile URL" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                <input name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="Github/Portfolio URL" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
            </motion.div>

            {/* Education */}
            <motion.div className="bg-white p-8 rounded-3xl shadow-lg" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Education
              </h2>
              <div className="space-y-4">
                <input name="education" value={formData.education} onChange={handleChange} placeholder="Highest Qualification (e.g., B.Tech, M.Tech)" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                <input name="university" value={formData.university} onChange={handleChange} placeholder="University/College Name" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                <input name="graduationYear" value={formData.graduationYear} onChange={handleChange} placeholder="Year of Graduation" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div className="bg-white p-8 rounded-3xl shadow-lg" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Skills
              </h2>
              <div className="space-y-4">
                <textarea name="technicalSkills" value={formData.technicalSkills} onChange={handleChange} placeholder="Technical Skills (e.g., JavaScript, React, Node.js, Python)" rows="4" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none" />
                <textarea name="softSkills" value={formData.softSkills} onChange={handleChange} placeholder="Soft Skills (e.g., Leadership, Communication, Problem Solving)" rows="4" className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none" />
              </div>
            </motion.div>
          </div>
        ) : (
          /* View Mode - Profile Display */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Information */}
            <motion.div className="bg-white p-8 rounded-3xl shadow-lg" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Personal Information
              </h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Date of Birth</p>
                  <p className="text-lg font-medium">{formatDate(formData.dob)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Pronoun</p>
                  <p className="text-lg font-medium">{formData.pronoun || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Address</p>
                  <p className="text-lg font-medium">{formData.address || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Phone</p>
                  <p className="text-lg font-medium">{formData.phone || 'Not provided'}</p>
                </div>
              </div>
            </motion.div>

            {/* Education & Links */}
            <motion.div className="bg-white p-8 rounded-3xl shadow-lg" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Education & Links
              </h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Graduation Year</p>
                  <p className="text-lg font-medium">{formData.graduationYear || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">LinkedIn</p>
                  {formData.linkedin ? (
                    <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-blue-600 hover:underline break-all">
                      View Profile
                    </a>
                  ) : (
                    <p className="text-lg font-medium">Not provided</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Portfolio/GitHub</p>
                  {formData.portfolio ? (
                    <a href={formData.portfolio} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-blue-600 hover:underline break-all">
                      View Portfolio
                    </a>
                  ) : (
                    <p className="text-lg font-medium">Not provided</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div className="bg-white p-8 rounded-3xl shadow-lg" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Skills
              </h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide mb-3">Technical Skills</p>
                  <div className="text-gray-600">
                    {formData.technicalSkills ? (
                      <div className="flex flex-wrap gap-2">
                        {formData.technicalSkills.split(',').map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-lg font-medium">Not specified</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide mb-3">Soft Skills</p>
                  <div className="text-gray-600">
                    {formData.softSkills ? (
                      <div className="flex flex-wrap gap-2">
                        {formData.softSkills.split(',').map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-lg font-medium">Not specified</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Action Buttons - Only show in edit mode */}
        {isEditing && (
          <motion.div 
            className="flex items-center gap-6 mt-8 justify-center"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <button 
              onClick={handleSaveProfile} 
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save Profile
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Cancel
            </button>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}
