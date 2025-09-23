import React from "react";
import { HelpCircle } from "lucide-react";

const Section = ({ title, description, buttons }) => (
  <div className="border rounded-lg p-5 mb-6 bg-white shadow-sm">
    <div className="flex items-center text-xl font-semibold text-gray-800 mb-2">
      {title}
      <HelpCircle size={18} className="ml-2 text-blue-400" />
    </div>
    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
    <div className="flex flex-wrap gap-3">
      {buttons.map((text, index) => (
        <button
          key={index}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium text-sm py-1.5 px-4 rounded-md transition"
        >
          {text}
        </button>
      ))}
    </div>
  </div>
);

const RiseOnScribe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center text-3xl font-bold text-blue-900 mb-6">
          RiseON Scribe
          <HelpCircle size={20} className="ml-2 text-blue-400" />
        </div>

        {/* Profile Selector */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Profile <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            defaultValue=""
          >
            <option value="" disabled>
              Select Profile
            </option>
            <option>Marketing Manager</option>
            <option>Product Designer</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            Please select your published profile to continue or enable the service.
          </p>
        </div>

        {/* Sections */}
        <Section
          title="Blog Writing"
          description="Blog writing is the art of creating engaging, informative content that resonates with readers. It involves crafting attention-grabbing headlines, clear structure, and SEO optimization to attract and retain an audience."
          buttons={[
            "SEO Blog Posts",
            "Thought Leadership Articles",
            "How-To Guides",
            "Industry News",
            "Case Studies",
            "Listicles",
          ]}
        />

        <Section
          title="Social Media Content"
          description="Craft tailored posts for each platform (Instagram, Twitter, LinkedIn, Facebook, etc.) that suit its audience, ensuring content is optimized for engagement and platform algorithms."
          buttons={[
            "Platform-Specific Posts",
            "Hashtag Strategy",
            "Response to Post",
            "Contribution to Topic",
            "Engagement Posts",
            "Polls",
            "Quizzes",
          ]}
        />

        <Section
          title="Email Contextual Templates"
          description="Create engaging promotional emails that showcase products or services, offering discounts, new features, or limited-time offers."
          buttons={[
            "Newsletters",
            "Job Request (Email, LinkedIn Messaging)",
            "About Me Stories",
            "Emails",
            "Testimonials",
          ]}
        />

        <Section
          title="Technical Writing"
          description="Create comprehensive and easy-to-understand knowledge base articles to help users troubleshoot issues, learn about features, or find answers to frequently asked questions."
          buttons={["Knowledge Base Articles", "Training Materials"]}
        />
      </div>
    </div>
  );
};

export default RiseOnScribe;
