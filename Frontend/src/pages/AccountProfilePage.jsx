import React, { useState } from "react";
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

export default function AccountProfilePage() {
  const { profile, setProfile } = useProfile();

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

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile handler
  const handleSaveProfile = async () => {
    try {
        const res = await axios.post("http://localhost:8081/save-profile", formData);
        alert(res.data.message || "Profile saved successfully!");
    } catch (err) {
        console.error("Error saving profile:", err.response?.data || err);
        alert("Error saving profile");
    }
  };

  return (

    
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50">

      
      {/* Sidebar */}
      <aside className="w-28 md:w-32 lg:w-40 min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-4 md:p-6 border-r border-gray-600 flex flex-col items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-6 text-yellow-300 text-center">
                  
                </h2>
                <nav className="space-y-6 text-center">
                  <Link
                    to="/myaccount"
                    className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
                  >
                    <img src={pro} alt="Profile" className="w-10 h-10 rounded-full mb-1" />
                    <span className="text-xs">Account</span>
                  </Link>
      
                  <Link
                    to="/dashboard"
                    className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
                  >
                    <img src={resume} alt="resume" className="w-10 h-10 rounded-full mb-1" />
                    <span className="text-xs">Dashboard</span>
                  </Link>
      
                  <Link
                    to="/riseon-coverletter"
                    className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
                  >
                    <img src={letter} alt="letter" className="w-10 h-10 rounded-full mb-1" />
                    <span className="text-xs">Letter</span>
                  </Link>
      
                  <Link
                    to="/riseon-interview"
                    className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
                  >
                    <img src={interview} alt="interview" className="w-10 h-10 rounded-full mb-1" />
                    <span className="text-xs">Interview</span>
                  </Link>
      
                  <Link
                    to="/riseon-job-boards"
                    className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
                  >
                    <img src={job} alt="job" className="w-10 h-10 rounded-full mb-1" />
                    <span className="text-xs">Jobs</span>
                  </Link>
      
                  <Link
                    to="/riseon-quiz"
                    className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
                  >
                    <img src={quiz} alt="quiz" className="w-10 h-10 rounded-full mb-1" />
                    <span className="text-xs">Quiz</span>
                  </Link>
                </nav>
              </div>
      
              {/* <div className="text-xs text-white/60 mt-6">© 2025</div> */}
            </aside>
      {/* Main Content */}
      <motion.main className="flex-1 p-6 md:p-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        {/* Personal Details */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <motion.div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200" variants={cardVariants} initial="hidden" animate="visible">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Details</h2>
            <div className="space-y-6">
              <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full border p-4 rounded-lg" />
              <input name="dob" value={formData.dob} onChange={handleChange} type="date" className="w-full border p-4 rounded-lg" />
              <input name="pronoun" value={formData.pronoun} onChange={handleChange} placeholder="Pronoun" className="w-full border p-4 rounded-lg" />
              <input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" className="w-full border p-4 rounded-lg" />
              <input name="city" value={formData.city} onChange={handleChange} placeholder="Current City" className="w-full border p-4 rounded-lg" />
              <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border p-4 rounded-lg" />
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full border p-4 rounded-lg" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border p-4 rounded-lg" />
              <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn Profile" className="w-full border p-4 rounded-lg" />
              <input name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="Github/Portfolio" className="w-full border p-4 rounded-lg" />
            </div>
          </motion.div>
        </div>

        {/* Education & Skills */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mt-12">
          <motion.div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Education</h2>
            <div className="space-y-6">
              <input name="education" value={formData.education} onChange={handleChange} placeholder="Highest Qualification" className="w-full border p-4 rounded-lg" />
              <input name="university" value={formData.university} onChange={handleChange} placeholder="University/College" className="w-full border p-4 rounded-lg" />
              <input name="graduationYear" value={formData.graduationYear} onChange={handleChange} placeholder="Year of Graduation" className="w-full border p-4 rounded-lg" />
            </div>
          </motion.div>

          <motion.div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Skills</h2>
            <div className="space-y-6">
              <input name="technicalSkills" value={formData.technicalSkills} onChange={handleChange} placeholder="Technical Skills" className="w-full border p-4 rounded-lg" />
              <input name="softSkills" value={formData.softSkills} onChange={handleChange} placeholder="Soft Skills" className="w-full border p-4 rounded-lg" />
            </div>
          </motion.div>
        </div>

        {/* Save/Cancel Buttons */}
        <motion.div className="flex items-center gap-6 mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}>
          <button onClick={handleSaveProfile} className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-xl font-medium shadow hover:scale-105 hover:opacity-90 transition">
            Save
          </button>
          <button className="border border-gray-300 px-8 py-3 rounded-xl hover:bg-gray-100 transition">
            Cancel
          </button>
        </motion.div>
      </motion.main>
    </div>
  );
}
