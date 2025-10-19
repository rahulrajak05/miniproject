import React from "react";
import { Link } from "react-router-dom";
import pro from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";
import { hrQuestions } from "../data/hrQuestions"; // import questions

const HRInterviewPage = () => {
  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
    <aside className="w-30 min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-6 transition-all duration-300 ease-in-out border-r border-gray-600">
          
            <h2 className="text-3xl font-bold mb-10"></h2>
            <nav className="space-y-6 text-lg font-semibold">
              <Link 
                to="/myaccount" 
                className="flex items-center gap-4 text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
              >
                <img 
                  src={pro} 
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
                to="/riseon-job-board" 
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

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">🧑‍💼 HR Interview Preparation</h1>
        <p className="text-gray-700 mb-8 text-center max-w-xl mx-auto">
          Practice important HR interview questions with answers and explanations to improve your confidence and perform well in interviews.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hrQuestions.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-red-600 mb-2">{item.question}</h2>
              <p className="text-gray-800 mb-2"><strong>Answer:</strong> {item.answer}</p>
              <p className="text-gray-600"><strong>Explanation:</strong> {item.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HRInterviewPage;
