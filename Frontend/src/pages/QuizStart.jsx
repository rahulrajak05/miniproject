import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Optional LLM fallback (same style as in your QuizHome)
import { generateQuestions as geminiGenerate } from "../api/gemini";

const QUIZ_COUNT = 10;

// Utilities
const decodeEntities = (str = "") =>
  str.replace(
    /&quot;|&#039;|&amp;|&ldquo;|&rdquo;|&rsquo;|&lsquo;|&mdash;|&ndash;/g,
    (m) => (m === "&amp;" ? "&" : m === "&mdash;" || m === "&ndash;" ? "—" : "'")
  );

const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);
const norm = (s = "") => String(s || "").trim().toLowerCase();

// Curated keywords per topic/subtopic for solid filtering
const getKeywords = (mainTopic = "", subTopic = "") => {
  const t = norm(mainTopic);
  const s = norm(subTopic);
  const kws = new Set();

  // Data Structures: add strong keyword set
  if (t === "data structures") {
    [
      "data structure",
      "array",
      "arrays",
      "linked list",
      "linked-list",
      "doubly linked list",
      "stack",
      "queue",
      "deque",
      "tree",
      "binary tree",
      "bst",
      "avl",
      "heap",
      "min-heap",
      "max-heap",
      "priority queue",
      "hash",
      "hash table",
      "hashmap",
      "graph",
      "bfs",
      "dfs",
      "trie",
      "segment tree",
      "fenwick",
      "disjoint set",
      "union find",
      "union-find",
    ].forEach((k) => kws.add(k));
  }

  if (t === "algorithms") {
    [
      "algorithm",
      "time complexity",
      "space complexity",
      "big o",
      "sorting",
      "searching",
      "binary search",
      "dynamic programming",
      "greedy",
      "recursion",
      "divide and conquer",
      "graph algorithm",
      "shortest path",
    ].forEach((k) => kws.add(k));
  }

  if (t === "programming") {
    ["programming", "coding", "software", "code", "compile"].forEach((k) => kws.add(k));
  }

  if (t === "database") {
    ["database", "databases", "sql", "mysql", "postgresql", "mongodb", "normalization", "acid"].forEach((k) =>
      kws.add(k)
    );
  }

  if (t === "networking") {
    ["network", "networking", "tcp/ip", "tcp", "ip", "http", "dns", "routing", "osi"].forEach((k) => kws.add(k));
  }

  if (t === "operating system") {
    ["operating system", "os", "process", "thread", "scheduling", "memory", "deadlock", "linux", "windows"].forEach(
      (k) => kws.add(k)
    );
  }

  if (t === "web development") {
    ["web", "frontend", "backend", "client", "server", "api", "rest", "http", "javascript", "react", "node"].forEach(
      (k) => kws.add(k)
    );
  }

  // Add subtopic as keyword(s)
  if (s) {
    kws.add(s);
    // canonicalize common spellings
    if (s === "tcp/ip") kws.add("tcp/ip") || kws.add("tcp") || kws.add("ip");
    if (s === "rest api") kws.add("rest") || kws.add("api");
    if (s === "linked list") kws.add("linked-list") || kws.add("linked list");
  }

  return Array.from(kws);
};

const toTag = (s = "") =>
  encodeURIComponent(
    String(s).trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"
  ));

// Expand tags to improve match coverage on The Trivia API
const topicTagSynonyms = (main, sub) => {
  const t = norm(main);
  const s = norm(sub);
  const base = new Set([main, sub].filter(Boolean).map((x) => x.trim()));

  // Add broad computing tags and related
  const add = (...arr) => arr.forEach((x) => x && base.add(x));

  if (t === "data structures") {
    add("data-structures", "algorithms", "computer-science", "computers", "technology", "programming");
  } else if (t === "algorithms") {
    add("algorithms", "computer-science", "computers", "technology", "programming");
  } else if (t === "programming") {
    add("programming", "software-development", "coding", "computer-science", "computers", "technology");
  } else if (t === "database") {
    add("database", "databases", "sql", "mysql", "postgresql", "mongodb", "computers", "technology");
  } else if (t === "networking") {
    add("networking", "computer-networking", "computers", "technology");
  } else if (t === "operating system") {
    add("operating-systems", "os", "linux", "windows", "computers", "technology");
  } else if (t === "web development") {
    add("web-development", "frontend", "backend", "javascript", "react", "node", "computers", "technology");
  } else if (t) {
    add(t, "computer-science", "computers", "technology");
  }

  if (s) {
    add(s);
    if (s === "tcp/ip") add("tcp-ip");
    if (s === "rest api") add("rest-api");
    if (s === "linked list") add("linked-list");
    if (s === "os") add("operating-systems");
  }

  return Array.from(base)
    .filter(Boolean)
    .map((x) => toTag(x));
};

