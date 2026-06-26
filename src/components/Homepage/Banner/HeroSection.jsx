"use client";

import { motion } from "framer-motion";
import HeroSearchBar from "./HeroSearchBar";
import TrendingTags from "./TrendingTags";
import FloatingCard from "./FloatingCard";
import HeroStats from "./HeroStats";
import HeroOrb from "./HeroOrb";
import Link from "next/link";

const particles = [
  { left: "10%", top: "20%" },
  { left: "30%", top: "40%" },
  { left: "50%", top: "15%" },
  { left: "70%", top: "65%" },
  { left: "90%", top: "30%" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-30">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-20 h-150 w-150 -translate-x-1/2 rounded-full bg-violet-400/20 blur-[140px]" />

      {/* Orbital Circles */}
      <div className="absolute left-1/2 top-40 h-225 w-225 -translate-x-1/2 rounded-full border border-violet-100" />

      <div className="absolute left-1/2 top-52 h-175 w-175 -translate-x-1/2 rounded-full border border-blue-100" />

      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute h-2 w-2 rounded-full bg-violet-400"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-4">
        <FloatingCard
          title="Prompt Power"
          description="Create amazing AI prompts."
          icon="⚡"
          className="left-10 top-32"
        />

        <FloatingCard
          title="Automate"
          description="Save hours every day."
          icon="⚙️"
          className="right-10 top-32"
        />

        <FloatingCard
          title="AI Assistant"
          description="Your creative partner."
          icon="🤖"
          className="left-5 bottom-80"
        />

        <FloatingCard
          title="Create"
          description="Turn ideas into content."
          icon="✏️"
          className="right-5 bottom-80"
        />

        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full border border-violet-200 bg-white px-5 py-2 shadow-md"
          >
            <span className="text-sm font-medium text-violet-600">
              ✨ Your Ideas. AI Prompts. Limitless Possibilities.
            </span>
          </motion.div>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
            Unlock the <br />
            True Potential of
            <br />
            <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Generative AI
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-500">
            Discover, create, and share powerful AI prompts. Boost productivity,
            automate workflows and spark creativity.
          </p>

          <HeroSearchBar />

          <TrendingTags />

          <div className="flex gap-5 justify-center">
            <Link href="/prompts">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 rounded-2xl bg-linear-to-r from-violet-600 to-blue-600 px-10 py-4 font-semibold text-white shadow-xl"
            >
              Explore Prompts →
            </motion.button>
          </Link>

          <Link href="/prompts">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 rounded-2xl border border-purple-600 bg-transparent px-10 py-4 font-semibold shadow-xl"
            >
              Become a Creator
            </motion.button>
          </Link>
          </div>

          <p className="mt-4 text-gray-500">
            Join thousands of creators and innovators
          </p>

          <HeroOrb />

          <HeroStats />
        </div>
      </div>
    </section>
  );
}
