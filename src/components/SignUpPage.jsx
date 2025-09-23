import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ulogo from '../assets/ulogo.png';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.password.length >= 6 &&
    formData.consent;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log('Signing up:', formData);
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6 py-10 bg-gradient-to-r from-[#fef9f5] via-[#fbf8f6] to-[#fefefe]">
        {/* Centered Form */}
        <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8">
          <img
            src={ulogo}
            alt="SignUp Visual"
            className="w-full max-w-sm mb-6 rounded-xl shadow-xl mx-auto"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Register / Sign Up
          </h1>
          <p className="mb-6 text-gray-600 font-medium text-center">
            Welcome! Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1"
              />
              <label className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline font-semibold">
                  Terms & Privacy Policy
                </a>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 rounded-md text-white font-semibold transition duration-200 ${
                isFormValid
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              SIGN UP
            </button>

            {/* OAuth Buttons */}
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn"
                  className="w-5 h-5"
                />
                Sign in with LinkedIn
              </button>
            </div>

            {/* Already have account */}
            <p className="text-center text-sm text-gray-600 pt-4 border-t">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
