// src/pages/DSIntermediateQuiz.jsx
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DUMMY_QUESTIONS = [
  { text: 'What is the time complexity of inserting an element into a Binary Search Tree (BST) on average?', choices: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], correct: 'O(log n)' },
  { text: 'Which traversal of a binary tree gives nodes in sorted order if the tree is a BST?', choices: ['Preorder', 'Postorder', 'Inorder', 'Level order'], correct: 'Inorder' },
  { text: 'What is the worst-case time complexity of Quick Sort?', choices: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(log n)'], correct: 'O(n^2)' },
  { text: 'Which data structure is used to implement DFS (Depth-First Search)?', choices: ['Queue', 'Stack', 'Heap', 'Priority Queue'], correct: 'Stack' },
  { text: 'Which of the following is a self-balancing binary search tree?', choices: ['Binary Heap', 'B-Tree', 'AVL Tree', 'Trie'], correct: 'AVL Tree' },
  { text: 'Which hashing technique handles collisions by storing collided elements in a linked list?', choices: ['Linear Probing', 'Quadratic Probing', 'Double Hashing', 'Chaining'], correct: 'Chaining' },
  { text: 'Which algorithm is used to find the shortest path in a weighted graph with non-negative edges?', choices: ['Prim’s Algorithm', 'Kruskal’s Algorithm', 'Dijkstra’s Algorithm', 'DFS'], correct: 'Dijkstra’s Algorithm' },
  { text: 'What is the maximum number of nodes in a binary tree of height h?', choices: ['2^h - 1', 'h', '2h', 'log(h)'], correct: '2^h - 1' },
  { text: 'Which of the following is true about a full binary tree?', choices: ['Each node has 0 or 1 children', 'All levels are completely filled', 'Each node has 0 or 2 children', 'All nodes are leaves'], correct: 'Each node has 0 or 2 children' },
  { text: 'Which data structure gives the best performance for implementing LRU cache?', choices: ['Array and Stack', 'Queue and Stack', 'HashMap and Doubly Linked List', 'BST and Queue'], correct: 'HashMap and Doubly Linked List' },
  // 10 more questions
  { text: 'Which data structure is ideal for implementing a priority queue?', choices: ['Heap', 'Stack', 'Queue', 'Array'], correct: 'Heap' },
  { text: 'Which algorithm detects cycles in a directed graph?', choices: ['DFS', 'BFS', 'Kahn’s Algorithm', 'Dijkstra’s Algorithm'], correct: 'DFS' },
  { text: 'Which traversal is used in Breadth-First Search (BFS)?', choices: ['Stack', 'Queue', 'Heap', 'Priority Queue'], correct: 'Queue' },
  { text: 'Which tree data structure is used in databases for indexing?', choices: ['AVL Tree', 'B-Tree', 'Trie', 'Heap'], correct: 'B-Tree' },
  { text: 'What is the space complexity of Merge Sort?', choices: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correct: 'O(n)' },
  { text: 'Which of the following is NOT a stable sorting algorithm?', choices: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Insertion Sort'], correct: 'Quick Sort' },
  { text: 'Which data structure is used in a recursive function’s execution?', choices: ['Stack', 'Queue', 'Heap', 'Array'], correct: 'Stack' },
  { text: 'Which technique divides a problem into subproblems and solves recursively?', choices: ['Dynamic Programming', 'Divide and Conquer', 'Greedy', 'Backtracking'], correct: 'Divide and Conquer' },
  { text: 'Which of the following is used to implement adjacency in a graph?', choices: ['Adjacency List', 'Adjacency Matrix', 'Both', 'None'], correct: 'Both' },
  { text: 'Which algorithm finds Minimum Spanning Tree (MST)?', choices: ['Dijkstra’s Algorithm', 'Prim’s Algorithm', 'Bellman-Ford', 'Floyd-Warshall'], correct: 'Prim’s Algorithm' },
];


// Shuffle helper
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const DSIntermediateQuiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });

  // Shuffle questions on mount
  useEffect(() => {
    const shuffled = shuffleArray(DUMMY_QUESTIONS);
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
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correctCount++;
    });
    setResult({ correct: correctCount, wrong: questions.length - correctCount });
    setIsSubmitted(true);
    setShowResult(true);
  };

  if (questions.length === 0)
    return <div className="p-10 text-center text-lg font-semibold">Loading Quiz...</div>;

  return (
    <div className="min-h-screen p-6 bg-[#F5F5F5] flex flex-col md:flex-row gap-6 relative">
      {/* Quiz panel */}
      <div className="flex-1 bg-white p-6 rounded shadow space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-900 mb-4">
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold">Data Structures – Intermediate Quiz</h2>

        {/* Question */}
        <div className="space-y-2">
          <label className="block font-medium">Question Asked</label>
          <div className="border rounded p-4 bg-gray-50">
            <strong>Q{currentIndex + 1}:</strong> {questions[currentIndex].text}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="block font-medium">Select one of the following</label>
          {questions[currentIndex].choices.map((choice, i) => {
            const isSelected = answers[currentIndex] === choice;
            const isCorrect = questions[currentIndex].correct === choice;

            let choiceClasses = 'border rounded p-3 flex items-center cursor-pointer transition';

            if (isSubmitted) {
              if (isCorrect) choiceClasses += ' bg-green-100 border-green-500 text-green-800';
              else if (isSelected && !isCorrect)
                choiceClasses += ' bg-red-100 border-red-500 text-red-800';
            } else if (isSelected) {
              choiceClasses += ' bg-blue-100 border-blue-500';
            } else {
              choiceClasses += ' hover:bg-gray-100';
            }

            return (
              <div
                key={i}
                className={choiceClasses}
                onClick={() => handleSelect(choice)}
              >
                <input
                  type="radio"
                  name={`q${currentIndex}`}
                  checked={isSelected}
                  readOnly
                  className="mr-3"
                />
                <span>{choice}</span>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
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

      {/* Sidebar navigation */}
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-white rounded-lg shadow-md flex flex-col justify-between border border-gray-200">
        {/* Profile + Legend */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
              R
            </div>
            <div>
              <p className="font-semibold text-gray-800">Rahul.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-green-500 inline-block"></span>
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-purple-500 inline-block"></span>
              <span>Marked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-gray-300 inline-block"></span>
              <span>Not Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-red-500 inline-block"></span>
              <span>InCorrect</span>
            </div>
          </div>
        </div>

        {/* Question Grid */}
        <div className="p-6 flex-1 overflow-y-auto">
          <h3 className="font-semibold mb-4 text-gray-700 uppercase text-sm">Section : Test</h3>
          <div className="grid grid-cols-5 gap-3">
            {questions.map((q, idx) => {
              const isAnswered = answers[idx] !== null;
              const isCurrent = currentIndex === idx;

              let statusClasses =
                'rounded w-10 h-10 flex items-center justify-center font-semibold border text-sm';
              if (isSubmitted) {
                if (answers[idx] === q.correct)
                  statusClasses += ' bg-green-500 text-white border-green-600';
                else statusClasses += ' bg-red-500 text-white border-red-600';
              } else if (isAnswered) {
                statusClasses += ' bg-green-500 text-white border-green-600';
              } else if (isCurrent) {
                statusClasses += ' bg-orange-400 text-white border-orange-500';
              } else {
                statusClasses += ' bg-gray-200 text-gray-600 border-gray-300';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={statusClasses}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-6 border-t">
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className={`w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-lg font-medium shadow ${
              isSubmitted ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            Submit Quiz
          </button>
        </div>
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

export default DSIntermediateQuiz;
