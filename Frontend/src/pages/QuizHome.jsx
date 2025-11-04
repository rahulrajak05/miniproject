import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { questionBank } from "../data/questionsData";
import { generateQuestions as geminiGenerate } from "../api/gemini";

/*
  Updates (per request):
  - Removed "HIDE" text: the sidebar toggle is now an icon-only button
  - Moved the footer out of the sidebar and added a fixed global footer at the bottom
  - Sidebar remains fixed; footer now spans the main area and adapts to sidebar width
  - Sidebar positioned below navbar (top-20) to avoid covering navbar
*/

const TabButton = ({ id, label, active, onClick }) => (
  <button
    onClick={onClick}
    role="tab"
    aria-selected={active}
    aria-controls={`panel-${id}`}
    id={`tab-${id}`}
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
      active ? "bg-indigo-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {label}
  </button>
);

const Sidebar = ({ sidebarOpen, activeTab, setActiveTab, handleLogout }) => (
  <motion.aside
    initial={false}
    animate={{ width: sidebarOpen ? 250 : 88 }}
    transition={{ duration: 0.28 }}
    className="bg-gray-900 text-white flex flex-col shadow-lg fixed left-0 top-20 h-[calc(100vh-5rem)] z-40 overflow-hidden"
    aria-hidden={false}
  >
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-3 p-5 border-b border-gray-800 flex-shrink-0">
        <img src={logo} alt="Site logo" className="w-11 h-11 rounded-full" />
        {sidebarOpen && <h2 className="text-lg font-bold">CS Dept — PU</h2>}
      </div>

      <nav className="mt-6 flex flex-col space-y-2 p-3 flex-1 overflow-y-auto" aria-label="Main navigation">
        {[
          { id: "user", label: "Profile" },
          { id: "quiz", label: "Quiz" },
          { id: "leaderboard", label: "Leaderboard" },
          { id: "logout", label: "Logout" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => (t.id === "logout" ? handleLogout() : setActiveTab(t.id))}
            className={`text-left px-4 py-3 rounded-r-full transition-all w-full flex-shrink-0 ${
              activeTab === t.id ? "bg-indigo-600 text-white" : "hover:bg-gray-800 text-gray-200"
            }`}
          >
            {sidebarOpen ? t.label : t.label.split(" ")[0]}
          </button>
        ))}
      </nav>
    </div>
  </motion.aside>
);

const FooterBar = ({ sidebarOpen }) => {
  const left = sidebarOpen ? 250 : 88; // match Sidebar animated width
  return (
    <footer
      className="fixed bottom-0 right-0 h-10 bg-white/90 backdrop-blur border-t border-gray-200 flex items-center px-4 text-sm text-gray-600 z-30"
      style={{ left }}
      role="contentinfo"
      aria-label="Site footer"
    >
      © {new Date().getFullYear()} Pondicherry University • CS Dept
    </footer>
  );
};

