import React from "react";

const toolbarButtons = [
  { label: "⚙️ Arrange", action: () => console.log("Arrange clicked") },
  { label: "➕ Add Section", action: () => console.log("Add Section clicked") },
  { label: "🎨 Design", action: () => console.log("Design clicked") },
];

const tags = [
  "Coming Soon: Checklist",
  "Alerts",
  "Settings",
  "Analyse",
];

const Toolbar = () => {
  return (
    <div className="flex justify-between mb-4">
      {/* Left Buttons */}
      <div className="space-x-2">
        {toolbarButtons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            className="bg-[#1F2937] text-white px-4 py-2 rounded"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Right Tags */}
      <div className="flex gap-2 text-sm text-white">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-orange-400 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
