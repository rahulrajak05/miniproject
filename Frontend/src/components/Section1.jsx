import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, Target, Users, BarChart3, Trophy, PenTool, FileText } from "lucide-react";

const quizFeatures = [
  { 
    name: "Smart Quiz Generator", 
    icon: Brain, 
    description: "AI-powered questions tailored to your learning level",
    color: "bg-blue-100 text-blue-600",
    hoverColor: "group-hover:bg-blue-600 group-hover:text-white",
    available: true 
  },
  { 
    name: "Topic Mastery", 
    icon: Target, 
    description: "Focus on specific Computer Science topics",
    color: "bg-green-100 text-green-600",
    hoverColor: "group-hover:bg-green-600 group-hover:text-white",
    available: true 
  },
  { 
    name: "Live Leaderboard", 
    icon: Trophy, 
    description: "Compete with peers in real-time rankings",
    color: "bg-yellow-100 text-yellow-600",
    hoverColor: "group-hover:bg-yellow-600 group-hover:text-white",
    available: true 
  },
  {
    name: "Progress Analytics",
    icon: BarChart3,
    description: "Track your learning journey with detailed insights",
    color: "bg-purple-100 text-purple-600",
    hoverColor: "group-hover:bg-purple-600 group-hover:text-white",
    available: true,
  },
  { 
    name: "Study Groups", 
    icon: Users, 
    description: "Collaborate and learn with your classmates",
    color: "bg-indigo-100 text-indigo-600",
    hoverColor: "group-hover:bg-indigo-600 group-hover:text-white",
    available: false 
  },
  { 
    name: "Practice Tests", 
    icon: FileText, 
    description: "Comprehensive exam preparation mode",
    color: "bg-red-100 text-red-600",
    hoverColor: "group-hover:bg-red-600 group-hover:text-white",
    available: true 
  },
  { 
    name: "AI Tutor Chat", 
    icon: PenTool, 
    description: "Get instant help with difficult concepts",
    color: "bg-teal-100 text-teal-600",
    hoverColor: "group-hover:bg-teal-600 group-hover:text-white",
    available: false 
  },
  { 
    name: "Knowledge Base", 
    icon: BookOpen, 
    description: "Access curated learning resources and materials",
    color: "bg-orange-100 text-orange-600",
    hoverColor: "group-hover:bg-orange-600 group-hover:text-white",
    available: true 
  },
];

const Section1 = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-20 px-6 md:px-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-indigo-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-full px-6 py-2 text-sm font-medium text-indigo-700 mb-6"
          >
            <BookOpen className="w-4 h-4" />
            <span>Comprehensive Learning Platform</span>
          </motion.div>

          <h2 className="text-lg font-semibold text-gray-600 mb-4">Discover Our</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Quiz Learning
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
              Ecosystem
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Elevate your Computer Science knowledge with our intelligent quiz platform. 
            From personalized learning paths to competitive challenges, we've got everything 
            you need to excel in your academic journey.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {quizFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                  {/* Icon Section */}
                  <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                    <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>

                  {/* CTA Section */}
                  <div className={`bg-white text-gray-700 p-6 flex items-center justify-center transition-all duration-300 ease-in-out ${feature.hoverColor} cursor-pointer`}>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold">
                        {feature.available ? "Explore Now" : "Coming Soon"}
                      </span>
                      {feature.available && (
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          →
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Coming Soon Badge */}
                  {!feature.available && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h3>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already mastering Computer Science concepts with our interactive quiz platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Get Started Today</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Section1;