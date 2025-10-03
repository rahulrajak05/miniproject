import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaUserCircle } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Kumar Rajak",
    title: "Marketing Manager, Bright Future Media",
    quote:
      "Placement Guaidance Resume transformed my resume into a standout masterpiece. The AI-driven tools made it easy to showcase my skills and achievements, and I landed my dream job within weeks!",
  },
  {
    name: "Shikha Lugun",
    title: "Senior Software Engineer, TechWave Solutions",
    quote:
      "The personalized guidance from Placement Guaidance Resume gave me the confidence I needed for interviews. Their AI-powered platform was intuitive and tailored to my career needs.",
  },
];

const TestimonialCarousel = () => {
  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Hear from Our Happy Community
          </h2>
          <div className="flex items-center space-x-2 text-orange-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="mt-2 text-white text-sm">
            Based on <span className="text-orange-500">500+</span> glowing reviews from our satisfied <span className="text-orange-500">Placement Guaidance Resume</span> users.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          breakpoints={{
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg h-full flex flex-col justify-between">
                <p className="mb-6">{t.quote}</p>
                <div className="flex items-center">
                  <FaUserCircle size={40} className="text-gray-500 mr-3" />
                  <div>
                    <p className="font-bold text-black">{t.name}</p>
                    <p className="text-sm">{t.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
