"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNavItems({ navItems = [], onNavigate }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`
              group
              flex
              items-center
              gap-4
              rounded-2xl
              px-4
              py-3
              transition-all
              duration-300
              ${
                active
                  ? "bg-violet-600/10 text-violet-600 border border-violet-200 shadow-sm"
                  : "text-default-600 hover:bg-default-100 hover:text-violet-600"
              }
            `}
          >
            {Icon && (
              <Icon
                width={20}
                className={`
                  transition-colors
                  ${
                    active
                      ? "text-violet-600"
                      : "text-default-500 group-hover:text-violet-600"
                  }
                `}
              />
            )}

            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
