import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const workTypes = [
  { title: "Full Time", desc: "Permanent role with full working hours" },
  { title: "Contractual", desc: "Fixed-term employment with specific contract duration" },
  { title: "Internship", desc: "Temporary role, often for gaining practical experience" },
  { title: "Part-Time Employment", desc: "Role with fewer working hours than a full-time position" },
  { title: "Volunteer", desc: "Unpaid role contributing to a cause or organization" },
  { title: "Freelancer", desc: "Independent work on a per-project basis" },
];

const WorkExperienceStep1 = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("Full Time",);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-2">Setup Work Experience - Step 1</h1>
      <p className="text-gray-600 mb-6">
        Select the type of work experience for this entry to ensure accurate categorization and relevant details are captured
      </p>

      <div className="space-y-4">
        {workTypes.map(({ title, desc }) => (
          <div
            key={title}
            className={`p-4 border rounded cursor-pointer ${
              selectedType === title ? "bg-blue-50 border-blue-700" : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedType(title)}
          >
            <input type="radio" checked={selectedType === title} readOnly className="mr-2" />
            <span className="font-semibold">{title}</span>
            <p className="text-sm text-gray-600 ml-6">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-start gap-4 mt-6">
        <button
          onClick={() => navigate("/workexperiencestep2", { state: { selectedType } })}
          className="bg-blue-900 text-white px-6 py-2 rounded"
        >
          Continue
        </button>
        <button className="border px-4 py-2 rounded text-gray-600">Back</button>
      </div>
    </div>
  );
};

export default WorkExperienceStep1;
