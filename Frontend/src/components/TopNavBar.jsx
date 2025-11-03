import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiFilePdfLine } from "react-icons/ri";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Make sure to have a logo image in the specified path  

const TopNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
   <div className="w-full bg-black text-white flex items-center justify-between px-4 py-3 border-b border-white fixed top-0 left-0 z-50">
  {/* 🔹 Logo + Title */}
  <div className="flex items-center space-x-3">
           <Link
             to="/home"
             aria-label="Go to home"
             className="block h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden ring-2 ring-white/20 bg-white shadow-sm flex-shrink-0"
           >
             <img
               src={logo}
               alt="NEXTSTEP logo"
               className="h-full w-full object-cover"
             />
           </Link>
           <div className="flex flex-col leading-tight">
             <span className="text-3xl font-bold text-white">
               NEXTSTEP
             </span>
             <span className="text-sm text-gray-300">
               Your Pathway to Career Success
             </span>
           </div>
         </div>

      {/* Right-side buttons */}
      <div className="flex items-center space-x-3">
        {/* PDF Setup */}
        <div className="relative">
          {/* <button className="bg-[#163a4d] hover:bg-[#1b4760] text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm">
            <RiFilePdfLine className="text-lg" />
            PDF Setup
          </button> */}
          {/* <span className="absolute top-[-12px] right-[-10px] bg-yellow-400 text-black text-[10px] px-1 rounded-full">
            Coming Soon
          </span> */}
        </div>

        {/* Preview */}
        {/* <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full">
          <MdOutlinePlayCircleFilled className="text-xl" />
        </button> */}

        {/* Publish */}
        {/* <button className="bg-[#163a4d] hover:bg-[#1b4760] text-white px-4 py-1 rounded-full flex items-center gap-2 text-sm">
          <AiOutlineCloudUpload className="text-lg" />
          Publish
        </button> */}

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-2 text-white focus:outline-none"
          >
            <FaUserCircle className="text-2xl" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 text-gray-800">
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                to="/myaccount"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Account
              </Link>

              <Link
                to="/home"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </Link>
              {/* <button
                onClick={() => alert("/home")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
