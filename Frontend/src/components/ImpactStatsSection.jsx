import React from "react";
import { FaUserTie, FaGlobe, FaRobot, FaEye } from "react-icons/fa"; // example icons

const stats = [
  {
    icon: <FaUserTie className="text-3xl text-orange-500" />,
    value: "12,000+",
    label: "Professional Profiles Created",
  },
  {
    icon: <FaGlobe className="text-3xl text-orange-500" />,
    value: "8,000+",
    label: "Users Across the Globe",
  },
  {
    icon: <FaRobot className="text-3xl text-orange-500" />,
    value: "450,000+",
    label: "AI-Driven Interactions",
  },
  {
    icon: <FaEye className="text-3xl text-orange-500" />,
    value: "100,000+",
    label: "Profile Views by Recruiters",
  },
];

const ImpactStatsSection = () => {
  return (
    <section className="bg-[#f9f9f9] py-16">
      <div className="bg-[#1f2e45] relative text-center py-16">
        <div className="text-3xl md:text-4xl font-bold text-white">
          <span className="text-orange-400">Elevating Professionals</span>
          <br />
          <span className="italic">to reach new heights</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-20 mt-[-60px] relative z-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center"
          >
            <div className="mb-3">{item.icon}</div>
            <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            <p className="text-gray-600 text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStatsSection;
