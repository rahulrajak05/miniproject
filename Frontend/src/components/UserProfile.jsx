import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="flex items-center mb-6">
        <img src={user.photo} alt="Profile" className="w-16 h-16 rounded-full border-2 border-blue-500" />
        <div className="ml-4">
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Quiz Scores</h4>
        <ul className="list-disc list-inside">
          {user.scores.map((score, index) => (
            <li key={index} className="text-gray-700">{score.quizTitle}: {score.score}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Achievements</h4>
        <ul className="list-disc list-inside">
          {user.achievements.map((achievement, index) => (
            <li key={index} className="text-gray-700">{achievement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;