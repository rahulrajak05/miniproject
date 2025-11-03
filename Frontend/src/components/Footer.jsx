import React from "react";
import { useLocation } from "react-router-dom";
import {
  FaWhatsapp,
  FaLinkedin,
  FaDiscord,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
// Removed logo image in footer bottom bar as per branding update
import logo from "../assets/logo.png";

const Footer = () => {
  const location = useLocation();
  // Routes where a fixed sidebar is present; keep this list in sync with sidebar pages
  const routesWithSidebar = [
    "/myaccount",
    "/myprofile",
    "/dashboard",
    "/codingpage",
    "/theorypage",
    "/hrinterview",
    "/riseon-coverletter",
    "/riseon-interview",
    "/riseon-job-boards",
    "/riseon-quiz",
    "/quiz-home",
    "/quiz",
    "/information",
    "/educationsetup1",
    "/workexperiencestep3",
    "/abilities-edit",
    "/portfolio-form",
    "/award-form",
    "/intellectual-form",
    "/editoffering-form",
    "/edithobbies-form",
    "/editpreferences-form",
  ];
  const hasSidebar = routesWithSidebar.some((path) => location.pathname.startsWith(path));

  return (
    <>
    
  <footer className="bg-black text-white pt-6 pb-4">
      
      {/* 6 Equal Columns Section */}
  <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm ${hasSidebar ? "pl-0 md:pl-32 lg:pl-40 pr-5" : "px-5"} py-6`}>
        {/* University Branding */}
        <div className="md:col-span-1">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/20 shadow-sm bg-white">
              <img
                src={logo}
                alt="Pondicherry University logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight text-center">
              <h3 className="text-xl font-bold text-white">Pondicherry University</h3>
              <p className="text-sm text-gray-300">Department of Computer Science</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-orange-500 mb-2">Products</h4>
          <ul className="space-y-1">
            <li>Profiles</li>
            <li>Dashboard</li>
            <li>Cover Letter</li>
            <li>Interview</li>
            <li>Job Portals</li>


          </ul>
        </div>

        <div>
          <h4 className="font-bold text-orange-500 mb-2">Tools</h4>
          <ul className="space-y-1">
            <li>Interview</li>
            {/* <li>Scribe</li> */}
            <li>Job Portals</li>
            <li className="text-gray-500">Counsellor</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-orange-500 mb-2">Knowledge</h4>
          <ul className="space-y-1">
            <li>Blogs</li>
            <li>Webinar</li>
            <li className="text-gray-500">User Manual</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-orange-500 mb-2">Support</h4>
          <ul className="space-y-1">
            {/* <li>Pricing</li> */}
            <li>Contact Us</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-orange-500 mb-2">Company</h4>
          <ul className="space-y-1">
            <li>About</li>
            <li>Team</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      

  {/* Bottom bar */}
<div className={`bg-[#f2f0ef] mt-6 ${hasSidebar ? "pl-0 md:pl-32 lg:pl-40 pr-5" : "px-5"} py-4`}>
  <div className="flex flex-col md:flex-row items-center justify-between text-xs text-black">
    <div className="flex items-start mb-2 md:mb-0">
      <div className="flex flex-col leading-tight">
        <span className="text-3xl font-bold text-[#0B2C47]">NEXTSTEP</span>
        <span className="text-sm text-[#0B2C47]">Your Pathway to Career Success</span>
      </div>
    </div>
  <p className="text-black">© 2025 NEXTSTEP. All Rights Reserved.</p>
    <div className="flex space-x-3 text-black text-lg mt-2 md:mt-0">
      <a href="#" aria-label="WhatsApp" title="WhatsApp" className="hover:text-green-600 transition-colors"><FaWhatsapp /></a>
      <a href="#" aria-label="LinkedIn" title="LinkedIn" className="hover:text-sky-700 transition-colors"><FaLinkedin /></a>
      <a href="#" aria-label="Discord" title="Discord" className="hover:text-indigo-600 transition-colors"><FaDiscord /></a>
      <a href="#" aria-label="Instagram" title="Instagram" className="hover:text-pink-600 transition-colors"><FaInstagram /></a>
      <a href="#" aria-label="Facebook" title="Facebook" className="hover:text-blue-700 transition-colors"><FaFacebook /></a>
    </div>
  </div>
</div>

    </footer>
    </>
  );
};

export default Footer;
