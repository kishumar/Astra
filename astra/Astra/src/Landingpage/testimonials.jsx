"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ImageCarousel({ autoplay = true, className = '' }) {
  const images = [
    "https://as1.ftcdn.net/jpg/05/59/03/32/1000_F_559033269_eej2SLede1pig6Mri0jCpC82UONIPALT.jpg",
    "https://www.shutterstock.com/image-photo/happy-smiling-group-teenagers-high-600nw-2508547161.jpg",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    "https://static.vecteezy.com/system/resources/thumbnails/034/083/844/small_2x/group-of-casual-business-teamwork-men-and-women-looking-at-camera-with-crossed-arms-in-office-new-generation-of-energetic-entrepreneurs-concept-ai-generative-photo.jpg",
  ];

  const [active, setActive] = useState(0);

  const handleNext = () => setActive((prev) => (prev + 1) % images.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (autoplay && images.length > 0) {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className={`max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20 ${className}`}>
      <div className="relative h-80 w-full">
        <AnimatePresence>
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
              animate={{
                opacity: index === active ? 1 : 0.7,
                scale: index === active ? 1 : 0.95,
                z: index === active ? 0 : -100,
                rotate: index === active ? 0 : randomRotateY(),
                zIndex: index === active ? 10 : 0,
                y: index === active ? [0, -20, 0] : 0,
              }}
              exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover object-center rounded-3xl"
                draggable={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition"
        >
          <ArrowRight className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
