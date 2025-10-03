// src/pages/
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DUMMY_QUESTIONS = [
  {
    text: 'Which of the following page replacement algorithms suffers from Belady’s anomaly?',
    choices: ['LRU', 'Optimal', 'FIFO', 'Clock'],
    correct: 'FIFO',
  },
  {
    text: 'In the Banker’s Algorithm, what does the "Need" matrix represent?',
    choices: [
      'Total system resources',
      'Resources currently allocated to processes',
      'Maximum resources minus allocated resources',
      'Resources in deadlock',
    ],
    correct: 'Maximum resources minus allocated resources',
  },
  {
    text: 'Which scheduling algorithm is most suitable for a real-time system with strict deadlines?',
    choices: ['Round Robin', 'Multilevel Queue', 'Rate Monotonic Scheduling', 'FCFS'],
    correct: 'Rate Monotonic Scheduling',
  },
  {
    text: 'In virtual memory systems, thrashing occurs when:',
    choices: [
      'CPU overheats due to excessive computation',
      'There are too many page faults and little useful work',
      'Disk is not responding',
      'System is overloaded with threads',
    ],
    correct: 'There are too many page faults and little useful work',
  },
  {
    text: 'What does a Translation Lookaside Buffer (TLB) store?',
    choices: [
      'Process IDs',
      'Disk blocks',
      'Page table entries',
      'I/O addresses',
    ],
    correct: 'Page table entries',
  },
  {
    text: 'Which of the following is true about microkernels?',
    choices: [
      'They run all services in kernel space',
      'They are slower due to more context switching',
      'They include device drivers and file system in the kernel',
      'They have no interprocess communication',
    ],
    correct: 'They are slower due to more context switching',
  },
  {
    text: 'Which technique allows processes to share memory efficiently in a multiprogramming environment?',
    choices: [
      'Paging',
      'Swapping',
      'Memory-mapped files',
      'Segmentation',
    ],
    correct: 'Memory-mapped files',
  },
  {
    text: 'The main difference between segmentation and paging is:',
    choices: [
      'Paging divides memory logically; segmentation divides it physically',
      'Paging has variable size segments; segmentation uses fixed size pages',
      'Segmentation is user-viewed memory division; paging is system-viewed',
      'They are exactly the same',
    ],
    correct: 'Segmentation is user-viewed memory division; paging is system-viewed',
  },
  {
    text: 'In UNIX systems, what is the difference between a thread and a process?',
    choices: [
      'Threads have separate address spaces; processes do not',
      'Threads share address space; processes do not',
      'Processes share file descriptors; threads do not',
      'There is no difference',
    ],
    correct: 'Threads share address space; processes do not',
  },
  {
    text: 'What is the role of the I/O scheduler in an operating system?',
    choices: [
      'It allocates RAM to applications',
      'It decides the order in which I/O requests are served',
      'It prioritizes CPU time for user apps',
      'It loads drivers into the kernel',
    ],
    correct: 'It decides the order in which I/O requests are served',
  },
];



const OSAdvancedQuiz = () => {
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

export default OSAdvancedQuiz;
