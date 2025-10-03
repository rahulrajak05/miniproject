// src/pages/
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DUMMY_QUESTIONS = [
  {
    text: 'What is the difference between == and .equals() when comparing objects in Java?',
    choices: [
      'Both check value',
      'Both check reference',
      '== checks reference, .equals() checks value',
      '== checks value, .equals() checks reference',
    ],
    correct: '== checks reference, .equals() checks value',
  },
  {
    text: 'Which interface does java.util.HashMap implement?',
    choices: ['List',
                'Set',
                'Map',
                'Collection'],
    correct: 'Map',
  },
  {
    text: 'Which keyword is used to inherit a class in Java?',
    choices: [
      'implement',
 'extends',
 'inherits',
 'super',
    ],
    correct: 'extends',
  },
  {
    text: 'Which interface does ArrayList implement?',
    choices: ['Set',
 'Map',
 'List',
 'Queue', ],
    correct: 'List',
  },
  {
    text: 'What will happen if a thread throws an unchecked exception?',
    choices: [
      'The thread will terminate',
 'The JVM will terminate',
'The thread will continue',
 'Compilation error',
    ],
    correct: 'The thread will terminate',
  },
  {
    text: 'Which method is used to start a thread in Java?',
    choices: ['init()',
'run()',
 'start()',
 'resume()', ],
    correct: 'start()',
  },
  {
    text: 'Which of the following is not true about abstract classes in Java?',
    choices: ['Abstract classes cannot be instantiated',
 'Abstract classes can have constructors',
 'Abstract classes can contain static methods',
 'Abstract classes can be final',],
    correct: 'Abstract classes can be final',
  },
  {
    text: 'Which class is the superclass of all classes in Java?',
    choices: ['Object',
 'Class',
 'ClassLoader',
'Abstract',],
    correct: 'Object',
  },
  {
    text: 'Which of the following is not a valid access modifier?',
    choices: [' public',
 'private',
 'void',
 'protected', ],
    correct: 'z-void',
  },
  {
    text: 'What is the time complexity of searching an element in a HashSet?',
    choices: [
      'O(n)',
'O(log n)',
 'O(1)',
 'O(n log n)',
    ],
    correct: 'O(1)',
  },
];

const JAVAIN = () => {
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

export default JAVAIN;
