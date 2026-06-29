"use client";

import Image from "next/image";

export default function DashboardProfileCard({ user }) {
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
    <div
      className="
        
           rounded-3xl
          shadow-xl
          bg-default-50
           p-4
      "
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}

        <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-violet-500">
          <Image
            src={user?.image || "https://i.pravatar.cc/150?img=12"}
            alt={user?.name || "User"}
            fill
            className="object-cover"
          />
        </div>

        {/* User Info */}

        <div className="flex-1">
          <h2 className="truncate text-base font-bold text-default-900">
            {user?.name || "Guest User"}
          </h2>

          {/* <p className="truncate text-sm text-default-500">{user?.email}</p> */}

          <div className="mt-2 flex gap-2">
            <span
              className={`
                  rounded-full
                  px-5
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
                   px-5
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
  );
}
