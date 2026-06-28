"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const particles = [
    {
      left: "8%",
      top: "18%",
      size: 8,
      color: "bg-violet-400/40",
      duration: 6,
    },
    {
      left: "20%",
      top: "65%",
      size: 6,
      color: "bg-sky-400/40",
      duration: 8,
    },
    {
      left: "35%",
      top: "30%",
      size: 10,
      color: "bg-fuchsia-400/40",
      duration: 7,
    },
    {
      left: "52%",
      top: "80%",
      size: 7,
      color: "bg-violet-400/40",
      duration: 9,
    },
    {
      left: "68%",
      top: "42%",
      size: 9,
      color: "bg-sky-400/40",
      duration: 6,
    },
    {
      left: "82%",
      top: "22%",
      size: 8,
      color: "bg-violet-400/40",
      duration: 8,
    },
    {
      left: "92%",
      top: "68%",
      size: 7,
      color: "bg-indigo-400/40",
      duration: 7,
    },
  ];

  return (
    // <div className="absolute inset-0 overflow-hidden">
    //   {/* Background Gradient */}
    //   <div className="absolute inset-0 bg-linear-to-br from-violet-50 via-white to-sky-50" />

    //   {/* Top Left Glow */}
    //   <motion.div
    //     animate={{
    //       x: [-20, 20, -20],
    //       y: [-10, 20, -10],
    //       scale: [1, 1.15, 1],
    //     }}
    //     transition={{
    //       duration: 14,
    //       repeat: Infinity,
    //       ease: "easeInOut",
    //     }}
    //     className="
    //       absolute
    //       -top-32
    //       -left-32
    //       h-[420px]
    //       w-[420px]
    //       rounded-full
    //       bg-violet-400/30
    //       blur-[120px]
    //     "
    //   />

    //   {/* Top Right Glow */}
    //   <motion.div
    //     animate={{
    //       x: [30, -20, 30],
    //       y: [0, 30, 0],
    //       scale: [1, 1.2, 1],
    //     }}
    //     transition={{
    //       duration: 18,
    //       repeat: Infinity,
    //       ease: "easeInOut",
    //     }}
    //     className="
    //       absolute
    //       -top-20
    //       -right-24
    //       h-[360px]
    //       w-[360px]
    //       rounded-full
    //       bg-sky-400/30
    //       blur-[110px]
    //     "
    //   />

    //   {/* Bottom Left Glow */}
    //   <motion.div
    //     animate={{
    //       x: [-10, 25, -10],
    //       y: [0, -30, 0],
    //       scale: [1, 1.15, 1],
    //     }}
    //     transition={{
    //       duration: 20,
    //       repeat: Infinity,
    //       ease: "easeInOut",
    //     }}
    //     className="
    //       absolute
    //       -bottom-28
    //       -left-24
    //       h-[340px]
    //       w-[340px]
    //       rounded-full
    //       bg-purple-300/30
    //       blur-[120px]
    //     "
    //   />

    //   {/* Bottom Right Glow */}
    //   <motion.div
    //     animate={{
    //       x: [20, -20, 20],
    //       y: [15, -15, 15],
    //       scale: [1, 1.1, 1],
    //     }}
    //     transition={{
    //       duration: 16,
    //       repeat: Infinity,
    //       ease: "easeInOut",
    //     }}
    //     className="
    //       absolute
    //       -bottom-24
    //       -right-24
    //       h-[300px]
    //       w-[300px]
    //       rounded-full
    //       bg-indigo-300/30
    //       blur-[120px]
    //     "
    //   />

    //   {/* Center Glow */}
    //   <motion.div
    //     animate={{
    //       opacity: [0.25, 0.5, 0.25],
    //       scale: [1, 1.1, 1],
    //     }}
    //     transition={{
    //       duration: 10,
    //       repeat: Infinity,
    //       ease: "easeInOut",
    //     }}
    //     className="
    //       absolute
    //       left-1/2
    //       top-1/2
    //       h-[500px]
    //       w-[500px]
    //       -translate-x-1/2
    //       -translate-y-1/2
    //       rounded-full
    //       bg-violet-300/20
    //       blur-[150px]
    //     "
    //   />

    //   {/* Decorative Grid */}
    //   <div className="absolute left-10 top-24 opacity-20">
    //     <div className="grid grid-cols-5 gap-4">
    //       {[...Array(25)].map((_, index) => (
    //         <span
    //           key={index}
    //           className="h-1.5 w-1.5 rounded-full bg-violet-500"
    //         />
    //       ))}
    //     </div>
    //   </div>

    //   {/* Decorative Grid */}
    //   <div className="absolute right-16 bottom-20 opacity-20">
    //     <div className="grid grid-cols-5 gap-4">
    //       {[...Array(25)].map((_, index) => (
    //         <span key={index} className="h-1.5 w-1.5 rounded-full bg-sky-500" />
    //       ))}
    //     </div>
    //   </div>

    //   {/* Floating Small Orbs */}
    //   {[...Array(8)].map((_, index) => (
    //     <motion.div
    //       key={index}
    //       animate={{
    //         y: [0, -25, 0],
    //         opacity: [0.4, 1, 0.4],
    //       }}
    //       transition={{
    //         duration: 5 + index,
    //         repeat: Infinity,
    //         ease: "easeInOut",
    //       }}
    //       className="absolute"
    //       style={{
    //         left: `${10 + index * 11}%`,
    //         top: `${15 + (index % 4) * 20}%`,
    //       }}
    //     >
    //       <div
    //         className={`
    //           rounded-full
    //           blur-sm

    //           ${index % 2 === 0 ? "bg-violet-400/40" : "bg-sky-400/40"}

    //           ${index % 3 === 0 ? "h-5 w-5" : "h-3 w-3"}
    //         `}
    //       />
    //     </motion.div>
    //   ))}
    // </div>
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Background */}

      <div className="absolute inset-0 bg-linear-to-br from-violet-50 via-white to-sky-50" />

      {/* Mesh Gradient */}

      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
        absolute
        left-1/2
        top-1/2
        h-225
        w-225
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-[radial-gradient(circle_at_center,#8b5cf620,transparent_65%)]
        blur-[120px]
      "
      />

      {/* Noise Layer */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[radial-gradient(#000_1px,transparent_1px)]
        bg-size-[18px_18px]
      "
      />

      {/* Animated Light */}

      <motion.div
        animate={{
          x: [-150, 150, -150],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        left-0
        top-0
        h-full
        w-125
        bg-linear-to-r
        from-transparent
        via-white/40
        to-transparent
        blur-[100px]
      "
      />

      <motion.div
        animate={{
          x: [-30, 30, -30],
          y: [-20, 20, -20],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
    absolute
    -left-40
    -top-40
    h-130
    w-130
    rounded-full
    bg-violet-400/35
    blur-[160px]
  "
      />

      <motion.div
        animate={{
          x: [30, -30, 30],
          y: [0, 40, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
    absolute
    -right-32
    -top-20
    h-105
    w-105
    rounded-full
    bg-sky-400/30
    blur-[160px]
  "
      />

      <motion.div
        animate={{
          x: [-20, 30, -20],
          y: [20, -20, 20],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
    absolute
    -bottom-36
    -left-24
    h-105
    w-105
    rounded-full
    bg-fuchsia-300/30
    blur-[150px]
  "
      />

      <motion.div
        animate={{
          x: [20, -30, 20],
          y: [20, -20, 20],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
    absolute
    -bottom-24
    -right-24
    h-95
    w-95
    rounded-full
    bg-indigo-300/35
    blur-[150px]
  "
      />

      {/* Center Glow */}
      <motion.div
        animate={{
          opacity: [0.25, 0.55, 0.25],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
    absolute
    left-1/2
    top-1/2
    h-162.5
    w-162.5
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    bg-violet-300/20
    blur-[180px]
  "
      />

      {/* Left Decorative Grid */}

      <div className="absolute left-12 top-24 opacity-25">
        <div className="grid grid-cols-6 gap-3">
          {[...Array(36)].map((_, index) => (
            <motion.span
              key={index}
              animate={{
                opacity: [0.25, 1, 0.25],
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 2.5,
                delay: index * 0.04,
                repeat: Infinity,
              }}
              className="h-1.5 w-1.5 rounded-full bg-violet-500"
            />
          ))}
        </div>
      </div>

      {/* Right Decorative Grid */}

      <div className="absolute bottom-24 right-14 opacity-25">
        <div className="grid grid-cols-6 gap-3">
          {[...Array(36)].map((_, index) => (
            <motion.span
              key={index}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                delay: index * 0.03,
                repeat: Infinity,
              }}
              className="h-1.5 w-1.5 rounded-full bg-sky-500"
            />
          ))}
        </div>
      </div>

      {/* Floating AI Particles */}

      {particles.map((particle, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.35, 1, 0.35],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            left: particle.left,
            top: particle.top,
          }}
        >
          <div
            style={{
              width: particle.size,
              height: particle.size,
            }}
            className={`
        rounded-full
        blur-sm
        ${particle.color}
      `}
          />
        </motion.div>
      ))}

      {/* Floating Glass Dots */}

      {[...Array(12)].map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 5 + (index % 4),
            repeat: Infinity,
            delay: index * 0.3,
          }}
          className="absolute rounded-full border border-white/50 bg-white/20 backdrop-blur-xl"
          style={{
            width: 6,
            height: 6,
            left: `${8 + index * 7}%`,
            top: `${10 + (index % 5) * 16}%`,
          }}
        />
      ))}

      {/* Vertical Light Beam */}

      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scaleY: [1, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
    absolute
    left-1/2
    top-0
    h-full
    w-px
    -translate-x-1/2
    bg-linear-to-b
    from-transparent
    via-violet-300/60
    to-transparent
  "
      />

      {/* Horizontal Light Beam */}

      <motion.div
        animate={{
          opacity: [0.08, 0.25, 0.08],
          scaleX: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
    absolute
    left-0
    top-1/2
    h-px
    w-full
    -translate-y-1/2
    bg-linear-to-r
    from-transparent
    via-sky-300/60
    to-transparent
  "
      />

      {/* Floating Ambient Glow */}

      <motion.div
        animate={{
          y: [-25, 20, -25],
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
    absolute
    right-24
    top-40
    h-56
    w-56
    rounded-full
    bg-violet-300/30
    blur-[120px]
  "
      />

      <motion.div
        animate={{
          y: [20, -20, 20],
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
    absolute
    bottom-28
    left-32
    h-44
    w-44
    rounded-full
    bg-sky-300/30
    blur-[100px]
  "
      />

      {/* Gradient Rings */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
    absolute
    left-1/2
    top-1/2
    h-175
    w-175
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    border
    border-violet-200/30
  "
      />

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
    absolute
    left-1/2
    top-1/2
    h-130
    w-130
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    border
    border-sky-200/30
  "
      />

      {/* Vignette */}

      <div
        className="
    absolute
    inset-0
    bg-[radial-gradient(circle,transparent_60%,rgba(255,255,255,.55))]
  "
      />
    </div>
  );
}
