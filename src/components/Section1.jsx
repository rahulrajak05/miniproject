import React from "react";
import profile from '../images/profile.webp';
import interviewer from '../images/interviewer.webp';
import coverletter from '../images/coverletter.webp';
import studio from '../images/studio.webp';
import dashboard from '../images/dashboard.webp';
import jobBoards from '../images/jobBoards.webp';
import scribe from '../images/scribe.webp';

const tools = [
  { name: "Profile", image: profile, comingSoon: false },
  { name: "Interviewer", image: interviewer, comingSoon: false },
  { name: "Coverletter", image: coverletter, comingSoon: false },
  {
    name: "Counsellor",
    image: "https://cdn-icons-png.flaticon.com/512/3209/3209139.png",
    comingSoon: true,
  },
  { name: "Studio", image: studio, comingSoon: false },
  { name: "Dashboard", image: dashboard, comingSoon: false },
  { name: "JobBoards", image: jobBoards, comingSoon: false },
  { name: "Scribe", image: scribe, comingSoon: false },
];

const Section1 = () => {
  return (
    <section className="bg-[#f9f9f9] py-16 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Meet</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Placement<span className="text-orange-500"> Guaidance</span>  Resume
        </h1>
        <p className="text-gray-700 text-lg max-w-4xl mb-10">
          Your Ultimate Career Toolkit. Unlock the full potential of your professional profile with our comprehensive resume of tools designed to help you shine. Explore how our features can elevate your career journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
className="group relative bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-[#eaf3f9] p-4 flex items-center justify-center aspect-[4/3]">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="bg-white text-black rounded-lg p-6 flex items-center justify-center transition-colors duration-300 ease-in-out group-hover:bg-blue-600 group-hover:text-white cursor-pointer">
                <p className="text-lg font-semibold text-center">{tool.name}</p>
              </div>

              {tool.comingSoon && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-bl-lg">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section1;
