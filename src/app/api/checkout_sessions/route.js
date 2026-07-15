import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PLAN_PRICE_ID, stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const body = await request.json();

    const { planId } = body;

    console.log(body);

    const user = await getUserSession();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_email: user.email,

      line_items: [
        {
          price: PLAN_PRICE_ID[planId],

          quantity: 1,
        },
      ],

      metadata: {
        planId,

        userId: user.id,

        email: user.email,
      },

      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
