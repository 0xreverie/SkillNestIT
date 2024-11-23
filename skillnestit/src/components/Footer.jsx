import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <div className="bg-secondary text-white py-10 px-4">
      <div className="flex flex-col md:flex-row md:justify-evenly items-center md:items-start space-y-6 md:space-y-0">
        
        {/* Logo Section */}
        <div className="bg-white h-fit p-2 rounded-full">
          <img src={Logo} className="h-16 w-150 mx-auto" alt="SkillNest Logo" />
        </div>
        
        {/* Links Section */}
        <div className="text-center md:text-left">
          <h1 className="font-bold text-lg mb-3">Links</h1>
          <Link to="/" className="block mb-2 hover:underline">
            Home
          </Link>
          <Link to="/about-us" className="block mb-2 hover:underline">
            About Us
          </Link>
          <Link to="/projects" className="block mb-2 hover:underline">
            Projects
          </Link>
        </div>
        
        {/* Contact Section */}
        <div className="text-center md:text-left">
          <h1 className="font-bold text-lg mb-3">Contact Us</h1>
          <Link to="" className="flex justify-center md:justify-start gap-2 items-center mb-2 hover:underline">
            <i className="fa-solid fa-phone" />
            <span>021 (2382736)</span>
          </Link>
          <Link to="" className="flex justify-center md:justify-start gap-2 items-center mb-2 hover:underline">
            <i className="fa-solid fa-envelope" />
            <span>skillnest@gmail.com</span>
          </Link>
          <Link to="" className="flex justify-center md:justify-start gap-2 items-center mb-2 hover:underline">
            <i className="fa-brands fa-linkedin" />
            <span>LinkedIn</span>
          </Link>
          <Link to="" className="flex justify-center md:justify-start gap-2 items-center mb-2 hover:underline">
            <i className="fa-brands fa-instagram" />
            <span>@skillnest</span>
          </Link>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-300 mt-6">
        <p>&copy; 2024 SkillNestIT. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
