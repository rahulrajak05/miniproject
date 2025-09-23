// src/pages/
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DUMMY_QUESTIONS = [
  {
    text: 'Which algorithm is used in decision trees?',
    choices: ['Backpropagation', 'Entropy and Information Gain', 'Gradient Descent', 'Naive Bayes'],
    correct: 'Entropy and Information Gain',
  },
  {
    text: 'What is the goal of supervised learning?',
    choices: ['Cluster the data', 'Generate data', 'Learn from labeled data', 'Predict random values'],
    correct: 'Learn from labeled data',
  },
  {
    text: 'Which of the following is a type of unsupervised learning?',
    choices: ['Regression', 'Classification', 'Clustering', 'Reinforcement'],
    correct: 'Clustering',
  },
  {
    text: 'Which of the following is a popular AI framework?',
    choices: ['TensorFlow', 'React', 'Bootstrap', 'Angular'],
    correct: 'TensorFlow',
  },
  {
    text: 'In neural networks, what does a neuron do?',
    choices: ['Adds numbers', 'Transfers data only', 'Applies activation function and passes signals', 'Sorts data'],
    correct: 'Applies activation function and passes signals',
  },
  {
    text: 'Which AI technique is used to play games?',
    choices: ['Fuzzy Logic', 'Expert Systems', 'Reinforcement Learning', 'Genetic Algorithm'],
    correct: 'Reinforcement Learning',
  },
  {
    text: 'What does NLP stand for in AI?',
    choices: ['New Programming Logic', 'Natural Program Learning', 'Natural Language Processing', 'Node Learning Pattern'],
    correct: 'Natural Language Processing',
  },
  {
    text: 'Which of these is a type of activation function?',
    choices: ['ReLU', 'LSTM', 'CNN', 'RNN'],
    correct: 'ReLU',
  },
  {
    text: 'Which model is best for image recognition?',
    choices: ['Decision Tree', 'Convolutional Neural Network', 'Naive Bayes', 'KNN'],
    correct: 'Convolutional Neural Network',
  },
  {
    text: 'Overfitting means:',
    choices: ['Model performs well on all data', 'Model memorizes training data', 'Model performs better on test data', 'Model underestimates'],
    correct: 'Model memorizes training data',
  },
];



const AII = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    Array(DUMMY_QUESTIONS.length).fill(null)
  );

  const handleSelect = (choice) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = choice;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (currentIndex < DUMMY_QUESTIONS.length - 1) {
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
    DUMMY_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correct) right += 1;
    });
    const wrong = DUMMY_QUESTIONS.length - right;

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
          RiseON Quiz <HelpCircle size={18} className="text-blue-400" />
        </h2>

        {/* Question Asked */}
        <div className="space-y-2">
          <label className="block font-medium">Question Asked</label>
          <div className="border rounded p-4 bg-gray-50">
            <strong>Q{currentIndex + 1}:</strong>{' '}
            {DUMMY_QUESTIONS[currentIndex].text}
          </div>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          <label className="block font-medium">Select one of the following</label>
          {DUMMY_QUESTIONS[currentIndex].choices.map((choice, i) => (
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

export default AII;
