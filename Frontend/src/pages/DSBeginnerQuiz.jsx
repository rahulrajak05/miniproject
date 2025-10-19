import React, { useEffect, useState } from "react";
import axios from "axios";

const DataStructureQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/questions");
        setQuestions(res.data);
      } catch (err) {
        console.error("❌ Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (choice) => {
    if (choice === questions[current].correct) {
      setScore((prev) => prev + 1);
    }
    setSelected(choice);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  if (questions.length === 0)
    return <p className="text-center mt-10">Loading questions...</p>;

  if (showResult)
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">Quiz Completed 🎉</h2>
        <p>Your Score: {score} / {questions.length}</p>
      </div>
    );

  const q = questions[current];

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Question {current + 1} of {questions.length}
      </h2>
      <p className="mb-6">{q.text}</p>

      {q.choices.map((choice, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(choice)}
          disabled={!!selected}
          className={`block w-full text-left px-4 py-2 mb-3 rounded-lg border
            ${selected
              ? choice === q.correct
                ? "bg-green-500 text-white"
                : choice === selected
                ? "bg-red-500 text-white"
                : "bg-gray-100"
              : "hover:bg-gray-200"
            }`}
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default DataStructureQuiz;
