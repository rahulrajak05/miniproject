import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WorkExperienceStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedType = location.state?.selectedType || "Full Time";

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-2">Setup Work Experience - Step 2</h1>
      <p className="text-gray-600 mb-6">
        Select a design variation for this entry to optimize the layout, ensuring your information is presented clearly and professionally
      </p>

      <div className="border rounded p-4 flex flex-col gap-3 bg-gray-50">
        <div className="text-lg font-bold">Job Title <span className="text-blue-600">Company Name</span></div>
        <div className="text-gray-600 text-sm">📍 Location</div>
        <div className="text-gray-600 text-sm">📅 Date / Year – Present</div>
        <div className="flex items-center gap-4 mt-2">
          <button className="bg-white border px-3 py-1 rounded">📁</button>
          <button className="bg-blue-700 text-white px-3 py-1 rounded">Portfolio</button>
        </div>
        <div className="bg-white border rounded p-2 mt-2">
          <div className="font-medium">Portfolio Name</div>
          <div className="text-sm text-gray-500">Portfolio description</div>
        </div>
        <div className="text-sm mt-2">
          <span className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">Tags: Industry</span>
          <span className="inline-block bg-gray-200 px-2 py-1 rounded">Tags: Area of Work</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="text-yellow-600">⭐⭐⭐ Modern Minimalist</div>
          <div className="text-sm text-gray-500 italic">{selectedType}</div>
        </div>
      </div>

      <div className="flex justify-start gap-4 mt-6">
        <button onClick={() => navigate("/workexperiencestep3", { state: { selectedType } })} className="bg-blue-900 text-white px-6 py-2 rounded">
          Finish
        </button>
        <button onClick={() => navigate("/workexperience/step1")} className="border px-4 py-2 rounded text-gray-600">Back</button>
      </div>
    </div>
  );
};

export default WorkExperienceStep2;
