import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";
import bgImage from "../assets/background.jpg";
import { motion } from "framer-motion";
import axios from "axios";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const isFormValid =
    /\S+@\S+\.\S+/.test(formData.email) && formData.password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8081/login", formData);

      if (response.status === 200) {
        alert("✅ Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid email or password.");
      } else {
        setError("⚠️ Unable to connect to server.");
      }
    } finally {
      setLoading(false);
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
        <motion.div
          className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Side */}
          <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white text-center">
            <img src={logo} alt="Logo" className="w-28 h-28 mb-6 drop-shadow-2xl" />
            <h2 className="text-2xl font-bold mb-4 leading-snug">
              Welcome back! Login to continue.
            </h2>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 w-full flex items-center justify-center p-8">
            <div className="w-full">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Log in</h1>
              <p className="mb-6 text-gray-600 text-center">Enter your email and password</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  disabled={loading}
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg"
                    disabled={loading}
                    required
                  />
                  <span
                    className="absolute right-3 top-2.5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </span>
                </div>

                {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`w-full py-2 rounded-lg text-white ${
                    isFormValid && !loading ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <hr className="my-4" />
                <Link
                  to="/signup"
                  className="block w-full text-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                >
                  SIGN UP
                </Link>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
