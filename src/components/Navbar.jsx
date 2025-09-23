import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RB from "../assets/RB.png";


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <img
    src={RB}
    alt="logo1"
    width="400"
  />
  

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-[#0B2C47]">
        <div className="relative group cursor-pointer">
          
          {/* <span className="font-semibold"> */}
            {/* <select>
            Resume<span className="text-orange-500">ON</span> Suite
            <option>ResumeON Profile</option>
            <option>ResumeON Studio</option>
            <option>ResumeON Dashboard</option>
            <option>ResumeON Cover</option>
            </select> */}
          {/* </span>  */}
          {/* <span className="ml-1">&#x25BE;</span> */}
        </div>
        {/* <Link to="/pricing" className="hover:text-blue-600">Pricing</Link> */}
        {/* <Link to="/pricing" className="hover:text-blue-600">Pricing</Link>
        <a href="#" className="hover:text-blue-600">About Us</a>
        <a href="#" className="hover:text-blue-600">Blogs</a> */}
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-4">

        <button 
        onClick={() => navigate("/home")} 
        className="bg-[#2CA5F6] text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 transition">
          Home
        </button>
        <button 
        onClick={() => navigate("/signup")} 
        className="bg-[#2CA5F6] text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 transition">
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
