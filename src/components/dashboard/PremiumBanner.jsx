"use client";

import Link from "next/link";
import { BadgeCheck, Crown } from "lucide-react";

export default function PremiumBanner({ plan }) {
  const isPremium = plan !== "free";

  if (isPremium) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
        <div className="flex items-center gap-3">
          <BadgeCheck size={22} className="text-emerald-400" />

          <div>
            <h3 className="font-semibold text-emerald-300">
              Premium Membership Active
            </h3>

            <p className="mt-1 text-sm text-emerald-200/90">
              Enjoy unlimited prompt publishing, premium marketplace access and
              exclusive AI features.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Crown size={22} className="text-yellow-400" />

            <h3 className="text-xl font-bold text-white">Upgrade to Premium</h3>
          </div>

          <p className="mt-2 max-w-xl text-sm text-zinc-300">
            Unlock unlimited prompt publishing, premium AI templates,
            marketplace access, priority support and future exclusive features.
          </p>
        </div>

        <Link
          href="/pricing"
          className="rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-center font-semibold text-white transition duration-300 hover:scale-105"
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  );
}
