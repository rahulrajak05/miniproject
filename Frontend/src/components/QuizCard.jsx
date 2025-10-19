import React from 'react';

const QuizCard = ({ title, description, onStart }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button 
        onClick={onStart} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizCard;