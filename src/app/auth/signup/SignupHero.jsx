"use client";

import { motion } from "framer-motion";
// import { Sparkles, Lightning, Person, StarFill } from "@gravity-ui/icons";

const features = [
  {
    // icon: <Sparkles width={22} />,
    title: "Share AI Prompts",
    description:
      "Publish your best prompts and inspire creators around the world.",
    color: "from-violet-500 to-fuchsia-500",
    bg: "bg-violet-100",
    text: "text-violet-700",
  },
  {
    // icon: <Lightning width={22} />,
    title: "Boost Productivity",
    description:
      "Discover prompts that automate workflows and save valuable time.",
    color: "from-sky-500 to-cyan-500",
    bg: "bg-sky-100",
    text: "text-sky-700",
  },
  {
    // icon: <StarFill width={22} />,
    title: "Explore Creativity",
    description:
      "Unlock powerful AI ideas for writing, coding, design and marketing.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
];

export default function SignupHero() {
  return (
    <section className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-center lg:p-10 xl:p-20 my-15">
      {/* Background Glow */}

      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-300/30 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-300/30 blur-[120px]" />

      {/* Floating Orb */}

      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute right-12 top-16"
      >
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-violet-500 via-purple-500 to-blue-500 shadow-[0_20px_80px_rgba(124,58,237,.35)]">
          {/* <Sparkles width={42} className="text-white" /> */}
        </div>
      </motion.div>

      {/* Badge */}

      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-5 py-2 text-sm font-medium text-violet-700 backdrop-blur-xl">
        ✨ Welcome to PromptVerse
      </span>

      {/* Heading */}

      <h1 className="mt-8 max-w-xl text-6xl font-black leading-tight text-gray-900">
        Create.
        <br />
        Share.
        <br />
        <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Inspire.
        </span>
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
        Join thousands of creators building, sharing and discovering powerful AI
        prompts for coding, writing, marketing, automation and productivity.
      </p>

      {/* Statistics */}

      <div className="mt-10 flex gap-8">
        <div>
          <h3 className="text-3xl font-black text-violet-600">100K+</h3>

          <p className="mt-1 text-gray-500">Prompts Shared</p>
        </div>

        <div>
          <h3 className="text-3xl font-black text-blue-600">50K+</h3>

          <p className="mt-1 text-gray-500">Creators</p>
        </div>

        <div>
          <h3 className="text-3xl font-black text-emerald-600">1M+</h3>

          <p className="mt-1 text-gray-500">Copies</p>
        </div>
      </div>

      {/* Feature Cards */}

      {/* <div className="mt-14 space-y-5">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -4,
            }}
            transition={{
              duration: 0.25,
            }}
            className="flex items-start gap-5 rounded-3xl border border-default-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg}`}
            >
              <div className={feature.text}>{feature.icon}</div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-2 max-w-md leading-7 text-gray-500">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div> */}

      {/* Floating Mini Card */}

      {/* <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute bottom-16 right-16"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-default-200 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-blue-500 text-white">
            
          </div>

          <div>
            <h4 className="font-semibold">Join the Community</h4>

            <p className="text-sm text-gray-500">
              Build your AI portfolio today.
            </p>
          </div>
        </div>
      </motion.div> */}
    </section>
  );
}
