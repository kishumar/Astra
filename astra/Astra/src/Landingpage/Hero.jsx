import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import HeroMorph from "./Text";

export default function Hero() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Words for the flip animation
  const words = ["Cities", "Workplaces", "Campuses"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // change every 2.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10"
      >
        {/* Video option */}
        <video
          src="/Video/newhero.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Fallback image */}
        {/* <img src="/images/Mystery.jpeg" className="w-full h-full object-cover" /> */}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 mt-8 top-10 flex items-center justify-center min-h-[calc(100vh-88px)] px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="max-w-4xl"
        >
          {/* Headline with flipping text */}
        {/* <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-2xl"
          >
            Building <br />
            <span className="text-white">Safer</span> <br />
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: "100%", opacity: 0, rotateX: -90 }}
                animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                exit={{ y: "-100%", opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="inline-block bg-gradient-to-r from-rose-400 via-red-500 to-pink-500 bg-clip-text text-transparent perspective-1000"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </motion.h1> */}
<HeroMorph/>
          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-2xl text-gray-100/90 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Anonymous, AI-powered reporting platform to fight crime, harassment & civic
            issues — bridging citizens and the right authorities.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center relative bottom-6"
          >
            {/* Report Now */}
            <Link to="/submit-report" className="relative inline-block group">
              <img
                src="/images/brush.png"
                alt="brush background"
                className="w-64 sm:w-92 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center px-6 pb-1 
                text-red-600 font-extrabold text-2xl tracking-wide z-10 drop-shadow-md right-4.5">
                Report Now <ArrowRight />
              </span>
            </Link>

            {/* Explore Astra */}
            <ScrollLink
              to={"gallery"}
              smooth={true}
              duration={600}
              offset={-80}
              className="relative inline-block group cursor-pointer"
            >
              <img
                src="/images/brush.png"
                alt="brush background"
                className="w-64 sm:w-92 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center gap-2 px-6 pb-1
                text-red-600 font-extrabold text-2xl tracking-wide z-10 drop-shadow-md right-2.5">
                <Users className="w-6 h-6 -mt-0.5" /> Explore Astra
              </span>
            </ScrollLink>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center gap-2 text-sm text-gray-200/80"
          >
            <Shield size={16} className="text-rose-400" />
            100% Anonymous • Secure • Trusted
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
