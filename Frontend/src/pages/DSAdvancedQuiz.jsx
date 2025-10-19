import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Utility to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ORIGINAL_QUESTIONS = [
  {
    text: 'Which data structure is used in the implementation of Tarjan’s Algorithm for finding strongly connected components?',
    choices: ['Queue', 'Stack', 'Priority Queue', 'Deque'],
    correct: 'Stack',
  },
  {
    text: 'What is the time complexity of building a heap using the bottom-up method?',
    choices: ['O(n log n)', 'O(n)', 'O(log n)', 'O(1)'],
    correct: 'O(n)',
  },
  {
    text: 'Which type of tree is used in segment trees for range queries?',
    choices: ['Binary Search Tree', 'Balanced Tree', 'Full Binary Tree', 'Complete Binary Tree'],
    correct: 'Full Binary Tree',
  },
  {
    text: 'What is the worst-case time complexity of Splay Tree operations?',
    choices: ['O(log n)', 'O(n)', 'O(n log n)', 'O(1)'],
    correct: 'O(n)',
  },
  {
    text: 'Which of the following is best for implementing a priority queue?',
    choices: ['Sorted array', 'Unsorted array', 'Binary Heap', 'Linked list'],
    correct: 'Binary Heap',
  },
  {
    text: 'In Red-Black Trees, what is the maximum height of the tree with n nodes?',
    choices: ['2*log(n + 1)', 'log n', 'n', 'sqrt(n)'],
    correct: '2*log(n + 1)',
  },
  {
    text: 'What is the key idea behind a Bloom Filter?',
    choices: ['Hash chaining', 'Probabilistic membership', 'Balanced binary trees', 'Dynamic resizing'],
    correct: 'Probabilistic membership',
  },
  {
    text: 'Which tree data structure is used in databases and file systems?',
    choices: ['Binary Tree', 'AVL Tree', 'B+ Tree', 'Red-Black Tree'],
    correct: 'B+ Tree',
  },
  {
    text: 'Which of the following techniques is used in union-find data structure to improve performance?',
    choices: ['Hashing', 'Path compression', 'Memoization', 'Tabulation'],
    correct: 'Path compression',
  },
  {
    text: 'What is the amortized time complexity of accessing an element in a splay tree?',
    choices: ['O(log n)', 'O(n)', 'O(1)', 'O(log log n)'],
    correct: 'O(log n)',
  },
];

const DSAdvancedQuiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });

  useEffect(() => {
    const shuffled = shuffleArray(ORIGINAL_QUESTIONS);
    setQuestions(shuffled);
    setAnswers(Array(shuffled.length).fill(null));
  }, []);

  const handleSelect = (choice) => {
    if (isSubmitted) return;
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
    setIsSubmitted(true);
    const correct = answers.reduce((score, ans, idx) => {
      return ans === questions[idx].correct ? score + 1 : score;
    }, 0);
    const wrong = questions.length - correct;
    setResult({ correct, wrong });
    setShowResult(true);
  };

  const currentQuestion = questions[currentIndex];
  if (questions.length === 0) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-[#F5F5F5] flex flex-col md:flex-row gap-6">
      {/* Main quiz panel */}
      <div className="flex-1 bg-white p-6 rounded shadow space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-900 mb-4">
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold">Data Structures – Advanced Quiz</h2>

        <div className="space-y-2">
          <label className="block font-medium">Question Asked</label>
          <div className="border rounded p-4 bg-gray-50">
            <strong>Q{currentIndex + 1}:</strong> {currentQuestion.text}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block font-medium">Select one of the following</label>
          {currentQuestion.choices.map((choice, i) => {
            const isCorrect = currentQuestion.correct === choice;
            const isSelected = answers[currentIndex] === choice;

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
                  disabled={isSubmitted}
                  onChange={() => handleSelect(choice)}
                  className="mr-3"
                />
                <span>{choice}</span>
              </div>
            );
          })}
        </div>

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
          <h3 className="font-semibold mb-4">Questions</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {questions.map((_, idx) => {
              let status = 'bg-gray-300 text-gray-600';
              if (answers[idx] !== null) {
                if (isSubmitted) {
                  status =
                    answers[idx] === questions[idx].correct
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

      {/* Centered Result Modal */}
      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center space-y-4">
            <h2 className="text-2xl font-bold">Quiz Results</h2>
            <p className="text-green-600 font-semibold">✔ Correct: {result.correct}</p>
            <p className="text-red-600 font-semibold">❌ Wrong: {result.wrong}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setShowResult(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DSAdvancedQuiz;
