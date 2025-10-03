import React from "react";
import { FaFileAlt, FaArrowUp, FaUserAstronaut, FaBriefcase, FaClock } from "react-icons/fa";

const benefits = [
  {
    icon: <FaFileAlt className="text-orange-500 text-2xl" />,
    title: "Effortless Resume Creation And Seamless Sharing",
    description: "Create your resume in minutes and share it seamlessly across platforms with just a single click. Maximize your visibility with ease.",
  },
  {
    icon: <FaArrowUp className="text-orange-500 text-2xl" />,
    title: "Boost Your Professional Confidence",
    description: "Prepare with industry-leading practices, comprehensive interview coaching, and tailored guidance to excel in your career journey.",
  },
  {
    icon: <FaUserAstronaut className="text-orange-500 text-2xl" />,
    title: "Develop a Strong and Memorable Personal Brand",
    description: "Build a standout online presence that highlights your unique strengths and achievements, setting you apart from the competition.",
  },
  {
    icon: <FaBriefcase className="text-orange-500 text-2xl" />,
    title: "Gain Clarity and Direction for Career Growth",
    description: "Gain valuable insights and clear direction for career growth and development, ensuring you stay on the right path.",
  },
  {
    icon: <FaClock className="text-orange-500 text-2xl" />,
    title: "Streamline Your Efforts and Reduce Career Stress",
    description: "Leverage user-friendly tools to streamline resume creation and enhance your professional brand, minimizing effort and maximizing impact.",
  },
];

const RiseOnBenefitsGrid = () => {
  return (
    <section className="py-16 px-6 lg:px-20 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-2">
        Elevate Your Career with <span className="text-black"></span><span className="text-orange-500">Placement Guaidance Resume</span> Intelligent Solutions
      </h2>
      <div className="w-20 h-1 bg-orange-500 mx-auto my-4 rounded-full" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 justify-center">
        {benefits.map((item, index) => (
          <div key={index} className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition-all text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              {item.icon}
              <div>
                <h3 className="font-semibold text-md mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RiseOnBenefitsGrid;