"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Home,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-violet-50">
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
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[160px]"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
        className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-[160px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-20">
        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-5 py-2 shadow-lg"
        >
          <Sparkles size={18} className="text-red-500" />

          <span className="font-semibold text-red-600">
            PromptVerse Runtime Error
          </span>
        </motion.div>

        {/* Icon */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.2,
          }}
          className="
            mt-10
            flex
            h-36
            w-36
            items-center
            justify-center
            rounded-full
            border
            border-red-100
            bg-white
            shadow-2xl
          "
        >
          <AlertTriangle size={72} className="text-red-500" />
        </motion.div>

        {/* Title */}

        <motion.h1
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
            text-5xl
            font-black
            text-slate-900
          "
        >
          Something Went Wrong
        </motion.h1>

        {/* Description */}

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
            leading-8
            text-slate-600
          "
        >
          Oops! An unexpected error occurred while loading this page. Dont worry
          — our AI is probably already working on it. Please try again or return
          to the homepage.
        </motion.p>

        {/* Development Error */}

        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mt-8 w-full rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-semibold text-red-600">
              Development Error
            </p>

            <pre className="mt-3 overflow-auto text-sm text-red-700">
              {error.message}
            </pre>
          </div>
        )}

        {/* Action Buttons */}

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
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => reset()}
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
              hover:shadow-violet-500/40
            "
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <button
            onClick={() => window.history.back()}
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
              Home
            </button>
          </Link>
        </motion.div>

        {/* Floating Cards */}

        <div className="relative mt-24 hidden h-64 w-full lg:block">
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
            }}
            className="
              absolute
              left-0
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
              AI Prompt
            </span>

            <h3 className="mt-4 text-lg font-bold">Resume Optimizer</h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              Generate ATS-friendly resumes in seconds.
            </p>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 18, 0],
              rotate: [3, -3, 3],
            }}
            transition={{
              repeat: Infinity,
              duration: 9,
            }}
            className="
              absolute
              right-0
              top-0
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
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              GPT-4
            </span>

            <h3 className="mt-4 text-lg font-bold">Marketing Campaign</h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              Build complete marketing strategies instantly.
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
              Create compelling investor-ready presentations.
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
          className="mt-20 text-center"
        >
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} PromptVerse
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Discover • Create • Share AI Prompts
          </p>
        </motion.div>
      </div>
    </main>
  );
}
