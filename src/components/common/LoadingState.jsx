// src/pages/RiseOnQuiz.jsx
import React from "react";
import {
  PlayCircle,
  Clock,
  BookOpen,
  Award,
  Eye,
  User,
  LogOut,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

// Mock Data (Replace with API later)
const upcomingQuizzes = [
  { id: 1, title: "Java Basics", dueDate: "2025-08-15", timeLimit: 20, questions: 15, status: "Not Started", difficulty: "Beginner" },
  { id: 2, title: "Data Structures", dueDate: "2025-08-18", timeLimit: 30, questions: 20, status: "In Progress", difficulty: "Advanced" },
];

const completedQuizzes = [
  { id: 3, title: "Operating System", date: "2025-08-05", score: 85, timeTaken: 18, certificate: true },
  { id: 4, title: "Networking Basics", date: "2025-08-02", score: 92, timeTaken: 22, certificate: false },
];

const performanceData = {
  labels: ["OS", "Java", "Networking", "DBMS", "Data Structures"],
  datasets: [
    {
      label: "Scores",
      data: [85, 78, 92, 88, 80],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      tension: 0.3,
    },
  ],
};

// Reusable Components
const StatusBadge = ({ status }) => {
  const colors = {
    "Not Started": "bg-gray-100 text-gray-700",
    "In Progress": "bg-orange-100 text-orange-700",
    Completed: "bg-green-100 text-green-700",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

const DifficultyBadge = ({ level }) => {
  const colors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colors[level] || "bg-gray-100 text-gray-600"}`}>
      {level}
    </span>
  );
};

const QuizCard = ({ quiz, onAction, actionLabel }) => (
  <div className="flex items-center justify-between border-b pb-3">
    <div>
      <h3 className="font-medium">{quiz.title}</h3>
      {quiz.dueDate && (
        <p className="text-sm text-gray-500">
          Due: {quiz.dueDate} • {quiz.questions} Qs • {quiz.timeLimit} mins
        </p>
      )}
      {quiz.date && (
        <p className="text-sm text-gray-500">
          Completed on {quiz.date} • Score: {quiz.score}% • {quiz.timeTaken} mins
        </p>
      )}
      {quiz.status && <StatusBadge status={quiz.status} />}
      {quiz.difficulty && <DifficultyBadge level={quiz.difficulty} />}
    </div>
    {onAction && (
      <button
        onClick={() => onAction(quiz.id)}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {actionLabel.icon} {actionLabel.text}
      </button>
    )}
  </div>
);

const RiseOnQuiz = () => {
  const navigate = useNavigate();

  const startQuiz = (id) => navigate(`/quiz/${id}`);
  const reviewQuiz = (id) => navigate(`/quiz-review/${id}`);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-6">📚 Student Quiz Dashboard</h1>

      {/* Upcoming Quizzes */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Upcoming Quizzes</h2>
        {upcomingQuizzes.length ? (
          <div className="space-y-4">
            {upcomingQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onAction={startQuiz}
                actionLabel={{
                  icon: <PlayCircle className="w-4 h-4" />,
                  text: quiz.status === "In Progress" ? "Resume" : "Start",
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming quizzes.</p>
        )}
      </section>

      {/* Completed Quizzes */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Completed Quizzes</h2>
        {completedQuizzes.length ? (
          <div className="space-y-4">
            {completedQuizzes.map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-medium">{quiz.title}</h3>
                  <p className="text-sm text-gray-500">
                    Completed on {quiz.date} • Score: {quiz.score}% • {quiz.timeTaken} mins
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => reviewQuiz(quiz.id)}
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Eye className="w-4 h-4" /> Review
                  </button>
                  {quiz.certificate && (
                    <button className="flex items-center gap-1 text-green-600 hover:underline">
                      <Award className="w-4 h-4" /> Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No completed quizzes yet.</p>
        )}
      </section>

      {/* Performance Analytics */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Performance Analytics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="font-medium mb-2">
              Overall Score: <span className="text-blue-600">85%</span>
            </p>
            <Line data={performanceData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Subject Breakdown</h3>
            <ul className="space-y-2 text-sm">
              {performanceData.labels.map((subject, idx) => (
                <li key={subject} className="flex justify-between">
                  <span>{subject}</span>
                  <span className="font-medium">{performanceData.datasets[0].data[idx]}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Profile & Settings */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Profile & Settings</h2>
        <div className="flex items-center gap-4 mb-4">
          <User className="w-10 h-10 text-gray-400" />
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">john@example.com</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">Edit Profile</button>
          <button className="flex items-center gap-1 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </section>
    </div>
  );
};

export default RiseOnQuiz;
