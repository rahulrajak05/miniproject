import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const educationLevels = [
  {
    label: 'Doctorate or PhD',
    description: 'Advanced academic degree focused on original research and expertise.',
  },
  {
    label: 'Postgraduate',
    description: "Graduate-level qualification typically following a bachelor's degree.",
  },
  {
    label: 'Graduate',
    description: 'Undergraduate academic degree awarded after completing a course of study.',
  },
  {
    label: 'Higher Secondary',
    description: 'Pre-university qualification, often required for college entry.',
  },
  {
    label: 'Secondary School',
    description: 'Basic educational qualification typically completed during adolescence.',
  },
];

const EducationSetup = () => {
  const [step, setStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedLayout, setSelectedLayout] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#f1f5f9] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl font-bold mb-2 text-gray-600 hover:text-gray-800"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Setup Education - Step {step}
          </h1>
          <p className="text-gray-600">
            {step === 1
              ? 'Select the level of education for this entry to ensure accurate categorization and relevant details are captured.'
              : 'Select a design variation for this entry to optimize the layout and present your information clearly.'}
          </p>

          <div className="flex items-center mt-6 space-x-8">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full border-4 ${step === 1 ? 'border-orange-400 bg-orange-50' : 'border-gray-300'}`}>
                📚
              </div>
              <span className={`text-sm mt-1 font-semibold ${step === 1 ? 'text-orange-500' : 'text-gray-400'}`}>Type</span>
            </div>
            <div className="h-px bg-gray-300 w-10" />
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full border-4 ${step === 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                🖼️
              </div>
              <span className={`text-sm mt-1 font-semibold ${step === 2 ? 'text-blue-600' : 'text-gray-400'}`}>Variations</span>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-medium mb-4">Choose your education level:</h2>
            {educationLevels.map(({ label, description }) => (
              <label
                key={label}
                className={`flex items-start p-4 border rounded-lg mb-3 cursor-pointer transition-all ${
                  selectedLevel === label
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="education"
                  value={label}
                  checked={selectedLevel === label}
                  onChange={() => setSelectedLevel(label)}
                  className="mt-1 mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-gray-600 text-sm">{description}</p>
                </div>
              </label>
            ))}

            <div className="flex justify-start mt-6 space-x-4">
              <button
                className={`px-6 py-2 rounded transition ${
                  selectedLevel
                    ? 'bg-blue-700 text-white hover:bg-blue-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={() => selectedLevel && setStep(2)}
                disabled={!selectedLevel}
              >
                Continue
              </button>
              <button
                className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 transition"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-medium mb-4">Select a layout design:</h2>
            <div
              className={`border-2 rounded-xl p-6 relative cursor-pointer transition-all ${
                selectedLayout ? 'border-blue-700 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedLayout(true)}
            >
              <input type="radio" checked readOnly className="absolute top-4 left-4" />
              <div className="ml-6">
                <p className="font-bold text-blue-800 text-sm">College / University Name</p>
                <p className="text-xs text-gray-600">Branch</p>
                <p className="text-xs text-gray-600">2015 - 2017 | 6.02 CGPA</p>

                <div className="flex gap-2 mt-3">
                  <button className="border border-gray-400 px-2 py-1 text-xs rounded bg-white hover:bg-gray-100">
                    📁 Portfolio
                  </button>
                </div>

                <div className="bg-white p-3 mt-4 rounded text-xs shadow-sm">
                  <p><strong>Portfolio Name</strong></p>
                  <p className="text-gray-600">Portfolio description</p>
                </div>

                <div className="flex flex-wrap mt-3 gap-2 text-xs text-blue-600">
                  <span className="bg-blue-100 px-2 py-1 rounded">Industry</span>
                  <span className="bg-blue-100 px-2 py-1 rounded">Area of Work</span>
                </div>

                <div className="mt-4 border-t pt-2 text-xs text-gray-500">
                  Location Type: Graduation
                </div>
                <div className="mt-2 flex items-center text-sm">
                  ⭐⭐⭐☆☆ <span className="ml-2 text-gray-700">Modern Minimalist</span>
                </div>
                <p className="text-xs mt-1 text-gray-500">Ideal for showcasing key details with a modern touch</p>
              </div>
            </div>

            <div className="flex justify-start mt-6 space-x-4">
              <button
                className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                onClick={() => navigate("/educationsetup1")}
              >
                Finish
              </button>
              <button
                className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 transition"
                onClick={() => setStep(1)}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationSetup;
