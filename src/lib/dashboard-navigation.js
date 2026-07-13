import {
  Person,
  CirclePlus,
  FileText,
  Bookmark,
  Comment,
  LayoutSplitSideContentRight,
  Persons,
  ChartColumn,
  TriangleExclamation,
  Gear,
} from "@gravity-ui/icons";

export const dashboardNavLinks = {
  user: [
    {
      label: "My Profile",
      href: "/dashboard/user/my-profile",
      icon: Person,
    },
    {
      label: "Add Prompt",
      href: "/dashboard/user/add-prompt",
      icon: CirclePlus,
    },
    {
      label: "My Prompts",
      href: "/dashboard/user/my-prompts",
      icon: FileText,
    },
    {
      label: "Saved Prompts",
      href: "/dashboard/user/saved-prompts",
      icon: Bookmark,
    },
    {
      label: "My Reviews",
      href: "/dashboard/user/my-reviews",
      icon: Comment,
    },
  ],

  creator: [
    {
      label: "My Profile",
      href: "/dashboard/creator/my-profile",
      icon: Person,
    },
    {
      label: "Creator Home",
      href: "/dashboard/creator/creator-dashboard",
      icon: LayoutSplitSideContentRight,
    },
    {
      label: "Add Prompt",
      href: "/dashboard/creator/add-prompt",
      icon: CirclePlus,
    },
    {
      label: "My Prompts",
      href: "/dashboard/creator/my-prompts",
      icon: FileText,
    },
  ],

  admin: [
    {
      label: "My Profile",
      href: "/dashboard/admin/profile",
      icon: Person,
    },
    {
      label: "Admin Analytics",
      href: "/dashboard/admin/analytics",
      icon: ChartColumn,
    },
    {
      label: "All Users",
      href: "/dashboard/admin/users",
      icon: Persons,
    },
    {
      label: "All Prompts",
      href: "/dashboard/admin/prompts",
      icon: FileText,
    },
    {
      label: "All Payments",
      href: "/dashboard/admin/payments",
      icon: ChartColumn,
    },
    {
      label: "Reported Prompts",
      href: "/dashboard/admin/reported-prompts",
      icon: TriangleExclamation,
    },
    // {
    //   label: "Settings",
    //   href: "/dashboard/admin/settings",
    //   icon: Gear,
    // },
  ],
};
