// src/pages/CodingPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { questions } from "../data/questions";

export default function CodingPage() {
  const { id } = useParams();
  const companyId = id ? id.toUpperCase() : "Company";

  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");

  const languageMap = { java: 62, javascript: 63, python: 71 };

  const runCode = async () => {
    setOutput("⏳ Running...");
    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: languageMap[language],
            stdin: "",
          }),
        }
      );
      const result = await response.json();
      setOutput(result.stdout || result.stderr || result.compile_output || "No output");
    } catch (err) {
      setOutput("❌ Error: " + err.message);
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
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
        {/* Left - Question List */}
        <div className="w-1/3 p-6 overflow-y-auto bg-gray-50 border-r border-gray-300 h-screen">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">{companyId} Coding Questions</h2>
          {questions.map((q) => (
            <div
              key={q.id}
              onClick={() => {
                setSelectedQuestion(q);
                setCode("// Write your code here...");
                setOutput("");
              }}
              className={`p-4 mb-3 border rounded-lg cursor-pointer transition transform hover:scale-105 ${
                selectedQuestion.id === q.id
                  ? "bg-blue-100 border-blue-500 shadow"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{q.title}</h3>
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
            </div>
          ))}
        </div>

        {/* Right - Question Details & Editor */}
        <div className="w-2/3 p-6 flex flex-col h-screen">
          <h1 className="text-3xl font-bold text-orange-600 mb-3">{selectedQuestion.title}</h1>
          <p className="text-gray-700 mb-4 flex-shrink-0">{selectedQuestion.description}</p>

          {selectedQuestion.examples.length > 0 && (
            <div className="mb-4 flex-shrink-0">
              <h2 className="font-semibold text-lg mb-2">Examples:</h2>
              <ul className="list-disc pl-6 space-y-1">
                {selectedQuestion.examples.map((ex, i) => (
                  <li key={i}>
                    <b>Input:</b> {ex.input} <br />
                    <b>Output:</b> {ex.output}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Editor controls */}
          <div className="flex justify-between items-center mb-2 flex-shrink-0">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border px-3 py-1 rounded-lg bg-white"
            >
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
            <button
              onClick={runCode}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              ▶ Run Code
            </button>
          </div>

          <div className="flex-1 border rounded-lg mb-4 overflow-hidden shadow">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              language={language}
              value={code}
              onChange={(value) => setCode(value)}
              options={{ automaticLayout: true }}
            />
          </div>

          <div className="bg-black text-green-400 p-4 rounded-lg h-40 overflow-y-auto shadow-inner">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </main>
  );
}
