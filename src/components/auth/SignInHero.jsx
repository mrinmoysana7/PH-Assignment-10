"use client";

import { motion } from "framer-motion";
import { Sparkles, Code, Rocket, Pencil } from "@gravity-ui/icons";

import FloatingOrb from "./FloatingOrb";

const features = [
  {
    icon: <Code width={20} />,
    title: "Code Faster",
    description: "Generate production-ready prompts for developers.",
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
  {
    icon: <Pencil width={20} />,
    title: "Write Better",
    description: "Create amazing content with AI-powered prompts.",
    color: "text-sky-600",
    bg: "bg-sky-100",
  },
  
];

export default function SignInHero() {
  return (
    <section className="relative hidden lg:flex flex-col justify-center">
      {/* Floating Decorations */}

      <FloatingOrb size={260} duration={8} className="absolute right-8 top-8">
        <Sparkles width={72} className="text-white" />
      </FloatingOrb>

      <FloatingOrb
        size={90}
        delay={1}
        duration={6}
        className="absolute bottom-20 right-64 opacity-60"
      />

      {/* Badge */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-5 py-2 backdrop-blur-xl shadow"
      >
        <Sparkles width={16} className="text-violet-600" />

        <span className="text-sm font-semibold text-violet-700">
          Welcome Back
        </span>
      </motion.div>

      {/* Heading */}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-xl text-6xl font-black leading-tight text-gray-900"
      >
        Continue your
        <br />
        <span className="bg-linear-to-r from-violet-600 via-purple-500 to-sky-500 bg-clip-text text-transparent">
          AI Journey
        </span>
      </motion.h1>

      {/* Description */}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-8 max-w-xl text-lg leading-8 text-gray-600"
      >
        Access thousands of carefully crafted AI prompts, discover new
        workflows, and supercharge your creativity with PromptVerse.
      </motion.p>

      {/* Stats */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex gap-10"
      >
        <div>
          <h2 className="text-3xl font-black text-violet-600">50K+</h2>

          <p className="mt-2 text-sm text-gray-500">AI Creators</p>
        </div>

        <div>
          <h2 className="text-3xl font-black text-sky-600">120K+</h2>

          <p className="mt-2 text-sm text-gray-500">Prompts Shared</p>
        </div>

        <div>
          <h2 className="text-3xl font-black text-emerald-600">1.5M+</h2>

          <p className="mt-2 text-sm text-gray-500">Prompt Copies</p>
        </div>
      </motion.div>

      {/* Feature Cards */}

      <div className="mt-14 space-y-5">
        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -5,
            }}
            className="flex items-start gap-5 rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur-xl"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
            >
              <div className={item.color}>{item.icon}</div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>

              <p className="mt-2 text-gray-500 leading-7">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
