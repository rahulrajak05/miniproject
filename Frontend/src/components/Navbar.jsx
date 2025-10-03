import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="logo"
            width="70"
          />
          <span className="text-3xl font-bold text-[#0B2C47]">
            Placement Guidance Resume
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-[#0B2C47]">
          {/* Add links here if needed */}
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate("/signup")} 
            className="bg-[#2CA5F6] text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-[#2CA5F6] text-[#2CA5F6] font-semibold px-5 py-2 rounded-full hover:bg-[#EAF6FD] transition"
          >
            Log In
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
