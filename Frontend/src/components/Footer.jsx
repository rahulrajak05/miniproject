import React from "react";
import {
  FaWhatsapp,
  FaLinkedin,
  FaDiscord,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import RB1 from '../assets/RB1.png';

const Footer = () => {
  return (
    <>
    
    <footer className="bg-black text-white pt-6 pb-4">
      
      {/* 6 Equal Columns Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 px-5 py-6 text-sm">
        {/* Newsletter */}
        <div className="md:col-span-1">
          {/* <img src={RB} alt="logo11" className="h-14 " /> */}
          
          <h3>
            Stay ahead with the latest AI insights, tools, and updates about Placement Guidenance Resume. Enter your email to subscribe!
          </h3>
          <p className="mb-3">
            Get the latest AI updates. Subscribe below!
          </p>
          <form className="flex mb-3">
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-1 rounded-l bg-white text-black w-full"
            />
            <button className="bg-blue-500 px-3 py-1 rounded-r hover:bg-blue-600">
              Subscribe
            </button>
          </form>
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
<div className="bg-[#f2f0ef] mt-6 px-4 py-4">
  <div className="flex flex-col md:flex-row items-center justify-between text-xs text-black">
    <div className="flex items-center space-x-2 mb-2 md:mb-0">
      <img
    src={RB1}
    alt="logo"
    className="h-10 w-auto "
  />
    </div>
    <p className="text-black">© 2025 Placement Guidenance Resume. All Rights Reserved.</p>
    <div className="flex space-x-3 text-black text-lg mt-2 md:mt-0">
      <FaWhatsapp />
      <FaLinkedin />
      <FaDiscord />
      <FaInstagram />
      <FaFacebook />
    </div>
  </div>
</div>

    </footer>
    </>
  );
};

export default Footer;
