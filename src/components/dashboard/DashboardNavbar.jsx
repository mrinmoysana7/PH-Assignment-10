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
              gap-3
              px-3
              py-2
              hidden 
              md:flex
            "
          >
          
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-violet-500">
              <Image
                src={user?.image || "https://i.pravatar.cc/150?img=12"}
                alt={user?.name || "User"}
                fill
                className="object-cover"
              />
            </div>


            <div>
              <p className="text-sm font-semibold">{user?.name || "User"}</p>

              <p className="text-xs capitalize bg-cyan-100 rounded-md text-center text-cyan-600 border border-cyan-300">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
