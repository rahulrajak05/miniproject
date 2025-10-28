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

  //  Fetch username (you can store it after login)
  useEffect(() => {
    const name = localStorage.getItem("userName") || "Guest";
    setUserName(name);
  }, []);

  //  Fetch questions automatically from free API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
        const data = await res.json();
        if (data.results.length === 0) throw new Error("No questions found");

        // Format API response
        const formatted = data.results.map((q) => ({
          question: q.question.replace(/&quot;|&#039;/g, "'"),
          options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
          answer: q.correct_answer,
        }));

        // Save locally for offline access
        localStorage.setItem("quizQuestions", JSON.stringify(formatted));
        setQuestions(formatted);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        const saved = localStorage.getItem("quizQuestions");
        if (saved) setQuestions(JSON.parse(saved));
      }
    };

    fetchQuestions();
  }, []);

  // Shuffle options
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[currentIndex].answer) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
      } else {
        setFinished(true);
        saveToLeaderboard(); // Save score when finished
      }
    }, 800);
  };

  // Save score to leaderboard
  const saveToLeaderboard = () => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    const newEntry = {
      name: userName,
      score: score,
      total: questions.length,
      date: new Date().toLocaleString(),
    };

    const updated = [...leaderboard, newEntry];
    localStorage.setItem("leaderboard", JSON.stringify(updated));
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center"
        >
          {questions.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                Question {currentIndex + 1} of {questions.length}
              </h2>
              <p className="text-lg font-medium text-gray-800 mb-6">
                {questions[currentIndex].question}
              </p>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentIndex].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleAnswer(opt)}
                    disabled={selected !== null}
                    className={`px-4 py-2 rounded-full border font-semibold ${
                      selected
                        ? opt === questions[currentIndex].answer
                          ? "bg-green-400 text-white"
                          : opt === selected
                          ? "bg-red-400 text-white"
                          : "bg-gray-200 text-gray-700"
                        : "bg-gray-100 hover:bg-indigo-100"
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-lg text-gray-600 animate-pulse">Loading questions...</p>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Quiz Completed! 🎉</h2>
          <p className="text-lg text-gray-700 mb-4">
            {userName}, your score is <span className="font-bold">{score}</span> /{" "}
            {questions.length}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleRestart}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-full shadow-md mr-3"
          >
            Restart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/quiz-home")}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow-md"
          >
            View Leaderboard
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizStart;
