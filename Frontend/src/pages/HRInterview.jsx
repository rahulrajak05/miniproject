import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  MessageCircle, 
  Filter, 
  Search, 
  ChevronDown,
  Lightbulb,
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Brain,
  Star,
  BookOpen,
  Award
} from "lucide-react";
import pro from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";
import logo from "../assets/logo.png";
import { hrQuestions } from "../data/hrQuestions";

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

const HRInterviewPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(hrQuestions[0]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Get unique categories
  const categories = ["All", ...new Set(hrQuestions.map((q) => q.category || "General"))];

  // Filter questions
  const filteredQuestions = hrQuestions.filter((q) => {
    const categoryMatch = filterCategory === "All" || (q.category || "General") === filterCategory;
    const searchMatch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (q.category || "General").toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    total: hrQuestions.length,
    categories: categories.length - 1,
    completed: Math.floor(hrQuestions.length * 0.4),
    difficulty: {
      beginner: Math.floor(hrQuestions.length * 0.4),
      intermediate: Math.floor(hrQuestions.length * 0.4),
      advanced: Math.floor(hrQuestions.length * 0.2),
    }
  };

  const toggleCardExpansion = (index) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const LoadingSpinner = () => (
    <motion.div 
      className="flex items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <span className="ml-4 text-lg text-gray-600 font-medium">Loading HR interview questions...</span>
    </motion.div>
  );

  if (isLoading) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 pt-20">
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
    <main className="flex min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 pt-20">
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
          {[ 
            { to: "/myaccount", img: pro, label: "Account" },
            { to: "/dashboard", img: resume, label: "Dashboard" },
            { to: "/riseon-coverletter", img: letter, label: "Letter" },
            { to: "/riseon-interview", img: interview, label: "Interview" },
            { to: "/riseon-job-boards", img: job, label: "Jobs" },
            { to: "/riseon-quiz", img: quiz, label: "Quiz" },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="flex flex-col items-center text-white/80 hover:text-yellow-300 transition-all duration-300"
            >
              <img src={item.img} alt={item.label} className="w-10 h-10 rounded-full mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
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
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-transparent bg-clip-text drop-shadow-sm">
            Pondicherry University
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mt-3 tracking-wide">
            Department of Computer Science
          </p>
          <div className="mt-2 h-1 w-32 bg-gradient-to-r from-red-500 to-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Main Card Container */}
        <motion.div 
          className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Users size={32} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">HR Interview Preparation</h1>
                <p className="text-lg opacity-90">Master HR interview questions and boost your confidence</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <motion.div 
            className="bg-gradient-to-r from-red-50 to-pink-50 p-6 border-b"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.categories}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
                <div className="text-sm text-gray-600">Practiced</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
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
              <Filter className="w-5 h-5 text-red-500" />
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white transition-all duration-300"
                >
                  {categories.map((category, i) => (
                    <option key={i} value={category}>
                      {category === "All" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3">
                Showing <span className="font-semibold text-red-600 mx-1">{filteredQuestions.length}</span> of {hrQuestions.length} questions
              </div>
            </div>
          </motion.div>

          {/* Questions Grid */}
          <motion.div 
            className="p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredQuestions.map((item, idx) => {
                  const isExpanded = expandedCards.has(idx);
                  const category = item.category || "General";
                  
                  return (
                    <motion.div
                      key={idx}
                      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                      variants={itemVariants}
                      whileHover={{ y: -2 }}
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 border-b">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                              <Brain className="w-4 h-4 text-red-600" />
                            </div>
                            <span className="text-sm px-3 py-1 bg-red-200 text-red-700 rounded-full font-medium">
                              {category}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">4.8</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 leading-tight">
                          {item.question}
                        </h2>

                        <div className="space-y-4">
                          {/* Answer Section */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <h3 className="text-sm font-semibold text-gray-700">Sample Answer</h3>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {isExpanded ? item.answer : `${item.answer.substring(0, 150)}...`}
                              </p>
                            </div>
                          </div>

                          {/* Explanation Section */}
                          {item.explanation && (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Lightbulb className="w-4 h-4 text-yellow-500" />
                                <h3 className="text-sm font-semibold text-gray-700">Key Points</h3>
                              </div>
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {isExpanded ? item.explanation : `${item.explanation.substring(0, 100)}...`}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Expand/Collapse Button */}
                          <button
                            onClick={() => toggleCardExpansion(idx)}
                            className="w-full flex items-center justify-center gap-2 py-2 text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                          >
                            {isExpanded ? "Show Less" : "Show More"}
                            <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="bg-gray-50 px-6 py-3 border-t">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Est. 2-3 min read</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            <span>Interview Prep</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Bottom CTA Section */}
          <motion.div 
            className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready for Technical Interviews?</h3>
              <p className="text-gray-600 mb-6">Practice coding challenges and theory questions to complete your preparation</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/codingpage" 
                  className="px-8 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Practice Coding
                </Link>
                <Link 
                  to="/theorypage" 
                  className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Study Theory
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default HRInterviewPage;