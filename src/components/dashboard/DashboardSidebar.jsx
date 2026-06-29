"use client";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { ArrowRightFromSquare } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

import DashboardNavItems from "./DashboardNavItems";
import { dashboardNavLinks } from "@/lib/dashboard-navigation";
import DashboardProfileCard from "./DashboardProfileCard";
import DashboardLogo from "./DashboardLogo";

export default function DashboardSidebar() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const navItems = dashboardNavLinks[user?.role] ?? dashboardNavLinks.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Logged out successfully.");

      setTimeout(() => {
        window.location.href = "/";
      }, 700);
    } catch {
      toast.error("Logout failed.");
    }
  };

  if (isPending) return null;

  return (
    <motion.aside
      initial={{
        x: -40,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        hidden
        lg:flex
        fixed
        top-0
        left-0
        bottom-0
        z-40
        w-72
        flex-col
        border-r
        border-gray-300
        
      "
    >
      {/* Logo */}

      <div className="border-b border-white/10 px-6 pt-6">
        <Link href="/">
          <DashboardLogo />
        </Link>
      </div>

      {/* Body */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-5
          py-6
        "
      >
        <DashboardProfileCard user={user} />

        <div className="mt-8">
          <DashboardNavItems navItems={navItems} />
        </div>
      </div>

      {/* Footer */}

      <div className="border-t border-white/10 p-5">
        <Button
          onPress={handleLogout}
          className="
                h-12
                w-full
                rounded-2xl
                font-semibold
                flex
                gap-2
                items-center
                justify-center
                shadow-2xl
                hover:bg-red-500
                hover:shadow-lg
                transition
                hover:scale-104
                hover:text-white
                
              "
        >
          <ArrowRightFromSquare width={18} />
          Logout
        </Button>
      </div>
    </motion.aside>
  );
}
