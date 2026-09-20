import React from "react";
import { motion } from "framer-motion";
import { Zap, Lock, Star, Clock } from "lucide-react";

function Ticker() {
  const tickerData = [
    { icon: Star, text: "Report Anonymously with Astra" },
    { icon: Zap, text: "Secure • Private • Instant" },
    { icon: Lock, text: "Fully Secure" },
    { icon: Clock, text: "24/7 Anonymous Support" },
  ];

  // Duplicate for seamless loop
  const items = [...tickerData, ...tickerData].map((item, idx) => (
    <div key={idx} className="flex items-center gap-4 whitespace-nowrap">
      <item.icon className="text-pink-500 w-8 h-8" />
      <span className="text-white font-semibold text-xl">{item.text}</span>
    </div>
  ));

  return (
    <div className="relative bg-gray-900 overflow-hidden py-8">
      <motion.div
        className="flex gap-16 min-w-max"
        style={{ whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" }}
      >
        {items}
      </motion.div>
    </div>
  );
}

export default Ticker;
