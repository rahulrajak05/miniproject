import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // ✅ Connect to backend (port 8081)
      const response = await fetch("http://localhost:8081/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Registration failed");

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/quiz-login"), 2000);
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
          <h1 className="text-3xl font-bold text-center">Pondicherry University</h1>
          <p className="mt-3 text-gray-300 text-center text-sm">
            Empowering students to rise higher — join our community of innovators and achievers.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-6">
            Create Your Account
          </h1>

          {error && <p className="text-red-500 text-center text-sm font-semibold mb-4">{error}</p>}
          {success && <p className="text-green-600 text-center text-sm font-semibold mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-2 rounded-full shadow-md mt-2"
            >
              Register
            </motion.button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/quiz-login" className="text-indigo-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;
