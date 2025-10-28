import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const QuizHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("quiz");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  // ✅ Load saved user profile
  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Load leaderboard data
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
    if (stored.length === 0) {
      const mock = [
        { name: "Alice", score: 9, total: 10, date: "2025-10-25" },
        { name: "Bob", score: 8, total: 10, date: "2025-10-26" },
        { name: "Charlie", score: 7, total: 10, date: "2025-10-27" },
      ];
      setLeaderboard(mock);
    } else {
      const sorted = stored.sort((a, b) => b.score - a.score).slice(0, 10);
      setLeaderboard(sorted);
    }
  }, []);

  // ✅ Save profile to backend
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setMessage("⏳ Saving profile...");

    try {
      const res = await fetch("http://localhost:8081/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ " + data.message);
        const updatedUser = { ...user, saved: true };
        setUser(updatedUser);
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
      } else {
        setMessage("❌ " + (data.error || "Failed to save"));
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server not reachable");
    }
  };

  // ✅ Quiz start handler
  const handleStart = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic name!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://opentdb.com/api.php?amount=25&type=multiple");
      const data = await res.json();

      let filtered = data.results.filter((q) =>
        q.question.toLowerCase().includes(topic.toLowerCase())
      );
      if (filtered.length < 10) filtered = data.results.slice(0, 10);

      const formatted = filtered.slice(0, 10).map((q) => ({
        question: q.question.replace(/&quot;|&#039;/g, "'"),
        options: shuffle([...q.incorrect_answers, q.correct_answer]),
        answer: q.correct_answer,
      }));

      localStorage.setItem("quizQuestions", JSON.stringify(formatted));
      localStorage.setItem("quizTopic", topic);
      navigate("/quiz-start");
    } catch (err) {
      console.error(err);
      alert("Failed to load quiz questions");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper: shuffle array
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("quizuser"); // remove logged-in user data
    localStorage.removeItem("userProfile");
    navigate("/dashboard"); // redirect to login page
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100">
      {/* ===== SIDEBAR ===== */}
      <motion.div
        animate={{ width: sidebarOpen ? 250 : 80 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 text-white flex flex-col justify-between shadow-lg"
      >
        <div>
          <div className="flex items-center gap-3 p-5 border-b border-gray-700">
            <img src={logo} alt="Logo" className="w-13 h-13 rounded-full" />
            <h2 className="text-lg font-bold">CS Dept PU</h2>
          </div>

          <nav className="mt-6 flex flex-col space-y-2">
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
                className={`text-left px-6 py-3 rounded-r-full transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                {sidebarOpen ? tab.label : tab.label.split(" ")[0]}
              </button>
            ))}
          </nav>
        </div>

        <div className="text-center text-xs py-4 border-t border-gray-700">
          © {new Date().getFullYear()} Pondicherry University
        </div>
      </motion.div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* ===== USER PROFILE ===== */}
          {activeTab === "user" && (
            <motion.div
              key="user"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-lg p-10 mx-auto w-full max-w-2xl text-center"
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
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-700 mb-2">
                  Pondicherry University
                </h2>
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                  Department of Computer Science
                </h3>
                <h4 className="text-2xl font-bold text-gray-800 border-b-4 border-indigo-300 inline-block pb-2">
                  Quiz
                </h4>
              </div>

              <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                Search Topic for Quiz
              </h2>

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Enter a topic (e.g., Computer Networks)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  disabled={loading}
                  onClick={handleStart}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-full shadow-md"
                >
                  {loading ? "Loading..." : "Start Quiz"}
                </motion.button>
              </div>
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
              className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-indigo-50 to-blue-100 p-6"
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
                <h1 className="text-3xl font-bold text-indigo-700 mb-6">
                  Leaderboard
                </h1>

                {leaderboard.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-gray-800">
                      <thead>
                        <tr className="bg-indigo-200 text-indigo-900">
                          <th className="py-3 px-4 text-left rounded-tl-lg">
                            Rank
                          </th>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Score</th>
                          <th className="py-3 px-4 text-left rounded-tr-lg">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((entry, i) => (
                          <tr
                            key={i}
                            className={`border-t hover:bg-indigo-50 transition ${
                              entry.name === user.name
                                ? "bg-yellow-100 font-semibold"
                                : ""
                            }`}
                          >
                            <td className="py-2 px-4">{i + 1}</td>
                            <td className="py-2 px-4">{user.name}</td>
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
