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
 <aside className="w-28 md:w-32 lg:w-40 min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-4 md:p-6 border-r border-gray-600 flex flex-col items-center justify-between">
         <div>
           <h2 className="text-lg font-bold mb-6 text-yellow-300 text-center">
             
           </h2>
           <nav className="space-y-6 text-center">
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
         </div>
 
         {/* <div className="text-xs text-white/60 mt-6">© 2025</div> */}
       </aside>
  );
};

export default Sidebar;