// src/pages/RiseOnQuiz.jsx
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DUMMY_QUESTIONS = [
  {
    text: 'What is the primary characteristic of an array?',
    choices: [
      'Dynamic size',
      'Fixed size',
      'Stores key-value pairs',
      'Nodes with pointers',
    ],
    correct: 'Fixed size',
  },
  {
    text: 'Which method adds an element to the end of an array in JavaScript?',
    choices: ['push()', 'pop()', 'shift()', 'unshift()'],
    correct: 'push()',
  },
  {
    text: 'What does the `map` function return in React?',
    choices: ['A new array', 'The original array', 'A single value', 'Nothing'],
    correct: 'A new array',
  },
  {
    text: 'Which hook lets you dispatch actions in Redux?',
    choices: ['useState', 'useSelector', 'useDispatch', 'useContext'],
    correct: 'useDispatch',
  },
  {
    text: 'In CSS, what does `flex: 1` do?',
    choices: [
      'Grows to fill available space',
      'Shrinks to zero',
      'Sets width to 1px',
      'Does nothing',
    ],
    correct: 'Grows to fill available space',
  },
  {
    text: 'What will `typeof null` evaluate to in JavaScript?',
    choices: ['"object"', '"null"', '"undefined"', '"number"'],
    correct: '"object"',
  },
  {
    text: 'Which tag is used to include JavaScript in HTML?',
    choices: ['<js>', '<script>', '<javascript>', '<code>'],
    correct: '<script>',
  },
  {
    text: 'What’s the output of `console.log(2 + "2")`?',
    choices: ['4', '"22"', 'NaN', 'TypeError'],
    correct: '"22"',
  },
  {
    text: 'Which property controls the stacking order in CSS?',
    choices: ['z-index', 'order', 'stack', 'layer'],
    correct: 'z-index',
  },
  {
    text: 'What does HTTP stand for?',
    choices: [
      'HyperText Transfer Protocol',
      'High Transfer Text Protocol',
      'Hyperlink Transfer Text Process',
      'HTML Transfer Training Protocol',
    ],
    correct: 'HyperText Transfer Protocol',
  },
];

const RiseOnQuiz1 = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(DUMMY_QUESTIONS.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });

  const handleSelect = (choice) => {
    if (isSubmitted) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = choice;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (currentIndex < DUMMY_QUESTIONS.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    let correct = 0;
    DUMMY_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    const wrong = DUMMY_QUESTIONS.length - correct;
    setResult({ correct, wrong });
    setIsSubmitted(true);
    setShowResult(true);
  };

  const currentQuestion = DUMMY_QUESTIONS[currentIndex];

  return (
    <div className="min-h-screen p-6 bg-[#F5F5F5] flex flex-col md:flex-row gap-6">
      {/* Main quiz panel */}
      <div className="flex-1 bg-white p-6 rounded shadow space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-900 mb-4"
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold flex items-center gap-2">
          Quiz <HelpCircle size={18} className="text-blue-400" />
        </h2>

        {/* Question Asked */}
        <div className="space-y-2">
          <label className="block font-medium">Question Asked</label>
          <div className="border rounded p-4 bg-gray-50">
            <strong>Q{currentIndex + 1}:</strong> {currentQuestion.text}
          </div>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          <label className="block font-medium">Select one of the following</label>
          {currentQuestion.choices.map((choice, i) => {
            const isSelected = answers[currentIndex] === choice;
            const isCorrect = currentQuestion.correct === choice;
            let choiceClass = 'border rounded p-3 flex items-center cursor-pointer';

            if (isSubmitted) {
              if (isCorrect) choiceClass += ' bg-green-100 border-green-500';
              else if (isSelected && !isCorrect) choiceClass += ' bg-red-100 border-red-500';
            }

            return (
              <div key={i} className={choiceClass}>
                <input
                  type="radio"
                  name={`q${currentIndex}`}
                  checked={isSelected}
                  onChange={() => handleSelect(choice)}
                  disabled={isSubmitted}
                  className="mr-3"
                />
                <span>{choice}</span>
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === DUMMY_QUESTIONS.length - 1}
            className={`px-4 py-2 rounded ${
              currentIndex === DUMMY_QUESTIONS.length - 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white p-6 rounded shadow flex flex-col justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-4">
            Questions <HelpCircle size={16} className="text-blue-400" />
          </h3>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {DUMMY_QUESTIONS.map((_, idx) => {
              let status = 'bg-gray-300 text-gray-600';
              if (answers[idx] !== null) {
                if (isSubmitted) {
                  status =
                    answers[idx] === DUMMY_QUESTIONS[idx].correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white';
                } else {
                  status = 'bg-green-400 text-white';
                }
              } else if (currentIndex === idx) {
                status = 'bg-orange-400 text-white';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`${status} rounded-full w-10 h-10 flex items-center justify-center`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {!isSubmitted && (
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-lg font-medium shadow hover:opacity-90"
          >
            Submit Quiz
          </button>
        )}
      </div>

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center space-y-4">
            <h2 className="text-2xl font-bold">Quiz Results</h2>
            <p className="text-green-600 font-semibold">✔ Correct: {result.correct}</p>
            <p className="text-red-600 font-semibold">❌ Wrong: {result.wrong}</p>
            <p className="text-gray-700 font-medium">
              🎯 Score: {((result.correct / DUMMY_QUESTIONS.length) * 100).toFixed(1)}%
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => setShowResult(false)}
              >
                Close
              </button>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                onClick={() => {
                  setAnswers(Array(DUMMY_QUESTIONS.length).fill(null));
                  setCurrentIndex(0);
                  setIsSubmitted(false);
                  setShowResult(false);
                }}
              >
                Retake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiseOnQuiz1;
