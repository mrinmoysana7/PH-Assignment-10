import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSubscription } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  // const {
  //   status,
  //   customer_details: { email: customerEmail },
  //   metadata,
  // } = await stripe.checkout.sessions.retrieve(session_id, {
  //   expand: ["line_items", "payment_intent"],
  // });

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  // if (session.status === "open") {
  //   return redirect("/");
  // }

  if (session.status === "complete") {
    const subInfo = {
      sessionId: session.id,

      paymentIntent: session.payment_intent.id,

      email: session.customer_details.email,

      planId: session.metadata.planId,

      amount: session.amount_total,

      currency: session.currency,

      status: session.payment_status,
    };

    // Update the user table about the new plan
    const result = await createSubscription(subInfo);

    console.log("result", result);

    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans">
        {/* Success Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl p-8 sm:p-12 max-w-lg w-full text-center">
          {/* Animated Green Check Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
            <svg
              className="h-10 w-10 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Header */}
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
            Payment Successful!
          </h1>

          {/* Description */}
          <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            We appreciate your business. A receipt and confirmation have been
            sent to{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
              {/* {customerEmail} */}
            </span>
            . Your account has been upgraded successfully.
          </p>

          {/* Return Button */}
          <Link
            href="/" // Adjust this route to match your app's home or dashboard
            className="block w-full py-3.5 px-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-semibold rounded-xl transition-colors shadow-sm mb-6"
          >
            Return to Dashboard
          </Link>

          {/* Support Footer */}
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Have any questions or need help? <br className="sm:hidden" />
            <a
              href="mailto:orders@example.com"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium transition-colors"
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
