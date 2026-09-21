import React, { useState } from "react";
import {
  Instagram,
  Linkedin,
  
  Github,

  Mail,
  Phone,
  MapPin,
  SmileIcon,

  HeartIcon,
} from "lucide-react";
import ImageCarousel from "./testimonials";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState(" ");
  const handlesubmit = () => {
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Thank you! We will be in touch soon.");
    setEmail("");
  };
const footerColumns = [
  {
    title: "Resources",
    links: [
      { label: "Important Services", href: "/portals" },
      { label: "Safety Blog", href: "https://www.kovacorp.com/top-public-safety-blogs" },
      { label: "Public Safety Webinars", href: "https://www.esri.com/en-us/industries/public-safety/webinars" },
      { label: "Women Helpline Portal", href: "https://ncw.nic.in/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About developer", href: "/developer" },
      { label: "Contact", href: "/contact" },
      
    ],
  },
  {
    title: "Helpful Links",
    links: [
   
      { label: "Terms of Service", href: "/terms" },
      { label: "ASTRA's Mobile App", href: "https://expo.dev/artifacts/eas/qVKvQS7vxFpaFneTfZ6KpL.apk" },

    ],
  },
];


  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/ujjwalsharma.jsx/ ",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ujjwal-sharma-3a1395279/",
    },
  

    { icon: Github, href: "https://github.com/UzzwalSharma" },
  ];

  const contactInfo = [
    { icon: Mail, text: "kishankumar20082000@gmail.com" },
    { icon: Phone, text: "+91 9670753797" },
    { icon: MapPin, text: "Ghaziabad , Uttarpradesh , India", isAddress: true },
  ];

  return (
    <footer  className="relative text-white w-full bg-[url('/images/bg6.jpeg')] bg-cover bg-center" id="contact">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="bg-red-400 absolute top-1/3 left-1/4 h-64 w-64 rounded-full opacity-10 blur-3xl" />
        <div className="bg-pink-400 absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Newsletter Section */}
        <div className="glass-effect mb-16 rounded-2xl p-8 md:p-10 bg-white/10 backdrop-blur-lg">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Safe. Stay Ahead with{" "}
                <span className="astra-stroke text-6xl">Astra</span>
              </h3>
              <p className="text-white/80 mb-6">
                Report incidents anonymously and keep your community safe.”
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/20 text-white placeholder-white/80 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="bg-red-400 text-white rounded-lg px-6 py-3 font-medium shadow-lg cursor-pointer hover:shadow-primary/30 transition"
                  onClick={handlesubmit}
                >
                  Get latest Alerts
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-end relative">
              <div className="bg-primary/20 absolute inset-0 rotate-6 rounded-xl" />
              <ImageCarousel className="relative w-120 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
                <SmileIcon />
              </div>
              <span className="text-4xl font-bold">Astra</span>
            </div>
            <p className="text-white/70 mb-6">because your voice matters</p>
            <div className="flex space-x-4">
             
              {socialLinks.map(({ icon: Icon, href }, i) => (
  <a
    key={i}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-red-400/60 transition"
  >
    <Icon className="h-5 w-5 text-white" />
  </a>
))}

     
            </div>
          </div>

          {/* Other Columns */}
        {footerColumns.map((col) => (
  <div key={col.title}>
    <h4 className="mb-4 text-lg font-semibold">{col.title}</h4>
    <ul className="space-y-3">
      {col.links.map((link, idx) => (
        <li key={idx}>
          <a
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="text-white/70 hover:text-red-400 transform transition-transform duration-200 hover:scale-95"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
))}

        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactInfo.map(({ icon: Icon, text, isAddress }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="text-primary h-5 w-5" />
              {isAddress ? (
                <address className="not-italic text-white/80">{text}</address>
              ) : (
                <span className="text-white/80">{text}</span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Legal */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
          <p>© 2025 Astra. All rights reserved.</p>
        
          <div className="flex justify-center items-center text-center py-6">
            <h2 className="text-2xl flex items-center gap-2">
              Made with
              <HeartIcon className="w-6 h-6 text-red-500 fill-red-500" />
              by Kishan
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