// Filter by keywords
const keywordFilter = (arr, keywords) => {
  if (!Array.isArray(arr) || !arr.length) return [];
  if (!Array.isArray(keywords) || !keywords.length) return arr;
  return arr.filter((q) => {
    const hay = norm(q.question) + " " + norm(q.answer) + " " + norm((q.incorrect_answers || []).join(" "));
    return keywords.some((k) => hay.includes(norm(k)));
  });
};

// Trivia API by tags; if no results, try broad categories and filter
const fetchFromTriviaApi = async (mainTopic, subTopic, needed = QUIZ_COUNT) => {
  const tags = topicTagSynonyms(mainTopic, subTopic);
  const limit = Math.max(needed * 2, 24);
  const mapTrivia = (data) =>
    Array.isArray(data)
      ? data
          .filter((q) => q && q.question && q.correctAnswer && Array.isArray(q.incorrectAnswers))
          .map((q) => ({
            question: q.question.text || "",
            options: shuffle([...(q.incorrectAnswers || []), q.correctAnswer]),
            answer: q.correctAnswer,
            incorrect_answers: q.incorrectAnswers || [],
          }))
      : [];

  // Try tags first
  try {
    if (tags.length) {
      const url = `https://the-trivia-api.com/v2/questions?limit=${limit}&difficulties=easy,medium,hard&tags=${tags.join(
        ","
      )}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const mapped = mapTrivia(data);
        const filtered = keywordFilter(mapped, getKeywords(mainTopic, subTopic));
        if (filtered.length >= needed) return filtered.slice(0, needed);
        if (filtered.length) return filtered.slice(0, needed);
      }
    }
  } catch (e) {
    // continue to category-based fetch
  }

  // Try broad categories (computers/technology-like) and then filter by keywords
  try {
    // Not all documented explicitly; science/technology generally yields some computing questions
    const catUrl = `https://the-trivia-api.com/v2/questions?limit=${limit}&categories=science,technology`;
    const res = await fetch(catUrl);
    if (res.ok) {
      const data = await res.json();
      const mapped = mapTrivia(data);
      const filtered = keywordFilter(mapped, getKeywords(mainTopic, subTopic));
      if (filtered.length >= needed) return filtered.slice(0, needed);
      if (filtered.length) return filtered.slice(0, needed);
      if (mapped.length) return mapped.slice(0, needed); // last resort from this source
    }
  } catch (e) {
    // fall through
  }

  return [];
};

// Fallback: OpenTDB + keyword filter
const fetchFromOpenTdb = async (mainTopic, subTopic, needed = QUIZ_COUNT) => {
  const tryFetch = async (amount = 50) => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=18&type=multiple`);
    if (!res.ok) throw new Error(`OpenTDB error: ${res.status}`);
    return res.json();
  };

  const keywords = getKeywords(mainTopic, subTopic);
  const collected = [];
  const seen = new Set();

  try {
    const data = await tryFetch(50);
    if (data && Array.isArray(data.results)) {
      for (const q of data.results) {
        if (collected.length >= needed) break;
        const mapped = {
          question: decodeEntities(q.question || ""),
          options: shuffle([...(q.incorrect_answers || []), q.correct_answer || ""]),
          answer: q.correct_answer || "",
          incorrect_answers: q.incorrect_answers || [],
        };
        const hay = norm(mapped.question) + " " + norm(mapped.answer) + " " + norm((mapped.incorrect_answers || []).join(" "));
        const ok = keywords.length ? keywords.some((k) => hay.includes(norm(k))) : false;
        if (ok && !seen.has(mapped.question)) {
          collected.push(mapped);
          seen.add(mapped.question);
        }
      }
    }
  } catch (e) {
    // ignore network error and return what we have
  }

  return collected.slice(0, needed);
};

// Optional backend endpoint (recommended) that supports topic/subtopic directly
// Expected response: { questions: [{ question, options: [..4], answer }] }
const fetchFromBackend = async (mainTopic, subTopic, needed = QUIZ_COUNT) => {
  const url = `http://localhost:8081/api/questions?topic=${encodeURIComponent(
    mainTopic || ""
  )}&subtopic=${encodeURIComponent(subTopic || "")}&limit=${needed}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  const data = await res.json();
  const arr = data?.questions || [];
  return arr
    .filter((q) => q && q.question && Array.isArray(q.options) && q.options.length >= 2 && q.answer)
    .slice(0, needed)
    .map((q) => ({
      question: q.question,
      options: shuffle(q.options),
      answer: q.answer,
      incorrect_answers: q.options.filter((o) => o !== q.answer),
    }));
};

