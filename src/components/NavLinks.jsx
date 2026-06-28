import Link from "next/link";

export const NavLinks = ({ href, children, isActive, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`text-sm font-medium transition-colors ${
        isActive
          ? "text-indigo-400 font-semibold"
          : "text-white hover:text-indigo-400"
      }`}
    >
      {children}
    </Link>
  );
};
