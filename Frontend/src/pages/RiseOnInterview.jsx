import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import profile from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";

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
    hrQuestions: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        setCompanyData((prev) => ({ ...prev, loading: true }));
        await new Promise((r) => setTimeout(r, 800));
        setCompanyData({
          codingProblems: ["Two Sum", "Reverse Linked List", "Find Median"],
          theoryQuestions: [
            "Explain OOP concepts.",
            "What is a REST API?",
            "Describe normalization in DB.",
          ],
          hrQuestions: [
            "Tell me about yourself.",
            "Why do you want to work here?",
            "Describe a challenge you faced and how you overcame it.",
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
      <aside className="w-28 md:w-32 lg:w-40 min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-4 md:p-6 border-r border-gray-600 flex flex-col items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-6 text-yellow-300 text-center">
                  
                </h2>
                <nav className="space-y-6 text-center">
                  <Link
                    to="/myaccount"
                    className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
                  >
                    <img src={profile} alt="Profile" className="w-10 h-10 rounded-full mb-1" />
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
      <div className="flex-1 p-8">
        <motion.h1
          className="text-3xl font-bold text-center text-orange-600 mb-8"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          {companyId} Preparation
        </motion.h1>

        {companyData.loading ? (
          <motion.div className="text-center text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            Loading...
          </motion.div>
        ) : companyData.error ? (
          <motion.div className="text-center text-red-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {companyData.error}
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" initial="hidden" animate="visible" variants={cardVariants}>
            
            {/* Coding Section */}
            <motion.section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col justify-between" whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(59,130,246,0.15)" }}>
              <div>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">💻 Coding Section</h2>
                <p className="text-gray-700 mb-4">
                  <b>Practice coding questions commonly asked at</b> <b>{companyId}</b>.
                </p>
                {/* <ul className="mb-6 list-disc list-inside text-gray-800">
                  {companyData.codingProblems.map((problem, idx) => (
                    <motion.li key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + idx * 0.1 }}>
                      {problem}
                    </motion.li>
                  ))}
                </ul> */}
              </div>
              <Link to={`/codingpage`} className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition">
                Start Coding
              </Link>
            </motion.section>

            {/* Theory Section */}
            <motion.section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col justify-between" whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(16,185,129,0.15)" }}>
              <div>
                <h2 className="text-2xl font-semibold text-green-600 mb-4"> Theory Section</h2>
                <p className="text-gray-700 mb-4">
                  <b>Explore theory questions, interview Q&A, and key concepts important for</b> <b>{companyId}</b>.
                </p>
                {/* <ul className="mb-6 list-disc list-inside text-gray-800">
                  {companyData.theoryQuestions.map((question, idx) => (
                    <motion.li key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + idx * 0.1 }}>
                      {question}
                    </motion.li>
                  ))}
                </ul> */}
              </div>
              <Link to={`/theorypage`} className="mt-auto px-4 py-2 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition">
                View Theory Questions
              </Link>
            </motion.section>

            {/* HR Interview Section */}
            <motion.section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col justify-between" whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(220,38,38,0.15)" }}>
              <div>
                <h2 className="text-2xl font-semibold text-red-600 mb-4"> HR Interview</h2>
                <p className="text-gray-700 mb-4">
                  <b>Prepare for common HR interview questions at</b> <b>{companyId}</b>.
                </p>
                {/* <ul className="mb-6 list-disc list-inside text-gray-800">
                  {companyData.hrQuestions.map((question, idx) => (
                    <motion.li key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + idx * 0.1 }}>
                      {question}
                    </motion.li>
                  ))}
                </ul> */}
              </div>
              <Link to={`/hrinterview`} className="mt-auto px-4 py-2 bg-red-600 text-white rounded-lg text-center hover:bg-red-700 transition">
                 Start HR Prep
              </Link>
            </motion.section>

          </motion.div>
        )}
      </div>
    </main>
  );
}
