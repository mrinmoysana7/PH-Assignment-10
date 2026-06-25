"use client";

import { motion } from "framer-motion";

export default function FloatingCard({ title, description, icon, className }) {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
      }}
      className={`absolute hidden xl:block ${className}`}
    >
      <div className="w-56 rounded-3xl border border-violet-100 bg-white/80 p-6 backdrop-blur-xl shadow-xl">
        <h4 className="font-semibold text-violet-600">{title}</h4>

        <p className="mt-3 text-sm text-gray-500">{description}</p>

        <div className="mt-4 text-3xl">{icon}</div>
      </div>
    </motion.div>
  );
}
