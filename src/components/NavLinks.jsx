import Link from "next/link";

export const NavLinks = ({ href, children, isActive, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`
        relative
        px-1
        py-2
        text-sm
        font-medium
        transition-all
        duration-300

        ${isActive ? "text-violet-600" : "text-gray-700 hover:text-violet-600"}
      `}
    >
      {children}

      {/* Active Underline */}
      <span
        className={`
          absolute
          -bottom-1
          left-0
          h-0.75
          rounded-full
          bg-linear-to-r
          from-violet-600
          to-blue-500
          transition-all
          duration-300

          ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}
        `}
      />
    </Link>
  );
};
