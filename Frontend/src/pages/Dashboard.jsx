import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../assets/background.jpg"; // page background image

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useProfile } from "../context/ProfileContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { educationList, workList, abilities, portfolioList, Preferences } =
    useProfile();

  // State to manage the active dataset for the chart
  const [activeDataset, setActiveDataset] = useState("all");

  // Example analytics data (could come from API / context in real app)
  const analytics = {
    labels: [
      "1 Oct",
      "3 Oct",
      "7 Oct",
      "10 Oct",
      "14 Oct",
      "20 Oct",
      "23 Oct",
      "27 Oct",
      "30 Oct",
    ],
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
        borderColor: "#F472B6",
        backgroundColor: "rgba(244,114,182,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Downloads",
        data: analytics.downloads,
        borderColor: "#6EE7B7",
        backgroundColor: "rgba(110,231,183,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Queries",
        data: analytics.queries,
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96,165,250,0.2)",
        fill: true,
        tension: 0.4,
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
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const profiles = [
    {
      id: 1,
      name: "Mr RAHUL RAJAK",
      status: "Published",
      updatedAt: "2nd June 2025",
      tagline:
        "Aspiring Full Stack Developer with a Passion for Agri-Tech Innovations",
      desiredRole: Preferences?.desiredRole || "Full Stack Developer",
      topSkill:
        abilities?.length > 0
          ? `${abilities[0]?.name} (${abilities[0]?.level})`
          : "Not Added",
      education:
        educationList?.length > 0
          ? `${educationList[0]?.degree} in ${educationList[0]?.specialization} at ${educationList[0]?.school}`
          : "Not Added",
      experience:
        workList?.length > 0
          ? `${workList[0]?.jobTitle} at ${workList[0]?.company}`
          : "Not Added",
      project:
        portfolioList?.length > 0
          ? portfolioList[0]?.projectName
          : "Not Added",
      yearsOfExp: "1 year",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    
    <div
  className="flex min-h-screen font-sans text-gray-800"
  style={{
          backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>



      
      {/* Sidebar */}

  <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 shadow-xl text-white p-6 transition-all duration-300 ease-in-out border-r border-indigo-800">
  <h2 className="text-3xl font-bold mb-10">Dashboard</h2>
  <nav className="space-y-6 text-lg font-semibold">
    <Link 
      to="/myaccount" 
      className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
    >
      Profile
    </Link>
    <Link 
      to="/dashboard" 
      className="block text-yellow-300 font-bold underline"
    >
      Resume
    </Link>
    <Link 
      to="/riseon-coverletter" 
      className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
    >
      Forwarding letter
    </Link>
    <Link 
      to="/riseon-interview" 
      className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
    >
      Interview
    </Link>
    <Link 
      to="/riseon-job-boards" 
      className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
    >
      Job Portals
    </Link>
    <Link 
      to="/riseon-quiz" 
      className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
    >
      Quiz
    </Link>
    <span className="block text-white/50">Counsellor (Coming Soon)</span>
  </nav>
</aside>




      {/* Main Content */}
      
      <main className="flex-1 p-10 space-y-12 bg-transparent">
        
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-slate-800 tracking-tight"
        >
          Dashboard
        </motion.h1>

        {/* Profile Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => navigate("/myprofile")}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {profile.name}{" "}
                <span className="text-green-600 text-base ml-2 font-medium">
                  {profile.status}
                </span>
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Last Updated on: {profile.updatedAt}
              </p>
              <div className="mt-4 bg-gray-50 p-4 rounded-xl text-sm text-left space-y-2 h-40 overflow-auto border border-gray-100">
                <p className="text-xs text-gray-600 italic">"{profile.tagline}"</p>
                <p>
                  <span className="font-semibold text-gray-700">Desired Role:</span>{" "}
                  {profile.desiredRole}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Top Skill:</span>{" "}
                  {profile.topSkill}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Education:</span>{" "}
                  {profile.education}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Experience:</span>{" "}
                  {profile.experience}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Project:</span> {profile.project}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300"
                  onClick={(e) => { e.stopPropagation(); navigate("/myprofile"); }}
                >
                  Edit Profile
                </button>
                <button
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
                  onClick={(e) => { e.stopPropagation(); navigate("/resume-preview"); }}
                >
                  Resume Preview
                </button>
              </div>
            </motion.div>
          ))}

          {/* Empty Profile Slot */}
          {profiles.length < 2 && (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl border-dashed border-2 border-gray-300 text-center flex flex-col justify-center items-center p-8 hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-xl text-gray-700">
                No Profile Found!
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                You can add up to 2 profiles
              </p>
              <div className="mt-6 h-32 w-32 bg-orange-100 flex items-center justify-center rounded-full text-5xl border-4 border-white shadow-inner">
                📋
              </div>
              <button
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
                onClick={() => navigate("/myprofile")}
              >
                Let's get Started
              </button>
            </motion.div>
          )}

          {/* Coming Soon slot */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-100 rounded-3xl shadow-xl p-8 text-gray-400 relative"
          >
            <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold">
              Coming Soon
            </div>
            <h3 className="font-bold text-xl text-gray-500">Profile 2</h3>
            <p className="text-sm mt-1">Last Updated on: 11th May 2024</p>
            <div className="mt-6 h-40 bg-gray-300 rounded-xl opacity-50 flex items-center justify-center">
              [Disabled Preview]
            </div>
            <p className="mt-4 text-sm text-gray-500">Years of Experience: 10–15 years</p>
            <p className="text-sm text-gray-500">Desired Role: UX Director, Head of UX</p>
            <button
              className="mt-6 px-6 py-3 bg-gray-300 text-white rounded-full cursor-not-allowed"
              disabled
            >
              Edit
            </button>
          </motion.div>
        </motion.div>

        {/* Analytics Chart */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Analytics
          </h2>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveDataset("all")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeDataset === "all" ? "bg-blue-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveDataset("views")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeDataset === "views" ? "bg-pink-500 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Views
            </button>
            <button
              onClick={() => setActiveDataset("downloads")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeDataset === "downloads" ? "bg-green-500 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Downloads
            </button>
            <button
              onClick={() => setActiveDataset("queries")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeDataset === "queries" ? "bg-blue-500 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Queries
            </button>
          </div>
          <Line data={getFilteredChartData()} options={chartOptions} />
          <div className="mt-8 text-center">
            <p className="text-lg font-bold text-gray-600">Lifetime</p>
            <p className="text-sm text-gray-500">
              {analytics.lifetime.startDate} - Today
            </p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-6 text-base font-medium">
              <span className="text-pink-500 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div> {analytics.lifetime.views} Views
              </span>
              <span className="text-green-500 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> {analytics.lifetime.downloads} Downloads
              </span>
              <span className="text-blue-500 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div> {analytics.lifetime.queries} Queries
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;