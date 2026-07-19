"use client";

import Link from "next/link";
import { Sparkles, TrendingUp, Stars } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowRight } from "@gravity-ui/icons";
import PromptCard from "@/components/ui/PromptCard";

export default function FeaturedPrompts({ prompts }) {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const floatingBadge = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-10">
      {/* Background */}

      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-violet-200/30 blur-[120px]" />

      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-sky-200/30 blur-[120px]" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="relative mb-20 overflow-hidden rounded-4xl border border-violet-100/70 bg-linear-to-br from-white via-violet-50/40 to-white px-6 py-10 shadow-sm md:px-10 lg:px-14 lg:py-14"
        >
          {/* Background Blur */}

          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-400/10 blur-[120px]"
          />

          <motion.div
            animate={{
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-[130px]"
          />

          <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}

            <div className="max-w-3xl">
              {/* Badge */}

              <motion.div variants={floatingBadge}>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-violet-700 shadow-sm backdrop-blur-xl">
                  <Sparkles className="h-4 w-4" />
                  Featured Collection
                </span>
              </motion.div>

              {/* Heading */}

              <motion.h2
                variants={fadeUp}
                className="mt-7  font-black leading-tight text-gray-900 text-3xl sm:text-3xl md:text-4xl lg:text-6xl"
              >
                Discover
                <br className="hidden sm:block" />
                <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Handpicked AI Prompts
                </span>
              </motion.h2>

              {/* Description */}

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-2xl leading-6 text-gray-600 text-sm sm:text-lg"
              >
                Explore a carefully curated collection of premium AI prompts
                created by experienced Prompt Engineers. From content creation
                and programming to marketing, design and automation, discover
                prompts that save time and unlock your full creative potential.
              </motion.p>

              {/* Small Highlights */}

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-3"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                  <TrendingUp className="h-4 w-4 text-violet-600" />
                  Trending Prompts
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                  <Stars className="h-4 w-4 text-amber-500" />
                  Curated by Experts
                </div>
              </motion.div>
            </div>
            {/* Right Content */}

            <motion.div
              variants={fadeUp}
              className="flex w-full flex-col items-start gap-6 lg:w-auto lg:items-end"
            >
              {/* Premium Stats Card */}

              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                }}
                className="relative overflow-hidden rounded-3xl border border-violet-100 bg-white/80 p-6 shadow-xl backdrop-blur-xl"
              >
                {/* Glow */}

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative grid grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="text-3xl font-black text-violet-600">
                      500+
                    </h3>

                    <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                      Prompts
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-black text-fuchsia-600">
                      120+
                    </h3>

                    <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                      Creators
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-black text-blue-600">25K+</h3>

                    <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                      Downloads
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}

              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <Link
                  href="/prompts"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  Explore All Prompts
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </motion.div>

              {/* Rating */}

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <div className="flex text-yellow-400">★★★★★</div>

                <span>Trusted by thousands of AI creators</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        {/* Grid */}.
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {prompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>
      </div>
    </section>
  );
}
