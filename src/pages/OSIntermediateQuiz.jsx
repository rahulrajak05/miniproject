// src/pages/
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DUMMY_QUESTIONS = [
  {
    text: 'What is the purpose of the “init” process in Unix-based systems?',
    choices: ['Manage user logins', 'Start the graphical interface', 'Initialize all other processes', 'Load kernel modules'],
    correct: 'Initialize all other processes',
  },
  {
    text: 'Which algorithm is most suitable for avoiding starvation in process scheduling?',
    choices: ['Round Robin', 'FIFO', 'Shortest Job First', 'Aging'],
    correct: 'Aging',
  },
  {
    text: 'Which of the following is true about segmentation in memory management?',
    choices: [
      'Segments have fixed size',
      'Segments can cause internal fragmentation',
      'Segments are divided based on logical divisions like code/data/stack',
      'Segmentation is same as paging',
    ],
    correct: 'Segments are divided based on logical divisions like code/data/stack',
  },
  {
    text: 'What is the role of the swap space in virtual memory?',
    choices: [
      'To store frequently used applications',
      'To extend the CPU cache',
      'To hold pages that are swapped out of RAM',
      'To store system logs',
    ],
    correct: 'To hold pages that are swapped out of RAM',
  },
  {
    text: 'In multithreading, what does “context switch” involve?',
    choices: [
      'Changing screen resolution',
      'Switching from one process to another',
      'Storing and restoring the thread state',
      'Saving RAM content to disk',
    ],
    correct: 'Storing and restoring the thread state',
  },
  {
    text: 'Which condition is necessary for a deadlock to occur?',
    choices: ['Preemption', 'Circular wait', 'One resource per process', 'Infinite loop'],
    correct: 'Circular wait',
  },
  {
    text: 'Which one of these systems is used for embedded applications?',
    choices: ['Windows 11', 'RTOS', 'macOS', 'Linux Mint'],
    correct: 'RTOS',
  },
  {
    text: 'What is a critical section in OS?',
    choices: [
      'A section of code causing an error',
      'The code where the process is idle',
      'A code segment accessing shared resources',
      'A portion of kernel code',
    ],
    correct: 'A code segment accessing shared resources',
  },
  {
    text: 'In page replacement algorithms, what does the “reference bit” indicate?',
    choices: [
      'Whether the page is being read or written',
      'Whether the page was recently accessed',
      'Whether the page is locked',
      'Whether the page is corrupted',
    ],
    correct: 'Whether the page was recently accessed',
  },
  {
    text: 'Which of the following is a non-preemptive scheduling algorithm?',
    choices: ['Round Robin', 'SJF (Shortest Job First)', 'Multilevel Queue', 'Priority Scheduling with preemption'],
    correct: 'SJF (Shortest Job First)',
  },
];


const OSIntermediateQuiz = () => {
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

export default OSIntermediateQuiz;
