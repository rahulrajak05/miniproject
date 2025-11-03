// src/pages/TheoryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Filter, 
  Search, 
  ChevronDown,
  Lightbulb,
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Code2
} from "lucide-react";
import { data1 } from "../data/data1.js";
import logo from "../assets/logo.png";
import pro from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
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

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function TheoryPage() {
  const { id } = useParams();
  const companyId = id ? id.toUpperCase() : "Top Companies";

  const [selectedQuestion, setSelectedQuestion] = useState(data1[0]);
  const [filterTopic, setFilterTopic] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Get unique topics
  const topics = ["All", ...new Set(data1.map((q) => q.topic))];

  // Filter by topic and search
  const filteredQuestions = data1.filter((q) => {
    const topicMatch = filterTopic === "All" || q.topic === filterTopic;
    const searchMatch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       q.description.toLowerCase().includes(searchTerm.toLowerCase());
    return topicMatch && searchMatch;
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    total: data1.length,
    topics: topics.length - 1,
    completed: Math.floor(data1.length * 0.3), // Simulated completion
    difficulty: {
      beginner: data1.filter(q => q.difficulty === "Beginner" || q.topic.includes("Basics")).length,
      intermediate: data1.filter(q => q.difficulty === "Intermediate" || q.topic.includes("Advanced")).length,
      expert: data1.filter(q => q.difficulty === "Expert" || q.topic.includes("Complex")).length,
    }
  };

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
      <span className="ml-4 text-lg text-gray-600 font-medium">Loading theory questions...</span>
    </motion.div>
  );

  if (isLoading) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 pt-20">
        <aside className="fixed left-0 top-20 w-28 md:w-32 lg:w-40 h-[calc(100vh-5rem)] bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-4 md:p-6 border-r border-gray-600 flex flex-col items-center z-40">
          <div className="flex flex-col items-center gap-2 mb-6">
            <img src={logo} alt="University Logo" className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-full shadow-md" />
            <h1 className="text-lg font-bold text-yellow-300 tracking-wide">PU</h1>
          </div>
        </aside>
        <div className="flex-1 ml-28 md:ml-32 lg:ml-40">
          <LoadingSpinner />
        </div>
      </main>
    );
  }

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
            <img src={pro} alt="Profile" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Account</span>
          </Link>

          <Link
            to="/dashboard"
            className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
          >
            <img src={resume} alt="Dashboard" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Dashboard</span>
          </Link>

          <Link
            to="/riseon-coverletter"
            className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
          >
            <img src={letter} alt="Letter" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Letter</span>
          </Link>

          <Link
            to="/riseon-interview"
            className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
          >
            <img src={interview} alt="Interview" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Interview</span>
          </Link>

          <Link
            to="/riseon-job-boards"
            className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
          >
            <img src={job} alt="Job" className="w-10 h-10 rounded-full mb-1" />
            <span className="text-xs">Jobs</span>
          </Link>

          <Link
            to="/riseon-quiz"
            className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
          >
            <img src={quiz} alt="Quiz" className="w-10 h-10 rounded-full mb-1" />
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
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{companyId} Theory Questions</h1>
                <p className="text-lg opacity-90">Master theoretical concepts and interview questions</p>
              </div>
            </div>
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
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.topics}</div>
                <div className="text-sm text-gray-600">Topics</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{Math.round((stats.completed / stats.total) * 100)}%</div>
                <div className="text-sm text-gray-600">Progress</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Filters Section */}
          <motion.div 
            className="p-8 border-b bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-800">Filter & Search</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              {/* Topic Filter */}
              <div className="relative">
                <select
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-all duration-300"
                >
                  {topics.map((topic, i) => (
                    <option key={i} value={topic}>
                      {topic === "All" ? "All Topics" : topic}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3">
                Showing <span className="font-semibold text-blue-600 mx-1">{filteredQuestions.length}</span> of {data1.length} questions
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row h-[600px]">
            {/* Left Panel - Questions List */}
            <motion.div 
              className="lg:w-1/3 border-r border-gray-200 overflow-y-auto bg-gray-50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Questions List
                </h3>

                <div className="space-y-3">
                  {filteredQuestions.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">No questions found</h4>
                      <p className="text-gray-500 text-sm">Try adjusting your filters or search terms</p>
                    </div>
                  ) : (
                    filteredQuestions.map((q, index) => (
                      <motion.div
                        key={q.id}
                        onClick={() => setSelectedQuestion(q)}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                          selectedQuestion.id === q.id
                            ? "bg-blue-100 border-blue-400 shadow-lg scale-[1.02]"
                            : "bg-white border-gray-200 hover:shadow-md hover:bg-gray-50 hover:border-blue-300"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">
                            {q.title}
                          </h4>
                          {selectedQuestion.id === q.id && (
                            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                            {q.topic}
                          </span>
                          <Clock className="w-3 h-3 text-gray-400" />
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Question Details */}
            <motion.div 
              className="lg:w-2/3 overflow-y-auto bg-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="p-8">
                {selectedQuestion ? (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Code2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                          {selectedQuestion.topic}
                        </span>
                      </div>
                      <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                        {selectedQuestion.title}
                      </h1>
                    </div>

                    <div className="prose prose-lg max-w-none">
                      <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-blue-500" />
                          Question Description
                        </h2>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                          <p className="text-gray-700 leading-relaxed">
                            {selectedQuestion.description}
                          </p>
                        </div>
                      </div>

                      {selectedQuestion.examples?.length > 0 && (
                        <div className="mb-8">
                          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-green-500" />
                            Examples
                          </h2>
                          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                            <ul className="space-y-2">
                              {selectedQuestion.examples.map((ex, i) => (
                                <li key={i} className="text-gray-700 flex items-start gap-2">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                  {ex}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {selectedQuestion.answer && (
                        <div className="mb-8">
                          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-orange-500" />
                            Answer / Key Points
                          </h2>
                          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                              {selectedQuestion.answer}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Question</h3>
                    <p className="text-gray-500">Choose a question from the list to view details</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA Section */}
          <motion.div 
            className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready for Coding Practice?</h3>
              <p className="text-gray-600 mb-6">Test your knowledge with hands-on coding challenges</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/codingpage" 
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Practice Coding
                </Link>
                <Link 
                  to="/riseon-interview" 
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Back to Interview Prep
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}