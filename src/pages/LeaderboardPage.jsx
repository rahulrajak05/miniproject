// LeaderboardPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("daily");

  const leaderboardData = {
    daily: [
      { id: 1, name: "Asha K", score: 320, time: "6m 15s" },
      { id: 2, name: "Rahul R", score: 295, time: "7m 02s" },
      { id: 3, name: "Meera S", score: 280, time: "8m 11s" },
    ],
    weekly: [
      { id: 1, name: "Ankit P", score: 980, time: "12m 45s" },
      { id: 2, name: "Neha J", score: 950, time: "13m 00s" },
      { id: 3, name: "Kiran L", score: 910, time: "14m 30s" },
    ],
    alltime: [
      { id: 1, name: "Ravi K", score: 5000, time: "59m 10s" },
      { id: 2, name: "Sneha T", score: 4890, time: "1h 02m" },
      { id: 3, name: "Amit M", score: 4755, time: "58m 40s" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Leaderboard</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["daily", "weekly", "alltime"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-white border text-gray-600"
              }`}
            >
              {tab === "daily"
                ? "Daily"
                : tab === "weekly"
                ? "Weekly"
                : "All-Time"}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Player</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData[activeTab].map((p, i) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2 font-medium">#{i + 1}</td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.score}</td>
                  <td className="px-4 py-2">{p.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}