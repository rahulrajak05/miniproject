import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";
import bgImage from "../assets/background.jpg"; // background image path
import axios from "axios";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.password.length >= 6 &&
    formData.consent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await axios.post("http://localhost:8081/signup", {
  name: formData.name,
  email: formData.email,
  password: formData.password
});

      if (response.status === 200) {
        window.alert("✅ Sign up successful! Please login to continue.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      window.alert("❌ Sign up failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen px-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Centered Card */}
        <motion.div
          className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Side - Logo + Quote */}
          <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white text-center">
            <img
              src={logo}
              alt="Logo"
              className="w-28 h-28 mb-6 drop-shadow-2xl"
            />
            <h2 className="text-2xl font-bold mb-4 leading-snug">
              “Your journey begins here.  
              Sign up and unlock opportunities.”
            </h2>
            <p className="text-sm text-gray-100">
              Empowering you to achieve more every day.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2 w-full flex items-center justify-center p-8">
            <div className="w-full">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Pondicherry University
              </h1>
              <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                {/* Register / Sign Up */}
              </h1>
              <p className="mb-6 text-gray-600 font-medium text-center">
                Welcome! Please enter your details.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Minimum 6 characters"
                    required
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Terms & Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Sign Up Button */}
                <motion.button
                  type="submit"
                  disabled={!isFormValid}
                  whileHover={{ scale: isFormValid ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 rounded-md text-white font-semibold transition duration-200 ${
                    isFormValid
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  SIGN UP
                </motion.button>

                {/* Already have account */}
                <p className="text-center text-sm text-gray-600 pt-4 border-t">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignUpPage;
