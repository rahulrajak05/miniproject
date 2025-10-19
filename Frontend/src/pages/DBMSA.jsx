import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DUMMY_QUESTIONS = [
  { text: 'Which of the following is used to ensure ACID properties in DBMS?', choices: ['Trigger', 'Transaction', 'View', 'Cursor'], correct: 'Transaction' },
  { text: 'What does the "I" in ACID stand for?', choices: ['Indexing', 'Isolation', 'Instance', 'Integrity'], correct: 'Isolation' },
  { text: 'Which isolation level allows dirty reads?', choices: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'], correct: 'Read Uncommitted' },
  { text: 'Which of these indexing methods is used in most modern RDBMS?', choices: ['B+ Tree', 'Hash Index', 'AVL Tree', 'Red-Black Tree'], correct: 'B+ Tree' },
  { text: 'In which normal form does a relation exist if it is in BCNF but not in 4NF?', choices: ['1NF', '2NF', '3NF', 'BCNF'], correct: 'BCNF' },
  { text: 'Which of the following helps improve query performance?', choices: ['Trigger', 'Cursor', 'Index', 'Procedure'], correct: 'Index' },
  { text: 'A deadlock can occur in DBMS when:', choices: ['Two transactions wait indefinitely for each other', 'Only one transaction is present', 'All transactions are committed', 'Memory is full'], correct: 'Two transactions wait indefinitely for each other' },
  { text: 'Which of the following schedules is conflict serializable?', choices: ['Non-conflicting schedule', 'Any interleaved schedule', 'Precedence graph has cycles', 'None of the above'], correct: 'Non-conflicting schedule' },
  { text: 'What is the purpose of a trigger in SQL?', choices: ['To execute a block of code automatically on a specific event', 'To insert rows', 'To update a table', 'To backup data'], correct: 'To execute a block of code automatically on a specific event' },
  { text: 'Which command is used to rollback a transaction?', choices: ['COMMIT', 'ROLLBACK', 'SAVEPOINT', 'END'], correct: 'ROLLBACK' },
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const DBMSA = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState(() =>
    shuffleArray(DUMMY_QUESTIONS.map(q => ({ ...q, choices: shuffleArray(q.choices) })))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });

  const handleSelect = (choice) => {
    if (isSubmitted) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = choice;
    setAnswers(newAnswers);
  };

  const goNext = () => currentIndex < questions.length - 1 && setCurrentIndex(currentIndex + 1);
  const goPrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, idx) => { if (answers[idx] === q.correct) correct++; });
    setResult({ correct, wrong: questions.length - correct });
    setIsSubmitted(true);
    setShowResult(true);
  };

  const handleRetake = () => {
    const shuffled = shuffleArray(DUMMY_QUESTIONS.map(q => ({ ...q, choices: shuffleArray(q.choices) })));
    setQuestions(shuffled);
    setAnswers(Array(shuffled.length).fill(null));
    setCurrentIndex(0);
    setIsSubmitted(false);
    setShowResult(false);
    setResult({ correct: 0, wrong: 0 });
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen p-6 bg-[#F5F5F5] flex flex-col md:flex-row gap-6">
      {/* Main Panel */}
      <div className="flex-1 bg-white p-6 rounded shadow space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-900 mb-4"><FaArrowLeft /> Back</button>
        <h2 className="text-2xl font-bold">DBMS - Advanced Quiz</h2>

        <div className="space-y-2">
          <label className="block font-medium">Question Asked</label>
          <div className="border rounded p-4 bg-gray-50">
            <strong>Q{currentIndex + 1}:</strong> {currentQuestion.text}
          </div>
        </div>

        <div className="space-y-3">
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
                <input type="radio" name={`q${currentIndex}`} checked={isSelected} disabled={isSubmitted} onChange={() => handleSelect(choice)} className="mr-3"/>
                <span>{choice}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between">
          <button onClick={goPrev} disabled={currentIndex === 0} className={`px-4 py-2 rounded ${currentIndex === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>Previous</button>
          <button onClick={goNext} disabled={currentIndex === questions.length - 1} className={`px-4 py-2 rounded ${currentIndex === questions.length - 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>Next</button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white p-6 rounded shadow flex flex-col justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-4">
            Questions <HelpCircle size={16} className="text-blue-400" />
          </h3>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {questions.map((_, idx) => {
              let status = 'bg-gray-300 text-gray-600';
              if (answers[idx] !== null) {
                status = isSubmitted
                  ? answers[idx] === questions[idx].correct
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-green-400 text-white';
              } else if (currentIndex === idx) status = 'bg-orange-400 text-white';
              return (
                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`rounded-full w-10 h-10 flex items-center justify-center ${status}`}>{idx + 1}</button>
              );
            })}
          </div>
        </div>

        {!isSubmitted && (
          <button onClick={handleSubmit} className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-lg font-medium shadow hover:opacity-90">Submit Quiz</button>
        )}
      </div>

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center space-y-4">
            <h2 className="text-2xl font-bold">Quiz Results</h2>
            <p className="text-green-600 font-semibold">✔ Correct: {result.correct}</p>
            <p className="text-red-600 font-semibold">❌ Wrong: {result.wrong}</p>
            <p className="text-gray-700 font-medium">🎯 Score: {((result.correct / questions.length) * 100).toFixed(1)}%</p>
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

export default DBMSA;
