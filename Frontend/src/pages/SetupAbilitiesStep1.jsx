import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const abilityTypes = [
  {
    label: "Interpersonal Skills",
    description: "Skills that facilitate effective communication and collaboration with others.",
    value: "interpersonal",
  },
  {
    label: "Technical Skills",
    description: "Specific technical expertise or knowledge, often related to tools, systems, or processes.",
    value: "technical",
  },
  {
    label: "Tools",
    description: "Software, platforms, or instruments you are proficient in using.",
    value: "tools",
  },
  {
    label: "Languages",
    description: "Proficiency in spoken or written languages.",
    value: "languages",
  },
];

const SetupAbilitiesStep1 = () => {
  const [selectedAbility, setSelectedAbility] = useState("interpersonal");
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/abilities-step2", { state: { abilityType: selectedAbility } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-50 via-white to-blue-50 py-10 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Setup Abilities - Step 1</h1>
        <p className="mb-6 text-gray-600 text-base">
          Select the type of ability for this entry to ensure accurate categorization and relevant details are captured.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center mb-6">
          <div className="flex items-center gap-2 text-orange-600 font-medium">
            <span className="bg-orange-100 p-1 rounded-full">📚</span> Type
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-4" />
          <div className="text-gray-400 font-medium">🎭 Variations</div>
        </div>

        {/* Ability Options */}
        <div className="space-y-4">
          <p className="font-medium text-gray-700">Choose the ability category:</p>

          {abilityTypes.map((type) => (
            <label
              key={type.value}
              className={`block border rounded-lg p-4 transition cursor-pointer ${
                selectedAbility === type.value
                  ? "border-blue-700 bg-blue-50 shadow-sm"
                  : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="abilityType"
                  value={type.value}
                  checked={selectedAbility === type.value}
                  onChange={() => setSelectedAbility(type.value)}
                  className="mt-1 accent-blue-700"
                />
                <div>
                  <div className="font-semibold text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleContinue}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md transition"
          >
            Continue
          </button>
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-md transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupAbilitiesStep1;
