// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-950/90 shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">RiseOn</h2>
        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className={`block transition-all duration-300 ${
              isActive("/dashboard")
                ? "text-yellow-300 font-bold underline"
                : "text-white/80 hover:text-yellow-300 hover:underline"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/job-boards"
            className={`block transition-all duration-300 ${
              isActive("/job-boards")
                ? "text-yellow-300 font-bold underline"
                : "text-white/80 hover:text-yellow-300 hover:underline"
            }`}
          >
            Job Boards
          </Link>

          <Link
            to="/cover-letter"
            className={`block transition-all duration-300 ${
              isActive("/cover-letter")
                ? "text-yellow-300 font-bold underline"
                : "text-white/80 hover:text-yellow-300 hover:underline"
            }`}
          >
            Cover Letter
          </Link>

          <Link
            to="/resume"
            className={`block transition-all duration-300 ${
              isActive("/resume")
                ? "text-yellow-300 font-bold underline"
                : "text-white/80 hover:text-yellow-300 hover:underline"
            }`}
          >
            Resume
          </Link>
        </nav>
      </div>

      <div>
        <button className="w-full py-2 bg-red-600 rounded-lg hover:bg-red-700 transition">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
