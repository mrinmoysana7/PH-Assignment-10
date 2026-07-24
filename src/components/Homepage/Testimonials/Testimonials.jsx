"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";

import ReviewCard from "./ReviewCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials({ reviews = [] }) {
  if (!reviews.length) {
    return (
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-violet-50 via-white to-sky-50" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-violet-200 bg-white p-14 text-center shadow-sm">
            <MessageSquareQuote
              size={48}
              className="mx-auto mb-5 text-violet-500"
            />

            <h2 className="text-3xl font-bold text-slate-900">
              No Reviews Yet
            </h2>

            <p className="mt-4 text-slate-500 leading-8">
              Be the first PromptVerse member to review a premium AI prompt.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-28">
      {/* Background */}

      <div className="absolute inset-0 bg-linear-to-b from-violet-50 via-white to-sky-50" />

      <div className="absolute left-0 top-32 h-72 w-72 rounded-full bg-violet-300/20 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-300/20 blur-[150px]" />

      <div className="absolute left-24 top-1/3 h-24 w-24 rounded-full bg-fuchsia-300/20 blur-[80px]" />

      {/* Pattern */}

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#7c3aed 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Divider */}

        <div className="mx-auto mb-16 h-px w-44 bg-linear-to-r from-transparent via-violet-400 to-transparent" />

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-violet-200
              bg-white
              px-5
              py-2
              text-sm
              font-semibold
              text-violet-700
              shadow-sm
            "
          >
            <MessageSquareQuote size={18} />
            Community Testimonials
          </div>

          {/* Title */}

          <h2
            className="
              mt-7
              text-4xl
              font-black
              tracking-tight
              text-slate-900

              md:text-5xl
            "
          >
            Loved by AI Creators
            <span className="block bg-linear-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Around the World
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-slate-600
            "
          >
            Thousands of creators, recruiters, marketers and developers trust
            PromptVerse to discover, create and share powerful AI prompts every
            day.
          </p>
        </motion.div>

        {/* Navigation */}

        <div className="mt-12 mb-10 flex justify-center gap-4">
          <button
            className="
              testimonial-prev
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-violet-200
              bg-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-violet-600
              hover:text-white
            "
          >
            <ChevronLeft size={20} />
          </button>

          <button
            className="
              testimonial-next
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-violet-200
              bg-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-violet-600
              hover:text-white
            "
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Slider */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
          }}
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
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },

              768: {
                slidesPerView: 2,
              },

              1280: {
                slidesPerView: 3,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id} className="pb-16">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
