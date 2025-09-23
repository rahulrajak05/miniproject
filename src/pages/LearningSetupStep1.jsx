import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsQuestionCircle } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa';

const LearningSetupStep1 = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('Course');

  const handleContinue = () => {
    navigate('/learning-step2');
  };

  const handleBack = () => {
    navigate('/myprofile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-sky-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-blue-900 font-medium hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Setup Learning - Step 1
        </h1>
        <p className="text-gray-600 mb-8">
          Select the type of learning experience for this entry to ensure accurate categorization and relevant details are captured.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center mb-10">
          <div className="flex items-center gap-2 text-orange-500 font-semibold">
            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm">1</div>
            Type
          </div>
          <div className="h-0.5 w-12 bg-gray-300 mx-2"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-6 h-6 rounded-full border border-gray-400 text-gray-400 flex items-center justify-center text-sm">2</div>
            Variations
          </div>
        </div>

        {/* Learning Type Selector */}
        <div className="mb-8">
          <div className="flex items-center mb-3 text-gray-800 font-medium text-lg">
            Select the type of learning experience.
            <BsQuestionCircle className="ml-2 text-sky-600" />
          </div>

          <div className="space-y-4">
            {[
              {
                label: 'Course',
                description: 'A structured program of study focused on a specific skill or subject.',
              },
              {
                label: 'Certifications',
                description: 'Official recognition of expertise, often following an exam.',
              },
              {
                label: 'Conference/Workshop',
                description: 'Interactive group sessions for skills and knowledge development.',
              },
            ].map(({ label, description }) => (
              <label
                key={label}
                className={`block p-4 border rounded-lg cursor-pointer transition duration-200 ${
                  selectedType === label
                    ? 'border-blue-900 bg-sky-50 shadow-sm'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="learningType"
                    value={label}
                    checked={selectedType === label}
                    onChange={() => setSelectedType(label)}
                    className="mt-1 w-5 h-5 text-blue-900"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{label}</div>
                    <div className="text-sm text-gray-600">{description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleContinue}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Continue
          </button>
          <button
            onClick={handleBack}
            className="border border-gray-400 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningSetupStep1;
