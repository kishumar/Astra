import React from "react";
import { Linkedin, Instagram, ArrowLeft } from "lucide-react";

function AboutUjjwal() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-12 relative"
      style={{
        backgroundImage: "url('/images/developer-bg.jpeg')", // replace with your bg
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />
        
      {/* Back Button */}
      <a
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl shadow-neomorph bg-white/30 text-sm font-semibold text-gray-200 hover:bg-white/20 transition"
      >
        <ArrowLeft size={18} />
        Back
      </a>

  <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT: IMAGE */}
        <div className="flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-neomorph bg-white/10 backdrop-blur-lg flex items-center justify-center overflow-hidden">
            {/* Replace with your photo */}
            <img
              src="/images/my-pic.jpg"
              alt="Ujjwal Sharma"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* RIGHT: CONTENT */}
        <div className="text-gray-100 space-y-6">
          <h2 className="text-5xl font-extrabold text-white/80 bg-clip-text  drop-shadow-md">
            Hi, I’m Ujjwal
          </h2>
          <p className="text-lg md:text-xl font-bold leading-relaxed text-gray-200">
            Tech Lead at <span className="font-bold text-white">Techverse Nexus</span>.  
            I’ve completed <span className="font-bold text-white">15+ web projects</span>, 
            from dynamic dashboards to interactive platforms.  
            Recently, I cracked a <span className="text-pink-400 font-extrabold">6.5 LPA</span> package in a startup 🚀.
          </p>

          {/* More About Me */}
          <div className="space-y-3 text-base font-medium leading-relaxed">
            <p className="font-semibold text-lg text-white">🌱 Current Focus:</p>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Mastering animations with <span className="text-white font-semibold">GSAP & Framer Motion</span></li>
              <li>Scalable app dev using <span className="text-white font-semibold">MongoDB, Express.js, Node.js</span></li>
              <li>AI tools & voice tech in real-world products</li>
              <li>Community-driven web experiences</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 pt-4">
            <h1 className="text-3xl relative top-3">Connect with me :</h1>
            <a
              href="https://www.linkedin.com/in/ujjwal-sharma-3a1395279/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full  hover:scale-110 transition"
            >
         <img src="https://img.freepik.com/premium-vector/linkedin-logo-icon_1273375-1174.jpg?semt=ais_hybrid&w=740&q=80" className="h-12 w-12 rounded-md" />
            </a>
            <a
              href="https://www.instagram.com/ujjwalsharma.jsx/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:scale-110 transition"
            >
         <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg" className="h-12 w-12 rounded-md" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUjjwal;


