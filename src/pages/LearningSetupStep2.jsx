import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsQuestionCircle } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa';

const LearningSetupStep2 = () => {
  const navigate = useNavigate();
  const [selectedLayout, setSelectedLayout] = useState('modernMinimalist');

  const handleFinish = () => {
    navigate('/learning-edit');
  };

  const handleBack = () => {
    navigate('/LearningSetupStep1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-sky-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-blue-900 font-medium hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Setup Learning - Step 2
        </h1>
        <p className="text-gray-600 mb-8">
          Select a design variation for this entry to present your information in a clear and visually appealing way.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center mb-10">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm">1</div>
            Type
          </div>
          <div className="h-0.5 w-12 bg-gray-300 mx-2"></div>
          <div className="flex items-center gap-2 text-orange-500 font-semibold">
            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm">2</div>
            Variations
          </div>
        </div>

        {/* Layout Option */}
        <div className="mb-6">
          <div className="flex items-center mb-3 text-gray-800 font-semibold text-lg">
            Choose a layout variation
            <BsQuestionCircle className="ml-2 text-sky-600" />
          </div>

          <label
            className={`relative block border rounded-lg overflow-hidden p-4 transition duration-200 ${
              selectedLayout === 'modernMinimalist'
                ? 'border-blue-900 bg-sky-50 shadow-sm'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <input
              type="radio"
              name="layout"
              value="modernMinimalist"
              checked={selectedLayout === 'modernMinimalist'}
              onChange={() => setSelectedLayout('modernMinimalist')}
              className="absolute top-4 left-4 w-5 h-5"
            />

            <div className="ml-10">
              {/* Preview Card */}
              <div className="border rounded-md p-4 bg-white shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <div className="text-blue-900 font-semibold">Course Name</div>
                    <div className="text-gray-700 font-medium">Issuing Authority</div>
                    <div className="text-sm text-gray-500">Issue date – Expiry date</div>
                  </div>
                  <div className="w-12 h-12 bg-gray-300 border rounded-md" />
                </div>

                <div className="h-2.5 bg-gray-200 rounded mt-4 mb-1"></div>
                <div className="h-2.5 bg-gray-200 rounded mb-4 w-2/3"></div>

                <div className="flex space-x-2 mb-4">
                  <div className="bg-gray-100 border rounded px-2 py-1">📁</div>
                  <div className="bg-gray-100 border rounded px-2 py-1">💡</div>
                  <div className="bg-blue-700 text-white px-2 py-1 rounded">UX Case Studies</div>
                </div>

                <div className="border p-2 rounded bg-gray-50 mb-2">
                  <div className="text-sm font-semibold text-gray-800">Portfolio Name</div>
                  <div className="text-xs text-gray-500">Portfolio description</div>
                </div>

                <div className="flex gap-2 text-xs text-blue-900 font-medium">
                  <div className="bg-blue-100 rounded-full px-2 py-0.5">Industry Tag</div>
                  <div className="bg-blue-100 rounded-full px-2 py-0.5">Area Tag</div>
                </div>

                <div className="text-sm mt-4">📍 Location Type</div>
              </div>

              {/* Description */}
              <div className="mt-4 flex items-start gap-4">
                <div className="text-orange-400 text-lg">★★★★☆</div>
                <div>
                  <div className="font-semibold text-gray-800">Modern Minimalist</div>
                  <div className="text-sm text-gray-600">
                    Ideal for showcasing key details in a modern and clean layout.
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleFinish}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Finish
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

export default LearningSetupStep2;
