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
