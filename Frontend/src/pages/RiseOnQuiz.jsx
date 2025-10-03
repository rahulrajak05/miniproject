import React, { useState } from 'react';
import {
  Home,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  Bell,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Quiz questions for JAVAIN
const javaIntroQuestions = [
  {
    question: "What is the primary purpose of the 'public static void main(String[] args)' method in Java?",
    options: ["To define a public method.", "To declare a static method.", "To serve as the entry point for the program.", "To handle command-line arguments."],
    answer: "To serve as the entry point for the program.",
  },
  {
    question: "Which of the following is not a primitive data type in Java?",
    options: ["int", "String", "boolean", "char"],
    answer: "String",
  },
  {
    question: "What is the correct way to declare a constant in Java?",
    options: ["const int x = 10;", "final int x = 10;", "static int x = 10;", "int const x = 10;"],
    answer: "final int x = 10;",
  },
  {
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "subclass"],
    answer: "extends",
  },
  {
    question: "What is the size of 'long' data type in Java?",
    options: ["4 bytes", "8 bytes", "2 bytes", "16 bytes"],
    answer: "8 bytes",
  },
];

// Java Intro Quiz with progress bar and improved feedback
const JAVAIN = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAnswerOptionClick = (option) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedOption(option);
    const isCorrect = option === javaIntroQuestions[currentQuestion].answer;

    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct! 🎉");
    } else {
      setFeedback("Incorrect. The correct answer is: " + javaIntroQuestions[currentQuestion].answer);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < javaIntroQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setIsAnswered(false);
      setSelectedOption(null);
      setFeedback("");
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="p-8 text-center text-gray-700 bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Java Introduction Quiz</h2>
      {/* Progress Bar */}
      {!showScore && (
        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / javaIntroQuestions.length) * 100}%` }}
          />
        </div>
      )}
      {showScore ? (
        <div className="score-section p-8 rounded-lg bg-blue-50 border border-blue-200 animate-in fade-in duration-500">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">
            You scored {score} out of {javaIntroQuestions.length}!
          </h3>
          <p className="text-lg text-gray-600">You can do better! Keep learning!</p>
        </div>
      ) : (
        <div className="quiz-container">
          <div className="question-section mb-6">
            <div className="question-count text-sm text-gray-500 mb-2">
              <span>Question {currentQuestion + 1}</span>/{javaIntroQuestions.length}
            </div>
            <div className="question-text text-xl font-semibold mb-4 text-gray-800">{javaIntroQuestions[currentQuestion].question}</div>
          </div>
          <div className="answer-section grid grid-cols-1 md:grid-cols-2 gap-4">
            {javaIntroQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                className={`py-3 px-6 rounded-lg font-medium transition-transform transform hover:scale-105 shadow
                  ${isAnswered
                    ? option === javaIntroQuestions[currentQuestion].answer
                      ? 'bg-green-500 text-white shadow-lg'
                      : selectedOption === option
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-600 opacity-75 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:shadow-md'
                  }`}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>
          {isAnswered && (
            <div className="mt-6 text-center">
              <p className={`mt-4 px-4 py-2 rounded-lg font-medium animate-in fade-in duration-500
                ${feedback.startsWith("Correct")
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
                }`}
              >
                {feedback}
              </p>
              <button
                onClick={handleNextQuestion}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:scale-105 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Other quiz components (stub)
const JAVAAD = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Java Advanced Quiz</h2><p>This is the Java Advanced quiz page.</p></div>;
const DSBeginnerQuiz = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Data Structures Beginner Quiz</h2><p>This is the Data Structures Beginner quiz page.</p></div>;
const DSIntermediateQuiz = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Data Structures Intermediate Quiz</h2><p>This is the Data Structures Intermediate quiz page.</p></div>;
const DSAdvancedQuiz = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Data Structures Advanced Quiz</h2><p>This is the Data Structures Advanced quiz page.</p></div>;
const OSBeginnerQuiz = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Operating Systems Beginner Quiz</h2><p>This is the Operating Systems Beginner quiz page.</p></div>;
const OSIntermediateQuiz = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Operating Systems Intermediate Quiz</h2><p>This is the Operating Systems Intermediate quiz page.</p></div>;
const OSAdvancedQuiz = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Operating Systems Advanced Quiz</h2><p>This is the Operating Systems Advanced quiz page.</p></div>;
const NBeginnerQuiz = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Networking Beginner Quiz</h2><p>This is the Networking Beginner quiz page.</p></div>;
const NIntermediateQuiz = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Networking Intermediate Quiz</h2><p>This is the Networking Intermediate quiz page.</p></div>;
const NAdvancedQuiz = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Networking Advanced Quiz</h2><p>This is the Networking Advanced quiz page.</p></div>;
const DBMSB = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">DBMS Beginner Quiz</h2><p>This is the DBMS Beginner quiz page.</p></div>;
const DBMSI = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">DBMS Intermediate Quiz</h2><p>This is the DBMS Intermediate quiz page.</p></div>;
const DBMSA = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">DBMS Advanced Quiz</h2><p>This is the DBMS Advanced quiz page.</p></div>;
const AIB = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">AI Beginner Quiz</h2><p>This is the AI Beginner quiz page.</p></div>;
const AII = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">AI Intermediate Quiz</h2><p>This is the AI Intermediate quiz page.</p></div>;
const AIA = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">AI Advanced Quiz</h2><p>This is the AI Advanced quiz page.</p></div>;
const WDB = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Web Development Beginner Quiz</h2><p>This is the Web Development Beginner quiz page.</p></div>;
const WDI = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Web Development Intermediate Quiz</h2><p>This is the Web Development Intermediate quiz page.</p></div>;
const WDA = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Web Development Advanced Quiz</h2><p>This is the Web Development Advanced quiz page.</p></div>;
const NDB = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Networking for Beginners Quiz</h2><p>This is the Networking for Beginners quiz page.</p></div>;
const NDI = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Networking for Intermediate Quiz</h2><p>This is the Networking for Intermediate quiz page.</p></div>;
const NDA = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Networking for Advanced Quiz</h2><p>This is the Networking for Advanced quiz page.</p></div>;
const MLB = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Machine Learning Beginner Quiz</h2><p>This is the Machine Learning Beginner quiz page.</p></div>;
const MLI = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Machine Learning Intermediate Quiz</h2><p>This is the Machine Learning Intermediate quiz page.</p></div>;
const MLA = () => <div className="p-8 text-center text-gray-700 bg-white rounded-xl shadow-xl"><h2 className="text-2xl font-bold mb-4">Machine Learning Advanced Quiz</h2><p>This is the Machine Learning Advanced quiz page.</p></div>;

const quizMap = {
  JAVAIN, JAVAAD,
  DSBeginnerQuiz, DSIntermediateQuiz, DSAdvancedQuiz,
  OSBeginnerQuiz, OSIntermediateQuiz, OSAdvancedQuiz,
  NBeginnerQuiz, NIntermediateQuiz, NAdvancedQuiz,
  DBMSB, DBMSI, DBMSA,
  AIB, AII, AIA,
  WDB, WDI, WDA,
  NDB, NDI, NDA,
  MLB, MLI, MLA
};

const mockUser = {
  name: 'Ankit Sharma',
  photo: 'https://placehold.co/150x150/007bff/ffffff?text=AS',
};

const mockQuizzes = [
  { id: 6, title: 'Java Introduction', category: 'Programming', difficulty: 'Beginner', status: 'Not Started', componentName: 'JAVAIN' },
  { id: 7, title: 'Java Advanced', category: 'Programming', difficulty: 'Advanced', status: 'Not Started', componentName: 'JAVAAD' },
  { id: 8, title: 'DS Beginner', category: 'Data Structures', difficulty: 'Beginner', status: 'Not Started', componentName: 'DSBeginnerQuiz' },
  { id: 9, title: 'DS Intermediate', category: 'Data Structures', difficulty: 'Intermediate', status: 'Not Started', componentName: 'DSIntermediateQuiz' },
  { id: 10, title: 'DS Advanced', category: 'Data Structures', difficulty: 'Advanced', status: 'Not Started', componentName: 'DSAdvancedQuiz' },
  { id: 11, title: 'OS Beginner', category: 'Operating Systems', difficulty: 'Beginner', status: 'Not Started', componentName: 'OSBeginnerQuiz' },
  { id: 12, title: 'OS Intermediate', category: 'Operating Systems', difficulty: 'Intermediate', status: 'Not Started', componentName: 'OSIntermediateQuiz' },
  { id: 13, title: 'OS Advanced', category: 'Operating Systems', difficulty: 'Advanced', status: 'Not Started', componentName: 'OSAdvancedQuiz' },
  { id: 14, title: 'Networking Beginner', category: 'Networking', difficulty: 'Beginner', status: 'Not Started', componentName: 'NBeginnerQuiz' },
  { id: 15, title: 'Networking Intermediate', category: 'Networking', difficulty: 'Intermediate', status: 'Not Started', componentName: 'NIntermediateQuiz' },
  { id: 16, title: 'Networking Advanced', category: 'Networking', difficulty: 'Advanced', status: 'Not Started', componentName: 'NAdvancedQuiz' },
  { id: 17, title: 'DBMS Beginner', category: 'DBMS', difficulty: 'Beginner', status: 'Not Started', componentName: 'DBMSB' },
  { id: 18, title: 'DBMS Intermediate', category: 'DBMS', difficulty: 'Intermediate', status: 'Not Started', componentName: 'DBMSI' },
  { id: 19, title: 'DBMS Advanced', category: 'DBMS', difficulty: 'Advanced', status: 'Not Started', componentName: 'DBMSA' },
  { id: 20, title: 'AI Beginner', category: 'Artificial Intelligence', difficulty: 'Beginner', status: 'Not Started', componentName: 'AIB' },
  { id: 21, title: 'AI Intermediate', category: 'Artificial Intelligence', difficulty: 'Intermediate', status: 'Not Started', componentName: 'AII' },
  { id: 22, title: 'AI Advanced', category: 'Artificial Intelligence', difficulty: 'Advanced', status: 'Not Started', componentName: 'AIA' },
  { id: 23, title: 'Web Development Beginner', category: 'Web Development', difficulty: 'Beginner', status: 'Not Started', componentName: 'WDB' },
  { id: 24, title: 'Web Development Intermediate', category: 'Web Development', difficulty: 'Intermediate', status: 'Not Started', componentName: 'WDI' },
  { id: 25, title: 'Web Development Advanced', category: 'Web Development', difficulty: 'Advanced', status: 'Not Started', componentName: 'WDA' },
  { id: 26, title: 'Networking for Beginners', category: 'Networking', difficulty: 'Beginner', status: 'Not Started', componentName: 'NDB' },
  { id: 27, title: 'Networking for Intermediate', category: 'Networking', difficulty: 'Intermediate', status: 'Not Started', componentName: 'NDI' },
  { id: 28, title: 'Networking for Advanced', category: 'Networking', difficulty: 'Advanced', status: 'Not Started', componentName: 'NDA' },
  { id: 29, title: 'Machine Learning Beginner', category: 'Machine Learning', difficulty: 'Beginner', status: 'Not Started', componentName: 'MLB' },
  { id: 30, title: 'Machine Learning Intermediate', category: 'Machine Learning', difficulty: 'Intermediate', status: 'Not Started', componentName: 'MLI' },
  { id: 31, title: 'Machine Learning Advanced', category: 'Machine Learning', difficulty: 'Advanced', status: 'Not Started', componentName: 'MLA' },
];

const mockPerformance = {
  recentScores: [
    { quiz: 'Geography Basics', score: 95, time: '12:34' },
    { quiz: 'Current Affairs', score: 88, time: '15:21' },
    { quiz: 'History of India', score: 72, time: '20:10' },
  ],
  accuracyData: [85, 92, 78, 95, 80],
  weakTopics: ['Mughal Empire', 'Quantum Physics'],
  strongTopics: ['Ancient History', 'Indian Geography'],
};

const mockLeaderboard = [
  { id: 1, name: 'Ankit Sharma', rank: 1, points: 1500, badges: ['🏅', '�'] },
  { id: 2, name: 'Priya Singh', rank: 2, points: 1450, badges: ['🏅'] },
  { id: 3, name: 'Rahul Kumar', rank: 3, points: 1380, badges: [] },
  { id: 4, name: 'Sneha Gupta', rank: 4, points: 1200, badges: [] },
  { id: 5, name: 'Vijay Anand', rank: 5, points: 1150, badges: [] },
];

const mockAchievements = [
  { id: 1, name: 'Quiz Master', description: 'Completed 10 quizzes', icon: '🏆', achieved: true },
  { id: 2, name: 'Streak Pro', description: 'Completed quizzes for 7 consecutive days', icon: '🔥', achieved: false },
  { id: 3, name: 'History Buff', description: 'Scored over 90% in all History quizzes', icon: '📜', achieved: true },
];

const mockNotifications = [
  { id: 1, text: 'New quiz available: Space Exploration', type: 'new_quiz' },
  { id: 2, text: 'Your rank on the leaderboard has changed', type: 'rank_update' },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);

  const toggleSection = (sectionName) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Medium':
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const barChartData = {
    labels: mockPerformance.recentScores.map(score => score.quiz),
    datasets: [
      {
        label: 'Score',
        data: mockPerformance.recentScores.map(score => score.score),
        backgroundColor: ['#60A5FA', '#818CF8', '#F59E0B', '#10B981'],
        borderRadius: 8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Recent Quiz Scores' },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const pieChartData = {
    labels: ['Correct', 'Incorrect', 'Skipped'],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: ['#34D399', '#F87171', '#9CA3AF'],
        hoverBackgroundColor: ['#10B981', '#EF4444', '#6B7280'],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Overall Accuracy Breakdown' },
    },
  };

  const renderQuiz = () => {
    const QuizComponent = quizMap[activeQuiz];
    if (QuizComponent) {
      return (
        <div className="p-8 bg-white/80 rounded-xl shadow-2xl max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-blue-700">{mockQuizzes.find(q => q.componentName === activeQuiz)?.title}</h1>
            <button
              onClick={() => { setActiveTab('dashboard'); setActiveQuiz(null); }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-300 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
          <QuizComponent />
        </div>
      );
    }
    return <div className="p-8 text-center text-gray-500">Quiz not found.</div>;
  };

  const renderContent = () => {
    if (activeQuiz) return renderQuiz();

    switch (activeTab) {
      case 'home':
        return <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-purple-700">Home</h1>
          <p className="text-gray-600">This is the home page. It could show a quick overview or featured quizzes.</p>
        </div>;
      case 'dashboard':
        return (
          <div className="p-8 space-y-8">
            {/* Welcome / Overview Section */}
            <div className="bg-white/90 p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all animate-in fade-in">
              <div className="flex items-center space-x-4 mb-4">
                <img src={mockUser.photo} alt="User Profile" className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-lg" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Welcome, {mockUser.name}! 👋</h2>
                  <p className="text-gray-600">You've completed {mockQuizzes.filter(q => q.status === 'Completed').length} out of {mockQuizzes.length} quizzes. Keep up the great work!</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center mt-2">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow-inner">
                  <p className="text-2xl text-blue-700 font-bold">{mockQuizzes.filter(q => q.status === 'Completed').length}</p>
                  <span className="block text-sm text-blue-800">Completed</span>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg shadow-inner">
                  <p className="text-2xl text-green-700 font-bold">{mockQuizzes.filter(q => q.status !== 'Completed').length}</p>
                  <span className="block text-sm text-green-800">Remaining</span>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg shadow-inner">
                  <p className="text-2xl text-purple-700 font-bold">85%</p>
                  <span className="block text-sm text-purple-800">Accuracy</span>
                </div>
              </div>
            </div>

            {/* Available Quizzes */}
            <div className="bg-white/90 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('quizzes')}>
                <h2 className="text-xl font-semibold text-blue-700">Available Quizzes</h2>
                {expandedSection === 'quizzes' ? <ChevronDown /> : <ChevronRight />}
              </div>
              {expandedSection === 'quizzes' && (
                <div className="space-y-4 pt-4">
                  {mockQuizzes.map(quiz => (
                    <div key={quiz.id}
                      className={`flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow animate-in fade-in`}
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-700">{quiz.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500 space-x-2">
                          <span className="capitalize">{quiz.category}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getDifficultyColor(quiz.difficulty)}`}>{quiz.difficulty}</span>
                          <span className="flex items-center">
                            {quiz.status === 'Completed' && <CheckCircle className="w-4 h-4 text-green-500 mr-1" />}
                            {quiz.status === 'In Progress' && <Clock className="w-4 h-4 text-yellow-500 mr-1" />}
                            {quiz.status === 'Not Started' && <XCircle className="w-4 h-4 text-red-500 mr-1" />}
                            {quiz.status}
                          </span>
                        </div>
                      </div>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:bg-blue-600 hover:scale-105 transition-all"
                        onClick={() => {
                          if (quiz.componentName) {
                            setActiveQuiz(quiz.componentName);
                          } else {
                            const message = `The quiz "${quiz.title}" is not yet available.`;
                            console.log(message);
                          }
                        }}>
                        {quiz.status === 'Completed' ? 'Review' : quiz.status === 'In Progress' ? 'Continue' : 'Start Quiz'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Performance Section */}
            <div className="bg-white/90 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('performance')}>
                <h2 className="text-xl font-semibold text-purple-700">Your Performance</h2>
                {expandedSection === 'performance' ? <ChevronDown /> : <ChevronRight />}
              </div>
              {expandedSection === 'performance' && (
                <div className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-xl shadow-inner">
                      <Bar data={barChartData} options={barChartOptions} />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl shadow-inner">
                      <Pie data={pieChartData} options={pieChartOptions} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div>
                      <h3 className="font-semibold text-red-600 mb-2">Weak Topics</h3>
                      <ul className="list-disc list-inside text-red-500">
                        {mockPerformance.weakTopics.map((topic, index) => <li key={index}>{topic}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2">Strong Topics</h3>
                      <ul className="list-disc list-inside text-green-500">
                        {mockPerformance.strongTopics.map((topic, index) => <li key={index}>{topic}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Leaderboard */}
            <div className="bg-white/90 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('leaderboard')}>
                <h2 className="text-xl font-semibold text-orange-700">Leaderboard</h2>
                {expandedSection === 'leaderboard' ? <ChevronDown /> : <ChevronRight />}
              </div>
              {expandedSection === 'leaderboard' && (
                <div className="space-y-2 pt-4">
                  {mockLeaderboard.map((user, index) => (
                    <div key={user.id}
                      className={`flex items-center justify-between p-3 rounded-xl shadow bg-opacity-90 animate-in fade-in
                        ${index === 0 ? 'bg-yellow-100 border-l-4 border-yellow-400' :
                          index === 1 ? 'bg-gray-200 border-l-4 border-gray-400' :
                          index === 2 ? 'bg-orange-100 border-l-4 border-orange-500' :
                          user.id === mockUser.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold w-6 text-center">{index + 1}{index === 0 && " 👑"}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-700">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.points} points</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {user.badges.map((badge, i) => <span key={i} className="text-lg">{badge}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Achievements & Badges */}
            <div className="bg-white/90 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('achievements')}>
                <h2 className="text-xl font-semibold text-green-700">Achievements</h2>
                {expandedSection === 'achievements' ? <ChevronDown /> : <ChevronRight />}
              </div>
              {expandedSection === 'achievements' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {mockAchievements.map(badge => (
                    <div key={badge.id}
                      className={`p-4 rounded-lg flex items-center space-x-4 transition-all hover:shadow-xl
                        ${badge.achieved ? 'bg-green-50 border border-green-300 animate-in fade-in' : 'bg-gray-50 border border-gray-200 opacity-75'}
                      `}
                    >
                      <span className={`text-3xl ${badge.achieved ? 'text-green-500 animate-bounce' : 'text-gray-400'}`}>{badge.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{badge.name}</h3>
                        <p className="text-sm text-gray-500">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-orange-700">Global Leaderboard</h1>
            <div className="bg-white/90 p-6 rounded-xl shadow-xl">
              <div className="grid grid-cols-3 font-semibold text-gray-600 border-b pb-2 mb-2">
                <span>Rank</span>
                <span>Name</span>
                <span className="text-right">Points</span>
              </div>
              <div className="space-y-2">
                {mockLeaderboard.map((user, index) => (
                  <div key={user.id}
                    className={`grid grid-cols-3 items-center p-3 rounded-xl shadow bg-opacity-90
                      ${index === 0 ? 'bg-yellow-100 border-l-4 border-yellow-400' :
                        index === 1 ? 'bg-gray-200 border-l-4 border-gray-400' :
                        index === 2 ? 'bg-orange-100 border-l-4 border-orange-500' :
                        user.id === mockUser.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                      }`}
                  >
                    <span className="font-bold text-lg">{index + 1}</span>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-700">{user.name}</p>
                      {user.badges.map((badge, i) => <span key={i} className="text-lg">{badge}</span>)}
                    </div>
                    <span className="text-right">{user.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-700">Settings</h1>
          <div className="bg-white/90 p-6 rounded-xl shadow-2xl space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Profile Settings</h2>
            <div className="p-4 bg-gray-50 rounded-lg">Coming soon...</div>
            <h2 className="text-xl font-semibold text-gray-800">Display</h2>
            <div className="p-4 bg-gray-50 rounded-lg">Dark/Light mode preference...</div>
          </div>
        </div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex font-[Inter] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white w-64 p-6 hidden md:flex flex-col rounded-tr-3xl rounded-br-3xl shadow-2xl bg-opacity-90">
        <div className="flex items-center mb-10">
          <Sparkles className="w-8 h-8 text-yellow-300 mr-2" />
          <h1 className="text-xl font-bold tracking-wide text-blue-300">QuizApp</h1>
        </div>
        {/* User Profile */}
        <div className="flex items-center space-x-3 mb-6 p-2 rounded-lg bg-gray-800">
          <img src={mockUser.photo} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-400 shadow-lg" />
          <div className="flex-1">
            <p className="font-semibold text-sm">{mockUser.name}</p>
            <p className="text-xs text-gray-400">View Profile</p>
          </div>
          <LogOut className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
        </div>
        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-xl transition-all duration-300
                  ${activeTab === 'home' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'hover:bg-gray-800 text-gray-300'}
                `}
                onClick={() => setActiveTab('home')}
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-xl transition-all duration-300
                  ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' : 'hover:bg-gray-800 text-gray-300'}
                `}
                onClick={() => setActiveTab('dashboard')}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-xl transition-all duration-300
                  ${activeTab === 'leaderboard' ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg' : 'hover:bg-gray-800 text-gray-300'}
                `}
                onClick={() => setActiveTab('leaderboard')}
              >
                <Trophy className="w-5 h-5 mr-3" />
                <span>Leaderboard</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-xl transition-all duration-300
                  ${activeTab === 'settings' ? 'bg-gradient-to-r from-green-400 to-teal-600 text-white shadow-lg' : 'hover:bg-gray-800 text-gray-300'}
                `}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header (Small Screens) */}
        <header className="bg-white p-4 shadow-md md:hidden flex items-center justify-between rounded-b-2xl">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h1 className="text-xl font-bold text-blue-700">QuizApp</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
              {mockNotifications.length > 0 && (
                <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </div>
            <img src={mockUser.photo} alt="Profile" className="w-8 h-8 rounded-full border-2 border-blue-500" />
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-6 bg-white shadow-xl rounded-bl-3xl">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Hello, welcome back to your dashboard!</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
              {mockNotifications.length > 0 && (
                <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </div>
            <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-all">
              <MessageSquare className="w-4 h-4" />
              <span>Discuss</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
