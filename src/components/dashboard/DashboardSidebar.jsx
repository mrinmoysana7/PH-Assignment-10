"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button, Drawer } from "@heroui/react";

import {
  LayoutSideContent,
  LayoutSplitSideContentRight,
  CirclePlus,
  Person,
  Bookmark,
  FileText,
  ChartColumn,
  CreditCard,
  TriangleExclamation,
  Persons,
  ArrowRightFromSquare,
  Sparkles,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

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

  // User
  const userNavLinks = [
    {
      icon: Person,
      href: "/dashboard/user",
      label: "My Profile",
    },
    {
      icon: CirclePlus,
      href: "/dashboard/user/add-prompt",
      label: "Add Prompt",
    },
    {
      icon: FileText,
      href: "/dashboard/user/my-prompts",
      label: "My Prompts",
    },
    {
      icon: Bookmark,
      href: "/dashboard/user/saved-prompts",
      label: "Saved Prompts",
    },
    {
      icon: FileText,
      href: "/dashboard/user/my-reviews",
      label: "My Reviews",
    },
  ];

  // Creator
  const creatorNavLinks = [
    {
      icon: Person,
      href: "/dashboard/creator",
      label: "My Profile",
    },
    {
      icon: LayoutSplitSideContentRight,
      href: "/dashboard/creator",
      label: "Dashboard",
    },
    {
      icon: CirclePlus,
      href: "/dashboard/creator/add-prompt",
      label: "Add Prompt",
    },
    {
      icon: FileText,
      href: "/dashboard/creator/my-prompts",
      label: "My Prompts",
    },
  ];

  // Admin
  const adminNavLinks = [
    {
      icon: LayoutSplitSideContentRight,
      href: "/dashboard/admin",
      label: "Dashboard",
    },
    {
      icon: Persons,
      href: "/dashboard/admin/users",
      label: "All Users",
    },
    {
      icon: FileText,
      href: "/dashboard/admin/prompts",
      label: "All Prompts",
    },
    {
      icon: CreditCard,
      href: "/dashboard/admin/payments",
      label: "All Payments",
    },
    {
      icon: TriangleExclamation,
      href: "/dashboard/admin/reported-prompts",
      label: "Reported Prompts",
    },
    {
      icon: ChartColumn,
      href: "/dashboard/admin/analytics",
      label: "Analytics",
    },
  ];

  const navLinksMap = {
    user: userNavLinks,
    creator: creatorNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role] || userNavLinks;

  const planColor =
    user?.plan === "pro"
      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
      : "bg-default-100 text-default-600";

  const roleColor =
    user?.role === "admin"
      ? "bg-red-500/10 text-red-400"
      : user?.role === "creator"
        ? "bg-violet-500/10 text-violet-400"
        : "bg-sky-500/10 text-sky-400";

  if (isPending) {
    return (
      <aside className="hidden w-72 shrink-0 border-r border-default-200 bg-[#0F172A] lg:flex" />
    );
  }

  const navContent = (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const active =
          item.href === "/dashboard/user" ||
          item.href === "/dashboard/creator" ||
          item.href === "/dashboard/admin"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
            group
            flex
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            text-sm
            font-medium
            transition-all
            duration-300

            ${
              active
                ? "bg-violet-500/15 border border-violet-500/20 shadow-lg shadow-violet-600/10"
                : "text-default-500 hover:bg-default-100 hover:text-default-900"
            }
          `}
          >
            <item.icon
              width={20}
              className={`
              transition-colors

              ${
                active
                  ? "text-violet-500"
                  : "text-default-400 group-hover:text-violet-500"
              }
            `}
            />

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}

      <aside
        className="
       flex
w-78
min-h-screen
shrink-0
flex-col
border-r
border-default-200
bg-white
px-6
py-7
      "
      >
        <Link href="/" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-linear-to-br
              from-violet-600
              via-purple-500
              to-blue-500
              shadow-lg
            "
            >
              <Sparkles width={20} className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tight">
                <span className="text-default-900">Prompt</span>

                <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Verse
                </span>
              </h2>

              <p className="text-xs text-default-500">AI Marketplace</p>
            </div>
          </div>

          <span
            className={`
            rounded-lg
bg-cyan-500/10
border
border-cyan-500/20
text-cyan-400
px-3
py-1
ml-2

            ${planColor}
          `}
          >
            {user?.plan?.toUpperCase()}
          </span>
        </Link>

        {/* Profile */}

        <div
          className="
          mt-8
          rounded-3xl
          border
          border-default-200
          bg-default-50
          p-4
        "
        >
          <div className="flex items-center gap-4">
            <Image
              src={user?.image || "https://i.pravatar.cc/150"}
              alt={user?.name || "User Avatar"}
              width={56}
              height={56}
              className="h-12 w-12 rounded-full border-2 border-violet-500 object-cover"
            />

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-default-900">
                {user?.name}
              </h3>

              <p className="truncate text-xs text-default-500">{user?.email}</p>

              <div className="mt-2 flex gap-2">
                <span
                  className={`
                  rounded-full
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  uppercase
                  

                  ${roleColor}
                `}
                >
                  {user?.role}
                </span>

                <span
                  className={`
                  rounded-full
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold

                  ${planColor}
                `}
                >
                  {user?.plan}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex-1">{navContent}</div>

        {/* Logout Button */}

        <Button
          onPress={handleLogout}
          variant="flat"
          className="
                mt-8
                h-12
                w-full
                rounded-2xl
                bg-red-50
                text-red-600
                hover:bg-red-100
              "
        >
          <ArrowRightFromSquare width={18} className="mr-2" />
          Logout
        </Button>
      </aside>

      {/* Mobile Sidebar */}
      <Drawer>
        <Drawer.Trigger>
          <Button
            isIconOnly
            variant="flat"
            className="
          fixed
          left-5
          top-5
          z-50
          rounded-xl
          lg:hidden
        "
          >
            <LayoutSideContent width={20} />
          </Button>
        </Drawer.Trigger>

        <Drawer.Backdrop />

        <Drawer.Content placement="left">
          <Drawer.Dialog className="w-72 bg-white">
            <Drawer.Header className="border-b border-default-200">
              <Link href="/" className="flex items-center gap-3">
                <div
                  className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-linear-to-br
                  from-violet-600
                  via-purple-500
                  to-blue-500
                "
                >
                  <Sparkles width={20} className="text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-black">PromptVerse</h3>

                  <p className="text-xs text-default-500">AI Marketplace</p>
                </div>
              </Link>
            </Drawer.Header>
            <Drawer.Body className="py-6"></Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
}
