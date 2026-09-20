import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import TrackReportForm from "./Form";
// import TrackReportForm from "./TrackReportForm";

function TrackHero() {
  return (
    <section className="relative w-screen h-[100vh] text-white ">
      {/* Animated orbs */}
      <motion.div
        className="absolute top-10 right-10 w-48 h-48 rounded-full z-0 animate-pulse"
        style={{
          background: "radial-gradient(circle, #60a5fa, transparent)", // blue
          filter: "blur(80px)",
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-10 left-10 w-56 h-56 rounded-full z-0 animate-pulse"
        style={{
          background: "radial-gradient(circle, #3b82f6, transparent)", // deeper blue
          filter: "blur(100px)",
        }}
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Centered content */}
      <div className="relative flex flex-col justify-center items-center text-center px-6 top-16">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-6 max-w-3xl"
        >
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 px-5 py-2 rounded-full text-sm font-semibold text-white">
            <Search className="w-5 h-5 animate-pulse" />
            Fast & Transparent Tracking
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Track Your <span className="text-sky-400">Report</span> with{" "}
            <span className="text-indigo-400">Ease & Confidence</span>
          </h1>

          <p className="text-lg text-gray-200">
            Enter your Report ID to check the live status of your submission. 
            Astra ensures transparency and timely updates so you stay informed at every step.
          </p>
        </motion.div>
      </div>

      {/* form */}
      <div className="mt-28">
     <TrackReportForm/>
      </div>
    </section>
  );
}

export default TrackHero;
