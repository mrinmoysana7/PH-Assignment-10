"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const models = [
  { name: "GPT-4", angle: 0 },
  { name: "Claude", angle: 72 },
  { name: "Gemini", angle: 144 },
  { name: "Llama", angle: 216 },
  { name: "Mistral", angle: 288 },
];

const particles = [
  { x: 20, y: 30, scale: 0.8 }, { x: 75, y: 15, scale: 1.2 },
  { x: 85, y: 70, scale: 0.9 }, { x: 15, y: 80, scale: 1.1 },
  { x: 50, y: 10, scale: 0.7 }, { x: 90, y: 45, scale: 1.3 },
  { x: 45, y: 85, scale: 0.8 }, { x: 10, y: 50, scale: 1 },
  { x: 30, y: 65, scale: 1.4 }, { x: 70, y: 85, scale: 0.9 },
  { x: 80, y: 30, scale: 1.1 }, { x: 25, y: 15, scale: 0.8 },
];

export default function BannerLoading() {
  const [progress, setProgress] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);

  // Enforce precise 3-second minimum loading lock on home page mount
  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const totalSteps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.floor((currentStep / totalSteps) * 100));
      setProgress(currentProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => setIsInitializing(false), 200); // Smooth exit delay
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isInitializing && (
        <motion.section
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative flex w-full items-center justify-center overflow-hidden bg-[#030014] min-h-screen mt-17 px-4"
        >
          {/* Deep Space Radial Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-[#030014] to-[#030014]" />

          {/* Animated Background Grid */}
          <motion.div
            animate={{ backgroundPosition: ["0px 0px", "45px 45px"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

          {/* Ambient Glow Orbs */}
          <div className="absolute left-1/4 top-1/4 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[130px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-600/10 blur-[130px]" />

          {/* Main Content Wrapper with Navbar Safe Padding Offset */}
          <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto pt-6">
            
            {/* Orbital Loader System */}
            <div className="relative flex h-[380px] w-[380px] sm:h-[440px] sm:w-[440px] items-center justify-center">
              
              {/* Outer Orbital Ring (Models) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute h-[320px] w-[320px] sm:h-[370px] sm:w-[370px] rounded-full border border-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.1)_inset]"
              >
                {models.map((model) => (
                  <div
                    key={model.name}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${model.angle}deg) translateY(-185px)`,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                      className="
                        -translate-x-1/2 
                        -translate-y-1/2 
                        rounded-full 
                        border border-violet-400/30 
                        bg-slate-950/80 
                        px-4 py-1.5 
                        text-[11px] sm:text-xs font-semibold tracking-wider text-violet-100 
                        shadow-[0_0_15px_rgba(139,92,246,0.3)]
                        backdrop-blur-xl
                      "
                    >
                      {model.name}
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* Middle Dashed Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute h-[240px] w-[240px] sm:h-[280px] sm:w-[280px] rounded-full border-[1.5px] border-dashed border-cyan-400/30"
              />

              {/* Inner Solid Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute h-[170px] w-[170px] sm:h-[200px] sm:w-[200px] rounded-full border border-fuchsia-500/20 shadow-[0_0_30px_rgba(217,70,239,0.1)_inset]"
              />

              {/* Floating Ambient Particles */}
              {particles.map((particle, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -25, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [particle.scale, particle.scale * 1.4, particle.scale],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + index % 3,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                  className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    boxShadow: "0 0 10px rgba(103, 232, 249, 0.8)",
                  }}
                />
              ))}

              {/* Central AI Core */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 30px rgba(139,92,246,0.4)",
                    "0 0 80px rgba(139,92,246,0.8)",
                    "0 0 30px rgba(139,92,246,0.4)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="
                  relative flex h-32 w-32 sm:h-36 sm:w-36 
                  items-center justify-center 
                  rounded-full border border-white/20 
                  bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600
                "
              >
                <motion.div
                  animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md"
                />
                
                <div className="relative z-10 flex flex-col items-center">
                  <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-2xl sm:text-3xl font-black tracking-tighter text-transparent">
                    AI
                  </span>
                  <span className="mt-0.5 text-[8px] sm:text-[9px] uppercase tracking-[0.4em] text-white/70">
                    Core
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Typography & Loading Track Section */}
            <div className="mt-6 sm:mt-8 flex w-full flex-col items-center">
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
              >
                <motion.h1 
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                  className="bg-[linear-gradient(to_right,#a78bfa,#e879f9,#22d3ee,#e879f9,#a78bfa)] bg-[length:200%_auto] bg-clip-text text-3xl sm:text-4xl font-black tracking-tight text-transparent"
                >
                  PromptVerse
                </motion.h1>
                <p className="mt-2 text-xs sm:text-sm font-medium tracking-wide text-slate-400">
                  Synthesizing intelligence protocols...
                </p>
              </motion.div>

              {/* Progress Bar Container */}
              <div className="mt-6 w-full max-w-sm px-4">
                <div className="mb-2 flex justify-between text-xs font-semibold tracking-wider text-slate-400">
                  <span className="uppercase text-[10px]">Loading Core</span>
                  <span className="text-cyan-400">{progress}%</span>
                </div>

                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-800/50 shadow-inner backdrop-blur-sm">
                  <motion.div
                    style={{ width: `${progress}%` }}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400"
                  >
                    <div className="absolute inset-y-0 right-0 w-6 translate-x-1/2 bg-white/40 blur-[4px]" />
                  </motion.div>
                </div>
              </div>

              {/* Status Indicator Chip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 flex items-center gap-2.5 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 shadow-lg backdrop-blur-2xl"
              >
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute h-full w-full rounded-full bg-emerald-400"
                  />
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
                <p className="text-[11px] sm:text-xs font-medium text-slate-300">
                  Establishing secure connection
                </p>
              </motion.div>

            </div>

          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}