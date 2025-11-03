import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Code2, 
  Filter, 
  Search, 
  ExternalLink, 
  Clock, 
  Trophy, 
  Target,
  BookOpen,
  ChevronDown,
  Zap,
  TrendingUp
} from "lucide-react";
import { questions } from "../data/questions";

// Import assets
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

export default function CodingPage() {
  const { id } = useParams();
  const companyId = id ? id.toUpperCase() : "Top Companies";

  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["All", ...new Set(questions.map((q) => q.category))];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredQuestions = questions.filter((q) => {
    const difficultyMatch = filterDifficulty === "All" || q.difficulty === filterDifficulty;
    const categoryMatch = filterCategory === "All" || q.category === filterCategory;
    const searchMatch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       q.category.toLowerCase().includes(searchTerm.toLowerCase());
    return difficultyMatch && categoryMatch && searchMatch;
  }).sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "difficulty") {
      const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    }
    return 0;
  });

  const stats = {
    total: questions.length,
    easy: questions.filter(q => q.difficulty === "Easy").length,
    medium: questions.filter(q => q.difficulty === "Medium").length,
    hard: questions.filter(q => q.difficulty === "Hard").length,
    categories: categories.length - 1
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case "Easy": return <Zap className="w-4 h-4" />;
      case "Medium": return <Target className="w-4 h-4" />;
      case "Hard": return <TrendingUp className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
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
      <span className="ml-4 text-lg text-gray-600 font-medium">Loading coding challenges...</span>
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
      <aside className="fixed left-0 top-20 w-28 md:w-32 lg:w-40 h-[calc(100vh-5rem)] bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-4 md:p-6 border-r border-gray-600 flex flex-col items-center z-40 ">
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
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
             
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{companyId} Coding Challenges</h1>
                <p className="text-lg opacity-90">Master coding problems from top tech companies</p>
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
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Problems</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.easy}</div>
                <div className="text-sm text-gray-600">Easy</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.medium}</div>
                <div className="text-sm text-gray-600">Medium</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.hard}</div>
                <div className="text-sm text-gray-600">Hard</div>
              </motion.div>
              
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.categories}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Filters and Search Section */}
          <motion.div 
            className="p-8 border-b bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-800">Filter & Search</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white transition-all duration-300"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white transition-all duration-300"
                >
                  {["All", "Easy", "Medium", "Hard"].map((diff) => (
                    <option key={diff} value={diff}>
                      {diff === "All" ? "All Difficulties" : diff}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white transition-all duration-300"
                >
                  <option value="title">Sort by Title</option>
                  <option value="difficulty">Sort by Difficulty</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing <span className="font-semibold text-orange-600">{filteredQuestions.length}</span> of {questions.length} problems
            </div>
          </motion.div>

          {/* Questions Grid */}
          <div className="p-8">
            {filteredQuestions.length === 0 ? (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No problems found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
                <button 
                  onClick={() => {
                    setFilterCategory("All");
                    setFilterDifficulty("All");
                    setSearchTerm("");
                  }}
                  className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredQuestions.map((q, index) => (
                  <motion.a
                    key={q.id}
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                            {q.title}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium mt-1">{q.category}</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300 flex-shrink-0 ml-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full ${
                            q.difficulty === "Easy"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : q.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              : "bg-red-100 text-red-700 border border-red-200"
                          }`}
                        >
                          {getDifficultyIcon(q.difficulty)}
                          {q.difficulty}
                        </span>
                        
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>~30 min</span>
                        </div>
                      </div>

                      {/* Progress bar placeholder */}
                      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-pink-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Hover effect border */}
                    <div className="h-1 bg-gradient-to-r from-orange-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </div>

          {/* Bottom CTA Section */}
          <motion.div 
            className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready for More Challenges?</h3>
              <p className="text-gray-600 mb-6">Explore our other preparation resources</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/riseon-interview" 
                  className="px-8 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Back to Interview Prep
                </Link>
                <Link 
                  to="/theorypage" 
                  className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-xl font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Theory Questions
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}