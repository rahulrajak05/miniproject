// src/pages/TheoryPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { data1 } from "../data/data1.js"; // large dataset of theory questions
import pro from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";
export default function TheoryPage() {
  const { id } = useParams();
  const companyId = id ? id.toUpperCase() : "Company";

  const [selectedQuestion, setSelectedQuestion] = useState(data1[0]);
  const [filterTopic, setFilterTopic] = useState("All");

  // Get unique topics from data1
  const topics = ["All", ...new Set(data1.map((q) => q.topic))];

  // Filter questions based on selected topic
  const filteredQuestions =
    filterTopic === "All"
      ? data1
      : data1.filter((q) => q.topic === filterTopic);

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
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Panel - Questions List */}
        <div className="md:w-1/3 border-r border-gray-200 p-6 h-screen overflow-y-auto bg-white shadow-sm">
          <h2 className="text-2xl font-bold text-orange-600 mb-6 tracking-wide">
            {companyId} Theory Questions
          </h2>

          {/* Topic Filter */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Topic:
            </label>
            <select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            >
              {topics.map((topic, i) => (
                <option key={i} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedQuestion(q)}
                className={`p-4 rounded-lg cursor-pointer transition-shadow border ${
                  selectedQuestion.id === q.id
                    ? "bg-blue-50 border-blue-400 shadow-md"
                    : "bg-white border-gray-200 hover:shadow hover:bg-gray-50"
                }`}
              >
                <h3 className="font-semibold text-gray-800">{q.title}</h3>
                <span className="text-sm text-gray-500">{q.topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Question Details */}
        <div className="md:w-2/3 p-8 flex flex-col h-screen overflow-y-auto">
          <h1 className="text-3xl font-bold text-orange-600 mb-4 tracking-wide">
            {selectedQuestion.title}
          </h1>
          <p className="text-gray-700 mb-6 text-lg">{selectedQuestion.description}</p>

          {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-xl mb-3">Examples:</h2>
              <ul className="list-disc list-inside space-y-1">
                {selectedQuestion.examples.map((ex, i) => (
                  <li key={i} className="text-gray-600">
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedQuestion.answer && (
            <div className="mb-6">
              <h2 className="font-semibold text-xl mb-3">Answer / Key Points:</h2>
              <div className="text-gray-800 bg-gray-100 p-6 rounded-lg shadow-inner whitespace-pre-wrap leading-relaxed">
                {selectedQuestion.answer}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
