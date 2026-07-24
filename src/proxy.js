import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname = request.nextUrl.pathname;

  // -----------------------------
  // Protect Dashboard
  // -----------------------------

  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // if (pathname.startsWith("/prompts/")) {
  //   if (!session) {
  //     return NextResponse.redirect(new URL("/signin", request.url));
  //   }
  // }

  // if (pathname.startsWith("/prompts/") && pathname !== "/prompts") {
  //   if (!session) {
  //     return NextResponse.redirect(new URL("/signin", request.url));
  //   }
  // }

  if (pathname.startsWith("/prompts/") && pathname !== "/prompts") {
    if (!session) {
      const signinUrl = new URL("/signin", request.url);

      signinUrl.searchParams.set("redirect", pathname);

      return NextResponse.redirect(signinUrl);
    }
  }

  // -----------------------------
  // Logged In User can't access
  // signin/signup
  // -----------------------------

  if (session && (pathname === "/signin" || pathname === "/signup")) {
    const role = session.user.role;

    const dashboard = {
      admin: "/dashboard/admin/profile",
      creator: "/dashboard/creator/my-profile",
      user: "/dashboard/user/my-profile",
    };

    return NextResponse.redirect(
      new URL(dashboard[role] || dashboard.user, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/prompts/:path*",
    "/signin",
    "/signup",
    "/pricing/success/:path*",
  ],
};
