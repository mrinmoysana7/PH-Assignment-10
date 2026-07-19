"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Sparkles,
  ShieldCheck,
  Search,
  Users,
  Zap,
  Coins,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: "Discover Premium Prompts",
    description:
      "Explore thousands of carefully crafted AI prompts for ChatGPT, Claude, Gemini, Midjourney and more.",
    icon: Search,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 2,
    title: "Create & Share",
    description:
      "Publish your own prompts, build your audience and showcase your creativity to the AI community.",
    icon: Sparkles,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 3,
    title: "Monetize Your Work",
    description:
      "Sell premium prompts securely and generate passive income from your AI expertise.",
    icon: Coins,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    title: "Secure Platform",
    description:
      "Enterprise-level authentication, role-based permissions and protected transactions.",
    icon: ShieldCheck,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: 5,
    title: "Growing Community",
    description:
      "Connect with creators, discover trending prompts and learn from AI professionals.",
    icon: Users,
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    id: 6,
    title: "Lightning Fast",
    description:
      "Built with Next.js and optimized for exceptional speed, SEO and user experience.",
    icon: Zap,
    gradient: "from-indigo-500 to-violet-600",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

const WhyChoose = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".floatingBlob", {
        y: -30,
        x: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const move = (e) => {
      gsap.to(".floatingBlob", {
        x: (e.clientX - window.innerWidth / 2) / 25,

        y: (e.clientY - window.innerHeight / 2) / 25,

        duration: 1.2,

        overwrite: true,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28 bg-linear-to-b from-white via-violet-50/40 to-white"
    >
      {/* Background Blur Effects */}

      <div
        className="floatingBlob
absolute
left-0
top-24
w-80
h-80
rounded-full
bg-violet-400/20
blur-[150px]
pointer-events-none"
      />

      <div className="floatingBlob absolute right-0 bottom-20 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-[120px]" />

      <div className="container mx-auto px-4">
        {/* Section Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100/70 px-5 py-2 text-sm font-semibold text-violet-700">
            <Sparkles className="h-4 w-4" />
            Why Choose PromptVerse
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
            Everything You Need To
            <span className="bg-linear-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Discover, Create & Monetize
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            PromptVerse empowers creators, developers, marketers and AI
            enthusiasts with a secure marketplace to discover premium prompts,
            publish original ideas and build a thriving AI portfolio.
          </p>
        </motion.div>

        {/* Feature Cards */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  rotateX: 4,
                  rotateY: 4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-xl"
              >
                {/* Gradient Border */}

                <div
                  className={`absolute inset-0 rounded-3xl bg-linear-to-r ${feature.gradient} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-20`}
                />

                {/* Icon */}

                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r ${feature.gradient} text-white shadow-xl`}
                >
                  <Icon className="h-8 w-8" />
                </div>

                <div className="relative mt-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {feature.description}
                  </p>

                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.25 }}
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-violet-600"
                  >
                    Learn More
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </motion.div>
                </div>

                {/* Decorative Glow */}

                <div
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-linear-to-r ${feature.gradient} opacity-10 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mt-24 overflow-hidden rounded-4xl border border-violet-200 bg-linear-to-r from-violet-600 via-fuchsia-600 to-purple-600 p-px"
        >
          <div className="relative overflow-hidden rounded-[30px] bg-white px-8 py-14 md:px-16">
            {/* Background Glow */}

            <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-violet-400/10 blur-[120px]" />

            <div className="absolute right-0 bottom-0 h-60 w-60 rounded-full bg-fuchsia-400/10 blur-[120px]" />

            <div className="relative flex flex-col items-center justify-between gap-10 lg:flex-row">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
                  🚀 Get Started Today
                </span>

                <h3 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">
                  Ready to Unlock the Power of
                  <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    {" "}
                    AI Prompt Engineering?
                  </span>
                </h3>

                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Join thousands of creators discovering, sharing and selling
                  high-quality AI prompts on PromptVerse. Build your portfolio,
                  grow your audience and monetize your creativity.
                </p>
              </div>

              <motion.a
                href="/prompts"
                whileHover={{
                  scale: 1.06,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="group inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                Explore Prompts
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
