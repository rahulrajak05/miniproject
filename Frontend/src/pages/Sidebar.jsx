// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-screen fixed top-14 left-0 bg-gradient-to-b from-blue-500 to-indigo-700 shadow-xl text-white p-6 border-r border-indigo-800">
      <h2 className="text-3xl font-bold mb-10">Resume</h2>
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
  );
};

export default Sidebar;
