"use client";

import Image from "next/image";
import { Crown, FileText, Mail, ShieldCheck } from "lucide-react";
import ProfileStatsCard from "./ProfileStatsCard";
import PremiumBanner from "./PremiumBanner";

export default function ProfileCard({ profile }) {
  const { name, email, image, role, plan, totalPrompts } = profile;

  const isPremium = plan !== "free";

  if (role === "admin") {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-[#0F172A] p-8 shadow-2xl">
        {/* ================= Header ================= */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          {/* Avatar */}

          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-violet-500 bg-zinc-800 shadow-lg">
            <Image
              src={image || "/default-avatar.png"}
              alt={name}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>

          {/* User Info */}

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold text-white">{name}</h2>

              {isPremium && (
                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">
                  <Crown size={14} />
                  PRO
                </span>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2 text-zinc-400">
              <Mail size={16} />

              <span>{email}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-violet-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-violet-300">
                ROLE: {role}
              </span>

              {/* <span
                className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${
                  isPremium
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-sky-500/20 text-sky-300"
                }`}
              >
                PLAN: {isPremium ? "PRO LIFETIME" : "FREE"}
              </span> */}
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="my-8 border-t border-zinc-800" />

        {/* ================= Stats ================= */}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* <ProfileStatsCard
            icon={<FileText size={22} />}
            title="Prompts Published"
            value={totalPrompts}
          /> */}

          <ProfileStatsCard
            icon={<ShieldCheck size={22} />}
            title="Account Status"
            value="Verified Member"
            valueClassName="text-emerald-400"
          />
        </div>

        {/* ================= Premium Banner ================= */}

        {/* <div className="mt-8">
          <PremiumBanner plan={plan} />
        </div> */}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-[#0F172A] p-8 shadow-2xl">
      {/* ================= Header ================= */}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        {/* Avatar */}

        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-violet-500 bg-zinc-800 shadow-lg">
          <Image
            src={image || "/default-avatar.png"}
            alt={name}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>

        {/* User Info */}

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-bold text-white">{name}</h2>

            {isPremium && (
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">
                <Crown size={14} />
                PRO
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 text-zinc-400">
            <Mail size={16} />

            <span>{email}</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-violet-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-violet-300">
              ROLE: {role}
            </span>

            <span
              className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${
                isPremium
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-sky-500/20 text-sky-300"
              }`}
            >
              PLAN: {isPremium ? "PRO LIFETIME" : "FREE"}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}

      <div className="my-8 border-t border-zinc-800" />

      {/* ================= Stats ================= */}

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileStatsCard
          icon={<FileText size={22} />}
          title="Prompts Published"
          value={totalPrompts}
        />

        <ProfileStatsCard
          icon={<ShieldCheck size={22} />}
          title="Account Status"
          value="Verified Member"
          valueClassName="text-emerald-400"
        />
      </div>

      {/* ================= Premium Banner ================= */}

      <div className="mt-8">
        <PremiumBanner plan={plan} />
      </div>
    </div>
  );
}
