import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import sourabhProfile from '../images/sourabhProfile.png'; // ✅ fixed space
import shaliniProfile from '../images/shaliniProfile.png';
import tulaseeProfile from '../images/tulaseeProfile.png';
import prof1 from '../images/prof1.png';
import prof2 from '../images/prof2.png';
import prof4 from '../images/prof4.png';
import prof5 from '../images/prof5.png';
import prof6 from '../images/prof6.png';
import prof3 from '../images/prof3.png';




const profiles = [
  { image: sourabhProfile },
  { image: shaliniProfile },
  { image: tulaseeProfile },

  { image: prof1 },
  { image: prof2 },
  { image: prof4 },

  { image: prof5 },
  { image: prof6 },
  { image: prof3 },


];

const ProfileCarousel = () => {
  return (
    <section className="bg-[#faf0e6] py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Explore Our Diverse Range of Professionally Crafted Profiles
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-10">
        Discover the endless possibilities with our customizable templates,
        tailored to suit any job role or career path. Create your unique profile
        with thousands of design variations, and create your interactive web
        profile or PDF.
      </p>

      <div className="relative max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          className="rounded-xl"
        >
          {profiles.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.image}
                alt={`Profile template ${index + 1}`}
                className="rounded-xl border shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProfileCarousel;
