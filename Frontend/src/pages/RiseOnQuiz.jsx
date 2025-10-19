// src/pages/RiseOnQuiz.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Added Link import
import { motion } from "framer-motion";

// Import your images
import profile from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";

const RiseOnQuiz = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "“Learning never exhausts the mind.” – Leonardo da Vinci",
    "“Push yourself, because no one else is going to do it for you.”",
    "“Success doesn’t come from what you do occasionally, but what you do consistently.”",
    "“Don’t just study for exams — study for knowledge.”",
  ];

  const topicsWithSubtopics = {
    "Data Structures": ["Queue", "Stack", "Linked List", "Tree", "Graph", "Heap"],
    "Java": ["OOP Concepts", "Collections", "Multithreading", "Exception Handling"],
    "Operating System": ["Processes", "Memory Management", "Scheduling", "Deadlock"],
    "Networking": ["TCP/IP", "ARP", "DNS", "Routing"],
    "DBMS": ["SQL Queries", "Normalization", "Transactions", "Joins"],
    "AI": ["Search", "Machine Learning", "Expert Systems", "Logic"],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    if (!topic || !subtopic || !difficulty) {
      alert("Please fill all fields before starting the quiz.");
      return;
    }
    // Navigate with topic, subtopic, and difficulty
    const path = `/quiz/${topic.toLowerCase().replace(/\s+/g, "-")}/${subtopic
      .toLowerCase()
      .replace(/\s+/g, "-")}/${difficulty.toLowerCase()}`;
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-28 md:w-32 lg:w-40 min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-4 md:p-6 border-r border-gray-600 flex flex-col items-center justify-between">
        <div>
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
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* HERO SECTION */}
        <section
          className="relative flex flex-col items-center justify-center text-center py-20 px-6 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1470&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
              Quiz Platform
            </h1>
            <p className="text-lg text-gray-100 mt-4 max-w-2xl mx-auto leading-relaxed">
              Challenge your knowledge, sharpen your skills, and rise above your limits.
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              className="mt-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-transform"
            >
              Start Learning
            </motion.button>
          </motion.div>
          <motion.p
            key={quoteIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-8 text-white/90 italic text-sm md:text-base"
          >
            {quotes[quoteIndex]}
          </motion.p>
        </section>

        {/* QUIZ SELECTION SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-grow flex items-center justify-center px-4 py-16"
        >
          <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 space-y-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-indigo-700">Take Your Quiz</h2>
            <p className="text-gray-600 text-center text-sm">
              Choose a topic, subtopic, and difficulty level to begin.
            </p>

            {/* Topic Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Select a Topic <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setSubtopic(""); // reset subtopic when topic changes
                }}
              >
                <option value="">Select a Topic</option>
                {Object.keys(topicsWithSubtopics).map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Subtopic Selection */}
            {topic && (
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Select a Subtopic <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  value={subtopic}
                  onChange={(e) => setSubtopic(e.target.value)}
                >
                  <option value="">Select a Subtopic</option>
                  {topicsWithSubtopics[topic].map((sub) => (
                    <option key={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Difficulty Selection */}
            {subtopic && (
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Difficulty Level <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="">Select Difficulty</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            )}

            <div className="pt-4 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleStart}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-transform"
              >
                Start Quiz
              </motion.button>
              <p className="text-xs text-gray-500 mt-2">Ready to rise above your limits?</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RiseOnQuiz;
