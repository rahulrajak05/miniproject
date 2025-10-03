import React from "react";
import { Link } from "react-router-dom";

export default function ContestsPage() {
  const upcoming = [
    { id: 1, title: "Weekly Speedrun", date: "Sep 26, 2025", time: "18:00 IST" },
    { id: 2, title: "Frontend Faceoff", date: "Oct 2, 2025", time: "17:00 IST" },
  ];
  const past = [
    { id: 3, title: "Algorithms Marathon", date: "Sep 10, 2025", winner: "Rahul R" },
    { id: 4, title: "Fullstack Quiz", date: "Sep 3, 2025", winner: "Asha K" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <section>
          <h2 className="text-3xl font-bold mb-6">Upcoming Contests</h2>
          <div className="space-y-4">
            {upcoming.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm"
              >
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-gray-500">
                    {c.date} • {c.time}
                  </p>
                </div>
                <Link
                  to={`/contests/${c.id}`}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Register
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Past Contests</h2>
          <div className="space-y-4">
            {past.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm"
              >
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-gray-500">{c.date}</p>
                </div>
                <p className="text-sm">
                  Winner: <span className="font-medium">{c.winner}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}