const QuizHome = () => {
  const navigate = useNavigate();

  // UI state
  const [activeTab, setActiveTab] = useState("quiz");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Profile & auth
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
    course: "",
    session: "",
    image: "",
    saved: false,
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [message, setMessage] = useState("");

  // Quiz state
  const [leaderboard, setLeaderboard] = useState([]);
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [progress, setProgress] = useState(0);

  // Topic suggestions & subtopic map
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
    "Cloud Computing",
  ];
  const subtopicMap = {
    Programming: ["Java", "Python", "C++", "JavaScript", "C", "Ruby", "PHP", "Go", "Rust"],
    "Data Structures": ["Arrays", "Linked List", "Stack", "Queue", "Tree", "Graph", "Hash Table", "Heap"],
    Algorithms: ["Sorting", "Searching", "Dynamic Programming", "Greedy", "Recursion", "Graph Algorithms"],
    Database: ["SQL", "MySQL", "MongoDB", "PostgreSQL", "NoSQL", "Normalization", "ACID Properties"],
    Networking: ["TCP/IP", "HTTP", "DNS", "Routing", "LAN", "WAN", "Protocols", "OSI Model"],
    "Operating System": ["Process", "Thread", "Memory", "Scheduling", "Linux", "Windows", "File Systems"],
    "Computer Architecture": ["CPU", "Memory", "Cache", "Pipeline", "Assembly", "Instruction Set"],
    "Software Engineering": ["SDLC", "Agile", "Testing", "Design Patterns", "UML", "Version Control"],
    "Web Development": ["HTML", "CSS", "React", "Node.js", "REST API", "Frontend", "Backend", "Frameworks"],
    "Machine Learning": ["Neural Network", "Deep Learning", "Classification", "Regression", "NLP"],
    Cybersecurity: ["Encryption", "Firewall", "Malware", "Authentication", "SSL", "Penetration Testing"],
    "Cloud Computing": ["AWS", "Azure", "Docker", "Kubernetes", "Serverless", "Microservices"],
  };

  // Load profile (localStorage + attempt backend fetch)
  useEffect(() => {
    try {
      const q = JSON.parse(localStorage.getItem("quizuser") || "null");
      const u = JSON.parse(localStorage.getItem("user") || "null");
      const email = (q && q.email) || (u && u.email) || "";
      if (email) setLoginEmail(email);

      if (email) {
        fetch(`http://localhost:8081/api/profile/${encodeURIComponent(email)}`)
          .then((res) => {
            if (!res.ok) throw new Error("Profile not found");
            return res.json();
          })
          .then((data) =>
            setUser({
              name: data.name || "",
              email: data.email || email,
              department: data.department || "",
              course: data.course || "",
              session: data.session || "",
              image: data.image || "",
              saved: true,
            })
          )
          .catch(() => {
            const storedUser = localStorage.getItem("userProfile");
            if (storedUser) setUser(JSON.parse(storedUser));
          });
      } else {
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) setUser(JSON.parse(storedUser));
      }
    } catch {
      const storedUser = localStorage.getItem("userProfile");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  // Leaderboard: show latest attempts first
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
      if (Array.isArray(stored) && stored.length > 0) {
        setLeaderboard(stored.slice().reverse());
      } else {
        setLeaderboard([]);
      }
    } catch {
      setLeaderboard([]);
    }
  }, []);

  // Save profile to backend
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setMessage("Saving profile...");
    setSavingProfile(true);

    try {
      const payload = { ...user, email: loginEmail || user.email };
      const res = await fetch("http://localhost:8081/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage("Profile saved successfully.");
        const updatedUser = { ...user, email: payload.email, saved: true };
        setUser(updatedUser);
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
      } else {
        setMessage(data.error || "Failed to save profile.");
      }
    } catch (err) {
      console.error("Save failed:", err);
      setMessage("Server not reachable. Profile saved locally.");
      localStorage.setItem("userProfile", JSON.stringify(user));
    } finally {
      setSavingProfile(false);
      setTimeout(() => setMessage(""), 3500);
    }
  };

  // Helpers
  const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);
  const matchesTopic = (q, mainTopic, subTopic) => {
    if (!mainTopic && !subTopic) return false;
    const hay = (
      (q.question || "") +
      " " +
      (q.correct_answer || "") +
      " " +
      ((q.incorrect_answers || []).join(" ") || "")
    ).toLowerCase();
    if (subTopic) return hay.includes(subTopic.toLowerCase()) || hay.includes(mainTopic.toLowerCase());
    return hay.includes(mainTopic.toLowerCase());
  };

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (res.status === 429) {
          const waitTime = delay * Math.pow(2, i);
          setLoadingStatus(`Rate limited — waiting ${Math.round(waitTime / 1000)}s...`);
          await new Promise((r) => setTimeout(r, waitTime));
          continue;
        }
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return await res.json();
      } catch (err) {
        if (i === retries - 1) throw err;
        setLoadingStatus(`Retrying... (${i + 1}/${retries})`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
    throw new Error("Max retries reached");
  };

  const simulateProgress = async () => {
    const steps = [
      { p: 10, s: "Preparing search..." },
      { p: 30, s: "Searching question DB..." },
      { p: 55, s: "Fetching additional questions..." },
      { p: 75, s: "Filtering & formatting..." },
      { p: 95, s: "Finalizing questions..." },
      { p: 100, s: "Ready! Redirecting..." },
    ];
    for (const st of steps) {
      setProgress(st.p);
      setLoadingStatus(st.s);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 450));
    }
  };

  const handleStart = useCallback(async () => {
    const trimmedTopic = (topic || "").trim();
    const trimmedSubtopic = (subtopic || "").trim();
    const trimmedCustom = (customTopic || "").trim();
    if (!trimmedTopic && !trimmedSubtopic && !trimmedCustom) {
      alert("Please choose a topic or enter a custom keyword.");
      return;
    }

    setLoading(true);
    setProgress(0);
    setLoadingStatus("Starting...");
    const progressPromise = simulateProgress();

    try {
      const needed = 10;
      const maxAttempts = 3;
      const collected = [];
      const seen = new Set();

      const selectedTopic = trimmedTopic || trimmedCustom;
      const selectedSubtopic = trimmedSubtopic;
      const fullTopic = selectedSubtopic ? `${selectedTopic} - ${selectedSubtopic}` : selectedTopic;

      // 1) Try already saved questions for same topic
      try {
        const raw = localStorage.getItem("quizQuestions");
        const savedTopic = localStorage.getItem("quizTopic") || "";
        if (raw && savedTopic === fullTopic) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length >= needed) {
            await progressPromise;
            navigate("/quiz-start");
            return;
          }
        }
      } catch {
        // ignore parse errors
      }

      // 2) Seed from local questionBank (if matching key present)
      try {
        const mapKey = {
          Networking: "Computer Networks",
          "Operating System": "Operating System",
          Database: "Database",
          "Web Development": "Web Development",
          "Machine Learning": "Artificial Intelligence",
        }[selectedTopic];
        if (mapKey && questionBank[mapKey]) {
          for (const q of questionBank[mapKey]) {
            if (collected.length >= needed) break;
            if (!seen.has(q.question)) {
              collected.push({
                question: q.question,
                correct_answer: q.answer,
                incorrect_answers: q.options.filter((o) => o !== q.answer),
              });
              seen.add(q.question);
            }
          }
        }
      } catch (err) {
        console.warn("Local bank failed:", err);
      }

      // 3) Fetch from OpenTDB and filter by topic/subtopic
      for (let attempt = 0; attempt < maxAttempts && collected.length < needed; attempt++) {
        try {
          const data = await fetchWithRetry("https://opentdb.com/api.php?amount=50&category=18&type=multiple", 2, 1200);
          if (data && Array.isArray(data.results)) {
            for (const q of data.results) {
              if (collected.length >= needed) break;
              if (!seen.has(q.question) && matchesTopic(q, selectedTopic, selectedSubtopic)) {
                collected.push(q);
                seen.add(q.question);
              }
            }
          }
          if (collected.length < needed) await new Promise((r) => setTimeout(r, 600));
        } catch (err) {
          console.warn("OpenTDB attempt failed:", err);
        }
      }

      // 4) If still not enough, fetch general CS questions to fill
      if (collected.length < needed) {
        try {
          const remaining = needed - collected.length;
          const data = await fetchWithRetry(`https://opentdb.com/api.php?amount=${remaining * 2}&category=18&type=multiple`, 2, 1200);
          if (data && Array.isArray(data.results)) {
            for (const q of data.results) {
              if (collected.length >= needed) break;
              if (!seen.has(q.question)) {
                collected.push(q);
                seen.add(q.question);
              }
            }
          }
        } catch (err) {
          console.warn("Filler fetch failed:", err);
        }
      }

      // 5) Last resort: call Gemini generation (if available)
      if (collected.length < needed) {
        const key = (import.meta && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || "";
        const want = selectedSubtopic || selectedTopic || trimmedCustom;
        if (key && want) {
          try {
            const prompt = `Generate ${needed} multiple-choice questions for "${want}". Return strict JSON: {"questions":[{"question":"...","options":["A","B","C","D"],"answer":"A"}]}`;
            const text = await geminiGenerate(prompt);
            const start = text.indexOf("{");
            const end = text.lastIndexOf("}");
            const jsonText = start !== -1 && end !== -1 ? text.substring(start, end + 1) : text;
            const parsed = JSON.parse(jsonText);
            if (parsed && Array.isArray(parsed.questions)) {
              for (const q of parsed.questions) {
                if (collected.length >= needed) break;
                if (!q || !q.question || !Array.isArray(q.options)) continue;
                const incorrect = q.options.filter((o) => o !== q.answer);
                if (!seen.has(q.question)) {
                  collected.push({
                    question: q.question,
                    correct_answer: q.answer,
                    incorrect_answers: incorrect,
                  });
                  seen.add(q.question);
                }
              }
            }
          } catch (err) {
            console.warn("Gemini generation failed:", err);
          }
        }
      }

      // 6) Format and save; navigate
      const formatted = collected.slice(0, 10).map((q) => ({
        question: (q.question || "").replace(/&quot;|&#039;|&amp;/g, (m) => (m === "&amp;" ? "&" : "'")),
        options: shuffle([...(q.incorrect_answers || []), q.correct_answer || ""]),
        answer: q.correct_answer || "",
        incorrect_answers: q.incorrect_answers || [],
      }));

      if (formatted.length > 0) {
        localStorage.setItem("quizQuestions", JSON.stringify(formatted));
        localStorage.setItem("quizTopic", fullTopic);
        await progressPromise;
        navigate("/quiz-start");
      } else {
        setLoadingStatus("");
        alert(`Could not find or generate questions for "${selectedTopic}". Try a broader topic or try again later.`);
      }
    } catch (err) {
      console.error("Quiz generation failed:", err);
      setLoadingStatus("");
      alert("Failed to generate quiz questions. Please try again in a few moments.");
    } finally {
      setLoading(false);
    }
  }, [topic, subtopic, customTopic, navigate]);

  const resetForm = () => {
    setTopic("");
    setSubtopic("");
    setCustomTopic("");
  };

  const handleLogout = () => {
    localStorage.removeItem("quizuser");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    navigate("/dashboard");
  };

  const leftOffset = sidebarOpen ? 250 : 88; // keep main aligned with sidebar width

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100">
      {/* Sidebar (fixed below navbar) */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      {/* Main content */}
      <main
        className="transition-all duration-300 p-8 pt-6 pb-20"
        style={{ marginLeft: leftOffset }}
        aria-live="polite"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header + controls */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Quiz Portal</h1>
              <p className="text-sm text-gray-600">Personalized quizzes for Computer Science students</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Icon-only toggle (removed "HIDE") */}
              <button
                onClick={() => setSidebarOpen((s) => !s)}
                className="px-3 py-2 rounded-md bg-white shadow text-sm"
                aria-pressed={sidebarOpen}
                aria-label="Toggle sidebar"
                title="Toggle sidebar"
              >
                {/* hamburger icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="rounded bg-white px-3 py-2 text-sm text-gray-700 shadow">
                {user.name ? `Hi, ${user.name}` : user.email ? user.email : "Guest"}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* USER PROFILE PANEL */}
            {activeTab === "user" && (
              <motion.section
                key="user"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="bg-white rounded-3xl shadow p-8 mb-8"
                role="tabpanel"
                id="panel-user"
                aria-labelledby="tab-user"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
                  <div className="text-sm text-gray-500">Manage your information</div>
                </div>

                {!user.saved ? (
                  <form onSubmit={handleSaveProfile} className="space-y-6" aria-live="polite">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex flex-col">
                        <span className="text-sm text-gray-700">Full name</span>
                        <input
                          required
                          value={user.name}
                          onChange={(e) => setUser((p) => ({ ...p, name: e.target.value }))}
                          className="mt-2 p-3 border rounded-lg"
                          placeholder="First Last"
                        />
                      </label>

                      <label className="flex flex-col">
                        <span className="text-sm text-gray-700">Email</span>
                        <input
                          required
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser((p) => ({ ...p, email: e.target.value }))}
                          className="mt-2 p-3 border rounded-lg"
                          placeholder="you@example.com"
                        />
                      </label>

                      <label className="flex flex-col">
                        <span className="text-sm text-gray-700">Department</span>
                        <input
                          value={user.department}
                          onChange={(e) => setUser((p) => ({ ...p, department: e.target.value }))}
                          className="mt-2 p-3 border rounded-lg"
                        />
                      </label>

                      <label className="flex flex-col">
                        <span className="text-sm text-gray-700">Course / Program</span>
                        <input
                          value={user.course}
                          onChange={(e) => setUser((p) => ({ ...p, course: e.target.value }))}
                          className="mt-2 p-3 border rounded-lg"
                        />
                      </label>

                      <label className="flex flex-col">
                        <span className="text-sm text-gray-700">Academic Year</span>
                        <input
                          value={user.session}
                          onChange={(e) => setUser((p) => ({ ...p, session: e.target.value }))}
                          className="mt-2 p-3 border rounded-lg"
                          placeholder="2024-2025"
                        />
                      </label>

                      <label className="flex flex-col">
                        <span className="text-sm text-gray-700">Profile image (optional)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            if (f.size > 5 * 1024 * 1024) {
                              alert("Max 5MB");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = () => setUser((p) => ({ ...p, image: reader.result }));
                            reader.readAsDataURL(f);
                          }}
                          className="mt-2"
                        />
                      </label>
                    </div>

                    {message && <div className="text-sm text-indigo-700">{message}</div>}

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={savingProfile}
                        className="flex-1 bg-indigo-600 text-white py-3 rounded-lg shadow disabled:opacity-60"
                        aria-busy={savingProfile}
                      >
                        {savingProfile ? "Saving..." : "Save profile"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          localStorage.setItem("userProfile", JSON.stringify(user));
                          setMessage("Saved locally");
                          setTimeout(() => setMessage(""), 2500);
                        }}
                        className="bg-gray-100 py-3 px-4 rounded-lg"
                      >
                        Save locally
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {user.image ? (
                          <img src={user.image} alt={`${user.name} avatar`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl text-gray-600">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-gray-800">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {user.department && (
                        <div className="p-4 bg-white rounded-lg shadow">
                          <div className="text-xs text-gray-500">Department</div>
                          <div className="font-medium">{user.department}</div>
                        </div>
                      )}
                      {user.course && (
                        <div className="p-4 bg-white rounded-lg shadow">
                          <div className="text-xs text-gray-500">Program</div>
                          <div className="font-medium">{user.course}</div>
                        </div>
                      )}
                      {user.session && (
                        <div className="p-4 bg-white rounded-lg shadow">
                          <div className="text-xs text-gray-500">Academic Year</div>
                          <div className="font-medium">{user.session}</div>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-3 flex gap-3 justify-center mt-2">
                      <button
                        onClick={() => {
                          setUser((p) => ({ ...p, saved: false }));
                          localStorage.setItem("userProfile", JSON.stringify({ ...user, saved: false }));
                          setActiveTab("user");
                        }}
                        className="bg-white py-2 px-4 rounded-lg border"
                      >
                        Edit profile
                      </button>

                      <button
                        onClick={() => setActiveTab("quiz")}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
                      >
                        Start quiz
                      </button>
                    </div>
                  </div>
                )}
              </motion.section>
            )}

            {/* QUIZ PANEL */}
            {activeTab === "quiz" && (
              <motion.section
                key="quiz"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="bg-white rounded-3xl shadow p-8 mb-8"
                role="tabpanel"
                id="panel-quiz"
                aria-labelledby="tab-quiz"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-indigo-700">Quiz Generator</h2>
                  <p className="text-sm text-gray-600">Choose a topic or enter a custom keyword to generate a 10-question quiz.</p>
                </div>

                <div className="space-y-6 max-w-3xl mx-auto">
                  <div>
                    <label htmlFor="main-topic" className="text-sm font-medium text-gray-700">
                      Main topic
                    </label>
                    <select
                      id="main-topic"
                      value={topic}
                      onChange={(e) => {
                        setTopic(e.target.value);
                        setSubtopic("");
                        setCustomTopic("");
                      }}
                      className="mt-2 w-full p-3 border rounded-lg"
                    >
                      <option value="">-- Select a topic --</option>
                      {topicSuggestions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {topic && subtopicMap[topic] && (
                    <div>
                      <label htmlFor="sub-topic" className="text-sm font-medium text-gray-700">
                        Subtopic (optional)
                      </label>
                      <select
                        id="sub-topic"
                        value={subtopic}
                        onChange={(e) => setSubtopic(e.target.value)}
                        className="mt-2 w-full p-3 border rounded-lg"
                      >
                        <option value="">All subtopics</option>
                        {subtopicMap[topic].map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="custom-topic" className="text-sm font-medium text-gray-700">
                      Or enter a custom topic / keyword
                    </label>
                    <input
                      id="custom-topic"
                      value={customTopic}
                      onChange={(e) => {
                        setCustomTopic(e.target.value);
                        if (e.target.value) {
                          setTopic("");
                          setSubtopic("");
                        }
                      }}
                      className="mt-2 w-full p-3 border rounded-lg"
                      placeholder="e.g., Recursion, HTTP Protocol, Binary Search"
                    />
                    <div className="text-xs text-gray-500 mt-1">Typing a custom topic clears the main topic selection.</div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleStart}
                      disabled={!topic && !customTopic.trim()}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg disabled:opacity-60"
                    >
                      {loading ? "Generating..." : "Generate Quiz Questions"}
                    </button>

                    <button
                      onClick={resetForm}
                      className="py-3 px-4 bg-gray-100 rounded-lg"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Loading / progress UI */}
                  {loading && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-700">{loadingStatus}</div>
                        <div className="text-sm text-gray-500">{progress}%</div>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded">
                        <div className="bg-indigo-500 h-2 rounded" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* LEADERBOARD PANEL */}
            {activeTab === "leaderboard" && (
              <motion.section
                key="leaderboard"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="bg-white rounded-3xl shadow p-8 mb-8"
                role="tabpanel"
                id="panel-leaderboard"
                aria-labelledby="tab-leaderboard"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-indigo-700">Leaderboard</h2>
                  <div className="text-sm text-gray-500">Showing recent attempts (newest first)</div>
                </div>

                {leaderboard.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-indigo-50 text-indigo-800">
                          <th className="p-3">Name</th>
                          <th className="p-3">Score</th>
                          <th className="p-3">Topic</th>
                          <th className="p-3">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((row, i) => (
                          <tr key={i} className="border-t hover:bg-indigo-50">
                            <td className="p-3">{user.name || "Anonymous"}</td>
                            <td className="p-3">
                              {row.score} / {row.total}
                            </td>
                            <td className="p-3 text-sm text-gray-600">{row.topic || "Computer Science"}</td>
                            <td className="p-3 text-sm text-gray-500">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center text-gray-600 py-8">No quiz attempts yet — start a quiz to appear here.</div>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Global fixed footer (outside sidebar) */}
      <FooterBar sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default QuizHome;