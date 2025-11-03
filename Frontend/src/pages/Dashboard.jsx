import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, 
  FiSettings, 
  FiTrendingUp, 
  FiEye,
  FiDownload,
  FiMessageSquare,
  FiPlus,
  FiEdit3,
  FiExternalLink,
  FiBell,
  FiSearch,
  FiCalendar
} from "react-icons/fi";
import { 
  MdVerified, 
  MdTrendingUp, 
  MdNotifications,
  MdDashboard 
} from "react-icons/md";
import profile from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";
import logo from "../assets/logo.png";
import bgImage from "../assets/background.jpg";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useProfile } from "../context/ProfileContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 12
    } 
  },
};

const cardHover = {
  scale: 1.02,
  y: -8,
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  transition: { duration: 0.3 }
};

// Enhanced Profile Card Component
const ProfileCard = ({ profile, onEdit, onPreview }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20 group cursor-pointer relative overflow-hidden"
    onClick={onEdit}
    whileHover={cardHover}
  >
    {/* Background Gradient */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
    
    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
            <motion.span 
              className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <MdVerified className="w-3 h-3" />
              {profile.status}
            </motion.span>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FiCalendar className="w-3 h-3" />
            Updated: {profile.updatedAt}
          </p>
        </div>
        <motion.button
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            // Handle settings
          }}
        >
          <FiSettings className="w-4 h-4 text-gray-600" />
        </motion.button>
      </div>

      {/* Tagline */}
      <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <p className="text-sm text-gray-700 italic font-medium">"{profile.tagline}"</p>
      </div>

      {/* Profile Details */}
      <div className="space-y-3 mb-6 h-32 overflow-y-auto">
        <ProfileDetail label="Desired Role" value={profile.desiredRole} />
        <ProfileDetail label="Top Skill" value={profile.topSkill} />
        <ProfileDetail label="Education" value={profile.education} />
        <ProfileDetail label="Experience" value={profile.experience} />
        <ProfileDetail label="Project" value={profile.project} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <motion.button
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <FiEdit3 className="w-4 h-4" />
          Edit Profile
        </motion.button>
        <motion.button
          className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
        >
          <FiEye className="w-4 h-4" />
          Preview
        </motion.button>
      </div>
    </div>
  </motion.div>
);

// Profile Detail Component
const ProfileDetail = ({ label, value }) => (
  <div className="flex justify-between items-start">
    <span className="text-xs text-gray-500 font-medium min-w-fit pr-2">{label}:</span>
    <span className="text-xs text-gray-700 text-right">{value}</span>
  </div>
);

// Empty Profile Card Component
const EmptyProfileCard = ({ onGetStarted }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-300 text-center flex flex-col justify-center items-center p-8 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 group"
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <motion.div
      className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <span className="text-4xl">📋</span>
    </motion.div>
    <h3 className="font-bold text-xl text-gray-700 mb-2">Create Your Profile</h3>
    <p className="text-sm text-gray-500 mb-6 max-w-xs">
      Build a professional profile to showcase your skills and experience
    </p>
    <motion.button
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onGetStarted}
    >
      <FiPlus className="w-4 h-4" />
      Get Started
    </motion.button>
  </motion.div>
);

