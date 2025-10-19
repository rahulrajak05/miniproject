import React from 'react';

const Leaderboard = ({ scores }) => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="min-w-full bg-gray-100 border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Rank</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index} className="hover:bg-gray-200">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{score.user}</td>
              <td className="py-2 px-4 border-b">{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;