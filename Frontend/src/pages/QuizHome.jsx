import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { questionBank } from "../data/questionsData";
import { generateQuestions as geminiGenerate } from "../api/gemini";

const QuizHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("quiz");
  const [leaderboard, setLeaderboard] = useState([]);
  const [myTop, setMyTop] = useState(null);
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingStatus, setLoadingStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [loginEmail, setLoginEmail] = useState("");

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
      <div className="p-8">
        {/* Local tabs for this page */}
        <div className="w-full max-w-5xl mx-auto mb-6">
          <div className="bg-white/80 backdrop-blur-sm border rounded-2xl p-2 flex flex-wrap gap-2">
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
              className="bg-white rounded-3xl shadow-lg p-10 mx-auto w-full max-w-2xl text-center mt-8"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-indigo-700 mb-2">
                  Pondicherry University
                </h2>
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                  Department of Computer Science
                </h3>
                <h4 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-300 pb-2">
                  User Profile
                </h4>
              </div>

              {!user.saved ? (
                <form onSubmit={handleSaveProfile} className="space-y-5 text-left">
                  {["name", "email", "department", "course", "session"].map(
                    (field) => (
                      <div key={field}>
                        <label className="block text-gray-700 font-medium mb-1 capitalize">
                          {field}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          value={user[field]}
                          onChange={(e) =>
                            setUser((prev) => ({
                              ...prev,
                              [field]: e.target.value,
                            }))
                          }
                          required={field === "name" || field === "email"}
                          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    )
                  )}

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () =>
                            setUser((prev) => ({
                              ...prev,
                              image: reader.result,
                            }));
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  {message && (
                    <p className="text-center text-indigo-600 font-medium">
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Save Profile
                  </button>
                </form>
              ) : (
                <div className="text-gray-700 space-y-4">
                  <div className="flex flex-col items-center mb-6">
                    {user.image && (
                      <img
                        src={user.image}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover shadow-md mb-3"
                      />
                    )}
                    <h3 className="text-xl font-semibold text-indigo-700">
                      {user.name}
                    </h3>
                  </div>
                  <div className="text-left space-y-1">
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Department:</strong> {user.department}
                    </p>
                    <p>
                      <strong>Course:</strong> {user.course}
                    </p>
                    <p>
                      <strong>Session:</strong> {user.session}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const updatedUser = { ...user, saved: false };
                      setUser(updatedUser);
                      localStorage.setItem(
                        "userProfile",
                        JSON.stringify(updatedUser)
                      );
                    }}
                    className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Edit Profile
                  </button>
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
                      <label className="block text-gray-700 font-semibold mb-3">
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
                      >
                        <option value="">-- Choose a Topic --</option>
                        {topicSuggestions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subtopic Selection */}
                    {topic && subtopicMap[topic] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-gray-700 font-semibold mb-3">
                          Select Subtopic (Optional)
                        </label>
                        <select
                          value={subtopic}
                          onChange={(e) => setSubtopic(e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
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
                            <td className="py-2 px-4">{user.name || " "}</td>
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