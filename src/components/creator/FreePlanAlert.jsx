import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export default function FreePlanAlert({ currentCount = 0, limit = 3 }) {
  const isUnlimited = limit === -1;

  if (isUnlimited) {
    return null;
  }

  const reachedLimit = currentCount >= limit;

  return (
    <div
      className={`
        rounded-2xl
        border
        px-5
        py-4
        ${
          reachedLimit
            ? "border-red-500/30 bg-red-500/20"
            : "border-amber-500/50 bg-amber-500/10"
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${
              reachedLimit
                ? "bg-red-500/20 text-red-600"
                : "bg-amber-500/20 text-amber-500"
            }
          `}
        >
          <TriangleAlert size={22} />
        </div>

        <div className="flex-1">
          <h3
            className={`font-semibold ${
              reachedLimit ? "text-red-600 text-lg" : "text-amber-500"
            }`}
          >
            {reachedLimit ? "Free Tier Limit Reached" : "Free Plan"}
          </h3>

          <p className="mt-1 text-md font-semibold text-black">
            {currentCount} of {limit} prompts used.
            {reachedLimit
              ? " Upgrade to Premium to publish unlimited prompt templates."
              : " You can publish more prompts before reaching your free plan limit."}
          </p>

          <Link
            href="/pricing"
            className="mt-3 inline-block text-sm font-semibold text-violet-500 hover:text-violet-300"
          >
            Upgrade to Premium →
          </Link>
        </div>
      </div>
    </div>
  );
}
