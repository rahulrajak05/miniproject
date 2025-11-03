import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const QuizLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "quizuser",
          JSON.stringify({ email: formData.email })
        );
        navigate("/quiz-home");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full"
      >
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center items-center md:w-1/2 bg-gradient-to-b from-gray-900 to-gray-700 text-white p-8">
          <motion.img
            src={logo}
            alt="University Logo"
            className="w-28 h-28 mb-4 rounded-full shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
          <h1 className="text-3xl font-bold text-center">
            Pondicherry University
          </h1>
          <p className="mt-3 text-gray-300 text-center text-sm">
            Empowering students to rise higher — join our community of innovators and achievers.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-6">
            Login to Your Account
          </h1>

          {error && (
            <p className="text-red-500 text-center text-sm font-semibold mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-2 rounded-full mt-2 shadow-md ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </motion.button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <Link
              to="/riseon-quiz"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizLogin;
