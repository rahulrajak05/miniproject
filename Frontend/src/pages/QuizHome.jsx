import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { questionBank } from "../data/questionsData";
import { generateQuestions as geminiGenerate } from "../api/gemini";

const QuizHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("quiz");
  const [leaderboard, setLeaderboard] = useState([]);
  // Removed unused myTop state for cleanliness
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingStatus, setLoadingStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [loginEmail, setLoginEmail] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // User profile state
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
    course: "",
    session: "",
    image: "",
    saved: false,
  });

  // Topic suggestions for Computer Science
  const topicSuggestions = [
    "Programming",
    "Data Structures",
    "Algorithms",
    "Database",
    "Networking",
    "Operating System",
    "Computer Architecture",
    "Software Engineering",
    "Web Development",
    "Machine Learning",
    "Cybersecurity",
    "Cloud Computing"
  ];

  const subtopicMap = {
    "Programming": ["Java", "Python", "C++", "JavaScript", "C", "Ruby", "PHP", "Go", "Rust"],
    "Data Structures": ["Arrays", "Linked List", "Stack", "Queue", "Tree", "Graph", "Hash Table", "Heap"],
    "Algorithms": ["Sorting", "Searching", "Dynamic Programming", "Greedy", "Recursion", "Graph Algorithms"],
    "Database": ["SQL", "MySQL", "MongoDB", "PostgreSQL", "NoSQL", "Normalization", "ACID Properties"],
    "Networking": ["TCP/IP", "HTTP", "DNS", "Routing", "LAN", "WAN", "Protocols", "OSI Model"],
    "Operating System": ["Process", "Thread", "Memory", "Scheduling", "Linux", "Windows", "File Systems"],
    "Computer Architecture": ["CPU", "Memory", "Cache", "Pipeline", "Assembly", "Instruction Set"],
    "Software Engineering": ["SDLC", "Agile", "Testing", "Design Patterns", "UML", "Version Control"],
    "Web Development": ["HTML", "CSS", "React", "Node.js", "REST API", "Frontend", "Backend", "Frameworks"],
    "Machine Learning": ["Neural Network", "Deep Learning", "Classification", "Regression", "NLP"],
    "Cybersecurity": ["Encryption", "Firewall", "Malware", "Authentication", "SSL", "Penetration Testing"],
    "Cloud Computing": ["AWS", "Azure", "Docker", "Kubernetes", "Serverless", "Microservices"]
  };

  // ✅ Load saved user profile
  useEffect(() => {
    // Determine logged-in email
    try {
      const q = JSON.parse(localStorage.getItem("quizuser") || "null");
      const u = JSON.parse(localStorage.getItem("user") || "null");
      const email = (q && q.email) || (u && u.email) || "";
      if (email) setLoginEmail(email);
      // If we have an email, fetch profile from server
      if (email) {
        fetch(`http://localhost:8081/api/profile/${encodeURIComponent(email)}`)
          .then(async (res) => {
            if (!res.ok) throw new Error("Profile not found");
            return res.json();
          })
          .then((data) => {
            // Map backend fields to local user state
            setUser({
              name: data.name || "",
              email: data.email || email,
              department: data.department || "",
              course: data.course || "",
              session: data.session || "",
              image: data.image || "",
              saved: true,
            });
          })
          .catch(() => {
            // No server profile yet; fall back to any locally stored userProfile
            const storedUser = localStorage.getItem("userProfile");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          });
      } else {
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch {
      const storedUser = localStorage.getItem("userProfile");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // ✅ Load leaderboard data (show ALL attempts, latest first)
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
      if (!Array.isArray(stored) || stored.length === 0) {
        setLeaderboard([]);
        return;
      }
      // Show latest attempts first (localStorage appends; reverse to show newest first)
      const all = stored.slice().reverse();
      setLeaderboard(all);
    } catch {
      setLeaderboard([]);
    }
  }, [user.name]);

  // ✅ Respect tab hint from QuizStart
  useEffect(() => {
    try {
      const tab = localStorage.getItem("quizHomeTab");
      if (tab) {
        setActiveTab(tab);
        localStorage.removeItem("quizHomeTab");
      }
    } catch {}
  }, []);

  // ✅ Save profile to backend
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setMessage("⏳ Saving profile...");
    setSavingProfile(true);

    try {
      // Always use the logged-in email to save profile
      const payload = { ...user, email: loginEmail || user.email };
      const res = await fetch("http://localhost:8081/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ " + data.message);
        const updatedUser = { ...user, email: payload.email, saved: true };
        setUser(updatedUser);
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
        // Fetch fresh profile from backend to ensure DB values are reflected
        if (payload.email) {
          try {
            const fres = await fetch(`http://localhost:8081/api/profile/${encodeURIComponent(payload.email)}`);
            if (fres.ok) {
              const fdata = await fres.json();
              setUser({
                name: fdata.name || "",
                email: fdata.email || payload.email,
                department: fdata.department || "",
                course: fdata.course || "",
                session: fdata.session || "",
                image: fdata.image || "",
                saved: true,
              });
            }
          } catch {}
        }
      } else {
        setMessage("❌ " + (data.error || "Failed to save"));
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server not reachable");
    }
    finally {
      setSavingProfile(false);
    }
  };

  // ✅ Helper: shuffle array
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  // Enhanced topic match helper with both topic and subtopic
  const matchesTopic = (q, mainTopic, subTopic) => {
    const hay = (
      (q.question || "") +
      " " +
      (q.correct_answer || "") +
      " " +
      ((q.incorrect_answers || []).join(" ") || "")
    ).toLowerCase();

    // If both topic and subtopic provided
    if (mainTopic && subTopic) {
      return hay.includes(mainTopic.toLowerCase()) || hay.includes(subTopic.toLowerCase());
    }
    
    // If only topic provided
    if (mainTopic) {
      return hay.includes(mainTopic.toLowerCase());
    }
    
    return false;
  };

  // ✅ Rate-limited API fetch with exponential backoff
  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        
        if (res.status === 429) {
          // Rate limited - wait longer
          const waitTime = delay * Math.pow(2, i);
          setLoadingStatus(`⏳ Rate limited. Waiting ${waitTime/1000}s...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        return await res.json();
      } catch (err) {
        if (i === retries - 1) throw err;
        setLoadingStatus(`⚠️ Retry ${i + 1}/${retries}...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error('Max retries reached');
  };

  // Progress simulation helper
  const simulateProgress = async () => {
    const progressSteps = [
      { progress: 15, status: "📋 Preparing topic search..." },
      { progress: 30, status: "🔎 Searching question database..." },
      { progress: 45, status: "🌐 Fetching from OpenTDB API..." },
      { progress: 60, status: "🎯 Filtering topic-specific questions..." },
      { progress: 75, status: "📊 Processing question data..." },
      { progress: 90, status: "🎲 Shuffling answers and finalizing..." },
      { progress: 100, status: "✅ Quiz ready! Redirecting..." }
    ];

    for (const step of progressSteps) {
      setProgress(step.progress);
      setLoadingStatus(step.status);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
  };

  // ✅ Quiz start handler with improved UI feedback
  const handleStart = useCallback(async () => {
    const trimmedTopic = (topic || "").trim();
    const trimmedSubtopic = (subtopic || "").trim();
    const trimmedCustom = (customTopic || "").trim();
    
    if (!trimmedTopic && !trimmedSubtopic && !trimmedCustom) {
      alert("Please select a topic or enter a custom topic!");
      return;
    }

    setLoading(true);
    setProgress(0);
    
    // Start progress simulation
    const progressPromise = simulateProgress();
    
    try {
      const needed = 10;
      const maxAttempts = 3;
      const collected = [];
      const seenQuestions = new Set();
      
      const selectedTopic = trimmedTopic || trimmedCustom;
      const selectedSubtopic = trimmedSubtopic;
      const searchQuery = selectedSubtopic || selectedTopic;
      const fullTopic = selectedSubtopic ? `${selectedTopic} - ${selectedSubtopic}` : selectedTopic;

      // 1) Try saved questions first
      try {
        const raw = localStorage.getItem("quizQuestions");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const savedTopic = localStorage.getItem("quizTopic");
            if (savedTopic === fullTopic && parsed.length >= needed) {
              await progressPromise; // Wait for progress animation
              navigate("/quiz-start");
              return;
            }
          }
        }
      } catch (err) {
        console.warn("failed to parse stored questions:", err);
      }

      // 2) Seed with local topic bank if available (ensures topic relevance)
      try {
        const topicToBankKey = {
          "Networking": "Computer Networks",
          "Operating System": "Operating System",
          "Database": "Database",
          "Web Development": "Web Development",
          "Machine Learning": "Artificial Intelligence",
          "Algorithms": undefined,
          "Data Structures": undefined,
          "Programming": undefined,
          "Computer Architecture": undefined,
          "Software Engineering": undefined,
          "Cybersecurity": undefined,
          "Cloud Computing": undefined,
        };

        const bankKey = topicToBankKey[selectedTopic];
        if (bankKey && questionBank[bankKey]) {
          const bankQs = questionBank[bankKey].map((q) => ({
            question: q.question,
            options: q.options,
            answer: q.answer,
            incorrect_answers: q.options.filter((o) => o !== q.answer),
          }));
          for (const q of bankQs) {
            if (collected.length >= needed) break;
            const qKey = q.question;
            if (!seenQuestions.has(qKey)) {
              collected.push({
                question: q.question,
                correct_answer: q.answer,
                incorrect_answers: q.incorrect_answers,
              });
              seenQuestions.add(qKey);
            }
          }
        }
      } catch (e) {
        console.warn("Local question bank load failed:", e);
      }

      // 3) Fetch from Computer Science category with rate limiting
      for (let attempt = 0; attempt < maxAttempts && collected.length < needed; attempt++) {
        try {
          const data = await fetchWithRetry(
            `https://opentdb.com/api.php?amount=50&category=18&type=multiple`,
            2,
            2000
          );
          
          if (!data.results || data.results.length === 0) {
            console.warn("No results from API");
            continue;
          }

          // Collect matching questions
          data.results.forEach((q) => {
            if (collected.length >= needed) return;
            const qKey = q.question;
            if (!seenQuestions.has(qKey) && matchesTopic(q, selectedTopic, selectedSubtopic)) {
              collected.push(q);
              seenQuestions.add(qKey);
            }
          });

          if (collected.length < needed && attempt < maxAttempts - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } catch (err) {
          console.warn(`Attempt ${attempt + 1} failed:`, err);
          if (err.message.includes('429')) {
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
        }
      }

      // 4) If not enough matches, fill with general CS questions
      if (collected.length < needed) {
        try {
          const remaining = needed - collected.length;
          const data = await fetchWithRetry(
            `https://opentdb.com/api.php?amount=${remaining * 2}&category=18&type=multiple`,
            2,
            2000
          );
          
          if (data.results) {
            data.results.forEach((q) => {
              if (collected.length >= needed) return;
              const qKey = q.question;
              if (!seenQuestions.has(qKey)) {
                collected.push(q);
                seenQuestions.add(qKey);
              }
            });
          }
        } catch (err) {
          console.warn("Failed to fetch filler questions:", err);
        }
      }

      // 5) As last resort, try Gemini generation for the exact topic/subtopic/custom topic
      if (collected.length < needed) {
        const key = (import.meta && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || "";
        const want = selectedSubtopic || selectedTopic || trimmedCustom;
        if (key && want) {
          try {
            const full = selectedSubtopic ? `${selectedTopic} - ${selectedSubtopic}` : (selectedTopic || trimmedCustom);
            const prompt = `Generate ${needed} multiple-choice questions for the topic: "${full}". Each question must have exactly 4 options and one correct answer. Return STRICT JSON with this schema only (no markdown): {"questions":[{"question":"...","options":["A","B","C","D"],"answer":"A"}]}`;
            const text = await geminiGenerate(prompt);
            let jsonText = text;
            // Attempt to extract JSON if wrapped
            const start = text.indexOf('{');
            const end = text.lastIndexOf('}');
            if (start !== -1 && end !== -1 && end > start) {
              jsonText = text.substring(start, end + 1);
            }
            const parsed = JSON.parse(jsonText);
            if (parsed && Array.isArray(parsed.questions)) {
              for (const q of parsed.questions) {
                if (!q || !q.question || !Array.isArray(q.options) || q.options.length !== 4 || !q.answer) continue;
                if (collected.length >= needed) break;
                const incorrect = q.options.filter((o) => o !== q.answer);
                const qKey = q.question;
                if (!seenQuestions.has(qKey)) {
                  collected.push({
                    question: q.question,
                    correct_answer: q.answer,
                    incorrect_answers: incorrect,
                  });
                  seenQuestions.add(qKey);
                }
              }
            }
          } catch (e) {
            console.warn("Gemini generation failed:", e);
          }
        }
      }

      // Format results
      const formatted = collected.slice(0, needed).map((q) => ({
        question: (q.question || "").replace(/&quot;|&#039;|&amp;/g, (m) => 
          m === "&amp;" ? "&" : "'"
        ),
        options: shuffle([...q.incorrect_answers, q.correct_answer]),
        answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
      }));

      if (formatted.length > 0) {
        localStorage.setItem("quizQuestions", JSON.stringify(formatted));
        localStorage.setItem("quizTopic", fullTopic);
        
        await progressPromise; // Wait for progress animation to complete
        navigate("/quiz-start");
      } else {
        setProgress(0);
        setLoadingStatus("");
        alert(`Couldn't find questions for "${searchQuery}". The API might be rate-limited. Please try again in a few minutes.`);
      }
    } catch (err) {
      console.error(err);
      setProgress(0);
      setLoadingStatus("");
      alert("Failed to load quiz questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [topic, subtopic, customTopic, navigate]);

  // Reset form helper
  const resetForm = () => {
    setTopic("");
    setSubtopic("");
    setCustomTopic("");
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("quizuser");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 pt-20 md:pt-24 lg:pt-28">
      {/* ===== MAIN CONTENT ===== */}
      <div className="p-8" aria-busy={loading ? "true" : "false"}>
        {/* Local tabs for this page */}
        <div className="w-full max-w-5xl mx-auto mb-6">
          <div className="bg-white/80 backdrop-blur-sm border rounded-2xl p-2 flex flex-wrap gap-2" role="tablist" aria-label="Quiz home sections">
            {[
              { id: "user", label: "User Profile" },
              { id: "quiz", label: "Quiz" },
              { id: "leaderboard", label: "Leaderboard" },
              { id: "logout", label: "Logout" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  tab.id === "logout" ? handleLogout() : setActiveTab(tab.id)
                }
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ===== USER PROFILE ===== */}
          {activeTab === "user" && (
            <motion.div
              key="user"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mx-auto w-full max-w-5xl mt-8"
              role="tabpanel"
              id="panel-user"
              aria-labelledby="tab-user"
            >
              {/* Enhanced Header Section */}
              <div className="text-center mb-10 border-b border-gray-100 pb-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                   
                   
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">User Profile</h2>
                    <p className="text-gray-600 max-w-md mx-auto">Manage your personal information and academic details for a personalized experience</p>
                  </div>
                </div>
              </div>

              {!user.saved ? (
                /* Enhanced Profile Form */
                <div className="max-w-3xl mx-auto">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-8"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-1">Complete Your Profile</h3>
                        <p className="text-blue-700 text-sm leading-relaxed">
                          Please fill in your details to create a comprehensive profile. This information helps us provide personalized quiz recommendations and track your academic progress.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <form onSubmit={handleSaveProfile} className="space-y-8">
                    {/* Personal Information Section */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="lg:col-span-2">
                          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="full-name">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Full Name <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            id="full-name"
                            value={user.name}
                            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))
                            }
                            required
                            placeholder="Enter your complete name as per university records"
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 bg-white shadow-sm"
                          />
                        </div>

                        {/* Email Field */}
                        <div className="lg:col-span-2">
                          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="email-address">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            Email Address <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="email"
                            id="email-address"
                            value={user.email}
                            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))
                            }
                            required
                            placeholder="Enter your institutional or personal email"
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Academic Information Section */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        Academic Details
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Department Field */}
                        <div>
                          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="department">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Department
                          </label>
                          <input
                            type="text"
                            id="department"
                            value={user.department}
                            onChange={(e) => setUser(prev => ({ ...prev, department: e.target.value }))
                            }
                            placeholder="Computer Science"
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 bg-white shadow-sm"
                          />
                        </div>

                        {/* Course Field */}
                        <div>
                          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="course">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Course/Program
                          </label>
                          <input
                            type="text"
                            id="course"
                            value={user.course}
                            onChange={(e) => setUser(prev => ({ ...prev, course: e.target.value }))
                            }
                            placeholder="B.Tech, M.Tech, MCA"
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 bg-white shadow-sm"
                          />
                        </div>

                        {/* Session Field */}
                        <div>
                          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="academic-year">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Academic Year
                          </label>
                          <input
                            type="text"
                            id="academic-year"
                            value={user.session}
                            onChange={(e) => setUser(prev => ({ ...prev, session: e.target.value }))
                            }
                            placeholder="2024-2025"
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Profile Image Section */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Profile Picture
                      </h3>
                      
                      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                        {/* Current Image Preview */}
                        <div className="flex-shrink-0">
                          {user.image ? (
                            <img 
                              src={user.image} 
                              alt={user.name ? `${user.name} profile photo` : "Profile Preview"} 
                              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg" 
                            />
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-600 text-2xl font-bold border-4 border-gray-200 shadow-lg">
                              {user.name ? user.name.charAt(0).toUpperCase() : '📷'}
                            </div>
                          )}
                        </div>
                        
                        {/* Upload Input */}
                        <div className="flex-1 w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200" htmlFor="profile-image-input">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB)</p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  if (file.size > 5 * 1024 * 1024) {
                                    alert('File size should be less than 5MB');
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onloadend = () => setUser(prev => ({ ...prev, image: reader.result }));
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                              id="profile-image-input"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Status Message */}
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl text-center font-medium border ${
                          message.includes('✅') 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : message.includes('❌') 
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {message}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg disabled:opacity-60"
                        disabled={savingProfile}
                        aria-busy={savingProfile}
                      >
                        {savingProfile ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8v3m0 10v3a8 8 0 010-16" />
                            </svg>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Save Profile Information</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Enhanced Profile Display */
                <div className="max-w-4xl mx-auto">
                  {/* Profile Header Card */}
                  <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-indigo-100 shadow-lg mb-8">
                    <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        {user.image ? (
                          <div className="relative">
                            <img
                              src={user.image}
                              alt={user.name ? `${user.name} profile photo` : "Profile"}
                              className="w-36 h-36 rounded-full object-cover shadow-xl border-4 border-white"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white">
                            {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
                          </div>
                        )}
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1 text-center lg:text-left">
                        <div className="mb-6">
                          <h3 className="text-4xl font-bold text-gray-800 mb-2">{user.name}</h3>
                          <p className="text-indigo-600 font-medium text-lg mb-1">{user.email}</p>
                          <div className="flex items-center justify-center lg:justify-start text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Profile completed
                          </div>
                        </div>
                        
                        {/* Academic Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {user.department && (
                            <div className="bg-white rounded-lg p-4 shadow-md">
                              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="text-xs text-gray-500 font-medium">DEPARTMENT</span>
                              </div>
                              <p className="text-sm font-semibold text-gray-800">{user.department}</p>
                            </div>
                          )}
                          
                          {user.course && (
                            <div className="bg-white rounded-lg p-4 shadow-md">
                              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span className="text-xs text-gray-500 font-medium">PROGRAM</span>
                              </div>
                              <p className="text-sm font-semibold text-gray-800">{user.course}</p>
                            </div>
                          )}
                          
                          {user.session && (
                            <div className="bg-white rounded-lg p-4 shadow-md">
                              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs text-gray-500 font-medium">ACADEMIC YEAR</span>
                              </div>
                              <p className="text-sm font-semibold text-gray-800">{user.session}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const updatedUser = { ...user, saved: false };
                        setUser(updatedUser);
                        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
                      }}
                      className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit Profile</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab("quiz")}
                      className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Start Quiz</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ===== QUIZ TAB ===== */}
          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-lg p-8 max-w-4xl mx-auto mt-8"
              role="tabpanel"
              id="panel-quiz"
              aria-labelledby="tab-quiz"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-700 mb-2">
                  🎓 Quiz Generator
                </h2>
                <p className="text-gray-600">Select your topic and generate personalized questions</p>
              </div>

              <AnimatePresence mode="wait">
                {!loading ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Topic Selection */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-3" htmlFor="main-topic">
                        Select Main Topic
                      </label>
                      <select
                        value={topic}
                        onChange={(e) => {
                          setTopic(e.target.value);
                          setSubtopic("");
                          setCustomTopic("");
                        }}
                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
                        id="main-topic"
                        aria-describedby="topic-help"
                      >
                        <option value="">-- Choose a Topic --</option>
                        {topicSuggestions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <p id="topic-help" className="mt-2 text-sm text-gray-500">You can also enter a custom topic below.</p>
                    </div>

                    {/* Subtopic Selection */}
                    {topic && subtopicMap[topic] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-gray-700 font-semibold mb-3" htmlFor="sub-topic">
                          Select Subtopic (Optional)
                        </label>
                        <select
                          value={subtopic}
                          onChange={(e) => setSubtopic(e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
                          id="sub-topic"
                        >
                          <option value="">-- All Subtopics --</option>
                          {subtopicMap[topic].map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    )}

                    {/* Custom Topic Input */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-3" htmlFor="custom-topic">
                        Or enter a custom topic
                      </label>
                      <input
                        type="text"
                        id="custom-topic"
                        value={customTopic}
                        onChange={(e) => {
                          setCustomTopic(e.target.value);
                          if (e.target.value) {
                            setTopic("");
                            setSubtopic("");
                          }
                        }}
                        placeholder="e.g., GraphQL, System Design, Kubernetes Networking"
                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
                        aria-label="Custom topic"
                      />
                      <p className="mt-2 text-sm text-gray-500">If you type a custom topic, the main topic selection above will be cleared.</p>
                    </div>

                    {/* Generate Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStart}
                      disabled={!topic && !customTopic.trim()}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all duration-300"
                    >
                      <span className="flex items-center justify-center gap-2 text-lg">
                        🚀 Generate Quiz Questions
                      </span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    {/* Progress Animation */}
                    <div className="mb-8">
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-indigo-500"
                          style={{
                            borderTopColor: "transparent",
                            borderRightColor: "transparent",
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-indigo-600">{progress}%</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <motion.div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        ></motion.div>
                      </div>
                    </div>

                    {/* Status Message */}
                    <motion.div
                      key={loadingStatus}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                      aria-live="polite"
                    >
                      <p className="text-xl font-semibold text-gray-700">
                        {loadingStatus}
                      </p>
                      
                      {progress < 100 && (
                        <div className="flex justify-center space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-indigo-500 rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ===== LEADERBOARD TAB ===== */}
          {activeTab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center min-h-[80vh] p-6 mt-8"
              role="tabpanel"
              id="panel-leaderboard"
              aria-labelledby="tab-leaderboard"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-700 mb-2">
                  Pondicherry University
                </h2>
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                  Department of Computer Science
                </h3>
                <h4 className="text-2xl font-bold text-gray-800 border-b-4 border-indigo-300 inline-block pb-2">
                  Leaderboard
                </h4>
              </div>

              <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-2xl text-center">
                <h1 className="text-3xl font-bold text-indigo-700 mb-2">
                  Leaderboard
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                  Showing all attempts (latest first).
                </p>

                {leaderboard.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-gray-800">
                      <thead>
                        <tr className="bg-indigo-200 text-indigo-900">
                          <th className="py-3 px-4 text-left rounded-tl-lg">Name</th>
                          <th className="py-3 px-4 text-left">Score</th>
                          <th className="py-3 px-4 text-left rounded-tr-lg">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((entry, i) => (
                          <tr
                            key={i}
                            className={`border-t hover:bg-indigo-50 transition ${
                              (entry.email && entry.email === loginEmail) || (!entry.email && entry.name === user.name)
                                ? "bg-yellow-100 font-semibold"
                                : ""
                            }`}
                          >
                            <td className="py-2 px-4">{entry.name || user.name || "Anonymous"}</td>
                            <td className="py-2 px-4">
                              {entry.score} / {entry.total}
                            </td>
                            <td className="py-2 px-4 text-sm text-gray-600">
                              {entry.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600 mt-4">
                    No scores yet. Play a quiz first!
                  </p>
                )}

              
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizHome;
