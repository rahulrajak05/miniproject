import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, BookOpen, Users, Star, Clock, Target, ArrowRight, Trophy, Building } from "lucide-react";
import profile from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";
import logo from "../assets/logo.png";

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7 } },
};

const titleVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function RiseOnInterview() {
  const { id } = useParams();
  const companyId = id ? id.toUpperCase() : "Your Dream Company";

  const [companyData, setCompanyData] = useState({
    codingProblems: [],
    theoryQuestions: [],
    hrQuestions: [],
    loading: true,
    error: null,
  });

  const [stats, setStats] = useState({
    totalQuestions: 450,
    companiesCovered: 50,
    successRate: 89,
    avgTime: 45
  });

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        setCompanyData((prev) => ({ ...prev, loading: true }));
        await new Promise((r) => setTimeout(r, 1200));
        setCompanyData({
          codingProblems: [
            "Array Manipulation & Two Pointers",
            "Dynamic Programming Challenges", 
            "Tree & Graph Traversal",
            "System Design Fundamentals"
          ],
          theoryQuestions: [
            "Object-Oriented Programming Principles",
            "Database Design & Optimization",
            "REST API Architecture & Best Practices",
            "Data Structures & Algorithm Complexity"
          ],
          hrQuestions: [
            "Tell me about your greatest achievement",
            "How do you handle challenging situations?",
            "Why are you interested in this role?",
            "Describe your ideal work environment"
          ],
          loading: false,
          error: null,
        });
      } catch (err) {
        setCompanyData((prev) => ({
          ...prev,
          loading: false,
          error: "Unable to load preparation materials. Please try again.",
        }));
      }
    }
    fetchCompanyData();
  }, [companyId]);

  const LoadingSpinner = () => (
    <motion.div 
      className="flex items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-orange-200 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <span className="ml-4 text-lg text-gray-600 font-medium">Loading preparation materials...</span>
    </motion.div>
  );

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 pt-20">
      {/* Enhanced Sidebar */}
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
            className="flex flex-col items-center text-yellow-300 transition-all duration-300"
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
      </aside>

      {/* Main Content */}
      <motion.div 
        className="flex-1 p-6 md:p-8 ml-28 md:ml-32 lg:ml-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 text-transparent bg-clip-text drop-shadow-sm">
            Pondicherry University
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mt-3 tracking-wide">
            Department of Computer Science
          </p>
          <div className="mt-2 h-1 w-32 bg-gradient-to-r from-orange-500 to-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Main Card Container */}
        <motion.div 
          className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-8 text-white">
            <motion.div 
              className="flex items-center gap-4 mb-4"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Building size={32} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{companyId} Interview Preparation</h1>
                <p className="text-lg opacity-90">Master your interview skills with comprehensive preparation</p>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div 
            className="bg-gray-50 p-6 border-b"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalQuestions}+</div>
                <div className="text-sm text-gray-600">Practice Questions</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.companiesCovered}+</div>
                <div className="text-sm text-gray-600">Companies Covered</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.successRate}%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.avgTime}min</div>
                <div className="text-sm text-gray-600">Avg. Prep Time</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="p-8">
            {companyData.loading ? (
              <LoadingSpinner />
            ) : companyData.error ? (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">Oops! Something went wrong</h3>
                <p className="text-gray-600 mb-6">{companyData.error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Coding Section */}
                <motion.section 
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 20px 40px rgba(59,130,246,0.15)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Code2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-600">Coding Section</h2>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Master coding challenges with our comprehensive collection of problems frequently asked at top tech companies.
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Key Focus Areas:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {companyData.codingProblems.map((problem, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.05 }}
                        >
                          <ArrowRight className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          {problem}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Link 
                      to="/codingpage" 
                      className="group w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-center font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      Start Coding Practice
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.section>

                {/* Theory Section */}
                <motion.section 
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 20px 40px rgba(16,185,129,0.15)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-600">Theory Section</h2>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Strengthen your conceptual knowledge with curated theory questions and detailed explanations.
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Core Topics:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {companyData.theoryQuestions.map((question, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + idx * 0.05 }}
                        >
                          <ArrowRight className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {question}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Link 
                      to="/theorypage" 
                      className="group w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-center font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      Explore Theory Questions
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.section>

                {/* HR Interview Section */}
                <motion.section 
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 20px 40px rgba(220,38,38,0.15)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-red-600">HR Interview</h2>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Ace your HR interviews with behavioral questions, situational scenarios, and proven answer strategies.
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Common Questions:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {companyData.hrQuestions.map((question, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                        >
                          <ArrowRight className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                          {question}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Link 
                      to="/hrinterview" 
                      className="group w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-center font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      Start HR Preparation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.section>
              </motion.div>
            )}
          </div>

          {/* Bottom CTA Section */}
          <motion.div 
            className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Start Your Journey?</h3>
              <p className="text-gray-600 mb-6">Join thousands of successful candidates who prepared with our platform</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/dashboard" 
                  className="px-8 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  View Dashboard
                </Link>
                <Link 
                  to="/riseon-quiz" 
                  className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-xl font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Take Practice Quiz
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
