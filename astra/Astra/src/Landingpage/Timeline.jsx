import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

const steps = [
  {
    id: 1,
    title: "Report Without Revealing Identity",
    subtitle: "Submit your report securely—no personal details required.",
    image: "/images/report.jpeg",
  },
  {
    id: 2,
    title: "Real-Time Report Tracking",
    subtitle: "Get live, anonymous updates as your case progresses.",
    image: "/images/tracking.jpeg",
  },
  {
    id: 3,
    title: "Resolution & Feedback",
    subtitle: "Receive outcomes and share feedback—still fully anonymous.",
    image: "/images/check.jpeg",
  },
];


const pastelColors = [
  "bg-gradient-to-br from-pink-50 to-pink-100",
  "bg-gradient-to-br from-blue-50 to-blue-100",
  "bg-gradient-to-br from-green-50 to-green-100",
  "bg-gradient-to-br from-purple-50 to-purple-100",
];

function StepCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative max-w-sm w-full rounded-3xl p-8
                 bg-white/10 backdrop-blur-xl
                 border border-white/20
                 shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                 hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)]
                 transform transition-all duration-500 flex flex-col items-center text-center z-10"
    >
      {/* Step Number Badge */}
      <span
        className="absolute -top-3 -right-3 text-sm font-extrabold
                   bg-white/30 backdrop-blur-md text-white
                   px-3 py-1 rounded-full border border-white/20
                   shadow-md"
      >
        Step {step.id}
      </span>

      {/* Image */}
      <div className="w-full h-44 md:h-56 rounded-2xl overflow-hidden shadow-lg mb-6 border border-white/20">
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Title & Subtitle */}
      <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug drop-shadow-md">
        {step.title}
      </h3>
      <p className="mt-3 text-base md:text-lg text-gray-200">
        {step.subtitle}
      </p>

      {/* Bottom gradient bar */}
      <div className="mt-8 h-1.5 w-28 rounded-full 
                      bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-90" />
    </motion.div>
  );
}

// Curved Underline SVG Component


function CurvedUnderline() {
  const ref = useRef(null);
  const controls = useAnimation();

  // Trigger animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 }
  };

  return (
    <svg
      ref={ref}
      width="340"
      height="50"
      viewBox="0 0 340 50"
      className="mx-auto mt-2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="astraBrushGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="35%" stopColor="#f97316" />
          <stop offset="70%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>

        <filter id="brushTexture" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8 0.3" numOctaves="4" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
          <feGaussianBlur in="displaced" stdDeviation="1" result="blurred"/>
          <feMerge>
            <feMergeNode in="blurred"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="glowBrush" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <motion.path
        d="M10 35 A160 25 0 0 1 330 35"
        stroke="url(#astraBrushGradient)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        filter="url(#glowBrush)"
        opacity="0.35"
        variants={pathVariants}
        initial="hidden"
        animate={controls}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Main brush stroke */}
      <motion.path
        d="M10 35 A160 25 0 0 1 330 35"
        stroke="url(#astraBrushGradient)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        filter="url(#brushTexture)"
        variants={pathVariants}
        initial="hidden"
        animate={controls}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      {/* Highlight stroke */}
      <motion.path
        d="M15 33 A155 22 0 0 1 325 33"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate={controls}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
      />
    </svg>
  );
}


export default function Timeline() {
  return (
    <div id="how-it-works" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      <img
        src="/images/bg3.jpeg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* 🔲 Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 📝 Actual content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 text-center drop-shadow-lg">
          How it Works?
        </h1>
        
        {/* Curved Underline */}
        <CurvedUnderline />

       <div className="flex flex-col items-center gap-20 md:flex-row md:justify-center md:gap-12 mt-12">
  {steps.map((step, i) => (
    <React.Fragment key={step.id}>
      <StepCard step={step} index={i} />
    
    </React.Fragment>
  ))}
</div>

      </div>
    </div>
  );
}