// Optional: Gemini fallback generator
const fetchFromGemini = async (mainTopic, subTopic, needed = QUIZ_COUNT) => {
  const key = (import.meta && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || "";
  if (!key) return [];
  try {
    const full = subTopic ? `${mainTopic} - ${subTopic}` : mainTopic || "Computer Science fundamentals";
    const prompt = `Generate ${needed} multiple-choice questions for the topic "${full}". Each question must have exactly 4 options and one correct answer. Return STRICT JSON: {"questions":[{"question":"...","options":["A","B","C","D"],"answer":"A"}]}`;
    const text = await geminiGenerate(prompt);
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    const jsonText = start !== -1 && end !== -1 ? text.substring(start, end + 1) : text;
    const parsed = JSON.parse(jsonText);
    const arr = Array.isArray(parsed?.questions) ? parsed.questions : [];
    const out = [];
    for (const q of arr) {
      if (!q || !q.question || !Array.isArray(q.options) || q.options.length !== 4 || !q.answer) continue;
      out.push({
        question: q.question,
        options: shuffle(q.options),
        answer: q.answer,
        incorrect_answers: q.options.filter((o) => o !== q.answer),
      });
      if (out.length >= needed) break;
    }
    return out;
  } catch (e) {
    console.warn("Gemini fallback failed:", e);
    return [];
  }
};

const QuizStart = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [userName, setUserName] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Loading questions...");

  // Read user name
  useEffect(() => {
    try {
      const profile = localStorage.getItem("userProfile");
      if (profile) {
        const p = JSON.parse(profile);
        if (p.name) {
          setUserName(p.name);
          return;
        }
      }
    } catch {}
    const name = localStorage.getItem("userName") || "Guest";
    setUserName(name);
  }, []);

  // Read topic (and try to split subtopic if encoded like "Main - Sub")
  useEffect(() => {
    const stored = (localStorage.getItem("quizTopic") || "").trim();
    setTopic(stored);
    if (stored.includes(" - ")) {
      const [main, sub] = stored.split(" - ").map((s) => s.trim());
      setTopic(main || stored);
      setSubtopic(sub || "");
    } else {
      setSubtopic("");
    }
  }, []);

  useEffect(() => {
    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

    const load = async () => {
      const needed = QUIZ_COUNT;
      const savedTopicRaw = (localStorage.getItem("quizTopic") || "").trim();
      const savedFullTopic = subtopic ? `${topic} - ${subtopic}` : topic;

      // 1) Use saved set if exact-topic match
      try {
        const raw = localStorage.getItem("quizQuestions");
        const savedTopic = (localStorage.getItem("quizTopic") || "").trim();
        if (raw && savedTopic && savedTopic === savedFullTopic) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length >= needed) {
            setQuestions(
              parsed.slice(0, needed).map((q) => ({
                question: decodeEntities(q.question),
                options: shuffleArray([...(q.incorrect_answers || q.options), q.correct_answer || q.answer]),
                answer: q.correct_answer || q.answer,
              }))
            );
            setLoadingMessage("");
            return;
          }
        }
      } catch (err) {
        console.warn("Failed to use saved quizQuestions:", err);
      }

      const mainTopic = topic || savedTopicRaw || "";
      const subTopic = subtopic || "";

      // 2) Preferred: backend (if available)
      setLoadingMessage("Fetching topic-specific questions...");
      try {
        const fromBackend = await fetchFromBackend(mainTopic, subTopic, needed);
        if (fromBackend.length >= needed) {
          setQuestions(fromBackend);
          setLoadingMessage("");
          try {
            localStorage.setItem("quizQuestions", JSON.stringify(fromBackend));
            localStorage.setItem("quizTopic", subTopic ? `${mainTopic} - ${subTopic}` : mainTopic);
          } catch {}
          return;
        }
        if (fromBackend.length > 0) {
          setQuestions(fromBackend);
        }
      } catch {
        // backend optional
      }

      // 3) The Trivia API (tags, then categories) + keyword filter
      try {
        const fromTrivia = await fetchFromTriviaApi(mainTopic, subTopic, needed);
        if (fromTrivia.length >= needed) {
          setQuestions(fromTrivia);
          setLoadingMessage("");
          try {
            localStorage.setItem("quizQuestions", JSON.stringify(fromTrivia));
            localStorage.setItem("quizTopic", subTopic ? `${mainTopic} - ${subTopic}` : mainTopic);
          } catch {}
          return;
        }
        if (fromTrivia.length > 0) {
          setQuestions(fromTrivia);
        }
      } catch (e) {
        console.warn("Trivia API failed:", e);
      }

      // 4) OpenTDB + keyword filtering
      const fromOpenTdb = await fetchFromOpenTdb(mainTopic, subTopic, needed);
      if (fromOpenTdb.length >= needed) {
        setQuestions(fromOpenTdb);
        setLoadingMessage("");
        try {
          localStorage.setItem("quizQuestions", JSON.stringify(fromOpenTdb));
          localStorage.setItem("quizTopic", subTopic ? `${mainTopic} - ${subTopic}` : mainTopic);
        } catch {}
        return;
      } else if (fromOpenTdb.length > 0) {
        setQuestions(fromOpenTdb);
      }

      // 5) Gemini fallback (optional)
      const fromGemini = await fetchFromGemini(mainTopic, subTopic, needed);
      if (fromGemini.length > 0) {
        setQuestions(fromGemini);
        setLoadingMessage("");
        try {
          localStorage.setItem("quizQuestions", JSON.stringify(fromGemini));
          localStorage.setItem("quizTopic", subTopic ? `${mainTopic} - ${subTopic}` : mainTopic);
        } catch {}
        return;
      }

      // 6) Last resort: any saved set
      setLoadingMessage("No topic-specific questions found. Loading last saved set...");
      try {
        const fallbackRaw = localStorage.getItem("quizQuestions");
        if (fallbackRaw) {
          const parsed = JSON.parse(fallbackRaw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setQuestions(parsed.slice(0, needed));
            setLoadingMessage("");
            return;
          }
        }
      } catch {}
      setLoadingMessage("Failed to load questions. Please try again later.");
    };

    if (topic !== null) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, subtopic]);

  // Avoid double increment on last question
  const handleAnswer = (option) => {
    if (!questions.length) return;
    setSelected(option);
    const isCorrect = option === questions[currentIndex].answer;

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        if (isCorrect) setScore((s) => s + 1);
        setCurrentIndex((i) => i + 1);
        setSelected(null);
      } else {
        setScore((prev) => {
          const finalScore = prev + (isCorrect ? 1 : 0);
          setFinished(true);
          saveToLeaderboard(finalScore);
          return finalScore;
        });
      }
    }, 700);
  };

  const saveToLeaderboard = (finalScore) => {
    try {
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      let email = "";
      try {
        const q = JSON.parse(localStorage.getItem("quizuser") || "null");
        const u = JSON.parse(localStorage.getItem("user") || "null");
        email = (q && q.email) || (u && u.email) || "";
      } catch {}
      const newEntry = {
        name: userName || "Guest",
        score: finalScore,
        total: questions.length || 0,
        date: new Date().toLocaleString(),
        topic: subtopic ? `${topic} - ${subtopic}` : topic || "Computer Science",
        email,
      };
      const updated = [...leaderboard, newEntry];
      localStorage.setItem("leaderboard", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save leaderboard:", err);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelected(null);
    setFinished(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4 py-10">
      {!finished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center"
        >
          <div className="mb-4 text-sm font-semibold text-indigo-600">
            {subtopic
              ? `Topic: ${topic} → ${subtopic}`
              : topic
              ? `Topic: ${topic}`
              : "Topic: Computer Science"}
          </div>

          {questions.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                Question {currentIndex + 1} of {questions.length}
              </h2>
              <p className="text-lg font-medium text-gray-800 mb-6">
                {questions[currentIndex].question}
              </p>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentIndex].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => handleAnswer(opt)}
                    disabled={selected !== null}
                    className={`px-4 py-3 rounded-lg border-2 font-semibold transition-colors ${
                      selected
                        ? opt === questions[currentIndex].answer
                          ? "bg-green-500 text-white border-green-600"
                          : opt === selected
                          ? "bg-red-500 text-white border-red-600"
                          : "bg-gray-200 text-gray-700 border-gray-300"
                        : "bg-gray-100 hover:bg-indigo-100 border-gray-300 hover:border-indigo-400"
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-lg text-gray-600">{loadingMessage}</p>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Quiz Completed! 🎉</h2>
          <p className="text-lg text-gray-700 mb-2">
            {userName}, your score is:
          </p>
          <p className="text-4xl font-bold text-indigo-600 mb-4">
            {score} / {questions.length}
          </p>
          {(topic || subtopic) && (
            <p className="text-sm text-gray-600 mb-6">
              Topic: {subtopic ? `${topic} → ${subtopic}` : topic}
            </p>
          )}

          <div className="flex justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleRestart}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-full shadow-md"
            >
              Restart
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                try {
                  localStorage.setItem("quizHomeTab", "leaderboard");
                } catch {}
                navigate("/quiz-home");
              }}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow-md"
            >
              View Leaderboard
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizStart;
