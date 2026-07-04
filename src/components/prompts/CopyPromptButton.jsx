// "use client";

// import { useState } from "react";

// import toast from "react-hot-toast";

// // import { Copy, Check } from "lucide-react";

// import { Button } from "@heroui/react";

// import { incrementCopyCount } from "@/lib/api/prompts";
// import { Check, Copy } from "@gravity-ui/icons";

// export default function CopyPromptButton({
//   promptId,
//   promptContent,
//   onCopied,
// }) {
//   const [loading, setLoading] = useState(false);

//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       setLoading(true);

//       // Copy prompt

//       await navigator.clipboard.writeText(promptContent);

//       // Backend update

//       const result = await incrementCopyCount(promptId);

//       if (result.success) {
//         onCopied?.(result.copyCount);

//         toast.success(result.message);
//       }

//       setCopied(true);

//       setTimeout(() => {
//         setCopied(false);
//       }, 1800);
//     } catch (error) {
//       console.error(error);

//       toast.error("Failed to copy prompt.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button
//       size="sm"
//       variant="flat"
//       isLoading={loading}
//       onPress={handleCopy}
//       className="
//         bg-slate-100
//         text-slate-700
//         font-medium
//         px-3
//         py-1
//         rounded-lg
//         border
//         border-slate-200
//         hover:bg-slate-200
//         transition-colors
//       "
//     >
//       <div className="flex items-center gap-1">
//         {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
//         {copied ? "Copied" : "Copy"}
//       </div>
//     </Button>
//   );
// }

"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import { Button } from "@heroui/react";

import { Check, Copy } from "@gravity-ui/icons";

import { incrementCopyCount } from "@/lib/api/prompts";

export default function CopyPromptButton({
  promptId,
  promptContent,
  onCopied,
}) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      setLoading(true);

      // Copy prompt to clipboard
      await navigator.clipboard.writeText(promptContent);

      // Update backend copy count
      const result = await incrementCopyCount(promptId);

      if (!result.success) {
        toast.error(result.message || "Copy failed.");
        return;
      }

      // Update parent state instantly
      onCopied?.(result.copyCount);

      setCopied(true);

      toast.success("Prompt copied successfully!");

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error(error);

      toast.error("Failed to copy prompt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="flat"
      isLoading={loading}
      onPress={handleCopy}
      className="
        bg-slate-100
        text-slate-700
        font-medium
        px-3
        py-1
        rounded-lg
        border
        border-slate-200
        hover:bg-slate-200
        transition-colors
        cursor-pointer
      "
    >
      <div className="flex items-center gap-1">
        {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
        {copied ? "Copied" : "Copy"}
      </div>
    </Button>
  );
}
