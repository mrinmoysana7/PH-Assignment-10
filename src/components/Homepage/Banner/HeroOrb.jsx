"use client";

import { motion } from "framer-motion";

export default function HeroOrb() {
  return (
    <div className="relative mt-20 flex justify-center">
      <div className="absolute h-100 w-100 rounded-full border border-violet-200" />

      <div className="absolute h-100 w-45 rotate-45 rounded-full border border-violet-200" />

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotateY: [0, 15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="relative flex h-48 w-48 items-center justify-center rounded-[40px] border border-violet-100 bg-white text-6xl shadow-[0_20px_80px_rgba(139,92,246,.25)]"
      >
        {" >_ "}
      </motion.div>
    </div>
  );
}
