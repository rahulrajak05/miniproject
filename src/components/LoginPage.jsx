import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ulogo from "../assets/ulogo.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const isFormValid =
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError(null);

    try {
      // Example API call
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-r from-[#f8f8ff] via-[#f3f4f6] to-[#e0f7fa]">
        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-12 pr-20">
          <img
            src={ulogo}
            alt="Login Visual"
            className="w-full max-w-sm mb-6 rounded-xl shadow-xl mx-auto"
          />
          <h1 className="text-3xl font-bold mb-2 text-gray-900 text-center">
            Log in to your account
          </h1>
          <p className="mb-6 text-gray-600 text-center">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />

            {/* Password */}
            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password *"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
              <span
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Password length should be at least 6 characters
            </p>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  disabled={loading}
                />
                <span className="text-sm">Remember for 30 days</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mb-2 text-center">
                {error}
              </div>
            )}

            {/* Sign in */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`bg-blue-600 text-white w-full py-2 rounded-lg mb-4 ${
                isFormValid && !loading
                  ? "hover:bg-blue-700"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* OAuth Buttons */}
            <button
              className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 mb-2 flex items-center justify-center"
              disabled={loading}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 mr-2"
              />
              Sign in with Google
            </button>

            <button
              className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 mb-4 flex items-center justify-center"
              disabled={loading}
            >
              <img
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
                alt="LinkedIn"
                className="h-5 mr-2"
              />
              Sign in with LinkedIn
            </button>

            <hr className="my-4" />
            <p className="text-center text-sm mb-2">Don’t have an account?</p>
            <Link
              to="/signup"
              className="block w-full text-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
            >
              SIGN UP
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
