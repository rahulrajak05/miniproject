import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const EditAbilities = () => {
  const [skills, setSkills] = useState([{ name: "", level: "1 Novice" }]);
  const [jobRole, setJobRole] = useState("");
  const [generationIndex, setGenerationIndex] = useState(0);
  const [generatedSkills, setGeneratedSkills] = useState([]);

  const { addAbilities } = useProfile();
  const navigate = useNavigate();

  const handleSkillChange = (index, key, value) => {
    const updated = [...skills];
    updated[index][key] = value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", level: "1 Novice" }]);
  };

  const handleAIGenerate = () => {
    if (jobRole.trim()) {
      const newSkills = [
        "Team Collaboration",
        "Leadership",
        "Conflict Resolution",
        "Empathy",
        "Effective Communication",
      ];
      setGeneratedSkills(newSkills);
      setGenerationIndex(0);
    }
  };

  const handleSave = () => {
    addAbilities(skills);
    navigate("/myprofile");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-black">←</button>

        <h1 className="text-3xl font-bold text-blue-950 mb-1">
          Edit Abilities – Interpersonal Skills
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          List your key interpersonal skills, such as leadership, communication, and teamwork.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Skills Input */}
          <div className="md:col-span-2 space-y-5">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex-1">
                  <label className="text-sm font-medium block mb-1">
                    Interpersonal Skill *
                  </label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) =>
                      handleSkillChange(idx, "name", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Interpersonal Skill"
                  />
                </div>
                <div className="w-48">
                  <label className="text-sm font-medium block mb-1">Level</label>
                  <select
                    value={skill.level}
                    onChange={(e) =>
                      handleSkillChange(idx, "level", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>1 Novice</option>
                    <option>2 Beginner</option>
                    <option>3 Intermediate</option>
                    <option>4 Advanced</option>
                    <option>5 Expert</option>
                  </select>
                </div>
              </div>
            ))}
            <button
              onClick={addSkill}
              className="text-sm text-blue-700 hover:underline"
            >
              + Add Skill
            </button>
          </div>

          {/* Right - AI Suggestions */}
          <div className="border border-gray-200 rounded p-5 bg-gray-50">
            <h2 className="font-semibold text-gray-800 mb-3">AI Suggestions</h2>
            <label className="text-sm font-medium block mb-1">Job Role *</label>
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Job Role"
            />
            <p className="text-xs text-gray-500 mb-2">
              AI suggests skills based on the job role you enter.
            </p>
            <button
              onClick={handleAIGenerate}
              className="w-full bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Generate with AI ❤️
            </button>

            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold text-sm mb-2">Previous Generations</h3>
              {generatedSkills.length === 0 ? (
                <p className="text-sm text-gray-500">No Interpersonal Skills available</p>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">
                    {generatedSkills[generationIndex]}
                  </p>
                  <div className="flex gap-2 items-center">
                    <button
                      disabled={generationIndex === 0}
                      onClick={() => setGenerationIndex(generationIndex - 1)}
                      className="border px-2 py-1 rounded disabled:opacity-50"
                    >
                      ←
                    </button>
                    <span className="text-xs text-gray-500">
                      {generationIndex + 1}/{generatedSkills.length}
                    </span>
                    <button
                      disabled={generationIndex === generatedSkills.length - 1}
                      onClick={() => setGenerationIndex(generationIndex + 1)}
                      className="border px-2 py-1 rounded disabled:opacity-50"
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            Save
          </button>
          <button
            onClick={() => navigate("/myprofile")}
            className="border border-gray-400 text-gray-800 px-6 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAbilities;
