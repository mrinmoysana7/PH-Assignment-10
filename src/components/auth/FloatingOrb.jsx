"use client";

import { motion } from "framer-motion";

export default function FloatingOrb({
  size = 220,
  delay = 0,
  duration = 8,
  className = "",
  children,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -18, 0],
        rotate: [0, 8, 0],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      <div
        style={{
          width: size,
          height: size,
        }}
        className="
          relative
          overflow-hidden
          rounded-full
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-linear-to-br
            from-violet-500
            via-purple-500
            to-sky-500
            opacity-90
            blur-[1px]
          "
        />

        {/* Glass Layer */}

        <div
          className="
            absolute
            inset-3
            rounded-full
            border
            border-white/20
            bg-white/10
            backdrop-blur-xl
          "
        />

        {/* Highlight */}

        <div
          className="
            absolute
            left-8
            top-6
            h-12
            w-12
            rounded-full
            bg-white/40
            blur-xl
          "
        />

        {/* Bottom Reflection */}

        <div
          className="
            absolute
            bottom-8
            right-8
            h-20
            w-20
            rounded-full
            bg-sky-200/30
            blur-2xl
          "
        />

        {/* Animated Ring */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-4
            rounded-full
            border
            border-white/20
          "
        />

        {/* Second Ring */}

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-8
            rounded-full
            border
            border-violet-200/30
          "
        />

        {/* Center Content */}

        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
