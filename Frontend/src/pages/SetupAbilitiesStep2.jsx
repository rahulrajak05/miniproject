import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const layoutOptions = [
  {
    id: 1,
    title: "Modern Minimalist",
    description: "Ideal for showcasing key details with a modern touch",
    preview: "grid-badges",
    stars: 4,
  },
  {
    id: 2,
    title: "Clean Bars",
    description: "Perfect for highlighting key information with a contemporary look",
    preview: "bar-chart",
    stars: 3,
  },
  {
    id: 3,
    title: "Rating Table",
    description: "Visualize skill levels clearly using a simple rating scale",
    preview: "rating-scale",
    stars: 3,
  },
];

const SetupAbilitiesStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLayout, setSelectedLayout] = useState(null);
  const abilityType = location.state?.abilityType || "interpersonal";

  const handleFinish = () => {
    if (!selectedLayout) return;
    navigate("/abilities-edit", {
      state: {
        abilityType,
        layoutId: selectedLayout,
      },
    });
  };

  const renderPreview = (type) => {
    switch (type) {
      case "grid-badges":
        return (
          <div className="grid grid-cols-4 gap-2 text-white text-xs font-medium">
            {Array(8)
              .fill("Skill")
              .map((label, i) => (
                <div key={i} className="bg-gray-700 py-1 px-2 rounded text-center">
                  {label}
                </div>
              ))}
          </div>
        );
      case "bar-chart":
        return (
          <ul className="space-y-1 text-sm text-gray-800">
            {["Teamwork", "UX", "Research", "Design", "Testing"].map((skill, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-28">{skill}</span>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-gray-800 h-full w-1/2 rounded"></div>
                </div>
              </li>
            ))}
          </ul>
        );
      case "rating-scale":
        return (
          <table className="text-xs w-full text-left border-collapse">
            <thead>
              <tr>
                <th>Skill</th>
                <th className="text-center">Novice</th>
                <th className="text-center">Intermediate</th>
                <th className="text-center">Expert</th>
              </tr>
            </thead>
            <tbody>
              {["Design", "Strategy", "Evaluation"].map((skill, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-1">{skill}</td>
                  <td className="text-center">○</td>
                  <td className="text-center">●</td>
                  <td className="text-center">○</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-100 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-3 text-gray-800">Setup Abilities - Step 2</h1>
        <p className="mb-6 text-gray-600">
          Select a design variation to ensure your skills are displayed in a layout that best highlights them.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center mb-6">
          <div className="text-gray-400 font-medium">📚 Type</div>
          <div className="flex-1 h-px bg-gray-300 mx-4" />
          <div className="flex items-center gap-2 text-orange-500 font-medium">
            <span className="bg-orange-100 p-1 rounded-full">🎭</span> Variations
          </div>
        </div>

        <p className="font-medium text-gray-700 mb-3">Choose a layout variation</p>

        <div className="space-y-6">
          {layoutOptions.map((layout) => (
            <label
              key={layout.id}
              className={`block border rounded-lg p-4 cursor-pointer transition ${
                selectedLayout === layout.id
                  ? "border-blue-700 bg-blue-50 shadow-sm"
                  : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="radio"
                  name="layout"
                  value={layout.id}
                  checked={selectedLayout === layout.id}
                  onChange={() => setSelectedLayout(layout.id)}
                  className="mt-2 accent-blue-700"
                />
                <div className="flex flex-col gap-2 w-full">
                  <div className="border p-3 rounded bg-white">{renderPreview(layout.preview)}</div>
                  <div className="text-yellow-500 text-sm">
                    {Array(layout.stars).fill("⭐").join("")}
                    {Array(5 - layout.stars).fill("☆").join("")}
                  </div>
                  <div className="font-semibold text-gray-800">{layout.title}</div>
                  <p className="text-sm text-gray-500">{layout.description}</p>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleFinish}
            className={`px-6 py-2 rounded-md text-white text-center transition ${
              selectedLayout
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedLayout}
          >
            Finish
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

export default SetupAbilitiesStep2;
