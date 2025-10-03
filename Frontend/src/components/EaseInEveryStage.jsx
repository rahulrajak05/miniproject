import React, { useState } from "react";
import { FaRegFileAlt, FaMagic, FaShareAlt, FaBriefcase } from "react-icons/fa";


const stages = [
  {
    label: "Resume Creation",
    icon: <FaRegFileAlt size={32} className="text-orange-500" />,
  },
  {
    label: "Content Creation",
    icon: <FaMagic size={32} className="text-orange-500" />,
  },
  {
    label: "Sharing & Accessibility",
    icon: <FaShareAlt size={32} className="text-orange-500" />,
  },
  {
    label: "Career Management",
    icon: <FaBriefcase size={32} className="text-orange-500" />,
  },
];

const EaseInEveryStage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#faf0e6] py-16 text-center">
      <div className="bg">
      <h4 >
        Experience Effortless Career Growth
      </h4>
      <h2 className="text-3xl font-semibold mb-12">
        We Provide Ease in Every Stage
      </h2>
      <div className="flex justify-center gap-12 flex-wrap">
        {stages.map((stage, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer transition-all duration-200 px-6 pb-4 ${
              activeIndex === index ? "border-b-4 border-orange-500" : "border-b-4 border-transparent"
            }`}
          >
            <div
              className={`flex flex-col items-center gap-2 ${
                activeIndex === index ? "bg-white shadow-lg rounded-xl p-4" : ""
              }`}
            >
              {stage.icon}
              <div className="text-md font-medium leading-tight">
                {stage.label.split(" ").map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default EaseInEveryStage;