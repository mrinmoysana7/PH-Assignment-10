"use client";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { Button, Drawer } from "@heroui/react";
import { ArrowRightFromSquare, Sparkles } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import { dashboardNavLinks } from "@/lib/dashboard-navigation";
import DashboardNavItems from "./DashboardNavItems";
import DashboardProfileCard from "./DashboardProfileCard";
import DashboardLogo from "./DashboardLogo";

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

  const planColor =
    user?.plan === "pro"
      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
      : "bg-default-100 text-default-600 border border-cyan-500/40";

  const roleColor =
    user?.role === "admin"
      ? "bg-red-500/10 text-red-400"
      : user?.role === "creator"
        ? "bg-violet-500/10 text-violet-400"
        : "bg-sky-500/10 text-sky-400";

  return (
    <Drawer isOpen={open} onOpenChange={setOpen} placement="left">
      {/* Backdrop */}

      <Drawer.Backdrop className="bg-black/40 backdrop-blur-sm" />

      {/* Drawer */}

      <Drawer.Content>
        <Drawer.Dialog
          className="
            flex
            h-screen
            w-80
            flex-col
            overflow-hidden
            border-r-2
            border-gray-300
            bg-white
            shadow-2xl
            lg:hidden
          "
        >
          {/* Header */}

          <Drawer.Header
            className="
              flex
              items-center
              justify-between
              border-b
              border-default-200
              px-6
              py-5
            "
          >
            <Drawer.CloseTrigger />
          </Drawer.Header>

          {/* Body */}

          <Drawer.Body
            className="
              flex
              flex-1
              flex-col
              gap-6
              overflow-y-auto
              px-6
              py-6
            "
          >
            {/* Logo */}

            <div className="border-b border-white/10 ">
              <Link href="/">
                <DashboardLogo />
              </Link>
            </div>

            <DashboardProfileCard user={user} />

            {isPending ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-default-500">Loading...</p>
              </div>
            ) : (
              <>
                <DashboardNavItems
                  navItems={navItems}
                  onNavigate={() => setOpen(false)}
                />
              </>
            )}
          </Drawer.Body>

          {/* Footer */}

          <Drawer.Footer
            className="
              p-6
            "
          >
            <Button
              variant="flat"
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
              <ArrowRightFromSquare width={18} className="mr-2" />
              <h2>Logout</h2>
            </Button>
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer>
  );
}
