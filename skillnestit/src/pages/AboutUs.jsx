import { Image } from "@nextui-org/react";
import Logo from "../assets/Logo.png";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-primary p-8 sm:p-12 lg:p-20 flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h3 className="font-semibold text-lg text-secondary">Hi! Let's Find Out</h3>
        <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-secondary mt-2">
          About Us
        </h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Logo */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <Image
            src={Logo}
            className="w-56 sm:w-72 lg:w-80 rounded-xl"
            alt="SkillNest Logo"
          />
        </div>

        {/* Text Content */}
        <div className="text-justify lg:text-left max-w-3xl text-gray-700">
          <p className="mb-6 text-lg leading-relaxed">
            <span className="font-bold text-secondary">SkillNestIT</span> - a platform designed to bridge the gap between students
            passionate about IT and forward-thinking companies looking to share
            projects or real-world case studies. At SkillNest, we connect
            ambitious students with meaningful opportunities to apply their
            knowledge, tackling genuine industry challenges.
          </p>
          <p className="mb-6 text-lg leading-relaxed">
            For companies, SkillNest is more than a platform—it's a gateway to
            fresh perspectives and innovative problem-solving methods
            contributed by the emerging generation of IT talent. By
            collaborating with students on actual case studies, companies can
            gain valuable insights while also helping shape the skills of
            tomorrow's tech leaders.
          </p>
          <p className="text-lg leading-relaxed">
            By sharing these projects, companies are taking a proactive step in
            empowering the next wave of IT professionals, contributing to the
            advancement of technology, and supporting the future in the digital
            world. Join us on this journey to foster talent, encourage
            innovation, and inspire growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
