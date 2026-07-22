// import { stripe } from "@/lib/stripe";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { createSubscription } from "@/lib/actions/subscriptions";

// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams;

//   if (!session_id) {
//     throw new Error("Please provide a valid session_id (`cs_test_...`)");
//   }

//   const session = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ["payment_intent"],
//   });

//   if (session.status === "complete") {
//     const subInfo = {
//       sessionId: session.id,

//       paymentIntent: session.payment_intent.id,

//       userId: session.metadata.userId,

//       email: session.customer_details.email,

//       planId: session.metadata.planId,

//       amount: session.amount_total,

//       currency: session.currency,

//       status: session.payment_status,
//     };

//     // Update the user table about the new plan
//     const result = await createSubscription(subInfo);

//     console.log(result);

//     if (!result.success) {
//       throw new Error(result.message);
//     }

//     return (
//       <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans">
//         {/* Success Card */}
//         <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl p-8 sm:p-12 max-w-lg w-full text-center">
//           {/* Animated Green Check Icon */}
//           <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
//             <svg
//               className="h-10 w-10 text-green-600 dark:text-green-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>

//           {/* Header */}
//           <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
//             Payment Successful!
//           </h1>

//           {/* Description */}
//           <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
//             We appreciate your business. A receipt and confirmation have been
//             sent to{" "}
//             <span className="font-semibold text-zinc-900 dark:text-zinc-200">
//               {/* {customerEmail} */}
//             </span>
//             . Your account has been upgraded successfully.
//           </p>

//           {/* Return Button */}
//           <Link
//             href="/" // Adjust this route to match your app's home or dashboard
//             className="block w-full py-3.5 px-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-semibold rounded-xl transition-colors shadow-sm mb-6"
//           >
//             Return to Dashboard
//           </Link>

//           {/* Support Footer */}
//           <p className="text-sm text-zinc-500 dark:text-zinc-500">
//             Have any questions or need help? <br className="sm:hidden" />
//             <a
//               href="mailto:orders@example.com"
//               className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium transition-colors"
//             >
//               Contact Support
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Fallback return just in case status is neither 'open' nor 'complete'
//   return redirect("/");
// }

import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSubscription } from "@/lib/actions/subscriptions";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
// import { getLoggedInUser } from "@/lib/api/user";
import { getUserSession } from "@/lib/core/session";
// import Image from "next/image";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  // const user = await getLoggedInUser();

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  if (session.status === "complete") {
    const subInfo = {
      sessionId: session.id,
      paymentIntent: session.payment_intent.id,
      userId: session.metadata.userId,
      email: session.customer_details.email,
      planId: session.metadata.planId,
      amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
    };

    // Update the user table about the new plan
    const result = await createSubscription(subInfo);

    console.log(result);

    if (!result.success) {
      throw new Error(result.message);
    }

    const user = await getUserSession();

    const role = user?.role || "user";

    const customerEmail = session.customer_details?.email || "valued customer";

    return (
      <div className="relative min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center p-4 md:px-8 font-sans overflow-hidden text-slate-800">
        {/* Background Rotating Earth Accent */}
        {/* <div className="absolute -top-24 -left-24 w-80 h-80 md:w-96 md:h-96 pointer-events-none z-0 overflow-hidden rounded-full opacity-60">
          <div className="w-full h-full animate-[spin_40s_linear_infinite]">
            <Image
              src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop"
              alt="Earth Planet"
              fill
              className="object-cover rounded-full scale-125"
              priority
            />
          </div>
        </div>

        <div className="absolute -bottom-24 -right-24 w-80 h-80 md:w-96 md:h-96 pointer-events-none z-0 overflow-hidden rounded-full opacity-40">
          <div className="w-full h-full animate-[spin_30s_linear_infinite]">
            <Image
              src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop"
              alt="Earth Planet"
              fill
              className="object-cover rounded-full scale-125"
            />
          </div>
        </div> */}

        {/* Main Success Card with Glassmorphism */}
        <div className="relative z-10 bg-white/70 backdrop-blur-2xl border border-white/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-8 sm:p-12 max-w-lg w-full text-center">
          {/* Glowing Animated Success Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-linear-to-tr from-blue-600 to-cyan-400 shadow-xl shadow-blue-500/25 mb-8 animate-bounce">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white text-blue-600">
              <Check size={40} strokeWidth={3} />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-4 shadow-sm">
            <Sparkles size={13} /> Lifetime Pro Activated
          </div>

          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
            Payment Successful!
          </h1>

          {/* Description with Dynamic Email */}
          <p className="text-sm md:text-base text-slate-600 mb-8 leading-relaxed">
            We appreciate your business. A receipt and confirmation have been
            sent to{" "}
            <span className="font-semibold text-slate-900">
              {customerEmail}
            </span>
            . Your account has been upgraded successfully.
          </p>

          {/* Order Details Preview Box */}
          <div className="bg-slate-50/80 rounded-2xl p-4 mb-8 border border-slate-200/60 text-left space-y-2.5 text-sm">
            <div className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                <Zap size={15} className="text-blue-600" /> Plan
              </span>
              <span className="font-bold text-slate-900">
                Nebula Lifetime Pro ($5)
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 border-t border-slate-200/50 pt-2.5">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-emerald-600" /> Status
              </span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs">
                Active & Verified
              </span>
            </div>
          </div>

          {/* Return Button */}
          <Link
            href={`/dashboard/${role}/my-profile`}
            className="group block w-full py-4 px-6 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] mb-6 flex items-center justify-center gap-2"
          >
            <span>Return to Dashboard</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          {/* Support Footer */}
          <p className="text-xs text-slate-500">
            Have any questions or need help?{" "}
            <a
              href="mailto:orders@example.com"
              className="text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Fallback return just in case status is neither 'open' nor 'complete'
  return redirect("/");
}
