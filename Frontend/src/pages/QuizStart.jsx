import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const QuizStart = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [userName, setUserName] = useState("");
  const [topic, setTopic] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Loading questions...");

  useEffect(() => {
    try {
      const profile = localStorage.getItem("userProfile");
      if (profile) {
        const p = JSON.parse(profile);
        if (p.name) {
          setUserName(p.name);
          return;
        }
      }
    } catch {}
    const name = localStorage.getItem("userName") || "Guest";
    setUserName(name);
  }, []);

  useEffect(() => {
    const t = (localStorage.getItem("quizTopic") || "").trim();
    setTopic(t);
  }, []);

  useEffect(() => {
    const decode = (str = "") =>
      str.replace(
        /&quot;|&#039;|&amp;|&ldquo;|&rdquo;|&rsquo;|&lsquo;|&mdash;|&ndash;/g,
        (m) => (m === "&amp;" ? "&" : m === "&mdash;" || m === "&ndash;" ? "—" : "'")
      );

    // Enhanced topic matching with better keyword detection
    const matchesTopic = (q, t) => {
      if (!t) return false;
      
      const topicLower = t.toLowerCase();
      const hay = (
        (q.question || "") +
        " " +
        (q.correct_answer || "") +
        " " +
        ((q.incorrect_answers || []).join(" ") || "")
      ).toLowerCase();

      // Exact topic keywords
      const topicKeywords = topicLower.split(/\s+/).filter(w => w.length > 2);
      
      // Check if any keyword matches
      return topicKeywords.some(keyword => hay.includes(keyword));
    };

    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

    const load = async () => {
      const needed = 10;
      const maxAttempts = 8;
      const storedTopic = (localStorage.getItem("quizTopic") || topic || "").trim();

      if (!storedTopic) {
        setLoadingMessage("No topic selected. Loading general CS questions...");
      } else {
        setLoadingMessage(`Searching for ${storedTopic} questions...`);
      }

      // 1) Try local saved questions first
      try {
        const raw = localStorage.getItem("quizQuestions");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const savedTopic = localStorage.getItem("quizTopic");
            // Only use saved questions if topic matches
            if (savedTopic === storedTopic && parsed.length >= needed) {
              setQuestions(
                parsed.slice(0, needed).map((q) => ({
                  question: decode(q.question),
                  options: shuffleArray([...(q.incorrect_answers || q.options), q.correct_answer || q.answer]),
                  answer: q.correct_answer || q.answer,
                }))
              );
              return;
            }
          }
        }
      } catch (err) {
        console.warn("parse saved quizQuestions failed:", err);
      }

      const collected = [];
      const seenQuestions = new Set();

      // 2) Aggressive topic-based search from CS category
      if (storedTopic) {
        setLoadingMessage(`Finding ${storedTopic} questions (attempt 1/${maxAttempts})...`);
        
        for (let attempt = 0; attempt < maxAttempts && collected.length < needed; attempt++) {
          try {
            setLoadingMessage(`Finding ${storedTopic} questions (attempt ${attempt + 1}/${maxAttempts})...`);
            
            const res = await fetch(
              `https://opentdb.com/api.php?amount=50&category=18&type=multiple`
            );
            const data = await res.json();
            
            if (!data.results || data.results.length === 0) {
              console.warn("No results from API");
              continue;
            }

            // First pass: strict matching
            data.results.forEach((q) => {
              if (collected.length >= needed) return;
              const qKey = q.question;
              if (!seenQuestions.has(qKey) && matchesTopic(q, storedTopic)) {
                collected.push(q);
                seenQuestions.add(qKey);
              }
            });

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 300));
          } catch (err) {
            console.warn(`Attempt ${attempt + 1} failed:`, err);
          }
        }

        // If we found enough topic-specific questions, use them
        if (collected.length >= needed) {
          setLoadingMessage(`Found ${collected.length} ${storedTopic} questions!`);
        } else if (collected.length > 0) {
          setLoadingMessage(`Found ${collected.length} ${storedTopic} questions, adding more CS questions...`);
          
          // Add general CS questions to fill remaining slots
          try {
            const remaining = needed - collected.length;
            const res = await fetch(
              `https://opentdb.com/api.php?amount=${remaining * 2}&category=18&type=multiple`
            );
            const data = await res.json();
            
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
        } else {
          // No topic matches found
          setLoadingMessage(`No ${storedTopic} questions found. Loading general CS questions...`);
          
          try {
            const res = await fetch(
              `https://opentdb.com/api.php?amount=${needed * 2}&category=18&type=multiple`
            );
            const data = await res.json();
            
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
            console.error("Failed to fetch CS questions:", err);
          }
        }
      } else {
        // No specific topic - get general CS questions
        try {
          const res = await fetch(
            `https://opentdb.com/api.php?amount=${needed}&category=18&type=multiple`
          );
          const data = await res.json();
          
          if (data.results) {
            collected.push(...data.results.slice(0, needed));
          }
        } catch (err) {
          console.error("Failed to fetch questions:", err);
        }
      }

      // Format & save
      const formatted = collected.slice(0, needed).map((q) => ({
        question: decode(q.question),
        options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
        answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
      }));

      if (formatted.length > 0) {
        try {
          localStorage.setItem("quizQuestions", JSON.stringify(formatted));
          if (storedTopic) localStorage.setItem("quizTopic", storedTopic);
        } catch {}
        setQuestions(formatted);
        setLoadingMessage("");
      } else {
        setLoadingMessage("Failed to load questions. Please try again.");
        // Last resort: try saved questions
        try {
          const fallbackRaw = localStorage.getItem("quizQuestions");
          if (fallbackRaw) {
            const parsed = JSON.parse(fallbackRaw);
            setQuestions(parsed.slice(0, needed));
            setLoadingMessage("");
          }
        } catch {}
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const handleAnswer = (option) => {
    if (!questions.length) return;
    setSelected(option);
    const isCorrect = option === questions[currentIndex].answer;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        setFinished(true);
        saveToLeaderboard(finalScore);
      }
    }, 700);
  };

  const saveToLeaderboard = (finalScore) => {
    try {
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      // Try to capture logged-in email for accurate grouping/highlighting
      let email = "";
      try {
        const q = JSON.parse(localStorage.getItem("quizuser") || "null");
        const u = JSON.parse(localStorage.getItem("user") || "null");
        email = (q && q.email) || (u && u.email) || "";
      } catch {}
      const newEntry = {
        name: userName || "Guest",
        score: finalScore,
        total: questions.length || 0,
        date: new Date().toLocaleString(),
        topic: topic || "Computer Science",
        email,
      };
      const updated = [...leaderboard, newEntry];
      localStorage.setItem("leaderboard", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save leaderboard:", err);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelected(null);
    setFinished(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4 py-10">
      {!finished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center"
        >
          <div className="mb-4 text-sm font-semibold text-indigo-600">
            {topic ? `Topic: ${topic}` : "Topic: Computer Science"}
          </div>

          {questions.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                Question {currentIndex + 1} of {questions.length}
              </h2>
              <p className="text-lg font-medium text-gray-800 mb-6">
                {questions[currentIndex].question}
              </p>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentIndex].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => handleAnswer(opt)}
                    disabled={selected !== null}
                    className={`px-4 py-3 rounded-lg border-2 font-semibold transition-colors ${
                      selected
                        ? opt === questions[currentIndex].answer
                          ? "bg-green-500 text-white border-green-600"
                          : opt === selected
                          ? "bg-red-500 text-white border-red-600"
                          : "bg-gray-200 text-gray-700 border-gray-300"
                        : "bg-gray-100 hover:bg-indigo-100 border-gray-300 hover:border-indigo-400"
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-lg text-gray-600">{loadingMessage}</p>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Quiz Completed! 🎉</h2>
          <p className="text-lg text-gray-700 mb-2">
            {userName}, your score is:
          </p>
          <p className="text-4xl font-bold text-indigo-600 mb-4">
            {score} / {questions.length}
          </p>
          {topic && (
            <p className="text-sm text-gray-600 mb-6">Topic: {topic}</p>
          )}

          <div className="flex justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleRestart}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-full shadow-md"
            >
              Restart
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                try {
                  localStorage.setItem("quizHomeTab", "leaderboard");
                } catch {}
                navigate("/quiz-home");
              }}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow-md"
            >
              View Leaderboard
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizStart;