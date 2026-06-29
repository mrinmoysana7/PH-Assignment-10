import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      {/* Logo */}
      <div className="relative flex h-10 w-10 items-center justify-center">
        <div
          className="absolute inset-0 rounded-2xl bg-linear-to-br from-violet-600 via-purple-500 to-blue-500shadow-lg shadow-violet-500/30 transition-all duration-300 group-hover:scale-110
        "
        />

        <svg
          viewBox="0 0 64 64"
          className="relative z-10 h-6 w-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chat Bubble */}
          <path
            d="
            M18 12
            C18 8 21 5 25 5
            H39
            C49 5 56 12 56 22
            V30
            C56 40 49 47 39 47
            H31
            L22 56
            V47
            C16 46 12 41 12 35
            V22
            C12 16 15 13 18 12Z
          "
            stroke="white"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Sparkle */}
          <path
            d="M38 17L39.8 21L44 22.8L39.8 24.6L38 29L36.2 24.6L32 22.8L36.2 21L38 17Z"
            fill="white"
          />

          <circle cx="28" cy="18" r="1.8" fill="white" />

          <circle cx="44" cy="15" r="1.4" fill="white" />
        </svg>
      </div>

      {/* Brand */}
      <div className="flex flex-col leading-none">
        <h1 className="text-3xl font-black tracking-tight">
          <span className="text-gray-900">Prompt</span>

          <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Verse
          </span>
        </h1>
      </div>
    </Link>
  );
}
