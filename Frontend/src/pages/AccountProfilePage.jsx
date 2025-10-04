import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import bgImage from "../assets/background.jpg";
import { useProfile } from "../context/ProfileContext";


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
      // Save profile data to the backend
      const res = await axios.post("http://localhost:8081/save-profile", profile);
      alert(res.data.message || "Profile saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  return (

    
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50">

      
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 shadow-xl text-white p-6 border-r border-indigo-800">
        <h2 className="text-3xl font-bold mb-10">Resume</h2>
        <nav className="space-y-6 text-lg font-semibold">
          <Link to="/myaccount" className="block text-yellow-300 font-bold underline">Profile</Link>
          <Link to="/dashboard" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Resume</Link>
          <Link to="/riseon-coverletter" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Forwarding letter</Link>
          <Link to="/riseon-interview" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Interview</Link>
          <Link to="/riseon-job-boards" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Job Portals</Link>
          <Link to="/riseon-quiz" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Quiz</Link>
          <span className="block text-white/50">Counsellor (Coming Soon)</span>
        </nav>
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
