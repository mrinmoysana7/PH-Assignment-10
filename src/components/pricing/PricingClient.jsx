"use client";

import React, { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

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
          planId: plan.plan_id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
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
    <div className="min-h-screen bg-[#0A0D14] py-16 px-4 text-slate-200">
      {/* ... keep your Header and List section as before ... */}

      {/* Payment Box */}
      <div className="bg-[#111520] border border-slate-800 rounded-2xl p-8">
        <h3 className="font-semibold mb-6 flex items-center">
          <CreditCard size={20} className="mr-3" /> Card Information
        </h3>

        <button onClick={handleStripeCheckout}>Checkout</button>
      </div>
    </div>
  );
};
export default PricingClient;
