import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // ✅ Connect to backend (localhost:8081)
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // ✅ Save user info
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ Navigate to quiz home
      navigate("/quiz-home");
    } catch (err) {
      setError(err.message || "Something went wrong.");
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
        {/* ===== LEFT SIDE: LOGO ===== */}
        <div className="flex flex-col justify-center items-center md:w-1/2 bg-gradient-to-b from-gray-900 to-gray-700 text-white p-8">
          <motion.img
            src={logo}
            alt="University Logo"
            className="w-28 h-28 mb-4 rounded-full shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
          <h1 className="text-3xl font-bold text-center">Pondicherry University</h1>
          <p className="mt-3 text-gray-300 text-center text-sm">
            Unlock your journey of learning and excellence with us.
          </p>
        </div>

        {/* ===== RIGHT SIDE: LOGIN FORM ===== */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-6">
            Welcome Back
          </h1>

          {error && (
            <p className="text-red-500 text-center text-sm font-semibold mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-full shadow-md mt-2"
            >
              Login
            </motion.button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <Link
              to="/riseon-quiz"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
