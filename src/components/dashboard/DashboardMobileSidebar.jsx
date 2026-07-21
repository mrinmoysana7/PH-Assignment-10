"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { ArrowRightFromSquare } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import { dashboardNavLinks } from "@/lib/dashboard-navigation";
import DashboardNavItems from "./DashboardNavItems";
import DashboardProfileCard from "./DashboardProfileCard";

export default function DashboardMobileSidebar({ open, setOpen }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const navItems = dashboardNavLinks[user?.role] ?? dashboardNavLinks.user;

  const handleLogout = async () => {
    try {
      setOpen(false);
      await authClient.signOut();
      toast.success("Logged out successfully.");
      setTimeout(() => {
        window.location.href = "/";
      }, 700);
    } catch {
      toast.error("Logout failed.");
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 z-40 flex h-[calc(100vh-4rem)] w-[85vw] max-w-[320px] flex-col 
          border-r border-slate-200 bg-white shadow-2xl lg:hidden
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Body Area */}
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-6">
          <DashboardProfileCard user={user} />

          {isPending ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-600 border-t-transparent"></div>
            </div>
          ) : (
            <DashboardNavItems
              navItems={navItems}
              onNavigate={() => setOpen(false)}
            />
          )}
        </div>

        {/* Footer Area */}
        <div className="px-5 pb-30">
          <button
            onClick={handleLogout}
            className="
              group flex h-12 w-full items-center justify-center gap-2
              rounded-xl bg-red-50 text-red-600 font-semibold shadow-sm
              transition-all duration-300 hover:bg-red-500 hover:text-white
              hover:shadow-md hover:shadow-red-500/25 active:scale-95
            "
          >
            <ArrowRightFromSquare
              width={18}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
