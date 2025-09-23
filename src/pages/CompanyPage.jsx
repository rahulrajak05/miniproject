import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const sidebarVariants = {
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7 } },
};

const titleVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

export default function CompanyPage() {
  const { id } = useParams();
  const companyId = id ? id.toUpperCase() : "Company";

  const [companyData, setCompanyData] = useState({
    codingProblems: [],
    theoryQuestions: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        setCompanyData((prev) => ({ ...prev, loading: true }));
        // Replace this with your actual API call
        await new Promise((r) => setTimeout(r, 800));
        setCompanyData({
          codingProblems: [
            // "Two Sum",
            // "Reverse Linked List",
            // "Find Median",
          ],
          theoryQuestions: [
            // "Explain OOP concepts.",
            // "What is a REST API?",
            // "Describe normalization in DB.",
          ],
          loading: false,
          error: null,
        });
      } catch (err) {
        setCompanyData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load data.",
        }));
      }
    }
    fetchCompanyData();
  }, [companyId]);

  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        className="w-64 min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 shadow-xl text-white p-6 transition-all duration-300 ease-in-out border-r border-indigo-800"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <h2 className="text-3xl font-bold mb-10">Dashboard</h2>
        <nav className="space-y-6 text-lg font-semibold">
          <Link to="/myaccount" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Profile</Link>
          <Link to="/dashboard" className="block text-yellow-300 font-bold underline">Dashboard</Link>
          <Link to="/riseon-coverletter" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Forwarding letter</Link>
          <Link to="/companypage" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Interview</Link>
          <Link to="/riseon-job-boards" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Job Portals</Link>
          <Link to="/riseon-quiz" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300">Quiz</Link>
          <span className="block text-white/50">Counsellor (Coming Soon)</span>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Page Title */}
        <motion.h1
          className="text-3xl font-bold text-center text-orange-600 mb-8"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          {companyId} Preparation
        </motion.h1>

        {companyData.loading ? (
          <motion.div
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
        ) : companyData.error ? (
          <motion.div
            className="text-center text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {companyData.error}
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            {/* Coding Section */}
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col justify-between"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(59,130,246,0.15)" }}
            >
              <div>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  💻 Coding Section
                </h2>
                <p className="text-gray-700 mb-4">
                  <b>Practice coding questions commonly asked at</b> <b>{companyId}</b>.
                </p>
                <ul className="mb-6 list-disc list-inside text-gray-800">
                  {companyData.codingProblems.map((problem, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      {problem}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <Link
                to={`/codingpage`}
                className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition"
              >
                🚀 Start Coding
              </Link>
            </motion.section>

            {/* Theory Section */}
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col justify-between"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(16,185,129,0.15)" }}
            >
              <div>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">
                  📚 Theory Section
                </h2>
                <p className="text-gray-700 mb-4">
                  <b>Explore theory questions, interview Q&A, and key concepts important for </b><b>{companyId}</b>.
                </p>
                <ul className="mb-6 list-disc list-inside text-gray-800">
                  {companyData.theoryQuestions.map((question, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      {question}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <Link
                to={`/theorypage`}
                className="mt-auto px-4 py-2 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition"
              >
                📖 View Theory Question
              </Link>
            </motion.section>
          </motion.div>
        )}
      </div>
    </main>
  );
}