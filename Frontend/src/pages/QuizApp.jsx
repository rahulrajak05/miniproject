// QuizApp.jsx
import React, { useState } from "react";
import SearchQuiz from "./SearchQuiz";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const fetchQuestions = async (topic, num) => {
    const res = await fetch("http://localhost:5000/generate-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, numQuestions: num }),
    });
    const data = await res.json();
    setQuestions(data);
  };

  const handleAnswer = (option) => {
    if (option === questions[current].answer) setScore(score + 1);
    const next = current + 1;
    if (next < questions.length) setCurrent(next);
    else setCompleted(true);
  };

  if (questions.length === 0)
    return <SearchQuiz onStart={fetchQuestions} />;

  if (completed)
    return (
      <div className="text-center text-white p-6">
        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
        <p>Your Score: {score}/{questions.length}</p>
      </div>
    );

  const q = questions[current];
  return (
    <div className="p-8 text-white bg-gray-900 h-screen flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold mb-4">
        Q{current + 1}: {q.question}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(q.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleAnswer(key)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            {key}: {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizApp;
