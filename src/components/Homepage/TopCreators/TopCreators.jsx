"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Dummy API call for demonstration - replace with your actual import
import { getTopCreators } from "@/lib/api/users";

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
      {/* Background Orbs */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-violet-400/10 blur-[130px]"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-fuchsia-400/10 blur-[150px]"
      />

      <div className="container mx-auto max-w-7xl px-4 lg:px-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-violet-700 shadow-sm backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Creator Showcase
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-6 text-4xl font-black leading-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Top Prompt Creators
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600"
          >
            Discover experienced Prompt Engineers who consistently create
            high-quality AI prompts, inspire the community, and help thousands
            of creators unlock better AI results.
          </motion.p>

          {/* Highlights */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center gap-3"
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
        </motion.div>

        {/* Custom Swiper Navigation */}
        {!loading && !error && creators.length > 0 && (
          <div className="mt-12 mb-10 flex justify-center gap-4">
            <button className="creator-prev flex h-12 w-12 items-center justify-center rounded-full border border-violet-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-violet-600 hover:text-white relative z-10">
              <ChevronLeft size={20} />
            </button>
            <button className="creator-next flex h-12 w-12 items-center justify-center rounded-full border border-violet-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-violet-600 hover:text-white relative z-10">
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="mt-8">
          {/* Loading State (Grid) */}
          {loading && (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-[30px] border border-violet-100 bg-white/70 p-8 shadow-lg"
                >
                  <div className="mx-auto h-24 w-24 rounded-full bg-gray-200" />
                  <div className="mx-auto mt-6 h-6 w-40 rounded bg-gray-200" />
                  <div className="mx-auto mt-3 h-4 w-28 rounded bg-gray-200" />
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="h-16 rounded-xl bg-gray-200" />
                    <div className="h-16 rounded-xl bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 py-14 text-center">
              <h3 className="text-xl font-bold text-red-600">{error}</h3>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && creators.length === 0 && (
            <div className="rounded-3xl border border-gray-200 bg-white py-16 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800">
                No Featured Creator Found
              </h3>
              <p className="mt-3 text-gray-500">
                Featured creators will appear here soon.
              </p>
            </div>
          )}

          {/* Swiper Carousel for Creators */}
          {!loading && !error && creators.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                loop
                grabCursor
                spaceBetween={30}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{
                  prevEl: ".creator-prev",
                  nextEl: ".creator-next",
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1280: { slidesPerView: 3 },
                }}
                className="pb-16"
              >
                {creators.map((creator, index) => (
                  <SwiperSlide key={creator.id || index} className="h-auto">
                    <motion.article
                      whileHover={{ y: -8, scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                      className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/60 bg-white/80 p-6 backdrop-blur-xl shadow-xl shadow-slate-200/40 transition-all duration-500 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/20"
                    >
                      {/* Background Glow */}
                      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-linear-to-r from-violet-500/10 to-fuchsia-500/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

                      {/* Avatar */}
                      <div className="relative flex justify-center mt-2">
                        <div className="relative">
                          <Image
                            height={96}
                            width={96}
                            src={creator.avatar || "https://i.pravatar.cc/150"}
                            alt={creator.name}
                            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md transition-all duration-500 group-hover:ring-4 group-hover:ring-violet-100"
                          />
                          {creator.verified && (
                            <div className="absolute bottom-0 right-0 rounded-full bg-violet-600 p-1.5 text-white shadow-lg">
                              <ShieldCheck className="h-3.5 w-3.5" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info & Bio */}
                      <div className="mt-5 flex flex-col flex-1 text-center">
                        <h3 className="text-xl font-bold text-gray-900">
                          {creator.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-violet-600">
                          @{creator.username}
                        </p>
                        <p className="mt-4 flex-1 line-clamp-3 text-sm leading-relaxed text-slate-600">
                          {creator.bio ||
                            "Professional AI Prompt Engineer helping creators build smarter workflows."}
                        </p>
                      </div>

                      {/* Stats Section pushed to bottom */}
                      <div className="relative z-10 mt-auto pt-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col items-center justify-center rounded-2xl border border-violet-100 bg-violet-50/50 py-3 transition-colors group-hover:bg-violet-100/50">
                            <h4 className="text-lg font-black text-violet-700">
                              {creator.promptCount || 0}
                            </h4>
                            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-500">
                              Prompts
                            </p>
                          </div>
                          <div className="flex flex-col items-center justify-center rounded-2xl border border-sky-100 bg-sky-50/50 py-3 transition-colors group-hover:bg-sky-100/50">
                            <h4 className="text-lg font-black text-sky-700">
                              {creator.copies || 0}
                            </h4>
                            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-500">
                              Copies
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopCreators;
