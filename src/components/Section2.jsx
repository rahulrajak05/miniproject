import React from "react";

const tools = [
  {
    name: "Profiles",
    image: "/images/profiles.png",
    comingSoon: false,
  },
  {
    name: "Interviewer",
    image: "/images/interviewer.png",
    comingSoon: false,
  },
  {
    name: "Cover Letter",
    image: "/images/coverletter.png",
    comingSoon: false,
  },
  {
    name: "Counsellor",
    image: "/images/counsellor.png",
    comingSoon: true,
  },
  {
    name: "Studio",
    image: "/images/studio.png",
    comingSoon: false,
  },
  {
    name: "Dashboard",
    image: "/images/dashboard.png",
    comingSoon: false,
  },
  {
    name: "Job Boards",
    image: "/images/jobboards.png",
    comingSoon: false,
  },
  {
    name: "Scribe",
    image: "/images/scribe.png",
    comingSoon: false,
  },
];

const Section2 = () => {
  return (
    <section className="bg-[#f9f9f9] py-16 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Meet</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Rise<span className="text-orange-500">ON</span> Suite
        </h1>
        <p className="text-gray-700 text-lg max-w-4xl mb-10">
          Your Ultimate Career Toolkit. Unlock the full potential of your professional profile with our comprehensive suite of tools designed to help you shine. Explore how our features can elevate your career journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="relative bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition"
            >
              <div className="bg-[#eaf3f9] p-4 h-56 flex items-center justify-center">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="max-h-full object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="text-blue-600 font-semibold text-lg">{tool.name}</h3>
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

export default Section2;