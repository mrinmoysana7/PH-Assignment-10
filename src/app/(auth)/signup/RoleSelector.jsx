// "use client";

// import { Person, Sparkles, Shield } from "@gravity-ui/icons";

// const roles = [
//   {
//     value: "user",
//     title: "User",
//     description: "Discover, copy and save AI prompts.",
//     icon: Person,
//     color: "violet",
//   },
//   {
//     value: "creator",
//     title: "Creator",
//     description: "Publish and manage your own prompts.",
//     icon: Sparkles,
//     color: "sky",
//   },
//   {
//     value: "admin",
//     title: "Admin",
//     description: "Platform management access.",
//     icon: Shield,
//     color: "emerald",
//     disabled: true,
//   },
// ];

// export default function RoleSelector({ role, setRole }) {
//   return (
//     <div className="space-y-3">
//       <label className="text-sm font-semibold text-default-700">
//         Choose Your Role
//       </label>

//       <div className="grid gap-4">
//         {roles.map((item) => {
//           const Icon = item.icon;

//           const selected = role === item.value;

//           return (
//             <button
//               key={item.value}
//               type="button"
//               disabled={item.disabled}
//               onClick={() => {
//                 if (!item.disabled) {
//                   setRole(item.value);
//                 }
//               }}
//               className={`
//                 group
//                 flex
//                 items-center
//                 gap-4
//                 rounded-2xl
//                 border
//                 bg-white
//                 p-4
//                 text-left
//                 transition-all
//                 duration-300

//                 ${
//                   selected
//                     ? "border-violet-500 ring-2 ring-violet-500/20 shadow-lg"
//                     : "border-default-200 hover:border-violet-300 hover:shadow-md"
//                 }

//                 ${
//                   item.disabled
//                     ? "cursor-not-allowed opacity-50"
//                     : "cursor-pointer"
//                 }
//               `}
//             >
//               {/* Icon */}

//               <div
//                 className={`
//                   flex
//                   h-12
//                   w-12
//                   items-center
//                   justify-center
//                   rounded-xl

//                   ${
//                     item.color === "violet"
//                       ? "bg-violet-100 text-violet-600"
//                       : item.color === "sky"
//                         ? "bg-sky-100 text-sky-600"
//                         : "bg-emerald-100 text-emerald-600"
//                   }
//                 `}
//               >
//                 <Icon width={22} />
//               </div>

//               {/* Content */}

//               <div className="flex-1">
//                 <h3 className="font-semibold text-default-900">{item.title}</h3>

//                 <p className="mt-1 text-sm text-default-500">
//                   {item.description}
//                 </p>
//               </div>

//               {/* Selection Indicator */}

//               <div
//                 className={`
//                   h-5
//                   w-5
//                   rounded-full
//                   border-2
//                   transition-all

//                   ${
//                     selected
//                       ? "border-violet-600 bg-violet-600"
//                       : "border-default-300"
//                   }
//                 `}
//               >
//                 {selected && (
//                   <div className="m-auto mt-0.75 h-2 w-2 rounded-full bg-white" />
//                 )}
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       <p className="text-xs text-default-500">
//         <span className="font-semibold">Note:</span> Admin accounts cannot be
//         created through the registration page.
//       </p>
//     </div>
//   );
// }

"use client";

import { Person, Sparkles } from "@gravity-ui/icons";

export default function RoleSelector({ role, setRole }) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-default-700">
        Select Role
      </label>

      <div className="grid grid-cols-2 rounded-2xl bg-default-100 p-1">
        <button
          type="button"
          onClick={() => setRole("user")}
          className={`
            flex
            h-12
            items-center
            justify-center
            gap-2
            rounded-xl
            text-sm
            font-semibold
            transition-all
            duration-300

            ${
              role === "user"
                ? "bg-white shadow text-violet-700"
                : "text-default-500 hover:text-default-800"
            }
          `}
        >
          <Person width={18} />
          User
        </button>

        <button
          type="button"
          onClick={() => setRole("creator")}
          className={`
            flex
            h-12
            items-center
            justify-center
            gap-2
            rounded-xl
            text-sm
            font-semibold
            transition-all
            duration-300

            ${
              role === "creator"
                ? "bg-white shadow text-violet-700"
                : "text-default-500 hover:text-default-800"
            }
          `}
        >
          <Sparkles width={18} />
          Creator
        </button>
      </div>
    </div>
  );
}
