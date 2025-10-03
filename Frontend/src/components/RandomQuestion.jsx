import React, { useState } from "react";
import { getRandomQuestion } from "../utils/getRandomQuestion";

export default function RandomQuestion() {
  const [difficulty, setDifficulty] = useState("");
  const [question, setQuestion] = useState(getRandomQuestion(difficulty));

  const handleNext = () => {
    const newQ = getRandomQuestion(difficulty);
    if (newQ) setQuestion(newQ);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto mt-10">
      {question && (
        <>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {question.title}
          </h2>
          <p className="text-gray-700 mb-4">{question.description}</p>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">Difficulty:</span>{" "}
            {question.difficulty}
          </p>

          <h3 className="font-semibold mb-2">Examples:</h3>
          <ul className="list-disc pl-6 space-y-2">
            {question.examples.map((ex, idx) => (
              <li key={idx} className="text-sm text-gray-700">
                <strong>Input:</strong> {ex.input} <br />
                <strong>Output:</strong> {ex.output}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Difficulty filter */}
      <div className="mt-6 flex items-center gap-3">
        <label className="font-medium text-gray-700">Filter:</label>
        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            setQuestion(getRandomQuestion(e.target.value));
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Button */}
      <button
        onClick={handleNext}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Show Another Question
      </button>
    </div>
  );
}
