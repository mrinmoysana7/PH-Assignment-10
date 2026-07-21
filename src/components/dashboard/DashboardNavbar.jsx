// // "use client";

// // import { motion } from "framer-motion";
// // import { Bell, Menu, Search, X } from "lucide-react";

// // import { authClient } from "@/lib/auth-client";
// // import DashboardLogo from "./DashboardLogo";
// // import Image from "next/image";

// // export default function DashboardNavbar({ sidebarOpen, setSidebarOpen }) {
// //   const { data: session } = authClient.useSession();

// //   const user = session?.user;

// //   return (
// //     <header
// //       className="
// //       lg:hidden
// //         fixed
// //         top-0
// //         left-0
// //         right-0
// //         z-50
// //         h-16
// //         border-b-2
// //         border-gray-300
// //         backdrop-blur-xl
// //       "
// //     >
// //       <div
// //         className="
// //           flex
// //           h-full
// //           items-center
// //           justify-between
// //           px-5
// //           lg:px-8
// //         "
// //       >
// //         {/* Left */}

// //         <div className="flex items-center gap-4">
// //           {/* Mobile Menu */}

// //           <button
// //             onClick={() => setSidebarOpen(!sidebarOpen)}
// //             className="
// //               flex
// //               h-10
// //               w-10
// //               items-center
// //               justify-center
// //               rounded-xl
// //               border
// //               border-white/10
// //               bg-white/5

// //               transition-all
// //               hover:bg-violet-600
// //               lg:hidden
// //             "
// //           >
// //             <motion.div
// //               initial={false}
// //               animate={{
// //                 rotate: sidebarOpen ? 180 : 0,
// //               }}
// //               transition={{
// //                 duration: 0.25,
// //               }}
// //             >
// //               {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
// //             </motion.div>
// //           </button>
// //         </div>

// //         {/* Center Search */}

// //         <DashboardLogo></DashboardLogo>

// //         {/* Right */}

// //         <div>
// //           {/* User */}
// //           <div
// //             className="
// //               items-center
// //               gap-3
// //               px-3
// //               py-2
// //               hidden
// //               md:flex
// //             "
// //           >

// //             <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-violet-500">
// //               <Image
// //                 src={user?.image || "https://i.pravatar.cc/150?img=12"}
// //                 alt={user?.name || "User"}
// //                 fill
// //                 className="object-cover"
// //               />
// //             </div>

// //             <div>
// //               <p className="text-sm font-semibold">{user?.name || "User"}</p>

// //               <p className="text-xs capitalize bg-cyan-100 rounded-md text-center text-cyan-600 border border-cyan-300">
// //                 {user?.role}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }

// "use client";

// import { motion } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import Image from "next/image";

// import { authClient } from "@/lib/auth-client";
// import DashboardLogo from "./DashboardLogo";

// export default function DashboardNavbar({ sidebarOpen, setSidebarOpen }) {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   // ডাইনামিক রোল কালার (আগের সাইডবারের মতো)
//   const roleColor =
//     user?.role === "admin"
//       ? "bg-red-50 text-red-500 border-red-200"
//       : user?.role === "creator"
//         ? "bg-violet-50 text-violet-600 border-violet-200"
//         : "bg-sky-50 text-sky-500 border-sky-200";

//   return (
//     <header
//       className="
//         fixed top-0 left-0 right-0 z-40
//         h-16 border-b border-slate-200
//         bg-white/85 backdrop-blur-md
//         shadow-sm lg:hidden
//       "
//     >
//       <div className="flex h-full items-center justify-between px-4 lg:px-8">
//         {/* Left: Mobile Menu Button (1/3 width to keep center aligned) */}
//         <div className="flex flex-1 items-center justify-start">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="
//               flex h-10 w-10 items-center justify-center rounded-xl
//               border border-slate-200 bg-slate-50 text-slate-600
//               transition-all duration-200 hover:bg-violet-50
//               hover:text-violet-600 hover:border-violet-200 active:scale-95
//             "
//           >
//             <motion.div
//               initial={false}
//               animate={{ rotate: sidebarOpen ? 180 : 0 }}
//               transition={{ duration: 0.25 }}
//             >
//               {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
//             </motion.div>
//           </button>
//         </div>

//         {/* Center: Logo (1/3 width) */}
//         <div className="flex flex-1 items-center justify-center">
//           <DashboardLogo />
//         </div>

//         {/* Right: User Profile (1/3 width) */}
//         <div className="flex flex-1 items-center justify-end">
//           <div className="hidden items-center gap-3 md:flex">
//             {/* User Details */}
//             <div className="text-right">
//               <p className="text-sm font-bold text-slate-900 leading-tight">
//                 {user?.name || "User"}
//               </p>
//               <p
//                 className={`mt-0.5 inline-block rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${roleColor}`}
//               >
//                 {user?.role || "USER"}
//               </p>
//             </div>

//             {/* User Avatar */}
//             <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-violet-200 shadow-sm bg-white">
//               <Image
//                 src={user?.image || "https://i.pravatar.cc/150?img=12"}
//                 alt={user?.name || "User"}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";

import { authClient } from "@/lib/auth-client";
import DashboardLogo from "./DashboardLogo";

export default function DashboardNavbar({ sidebarOpen, setSidebarOpen }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Dynamic Role Colors
  const roleColor =
    user?.role === "admin"
      ? "bg-red-50 text-red-500 border-red-200"
      : user?.role === "creator"
        ? "bg-violet-50 text-violet-600 border-violet-200"
        : "bg-sky-50 text-sky-500 border-sky-200";

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-40 
        h-16 border-b border-slate-200 
        bg-white/85 backdrop-blur-md 
        shadow-sm lg:hidden
      "
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-8">
        {/* Left: Mobile Menu Toggle */}
        <div className="flex flex-1 items-center justify-start">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="
              flex h-10 w-10 items-center justify-center rounded-xl 
              border border-slate-200 bg-slate-50 text-slate-600 
              transition-colors duration-200 focus:outline-none 
              hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200 
              active:scale-95
            "
            aria-label="Toggle Dashboard Menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex flex-1 items-center justify-center">
          <DashboardLogo />
        </div>

        {/* Right: User Profile (Hidden on very small screens, visible on md) */}
        <div className="flex flex-1 items-center justify-end">
          <div className="hidden items-center gap-3 md:flex">
            {/* User Details */}
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 leading-tight">
                {user?.name || "User"}
              </p>
              <p
                className={`mt-0.5 inline-block rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${roleColor}`}
              >
                {user?.role || "USER"}
              </p>
            </div>

            {/* User Avatar */}
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-violet-200 shadow-sm bg-white">
              <Image
                src={user?.image || "https://i.pravatar.cc/150?img=12"}
                alt={user?.name || "User"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
