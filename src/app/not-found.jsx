"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { Home, Search, ArrowLeft, Sparkles, Bot } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* Background */}

      <div className="absolute inset-0">
        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#7c3aed 1px, transparent 1px),linear-gradient(90deg,#7c3aed 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow */}

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[140px]"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
          className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-[160px]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-20">
        {/* Badge */}

        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-violet-200
            bg-white/70
            px-5
            py-2
            backdrop-blur-xl
            shadow-lg
          "
        >
          <Sparkles size={18} className="text-violet-600" />

          <span className="font-semibold text-violet-700">
            PromptVerse Error
          </span>
        </motion.div>

        {/* 404 */}

        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
          }}
          className="
            mt-10
            bg-gradient-to-r
            from-violet-700
            via-purple-600
            to-blue-600
            bg-clip-text
            text-center
            text-[120px]
            font-black
            leading-none
            text-transparent

            md:text-[180px]
          "
        >
          404
        </motion.h1>

        {/* Illustration */}

        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="
            relative
            mt-4
            flex
            h-40
            w-40
            items-center
            justify-center
            rounded-full
            border
            border-violet-200
            bg-white
            shadow-2xl
          "
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/10 to-blue-500/10" />

          <Bot size={70} className="relative text-violet-600" />
        </motion.div>

        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
            mt-10
            text-center
            text-4xl
            font-black
            text-slate-900
          "
        >
          Prompt Not Found
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.45,
          }}
          className="
            mt-6
            max-w-2xl
            text-center
            text-lg
            leading-9
            text-slate-600
          "
        >
          The AI prompt youre looking for doesnt exist, may have been removed,
          or the link is incorrect. Explore thousands of high-quality prompts
          created by our community.
        </motion.p>
        {/* CTA Buttons */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
          }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/prompts">
            <button
              className="
                inline-flex
                h-12
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                via-purple-600
                to-fuchsia-600
                px-7
                font-semibold
                text-white
                shadow-lg
                shadow-violet-500/30
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <Search size={18} />
              Explore Prompts
            </button>
          </Link>

          <button
            onClick={() => router.back()}
            className="
              inline-flex
              h-12
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-7
              font-semibold
              text-slate-700
              shadow-md
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-violet-300
              hover:text-violet-600
            "
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link href="/">
            <button
              className="
                inline-flex
                h-12
                items-center
                gap-2
                rounded-xl
                border
                border-violet-200
                bg-violet-50
                px-7
                font-semibold
                text-violet-700
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-violet-100
              "
            >
              <Home size={18} />
              Back Home
            </button>
          </Link>
        </motion.div>

        {/* Floating Cards */}

        <div className="relative mt-24 h-72 w-full max-w-6xl">
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [-4, 4, -4],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
            }}
            className="
              absolute
              left-6
              top-8
              w-64
              rounded-2xl
              border
              border-white/60
              bg-white/80
              p-5
              backdrop-blur-xl
              shadow-xl
            "
          >
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
              GPT-4
            </span>

            <h3 className="mt-4 text-lg font-bold">AI Resume Optimizer</h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              Create ATS-friendly resumes with recruiter insights.
            </p>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 18, 0],
              rotate: [4, -4, 4],
            }}
            transition={{
              repeat: Infinity,
              duration: 9,
            }}
            className="
              absolute
              right-8
              top-0
              w-72
              rounded-2xl
              border
              border-white/60
              bg-white/80
              p-5
              backdrop-blur-xl
              shadow-xl
            "
          >
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Midjourney
            </span>

            <h3 className="mt-4 text-lg font-bold">Premium Logo Generator</h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              Generate world-class logo concepts with branding strategy.
            </p>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
            }}
            className="
              absolute
              bottom-0
              left-1/2
              w-72
              -translate-x-1/2
              rounded-2xl
              border
              border-white/60
              bg-white/80
              p-5
              backdrop-blur-xl
              shadow-xl
            "
          >
            <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold text-fuchsia-700">
              Claude
            </span>

            <h3 className="mt-4 text-lg font-bold">Startup Pitch Generator</h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              Build compelling investor-ready startup presentations.
            </p>
          </motion.div>
        </div>

        {/* Footer */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
          className="mt-24 text-center"
        >
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} PromptVerse. Discover. Create. Share AI
            Prompts.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
