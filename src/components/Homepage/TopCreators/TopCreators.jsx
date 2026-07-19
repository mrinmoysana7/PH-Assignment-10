"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, TrendingUp } from "lucide-react";
import { getTopCreators } from "@/lib/api/users";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const floatingVariants = {
  animate: {
    x: [0, 25, 0],
    y: [0, -20, 0],
    transition: {
      repeat: Infinity,
      duration: 12,
      ease: "easeInOut",
    },
  },
};

const TopCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCreators = async () => {
      try {
        setLoading(true);
        const data = await getTopCreators();
        setCreators(data.creators);
      } catch (error) {
        console.error("Top Creator Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCreators();
  }, []);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-violet-50/40 to-white py-28">
      {/* Background */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-violet-400/10 blur-[130px]"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -right-20 bottom-0 h-md w-md rounded-full bg-fuchsia-400/10 blur-[150px]"
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          {/* Left */}
          <div className="max-w-3xl mx-auto lg:text-left flex flex-col justify-center">
            <motion.div
              variants={itemVariants}
              className="flex justify-center "
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-violet-700 shadow-sm backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                Creator Showcase
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mt-6 text-4xl text-center font-black leading-tight text-gray-900 md:text-5xl lg:text-6xl"
            >
              <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Top Prompt Creators
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-center leading-8 text-gray-600"
            >
              Discover experienced Prompt Engineers who consistently create
              high-quality AI prompts, inspire the community, and help thousands
              of creators unlock better AI results.
            </motion.p>

            {/* Highlights */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-3 justify-center "
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">
                <ShieldCheck className="h-4 w-4 text-violet-600" />
                Verified Creators
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Most Popular
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          key={loading ? "loading" : "loaded"} // <--- MAIN FIX ADDED HERE
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="grid max-w-7xl mx-auto gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {/* Loading State */}
          {loading &&
            [...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="animate-pulse rounded-[30px] border border-violet-100 bg-white/70 p-8 shadow-lg"
              >
                <div className="mx-auto h-24 w-24 rounded-full bg-gray-200" />
                <div className="mx-auto mt-6 h-6 w-40 rounded bg-gray-200" />
                <div className="mx-auto mt-3 h-4 w-28 rounded bg-gray-200" />
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="h-16 rounded-xl bg-gray-200" />
                  <div className="h-16 rounded-xl bg-gray-200" />
                  <div className="h-16 rounded-xl bg-gray-200" />
                </div>
              </motion.div>
            ))}

          {/* Error */}
          {!loading && error && (
            <div className="col-span-full rounded-3xl border border-red-200 bg-red-50 py-14 text-center">
              <h3 className="text-xl font-bold text-red-600">{error}</h3>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && creators.length === 0 && (
            <div className="col-span-full rounded-3xl border border-gray-200 bg-white py-16 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800">
                No Featured Creator Found
              </h3>
              <p className="mt-3 text-gray-500">
                Featured creators will appear here soon.
              </p>
            </div>
          )}

          {/* Dynamic Cards */}
          {!loading &&
            !error &&
            creators.map((creator) => (
              <motion.div
                key={creator._id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-violet-100 bg-white/80 p-8 shadow-lg backdrop-blur-xl transition-all duration-500 hover:shadow-2xl"
              >
                {/* Background Glow */}
                <div className="absolute flex-1 -right-16 -top-16 h-44 w-44 rounded-full bg-linear-to-r from-violet-500/10 to-fuchsia-500/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

                {/* Cover */}
                {/* <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-violet-600 via-purple-500 to-blue-500" /> */}

                {/* Avatar */}
                <div className="relative flex flex-1 justify-center">
                  <div className="relative mt-5">
                    <Image
                      height={112}
                      width={112}
                      src={creator.avatar}
                      alt={creator.name || "Creator avatar"}
                      className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-xl"
                    />
                    {creator.verified && (
                      <div className="absolute bottom-1 right-1 rounded-full bg-violet-600 p-2 text-white shadow-lg">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="mt-8 flex-1 text-center">
                  <h3 className="text-2xl font-black text-gray-900">
                    {creator.name}
                  </h3>
                  <p className="mt-1 text-violet-600">@{creator.username}</p>
                  <p className="mt-4 line-clamp-2 text-sm leading-7 text-gray-600">
                    {creator.bio ||
                      "Professional AI Prompt Engineer helping creators build smarter workflows."}
                  </p>
                </div>

                {/* Rating */}
                <div className="mt-6 flex flex-1 items-center justify-center gap-2">
                  <div className="flex text-yellow-400">★★★★★</div>
                  <span className="font-semibold text-gray-700">
                    {creator.rating || "4.9"}
                  </span>
                </div>

                {/* Stats */}
                <div className="mt-8 flex-1 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-violet-100 bg-violet-50 py-4 text-center">
                    <h4 className="text-xl font-black text-violet-600">
                      {creator.promptCount}
                    </h4>
                    <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                      Prompts
                    </p>
                  </div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 py-4 text-center">
                    <h4 className="text-xl font-black text-blue-600">
                      {creator.copies}
                    </h4>
                    <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                      Copies
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopCreators;
