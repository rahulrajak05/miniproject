// src/pages/CodingPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { questions } from "../data/questions";
import pro from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";

export default function CodingPage() {
  const { id } = useParams();
  const companyId = id ? id.toUpperCase() : "Company";

  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", ...new Set(questions.map((q) => q.category))];

  const filteredQuestions = questions.filter((q) => {
    const difficultyMatch =
      filterDifficulty === "All" || q.difficulty === filterDifficulty;
    const categoryMatch =
      filterCategory === "All" || q.category === filterCategory;
    return difficultyMatch && categoryMatch;
  });

  return (
    <main className="flex min-h-screen bg-gray-100">
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
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">
          {companyId} Coding Questions
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {["All", "Easy", "Medium", "Hard"].map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        {/* Question List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestions.map((q) => (
            <a
              key={q.id}
              href={q.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105 border-l-4 border-orange-500"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-800">{q.title}</h3>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    q.difficulty === "Easy"
                      ? "bg-green-200 text-green-800"
                      : q.difficulty === "Medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {q.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-medium">{q.category}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
