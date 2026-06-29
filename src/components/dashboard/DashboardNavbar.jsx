"use client";

import { motion } from "framer-motion";
import { Bell, Menu, Search, X } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import DashboardLogo from "./DashboardLogo";
import Image from "next/image";

export default function DashboardNavbar({ sidebarOpen, setSidebarOpen }) {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  return (
    <header
      className="
      lg:hidden
        fixed
        top-0
        left-0
        right-0
        z-50
        h-16
        border-b-2
        border-gray-300
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-full
          items-center
          justify-between
          px-5
          lg:px-8
        "
      >
        {/* Left */}

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
              
              transition-all
              hover:bg-violet-600
              lg:hidden
            "
          >
            <motion.div
              initial={false}
              animate={{
                rotate: sidebarOpen ? 180 : 0,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </div>

        {/* Center Search */}

        <DashboardLogo></DashboardLogo>

        {/* Right */}

        <div>
          {/* User */}
          <div
            className="
              items-center
              gap-5
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-3
              py-2
              hidden 
              md:flex
            "
          >
            <Image
              src={user?.image}
              width={30}
              height={30}
              alt={user?.name}
              className="rounded-full"
            ></Image>

            <div>
              <p className="text-sm font-semibold">{user?.name || "User"}</p>

              <p className="text-xs capitalize bg-cyan-100 rounded-full text-center p-0.5 w-15 text-cyan-600 border border-cyan-300">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
