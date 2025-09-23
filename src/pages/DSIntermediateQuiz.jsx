// src/pages/DSIntermediateQuiz.jsx
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DUMMY_QUESTIONS = [
  {
    text: 'What is the time complexity of inserting an element into a Binary Search Tree (BST) on average?',
    choices: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'],
    correct: 'O(log n)',
  },
  {
    text: 'Which traversal of a binary tree gives nodes in sorted order if the tree is a BST?',
    choices: ['Preorder', 'Postorder', 'Inorder', 'Level order'],
    correct: 'Inorder',
  },
  {
    text: 'What is the worst-case time complexity of Quick Sort?',
    choices: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(log n)'],
    correct: 'O(n^2)',
  },
  {
    text: 'Which data structure is used to implement DFS (Depth-First Search)?',
    choices: ['Queue', 'Stack', 'Heap', 'Priority Queue'],
    correct: 'Stack',
  },
  {
    text: 'Which of the following is a self-balancing binary search tree?',
    choices: ['Binary Heap', 'B-Tree', 'AVL Tree', 'Trie'],
    correct: 'AVL Tree',
  },
  {
    text: 'Which hashing technique handles collisions by storing collided elements in a linked list?',
    choices: ['Linear Probing', 'Quadratic Probing', 'Double Hashing', 'Chaining'],
    correct: 'Chaining',
  },
  {
    text: 'Which algorithm is used to find the shortest path in a weighted graph with non-negative edges?',
    choices: ['Prim’s Algorithm', 'Kruskal’s Algorithm', 'Dijkstra’s Algorithm', 'DFS'],
    correct: 'Dijkstra’s Algorithm',
  },
  {
    text: 'What is the maximum number of nodes in a binary tree of height h?',
    choices: ['2^h - 1', 'h', '2h', 'log(h)'],
    correct: '2^h - 1',
  },
  {
    text: 'Which of the following is true about a full binary tree?',
    choices: ['Each node has 0 or 1 children', 'All levels are completely filled', 'Each node has 0 or 2 children', 'All nodes are leaves'],
    correct: 'Each node has 0 or 2 children',
  },
  {
    text: 'Which data structure gives the best performance for implementing LRU cache?',
    choices: ['Array and Stack', 'Queue and Stack', 'HashMap and Doubly Linked List', 'BST and Queue'],
    correct: 'HashMap and Doubly Linked List',
  },
];

const DSIntermediateQuiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(DUMMY_QUESTIONS.length).fill(null));

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
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-900 mb-4">
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold flex items-center gap-2">
          Data Structures – Intermediate Quiz <HelpCircle size={18} className="text-blue-400" />
        </h2>

        <div className="space-y-2">
          <label className="block font-medium">Question Asked</label>
          <div className="border rounded p-4 bg-gray-50">
            <strong>Q{currentIndex + 1}:</strong> {DUMMY_QUESTIONS[currentIndex].text}
          </div>
        </div>

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

        <div className="flex justify-between">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded ${currentIndex === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === DUMMY_QUESTIONS.length - 1}
            className={`px-4 py-2 rounded ${currentIndex === DUMMY_QUESTIONS.length - 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
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

export default DSIntermediateQuiz;
