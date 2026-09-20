import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Form from "./Form";

function SubmitHero() {
  return (
    <section className="relative w-screen h-[100vh]  text-white">
      {/* Animated orbs */}
      <motion.div
        className="absolute top-10 right-10 w-48 h-48 rounded-full z-0 animate-pulse"
        style={{
          background: "radial-gradient(circle, #ff4d6d, transparent)",
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
          background: "radial-gradient(circle, #ff85a2, transparent)",
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
      <div className="relative flex flex-col justify-center items-center text-center px-6 mt-12">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-6 max-w-3xl"
        >
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 px-5 py-2 rounded-full text-sm font-semibold text-white">
            <Shield className="w-5 h-5 animate-pulse" />
            Secure & Anonymous
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Submit Your Report <span className="text-pink-500">Safely</span> &{" "}
            <span className="text-rose-500">Confidentially</span>
          </h1>

          <p className="text-lg text-gray-200">
            Astra provides a fully secure environment to report incidents anonymously. Upload evidence, track progress, and stay protected throughout the process.
          </p>
        </motion.div>
      </div>

      {/* form */}
      <div className="mt-12">
   <Form/>
      </div>
   
    </section>
  );
}

export default SubmitHero;