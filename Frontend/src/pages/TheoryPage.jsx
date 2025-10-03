// src/pages/TheoryPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { data1 } from "../data/data1.js"; // large dataset of theory questions

export default function TheoryPage() {
  const { id } = useParams();
  const companyId = id ? id.toUpperCase() : "Company";

  const [selectedQuestion, setSelectedQuestion] = useState(data1[0]); // use data1

  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 shadow-xl text-white p-6 transition-all duration-300 ease-in-out border-r border-indigo-800">
        <h2 className="text-3xl font-bold mb-10">Dashboard</h2>
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
            Dashboard
          </Link>
          <Link 
            to="/riseon-coverletter" 
            className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
          >
            Forwarding letter
          </Link>
          <Link 
            to="/companypage" 
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

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - List of Theory Questions */}
        <div className="w-1/3 border-r border-gray-300 p-6 h-screen overflow-y-auto">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            {companyId} Theory Questions
          </h2>
          {data1.map((q) => (
            <div
              key={q.id}
              onClick={() => setSelectedQuestion(q)}
              className={`p-3 mb-3 rounded cursor-pointer border transition ${
                selectedQuestion.id === q.id
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white border-gray-200 hover:bg-gray-100"
              }`}
            >
              <h3 className="font-semibold">{q.title}</h3>
              <span className="text-sm text-gray-500">{q.topic}</span>
            </div>
          ))}
        </div>

        {/* Right Side - Selected Question Details */}
        <div className="w-2/3 p-6 flex flex-col h-screen overflow-y-auto">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            {selectedQuestion.title}
          </h1>
          <p className="text-gray-700 mb-4">{selectedQuestion.description}</p>

          {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
            <>
              <h2 className="font-semibold text-lg mb-2">Examples:</h2>
              <ul className="list-disc pl-6 mb-4">
                {selectedQuestion.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </>
          )}

          {selectedQuestion.answer && (
            <>
              <h2 className="font-semibold text-lg mb-2">Answer / Key Points:</h2>
              <p className="text-gray-800 bg-gray-100 p-4 rounded whitespace-pre-wrap">
                {selectedQuestion.answer}
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
