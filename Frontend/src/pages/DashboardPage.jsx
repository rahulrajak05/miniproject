import React from "react";

export default function DashboardPage() {
  const user = {
    name: "Rahul Raj",
    email: "rahul@example.com",
    badges: ["🏆 Champion", "⚡ Speedster", "🎯 Accuracy Pro"],
  };

  const quizHistory = [
    { id: 1, title: "JS Basics", score: 85, date: "Sep 15, 2025" },
    { id: 2, title: "React Advanced", score: 92, date: "Sep 12, 2025" },
    { id: 3, title: "Algorithms", score: 76, date: "Sep 8, 2025" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Profile</h2>
          <p className="mt-2 text-gray-600">{user.name} • {user.email}</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            {user.badges.map((b, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">{b}</span>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Quiz</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {quizHistory.map((q) => (
                <tr key={q.id} className="border-t">
                  <td className="px-4 py-2">{q.title}</td>
                  <td className="px-4 py-2">{q.score}%</td>
                  <td className="px-4 py-2">{q.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Reusable Header + Footer Components
function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-indigo-600 text-lg">QuizPulse</Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/leaderboard" className="hover:text-indigo-600">Leaderboard</Link>
          <Link to="/contests" className="hover:text-indigo-600">Contests</Link>
          <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
          <Link to="/login" className="px-3 py-1 bg-indigo-600 text-white rounded-md">Login</Link>
        </nav>
      </div>
    </header>
  );
}