// Analytics Card Component
const AnalyticsCard = ({ analytics, activeDataset, setActiveDataset, chartData, chartOptions, getFilteredChartData }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20"
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">Track your profile performance</p>
      </div>
      <motion.div
        className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <FiTrendingUp className="w-6 h-6 text-white" />
      </motion.div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard
        icon={<FiEye />}
        label="Total Views"
        value={analytics.lifetime.views}
        color="pink"
        isActive={activeDataset === "views"}
        onClick={() => setActiveDataset("views")}
      />
      <StatCard
        icon={<FiDownload />}
        label="Downloads"
        value={analytics.lifetime.downloads}
        color="green"
        isActive={activeDataset === "downloads"}
        onClick={() => setActiveDataset("downloads")}
      />
      <StatCard
        icon={<FiMessageSquare />}
        label="Queries"
        value={analytics.lifetime.queries}
        color="blue"
        isActive={activeDataset === "queries"}
        onClick={() => setActiveDataset("queries")}
      />
    </div>

    {/* Filter Buttons */}
    <div className="flex flex-wrap gap-3 mb-6">
      {[
        { key: "all", label: "All Data", color: "gray" },
        { key: "views", label: "Views", color: "pink" },
        { key: "downloads", label: "Downloads", color: "green" },
        { key: "queries", label: "Queries", color: "blue" }
      ].map((filter) => (
        <motion.button
          key={filter.key}
          onClick={() => setActiveDataset(filter.key)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
            activeDataset === filter.key
              ? `bg-${filter.color}-500 text-white shadow-lg`
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>

    {/* Chart */}
    <div className="bg-gray-50 p-6 rounded-2xl">
      <Line data={getFilteredChartData()} options={chartOptions} />
    </div>

    {/* Lifetime Stats */}
    <div className="mt-6 text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
      <h4 className="text-lg font-bold text-gray-800 mb-2">Lifetime Statistics</h4>
      <p className="text-sm text-gray-600 mb-4">
        {analytics.lifetime.startDate} - Today
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <StatBadge color="pink" value={analytics.lifetime.views} label="Views" />
        <StatBadge color="green" value={analytics.lifetime.downloads} label="Downloads" />
        <StatBadge color="blue" value={analytics.lifetime.queries} label="Queries" />
      </div>
    </div>
  </motion.div>
);

// Stat Card Component
const StatCard = ({ icon, label, value, color, isActive, onClick }) => {
  const colorClasses = {
    pink: "from-pink-500 to-rose-500",
    green: "from-green-500 to-emerald-500",
    blue: "from-blue-500 to-cyan-500"
  };

  return (
    <motion.div
      className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
        isActive 
          ? `bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg` 
          : "bg-gray-50 hover:bg-gray-100"
      }`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          isActive ? "bg-white/20" : `bg-gradient-to-br ${colorClasses[color]} text-white`
        }`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        <div>
          <p className={`text-sm font-medium ${isActive ? "text-white/80" : "text-gray-600"}`}>
            {label}
          </p>
          <p className={`text-xl font-bold ${isActive ? "text-white" : "text-gray-800"}`}>
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Stat Badge Component
const StatBadge = ({ color, value, label }) => {
  const colorClasses = {
    pink: "bg-pink-500",
    green: "bg-green-500",
    blue: "bg-blue-500"
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colorClasses[color]}`}></div>
      <span className="font-semibold text-gray-800">{value.toLocaleString()}</span>
      <span className="text-gray-600">{label}</span>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const { educationList, workList, abilities, portfolioList, Preferences } = useProfile();
  const [activeDataset, setActiveDataset] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const analytics = {
    labels: ["1 Oct", "3 Oct", "7 Oct", "10 Oct", "14 Oct", "20 Oct", "23 Oct", "27 Oct", "30 Oct"],
    views: [400, 320, 200, 300, 350, 330, 360, 340, 370],
    downloads: [250, 150, 1000, 400, 480, 430, 460, 490, 430],
    queries: [250, 240, 230, 210, 220, 250, 230, 210, 250],
    lifetime: {
      views: 2383,
      downloads: 3899,
      queries: 2036,
      startDate: "January 23, 2019",
    },
  };

  const chartData = {
    labels: analytics.labels,
    datasets: [
      {
        label: "Views",
        data: analytics.views,
        borderColor: "#EC4899",
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#EC4899",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: "Downloads",
        data: analytics.downloads,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: "Queries",
        data: analytics.queries,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const getFilteredChartData = () => {
    if (activeDataset === "all") {
      return chartData;
    }
    const filteredDatasets = chartData.datasets.filter(
      (ds) => ds.label.toLowerCase() === activeDataset
    );
    return { ...chartData, datasets: filteredDatasets };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        intersect: false,
        mode: 'index',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { 
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        }
      },
    },
    elements: {
      point: {
        hoverRadius: 8,
      }
    }
  };

  const profiles = [
    {
      id: 1,
      name: "Profile 1",
      status: "Published",
      updatedAt: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      tagline: "Aspiring Full Stack Developer with a Passion for Agri-Tech Innovations",
      desiredRole: Preferences?.desiredRole || "Not Added",
      topSkill: abilities?.length > 0 ? `${abilities[0]?.name} (${abilities[0]?.level})` : "Not Added",
      education: educationList?.length > 0 ? `${educationList[0]?.degree} in ${educationList[0]?.specialization} at ${educationList[0]?.school}` : "Not Added",
      experience: workList?.length > 0 ? `${workList[0]?.jobTitle} at ${workList[0]?.company}` : "Not Added",
      project: portfolioList?.length > 0 ? portfolioList[0]?.projectName : "Not Added",
      yearsOfExp: "1 year",
    },
  ];

  return (
    <div
      className="flex min-h-screen font-sans text-gray-800 pt-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Sidebar - Fixed like Account Page */}
      <aside className="fixed left-0 top-20 w-28 md:w-32 lg:w-40 h-[calc(100vh-5rem)] bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-4 md:p-6 border-r border-gray-600 flex flex-col items-center z-40">
        {/* 🔹 Top Section with Logo */}
        <div className="flex flex-col items-center gap-2 mb-6">
          {/* <img
            src={logo}
            alt="University Logo"
            className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-full shadow-md"
          /> */}
          {/* <h1 className="text-lg font-bold text-yellow-300 tracking-wide">PU</h1> */}
        </div>

        {/* 🔹 Navigation (Right Below PU) */}
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
      </aside>

      {/* Main Content - ENHANCED */}
  <main className="flex-1 overflow-hidden ml-0 md:ml-32 lg:ml-40">
        {/* Header Bar */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-8 py-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 text-sm">
                {currentTime.toLocaleDateString("en-US", { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
          </div>
        </motion.div>

        <div className="p-8 space-y-8 max-h-screen overflow-y-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Welcome to Pondicherry University
            </h2>
            <p className="text-xl text-gray-700 font-medium">
              Department of Computer Science - Student Career Portal
            </p>
          </motion.div>

          {/* Profile Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onEdit={() => navigate("/myprofile")}
                onPreview={() => navigate("/resume-preview")}
              />
            ))}

            {profiles.length < 2 && (
              <EmptyProfileCard onGetStarted={() => navigate("/myprofile")} />
            )}

            {/* Coming Soon Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-lg p-6 relative overflow-hidden opacity-75"
            >
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                Coming Soon
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⏳</span>
                </div>
                <h3 className="font-bold text-xl text-gray-500 mb-2">Profile 2</h3>
                <p className="text-sm text-gray-400 mb-4">Advanced Profile Features</p>
                <div className="space-y-2 text-xs text-gray-400">
                  <p>• Multiple Resume Templates</p>
                  <p>• AI-Powered Recommendations</p>
                  <p>• Advanced Analytics</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Analytics Section */}
          <AnalyticsCard
            analytics={analytics}
            activeDataset={activeDataset}
            setActiveDataset={setActiveDataset}
            chartData={chartData}
            chartOptions={chartOptions}
            getFilteredChartData={getFilteredChartData}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;