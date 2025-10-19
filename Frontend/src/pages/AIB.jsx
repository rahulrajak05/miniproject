import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Shuffle utility function (Fisher-Yates algorithm)
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const DUMMY_QUESTIONS = [
  {
    text: 'What does AI stand for?',
    choices: ['Artificial Interface', 'Automatic Intelligence', 'Artificial Intelligence', 'Advanced Interface'],
    correct: 'Artificial Intelligence',
  },
  {
    text: 'Which of the following is an application of AI?',
    choices: ['Speech Recognition', 'Text Editing', 'Email Writing', 'PowerPoint'],
    correct: 'Speech Recognition',
  },
  {
    text: 'Which programming language is commonly used for AI?',
    choices: ['C', 'Python', 'HTML', 'CSS'],
    correct: 'Python',
  },
  {
    text: 'Which term refers to the ability of a machine to mimic human actions?',
    choices: ['Automation', 'Simulation', 'Intelligence', 'Imitation'],
    correct: 'Automation',
  },
  {
    text: 'What is a chatbot?',
    choices: ['A robot that chats', 'A game bot', 'AI-based messaging software', 'Voice assistant'],
    correct: 'AI-based messaging software',
  },
  {
    text: 'Which AI branch deals with teaching machines to learn from data?',
    choices: ['Machine Learning', 'Robotics', 'Computer Vision', 'NLP'],
    correct: 'Machine Learning',
  },
  {
    text: 'Which is not a type of AI?',
    choices: ['Weak AI', 'Strong AI', 'Reactive Machines', 'Super Hardware'],
    correct: 'Super Hardware',
  },
  {
    text: 'Who is considered the father of Artificial Intelligence?',
    choices: ['Alan Turing', 'Bill Gates', 'Steve Jobs', 'Elon Musk'],
    correct: 'Alan Turing',
  },
  {
    text: 'Which of these is not an AI application?',
    choices: ['Netflix Recommendations', 'Google Maps', 'MS Paint', 'Alexa'],
    correct: 'MS Paint',
  },
  {
    text: 'Which of the following is a virtual assistant powered by AI?',
    choices: ['WhatsApp', 'Cortana', 'VLC Media Player', 'Google Chrome'],
    correct: 'Cortana',
  },
];

const AIB = () => {
  const navigate = useNavigate();

  // Shuffle questions once on mount
  const [questions] = useState(() => shuffleArray(DUMMY_QUESTIONS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleSelect = (choice) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = choice;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    let right = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) right += 1;
    });
    const wrong = questions.length - right;

    alert(`Quiz Results:\n✔️ Correct: ${right}\n❌ Wrong: ${wrong}`);
  };

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
          Quiz
        </h2>

        {/* Question Asked */}
        <div className="space-y-2">
          <label className="block font-medium">Question Asked</label>
          <div className="border rounded p-4 bg-gray-50">
            <strong>Q{currentIndex + 1}:</strong>{' '}
            {questions[currentIndex].text}
          </div>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          <label className="block font-medium">Select one of the following</label>
          {questions[currentIndex].choices.map((choice, i) => (
            <div key={i} className="border rounded p-3 flex items-center">
              <input
                type="radio"
                name={`q${currentIndex}`}
                checked={answers[currentIndex] === choice}
                onChange={() => handleSelect(choice)}
                className="mr-3"
              />
              <span>{choice}</span>
            </div>
          ))}
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
            disabled={currentIndex === questions.length - 1}
            className={`px-4 py-2 rounded ${
              currentIndex === questions.length - 1
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
            Questions
          </h3>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {questions.map((_, idx) => {
              const status =
                answers[idx] === null
                  ? currentIndex === idx
                    ? 'bg-orange-400 text-white'
                    : 'bg-gray-300 text-gray-600'
                  : 'bg-green-400 text-white';

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

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-lg font-medium shadow hover:opacity-90"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default AIB;
