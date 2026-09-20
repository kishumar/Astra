import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroMorph() {
  const words = ["Cities", "Workplaces", "Campuses"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-2xl">
      Building <br />
      <span className="text-white">Safer</span> <br />
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="inline-block bg-gradient-to-r from-rose-400 via-red-500 to-pink-500 bg-clip-text text-transparent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}
