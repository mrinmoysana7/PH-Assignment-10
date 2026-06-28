"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { authClient } from "@/lib/auth-client";
import { NavLinks } from "./NavLinks";
import Logo from "./ui/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");

      setTimeout(() => {
        window.location.href = "/auth/signin";
      }, 1000);
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const navLinks = [
    {
      label: "Prompts",
      href: "/prompts",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  // Dynamically push dashboard routes based on authentication role
  const dashboardLinks = {
    user: "/dashboard/user",
    creator: "/dashboard/creator",
    admin: "/dashboard/admin",
  };

  // if (user) {
  //   navLinks.push({
  //     label: "Dashboard",
  //     href: dashboardLinks[user?.role || "user"],
  //   });
  // }

  return (
    <header className="bg-white/30 backdrop-blur-md border border-white/5 shadow z-50 fixed w-full top-0.5">
      <Toaster />
      {/* <div className=""> */}
      <nav className="flex container mx-auto h-13.5 items-center px-6 justify-between  ">
        {/* Logo & Website Brand Block */}
        <Logo />
        {/* <Link href="/" className="flex items-center gap-2 shrink-0"> */}
        {/* Minimalist AI Theme Logo Icon */}
        {/* <svg
              className="w-7 h-7 text-indigo-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-xl font-extrabold tracking-tight text-white">
              <span className="text-yellow-500">Prompt</span>
              <span className="text-indigo-500">Verse</span>
            </span>
          </Link> */}

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 ml-8">
          {navLinks.map((link) => (
            <NavLinks
              key={link.href}
              href={link.href}
              // isActive={pathname === link.href}
            >
              {link.label}
            </NavLinks>
          ))}
        </div>

        {/* Desktop Action & Status CTA Block */}
        <div className="hidden lg:flex items-center ml-auto">
          {isPending ? (
            <div className="flex items-center h-5 px-4">
              <ScaleLoader
                color="#6366f1"
                height={15}
                width={3}
                radius={2}
                margin={2}
              />
            </div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                Hello, <span className="font-medium">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-white hover:text-indigo-500 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 shadow-md shadow-indigo-600/20"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburguer Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-400 hover:text-white transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Responsive Menu Dropdown */}
      {isOpen && (
        <div className="mt-2 overflow-hidden rounded-2xl border border-white/5 bg-[#0F1117]/95 px-4 py-4 backdrop-blur-2xl shadow-xl lg:hidden transition-all duration-200 ease-in-out">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-indigo-600/10 text-indigo-400"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Separator inside Mobile Drawer */}
            <hr className="my-2 border-white/5" />

            {isPending ? (
              <div className="flex justify-center py-3">
                <ScaleLoader color="#6366f1" height={15} width={3} radius={2} />
              </div>
            ) : user ? (
              <div className="flex flex-col gap-3 pt-1">
                <div className="px-4 text-xs text-gray-400">
                  Logged in as:{" "}
                  <span className="text-gray-200 font-medium">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full rounded-xl bg-red-500/10 border border-red-500/20 py-3 text-center text-sm font-semibold text-red-400 transition hover:bg-red-600 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl border border-white/10 py-3 text-center text-sm font-semibold text-gray-300 hover:bg-white/5 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {/* </div> */}
    </header>
  );
}
