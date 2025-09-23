import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

export default function AccountProfilePage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 shadow-xl text-white p-6 border-r border-indigo-800">
        <h2 className="text-3xl font-bold mb-10">Dashboard</h2>
        <nav className="space-y-6 text-lg font-semibold">
          <Link to="/myaccount" className="block text-yellow-300 font-bold underline">Profile</Link>
          <Link to="/dashboard" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Dashboard</Link>
          <Link to="/riseon-coverletter" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Forwarding letter</Link>
          <Link to="/riseon-interview" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Interview</Link>
          <Link to="/riseon-job-boards" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Job Portals</Link>
          <Link to="/riseon-quiz" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Quiz</Link>
          <span className="block text-white/50">Counsellor (Coming Soon)</span>
        </nav>
      </aside>

      {/* Main Content */}
      <motion.main
        className="flex-1 p-6 md:p-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Personal Details */}
          <motion.div
            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Personal Details <span className="ml-2 text-blue-400"></span>
            </h2>
            <div className="space-y-6">
              {[
                { label: "Full Name *", helper: "Click the lock icon to edit this field" },
                { label: "Date of Birth" },
                { label: "Pronoun" },
                { label: "Nationality" },
                { label: "Current City" },
                { label: "Address" },
              ].map(({ label, helper }, index) => (
                <div key={index}>
                  <label className="font-medium block mb-1">{label}</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  />
                  {helper && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Contact Information <span className="ml-2 text-blue-400"></span>
            </h2>
            <div className="space-y-6">
              {[
                { label: "Email Address" },
                { label: "Phone Number" },
                { label: "LinkedIn Profile" },
                { label: "Website/Portfolio" },
              ].map(({ label }, index) => (
                <div key={index}>
                  <label className="font-medium block mb-1">{label}</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* More Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mt-12">
          {/* Education */}
          <motion.div
            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Education <span className="ml-2 text-blue-400"></span>
            </h2>
            <div className="space-y-6">
              {[
                { label: "Highest Qualification" },
                { label: "University/College" },
                { label: "Year of Graduation" },
              ].map(({ label }, index) => (
                <div key={index}>
                  <label className="font-medium block mb-1">{label}</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Skills <span className="ml-2 text-blue-400"></span>
            </h2>
            <div className="space-y-6">
              <label className="font-medium block mb-1">Technical Skills</label>
              <input
                type="text"
                defaultValue=""
                placeholder="e.g. JavaScript, Python, React"
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <label className="font-medium block mb-1">Soft Skills</label>
              <input
                type="text"
                defaultValue=""
                placeholder="e.g. Communication, Leadership"
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center gap-6 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-xl font-medium shadow hover:scale-105 hover:opacity-90 transition">
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