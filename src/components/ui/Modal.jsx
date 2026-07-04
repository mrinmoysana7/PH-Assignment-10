"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  width = "max-w-[700px]",
}) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-999
              bg-black/70
              backdrop-blur-md
            "
          />

          {/* Modal */}

          <div
            className="
              fixed
              inset-0
              z-1000
              flex
              items-center
              justify-center
              p-5
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.95,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
              className={`
                w-full
                ${width}
                overflow-hidden
                rounded-3xl
                border
                border-slate-700
                bg-[#0F172A]
                shadow-[0_25px_80px_rgba(0,0,0,0.55)]
              `}
            >
              {/* Header */}

              <div className="border-b border-slate-700 px-8 py-7">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {icon && (
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          bg-red-500/10
                          text-red-400
                        "
                      >
                        {icon}
                      </div>
                    )}

                    <div>
                      <h2 className="text-3xl font-bold text-white">{title}</h2>

                      {description && (
                        <p className="mt-2 text-base text-slate-400">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="
                      rounded-xl
                      p-2
                      text-slate-500
                      transition
                      hover:bg-slate-700
                      hover:text-white
                    "
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Body */}

              <div className="px-8 py-8">{children}</div>

              {/* Footer */}

              {footer && (
                <>
                  <div className="border-t border-slate-700" />

                  <div className="flex justify-end gap-4 px-8 py-6">
                    {footer}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
