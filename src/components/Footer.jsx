"use client";

import Link from "next/link";
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#fafafa] px-5 pt-15 pb-40">
      {/* Background Watermark */}
      <div className="pointer-events-none absolute -bottom-15 flex justify-start w-full overflow-hidden">
        <h1 className="select-none text-[220px] font-bold leading-none text-gray-100">
          PromptVerse
        </h1>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="rounded-4xl border border-gray-200 bg-white px-10 py-12 shadow-[0_15px_100px_rgba(0,0,0,0.05)]">
          {/* Main Content */}
          <div className="grid gap-10 lg:grid-cols-4">
            {/* Left Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black">
                  <span className="text-lg font-bold text-white">P</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  PromptVerse
                </h3>
              </div>

              <p className="mt-5 max-w-md text-sm leading-7 text-gray-500">
                PromptVerse empowers creators, developers, and businesses to
                discover, share, and monetize high-quality AI prompts. Unlock
                creativity and productivity through community-driven prompt
                engineering.
              </p>

              {/* Social Icons */}
              <div className="mt-6 flex items-center gap-5">
                <Link
                  href="#"
                  className="text-gray-700 transition hover:text-black"
                >
                  <FaXTwitter size={18} />
                </Link>

                <Link
                  href="#"
                  className="text-gray-700 transition hover:text-black"
                >
                  <FaInstagram size={18} />
                </Link>

                <Link
                  href="#"
                  className="text-gray-700 transition hover:text-black"
                >
                  <FaLinkedinIn size={18} />
                </Link>

                <Link
                  href="#"
                  className="text-gray-700 transition hover:text-black"
                >
                  <FaGithub size={18} />
                </Link>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-5 text-sm font-semibold text-gray-900">
                Product
              </h4>

              <ul className="space-y-3">
                <li>
                  <Link
                    href="/explore"
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    Explore Prompts
                  </Link>
                </li>

                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    Pricing
                  </Link>
                </li>

                <li>
                  <Link
                    href="/marketplace"
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    Marketplace
                  </Link>
                </li>

                <li>
                  <Link
                    href="/categories"
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    Categories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-5 text-sm font-semibold text-gray-900">
                Resources
              </h4>

              <ul className="space-y-3">
                <li>
                  <Link
                    href="/docs"
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    Documentation
                  </Link>
                </li>

                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    href="/tutorials"
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    Tutorials
                  </Link>
                </li>

                <li>
                  <Link
                    href="/support"
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gray-200" />

          {/* Bottom Section */}
          <div className="flex flex-col items-start justify-between gap-5 text-sm text-gray-500 md:flex-row md:items-center">
            <div>
              <p>
                © 2026 PromptVerse. All rights reserved | Created with ❤️ by
                Mrinmoy Sana
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <Link href="/privacy-policy" className="hover:text-black">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-black">
                Terms of Service
              </Link>

              <Link href="/cookies" className="hover:text-black">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
