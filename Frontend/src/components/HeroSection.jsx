import React from "react";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import riseonfooter_logo from "../assets/riseonfooter_logo.png";
import resume11 from "../assets/resume11.png"

const HeroSection = () => {
  return (
    <>
    <section >
        <img 
          src={resume11} 
          alt="RiseON Logo" 
          // style={{ height: '150px', margin: '0 auto' }} 
        />
    </section>

    </>
  );
};

export default HeroSection;