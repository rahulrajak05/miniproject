import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DUMMY_QUESTIONS = [
  { text: 'Which of the following page replacement algorithms suffers from Belady’s anomaly?', choices: ['LRU', 'Optimal', 'FIFO', 'Clock'], correct: 'FIFO' },
  { text: 'In the Banker’s Algorithm, what does the "Need" matrix represent?', choices: ['Total system resources', 'Resources currently allocated to processes', 'Maximum resources minus allocated resources', 'Resources in deadlock'], correct: 'Maximum resources minus allocated resources' },
  { text: 'Which scheduling algorithm is most suitable for a real-time system with strict deadlines?', choices: ['Round Robin', 'Multilevel Queue', 'Rate Monotonic Scheduling', 'FCFS'], correct: 'Rate Monotonic Scheduling' },
  { text: 'In virtual memory systems, thrashing occurs when:', choices: ['CPU overheats due to excessive computation', 'There are too many page faults and little useful work', 'Disk is not responding', 'System is overloaded with threads'], correct: 'There are too many page faults and little useful work' },
  { text: 'What does a Translation Lookaside Buffer (TLB) store?', choices: ['Process IDs', 'Disk blocks', 'Page table entries', 'I/O addresses'], correct: 'Page table entries' },
  { text: 'Which of the following is true about microkernels?', choices: ['They run all services in kernel space', 'They are slower due to more context switching', 'They include device drivers and file system in the kernel', 'They have no interprocess communication'], correct: 'They are slower due to more context switching' },
  { text: 'Which technique allows processes to share memory efficiently in a multiprogramming environment?', choices: ['Paging', 'Swapping', 'Memory-mapped files', 'Segmentation'], correct: 'Memory-mapped files' },
  { text: 'The main difference between segmentation and paging is:', choices: ['Paging divides memory logically; segmentation divides it physically', 'Paging has variable size segments; segmentation uses fixed size pages', 'Segmentation is user-viewed memory division; paging is system-viewed', 'They are exactly the same'], correct: 'Segmentation is user-viewed memory division; paging is system-viewed' },
  { text: 'In UNIX systems, what is the difference between a thread and a process?', choices: ['Threads have separate address spaces; processes do not', 'Threads share address space; processes do not', 'Processes share file descriptors; threads do not', 'There is no difference'], correct: 'Threads share address space; processes do not' },
  { text: 'What is the role of the I/O scheduler in an operating system?', choices: ['It allocates RAM to applications', 'It decides the order in which I/O requests are served', 'It prioritizes CPU time for user apps', 'It loads drivers into the kernel'], correct: 'It decides the order in which I/O requests are served' },
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

const OSAdvancedQuiz = () => {
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

        <h2 className="text-2xl font-bold">Operating System - Advanced Quiz</h2>

        <div className="space-y-2">
          <label className="block font-medium">Question</label>
          <div className="border rounded p-4 bg-gray-50">
            <strong>Q{currentIndex + 1}:</strong> {currentQuestion.text}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block font-medium">Select an answer</label>
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
                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`rounded-full w-10 h-10 flex items-center justify-center ${status}`}>
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

export default OSAdvancedQuiz;
