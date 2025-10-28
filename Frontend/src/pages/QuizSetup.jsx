import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const QuizSetup = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!topic || !subtopic) return alert("Please fill all fields!");
    setLoading(true);

    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=30&type=multiple`);
      const data = await res.json();

      // Filter questions by topic/subtopic text
      let filtered = data.results.filter(
        (q) =>
          q.question.toLowerCase().includes(topic.toLowerCase()) ||
          q.question.toLowerCase().includes(subtopic.toLowerCase())
      );

      // If not enough matches, fallback to general ones
      if (filtered.length < numQuestions) filtered = data.results.slice(0, numQuestions);

      const formatted = filtered.slice(0, numQuestions).map((q) => ({
        question: q.question.replace(/&quot;|&#039;/g, "'"),
        options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
        answer: q.correct_answer,
      }));

      // Save in localStorage
      localStorage.setItem("quizQuestions", JSON.stringify(formatted));

      navigate("/quiz-start");
    } catch (err) {
      console.error(err);
      alert("Failed to load questions ❌");
    } finally {
      setLoading(false);
    }
  };

  // Helper to shuffle options
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Computer Science Quiz Setup 🎯
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Topic (e.g., Data Structures)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="text"
            placeholder="Subtopic (e.g., Linked List)"
            value={subtopic}
            onChange={(e) => setSubtopic(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="number"
            min="1"
            max="50"
            placeholder="No. of Questions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          disabled={loading}
          onClick={handleStart}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-full shadow-md w-full"
        >
          {loading ? "Generating..." : "Start Quiz"}
        </motion.button>
      </div>
    </div>
  );
};

export default QuizSetup;
