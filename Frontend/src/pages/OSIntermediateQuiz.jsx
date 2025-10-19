import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DUMMY_QUESTIONS = [
  { text: 'What is the purpose of the “init” process in Unix-based systems?', choices: ['Manage user logins', 'Start the graphical interface', 'Initialize all other processes', 'Load kernel modules'], correct: 'Initialize all other processes' },
  { text: 'Which algorithm is most suitable for avoiding starvation in process scheduling?', choices: ['Round Robin', 'FIFO', 'Shortest Job First', 'Aging'], correct: 'Aging' },
  { text: 'Which of the following is true about segmentation in memory management?', choices: ['Segments have fixed size', 'Segments can cause internal fragmentation', 'Segments are divided based on logical divisions like code/data/stack', 'Segmentation is same as paging'], correct: 'Segments are divided based on logical divisions like code/data/stack' },
  { text: 'What is the role of the swap space in virtual memory?', choices: ['To store frequently used applications', 'To extend the CPU cache', 'To hold pages that are swapped out of RAM', 'To store system logs'], correct: 'To hold pages that are swapped out of RAM' },
  { text: 'In multithreading, what does “context switch” involve?', choices: ['Changing screen resolution', 'Switching from one process to another', 'Storing and restoring the thread state', 'Saving RAM content to disk'], correct: 'Storing and restoring the thread state' },
  { text: 'Which condition is necessary for a deadlock to occur?', choices: ['Preemption', 'Circular wait', 'One resource per process', 'Infinite loop'], correct: 'Circular wait' },
  { text: 'Which one of these systems is used for embedded applications?', choices: ['Windows 11', 'RTOS', 'macOS', 'Linux Mint'], correct: 'RTOS' },
  { text: 'What is a critical section in OS?', choices: ['A section of code causing an error', 'The code where the process is idle', 'A code segment accessing shared resources', 'A portion of kernel code'], correct: 'A code segment accessing shared resources' },
  { text: 'In page replacement algorithms, what does the “reference bit” indicate?', choices: ['Whether the page is being read or written', 'Whether the page was recently accessed', 'Whether the page is locked', 'Whether the page is corrupted'], correct: 'Whether the page was recently accessed' },
  { text: 'Which of the following is a non-preemptive scheduling algorithm?', choices: ['Round Robin', 'SJF (Shortest Job First)', 'Multilevel Queue', 'Priority Scheduling with preemption'], correct: 'SJF (Shortest Job First)' },
];

// Shuffle helper
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const OSIntermediateQuiz = () => {
  const navigate = useNavigate();
  const [shuffledQuestions] = useState(() => shuffleArray(DUMMY_QUESTIONS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(shuffledQuestions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });

  const handleSelect = (choice) => {
    if (isSubmitted) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = choice;
    setAnswers(newAnswers);
  };

  const goNext = () => currentIndex < shuffledQuestions.length - 1 && setCurrentIndex(currentIndex + 1);
  const goPrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  const handleSubmit = () => {
    let correct = 0;
    shuffledQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    setResult({ correct, wrong: shuffledQuestions.length - correct });
    setIsSubmitted(true);
    setShowResult(true);
  };

  const handleRetake = () => {
    setAnswers(Array(shuffledQuestions.length).fill(null));
    setCurrentIndex(0);
    setIsSubmitted(false);
    setShowResult(false);
  };

  const currentQuestion = shuffledQuestions[currentIndex];

  return (
    <div className="min-h-screen p-6 bg-[#F5F5F5] flex flex-col md:flex-row gap-6">
      {/* Main Quiz Panel */}
      <div className="flex-1 bg-white p-6 rounded shadow space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-900 mb-4">
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold">Operating System - Intermediate Quiz</h2>

        <div className="space-y-2">
          <label className="block font-medium">Question Asked</label>
          <div className="border rounded p-4 bg-gray-50">
            <strong>Q{currentIndex + 1}:</strong> {currentQuestion.text}
          </div>
        </div>

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
            className={`px-4 py-2 rounded ${currentIndex === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === shuffledQuestions.length - 1}
            className={`px-4 py-2 rounded ${currentIndex === shuffledQuestions.length - 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
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
            {shuffledQuestions.map((_, idx) => {
              let status = 'bg-gray-300 text-gray-600';
              if (answers[idx] !== null) {
                status = isSubmitted
                  ? answers[idx] === shuffledQuestions[idx].correct
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-green-400 text-white';
              } else if (currentIndex === idx) status = 'bg-orange-400 text-white';
              return (
                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`${status} rounded-full w-10 h-10 flex items-center justify-center`}>
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
            <p className="text-gray-700 font-medium">🎯 Score: {((result.correct / shuffledQuestions.length) * 100).toFixed(1)}%</p>
            <div className="flex justify-center gap-3 mt-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" onClick={() => setShowResult(false)}>Close</button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700" onClick={handleRetake}>Retake</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OSIntermediateQuiz;
