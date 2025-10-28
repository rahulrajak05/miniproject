import React from "react";
import { Link, useLocation } from "react-router-dom";
import profile from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-28 md:w-32 lg:w-40 min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-4 md:p-6 border-r border-gray-600 flex flex-col items-center">
      
      {/* 🔹 Top Section with Logo */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <img
          src={logo}
          alt="University Logo"
          className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-full shadow-md"
        />
        <h1 className="text-lg font-bold text-yellow-300 tracking-wide">PU</h1>
      </div>

      {/* 🔹 Navigation (Just Below PU) */}
      <nav className="flex-1 space-y-6 text-center mt-2">
        <Link
          to="/myaccount"
          className={`flex flex-col items-center transition-all duration-300 ${
            isActive("/myaccount") ? "text-yellow-300" : "text-white/80 hover:text-yellow-300"
          }`}
        >
          <img src={profile} alt="Profile" className="w-10 h-10 rounded-full mb-1" />
          <span className="text-xs">Account</span>
        </Link>

        <Link
          to="/dashboard"
          className={`flex flex-col items-center transition-all duration-300 ${
            isActive("/dashboard") ? "text-yellow-300" : "text-white/80 hover:text-yellow-300"
          }`}
        >
          <img src={resume} alt="Dashboard" className="w-10 h-10 rounded-full mb-1" />
          <span className="text-xs">Dashboard</span>
        </Link>

        <Link
          to="/riseon-coverletter"
          className={`flex flex-col items-center transition-all duration-300 ${
            isActive("/riseon-coverletter") ? "text-yellow-300" : "text-white/80 hover:text-yellow-300"
          }`}
        >
          <img src={letter} alt="Letter" className="w-10 h-10 rounded-full mb-1" />
          <span className="text-xs">Letter</span>
        </Link>

        <Link
          to="/riseon-interview"
          className={`flex flex-col items-center transition-all duration-300 ${
            isActive("/riseon-interview") ? "text-yellow-300" : "text-white/80 hover:text-yellow-300"
          }`}
        >
          <img src={interview} alt="Interview" className="w-10 h-10 rounded-full mb-1" />
          <span className="text-xs">Interview</span>
        </Link>

        <Link
          to="/riseon-job-boards"
          className={`flex flex-col items-center transition-all duration-300 ${
            isActive("/riseon-job-boards") ? "text-yellow-300" : "text-white/80 hover:text-yellow-300"
          }`}
        >
          <img src={job} alt="Jobs" className="w-10 h-10 rounded-full mb-1" />
          <span className="text-xs">Jobs</span>
        </Link>

        <Link
          to="/riseon-quiz"
          className={`flex flex-col items-center transition-all duration-300 ${
            isActive("/riseon-quiz") ? "text-yellow-300" : "text-white/80 hover:text-yellow-300"
          }`}
        >
          <img src={quiz} alt="Quiz" className="w-10 h-10 rounded-full mb-1" />
          <span className="text-xs">Quiz</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
