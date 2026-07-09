"use client";

import DashboardMobileSidebar from "@/components/dashboard/DashboardMobileSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen ">
      {/* Mobile / Tablet Navbar */}
      <DashboardNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Desktop Sidebar */}
      <DashboardSidebar />

      {/* Mobile Sidebar */}
      <DashboardMobileSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main
        className="
          lg:ml-72
          min-h-screen
          transition-all
          duration-300
        "
      >
        <div className="">{children}</div>
      </main>
    </div>
  );
}
