// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import profile from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";
const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    {/* Sidebar */}
         <aside className="w-30 min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-6 transition-all duration-300 ease-in-out border-r border-gray-600">
         
           <h2 className="text-3xl font-bold mb-10"></h2>
           <nav className="space-y-6 text-lg font-semibold">
             <Link 
               to="/myaccount" 
               className="flex items-center gap-4 text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
             >
               <img 
                 src={profile} 
                 alt="Profile" 
                 className="w-10 h-10 rounded-full" 
               />
               
             </Link>
         
             <Link 
               to="/dashboard" 
               className="flex items-center gap-4 text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
             >
               <img 
                 src={resume} 
                 alt="resume" 
                 className="w-10 h-10 rounded-full" 
               />
               
             </Link>
         
             <Link 
               to="/riseon-coverletter" 
               className="flex items-center gap-4 text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
             >
               <img 
                 src={letter} 
                 alt="letter" 
                 className="w-10 h-10 rounded-full" 
               />
               
             </Link>
             
             <Link 
               to="/riseon-interview" 
               className="flex items-center gap-4 text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
             >
               <img 
                 src={interview} 
                 alt="letter" 
                 className="w-10 h-10 rounded-full" 
               />
               
             </Link>
             <Link 
               to="/riseon-job-boards" 
               className="flex items-center gap-4 text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
             >
               <img 
                 src={job} 
                 alt="job" 
                 className="w-10 h-10 rounded-full" 
               />
               
             </Link>
             <Link 
               to="/riseon-quiz" 
               className="flex items-center gap-4 text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
             >
               <img 
                 src={quiz} 
                 alt="quiz" 
                 className="w-10 h-10 rounded-full" 
               />
               
             </Link>
           </nav>
         </aside>
  );
};

export default Sidebar;
