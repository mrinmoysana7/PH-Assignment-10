"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft, Terminal } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F1117] p-4">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-[#0F1117] to-[#0F1117]"></div>

      {/* Decorative Grid Lines (Optional Sci-Fi effect) */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-bg-size-[24px_24px]"></div>

      {/* Main Glassmorphism Container */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-black/40 p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl sm:p-12">
        {/* Animated Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Outer pulse ring */}
            <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/20"></div>
            <ShieldAlert className="relative z-10 h-24 w-24 animate-pulse text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="font-mono text-4xl font-black tracking-widest text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 sm:text-5xl">
            RESTRICTED
          </h1>

          {/* Neon Divider */}
          <div className="my-6 h-px w-full bg-linear-to-r from-transparent via-cyan-500/50 to-transparent"></div>

          <p className="mb-2 font-mono text-lg text-cyan-300">
            ERROR 401: Access Denied
          </p>

          <p className="mb-10 font-mono text-sm leading-relaxed text-gray-400">
            Security clearance insufficient. Your current identity matrix does
            not possess the required authorization to access this sector of the
            hireLoop network.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Return to Base
          </Link>

          <Link
            href="/auth/signin"
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/50 bg-transparent px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-cyan-400 transition-all duration-300 hover:bg-cyan-950/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Terminal className="h-4 w-4" />
            Authenticate
          </Link>
        </div>
      </div>
    </div>
  );
}
