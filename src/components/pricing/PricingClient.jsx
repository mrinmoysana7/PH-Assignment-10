"use client";

import React, { useState } from "react";
import { CreditCard, Loader2, Sparkles, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const PricingClient = ({ user, plan }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStripeCheckout = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      setIsProcessing(true);

      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: plan?.plan_id || "AI_Prompt_PRO_Access",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F4F5F7] py-16 px-4 md:px-8 text-slate-800 overflow-hidden">
      {/* ========================================== */}
      {/* TOP-LEFT ROTATING EARTH IMAGE (INFINITE)   */}
      {/* ========================================== */}
      <div className="absolute -top-30 -left-30 w-72 h-72 md:h-120 md:w-120 lg:w-150 lg:h-150 pointer-events-none z-0 overflow-hidden rounded-full opacity-90">
        <div className="w-full h-full animate-[spin_35s_linear_infinite]">
          <Image
            // src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop"
            src="https://images.unsplash.com/photo-1632395627760-72e6eca7f9c7?q=80&w=880&auto=format&fit=crop"
            alt="Earth Planet"
            fill
            className="object-cover rounded-full scale-125"
            priority
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Title */}
        <div className="text-center hidden md:flex flex-col mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Unlock Premium AI Prompt Access
            <br className="hidden md:block" />
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pay Once. Use Forever.
            </span>
          </h1>
          <p className="mt-4 text-slate-600 text-base md:text-lg">
            Get lifetime access to premium AI prompts, unlimited prompt copying,
            exclusive collections, and future premium updates with a single
            payment.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* ========================================== */}
          {/* LEFT CARD: NEBULA PRO LIGHT GLASS CARD     */}
          {/* ========================================== */}
          <div className="relative rounded-3xl border border-white/80 bg-white/60 backdrop-blur-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  PromptVerse Pro
                </h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">$5</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">
                    One-Time Payment • Lifetime Access
                  </span>
                </div>
              </div>
            </div>

            {/* Action Checkout Button */}
            <button
              onClick={handleStripeCheckout}
              disabled={isProcessing}
              className="w-full mt-2 mb-8 py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg shadow-slate-900/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <CreditCard size={18} /> Unlock PromptVerse Pro
                </>
              )}
            </button>

            {/* Features List */}
            <div className="space-y-4 border-t border-slate-200/60 pt-6">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Check size={16} className="text-blue-600 shrink-0" />
                <span>Unlimited prompt creations & copies</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Check size={16} className="text-blue-600 shrink-0" />
                <span>Access Premium & Private AI Prompts</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Check size={16} className="text-blue-600 shrink-0" />
                <span>Unlimited AI Prompt Generation</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Check size={16} className="text-blue-600 shrink-0" />
                <span>Bookmark & Organize Your Favorite Prompts</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Check size={16} className="text-blue-600 shrink-0" />
                <span>Priority Access to New Premium Content</span>
              </div>
            </div>

            <div className="mt-8 text-xs text-slate-400 text-center">
              Secure payment powered by Stripe.
            </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT CARD: EXPAND HORIZONS LIGHT CARD     */}
          {/* ========================================== */}
          <div className="relative rounded-3xl border border-white/80 bg-white/60 backdrop-blur-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col justify-between h-full min-h-110">
            <div>
              <p className="text-slate-500 font-medium text-xs tracking-wider uppercase">
                Premium Membership
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                Why Go Pro?
              </h2>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-sm">
                Unlock every premium AI prompt, enjoy unlimited prompt copies,
                save your favorites, and access exclusive content with a single
                lifetime purchase.
              </p>
              <div className="mt-4 flex items-center text-slate-900 font-medium cursor-pointer">
                <ArrowRight size={18} />
              </div>
            </div>

            {/* Bottom Rotating Earth Image Element */}
            <div className="relative w-full h-48 mt-6 flex justify-end items-end">
              <div className="absolute -bottom-20 -right-18 w-60 h-60 rounded-full overflow-hidden shadow-2xl animate-[spin_30s_linear_infinite]">
                <Image
                  src="https://images.unsplash.com/photo-1632395627760-72e6eca7f9c7?q=80&w=880&auto=format&fit=crop"
                  alt="Earth Globe"
                  fill
                  className="object-cover scale-125"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingClient;
