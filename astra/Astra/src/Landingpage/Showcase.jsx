import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"

function Showcase() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Rotate from 14deg to 0deg as user scrolls through the section
  const rotateX = useTransform(scrollYProgress, [0, 0.75], [15, 0])
  // Opacity from 0.5 to 1
  const opacity = useTransform(scrollYProgress, [0, 0.85], [0.5, 1])

  return (
    <div>
      <div className="w-full bg-black text-white bg-gradient-to-b from-black to-red-400 py-[72px] px-4 md:px-8 lg:px-16 xl:px-24 overflow-x-hidden" ref={containerRef}>
        <h2 className='text-center text-5xl font-bold tracking-tighter'>See <span className='bg-gradient-to-r from-rose-400 via-red-500 to-pink-500 bg-clip-text text-transparent '>Astra</span> in Action</h2>
         <div className="max-w-2xl mx-auto mt-8">
        <p className="text-center text-white/70 text-xl mt-5">
          Experience how Astra enables you to report issues{" "}
          <span className="text-pink-400 font-semibold">
            anonymously, securely, and instantly
          </span>
          . With end-to-end encryption and zero personal tracking, your identity
          always stays protected.
        </p>
      </div>
        <motion.div
          style={{
            opacity:"1",
            rotateX: rotateX,
            transformPerspective: "800px",
          }}
          className="mx-auto shadow-2xl"
        >
          <img
            src="/images/preview.png"
            alt="pixora showcase"
            className="mt-14 rounded-2xl"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Showcase
