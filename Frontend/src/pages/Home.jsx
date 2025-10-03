import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Section1 from '../components/Section1';
import ImpactStatsSection from '../components/ImpactStatsSection';
import TrustedByCompanies from '../components/TrustedByCompanies';
import EaseInEveryStage from '../components/EaseInEveryStage';
import ResumeFeaturesAccordion from '../components/ResumeFeaturesAccordion';
import RiseOnBenefitsGrid from '../components/RiseOnBenefitsGrid';
import ProfileCarousel from '../components/ProfileCarousel';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FAQAccordion from '../components/FAQAccordion';
// import Footer from '../components/Footer'; // optional

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <HeroSection />
      <Section1 />
      <ImpactStatsSection />
      <TrustedByCompanies />
      <EaseInEveryStage />
      <ResumeFeaturesAccordion />
      <RiseOnBenefitsGrid />
      <ProfileCarousel />
      <TestimonialCarousel />
      <FAQAccordion />
      {/* <Footer /> Add only if you have a Footer component */}
    </div>
  );
};

export default Home;
