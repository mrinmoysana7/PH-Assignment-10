import SavedPromptSkeleton from "@/components/prompts/SavedPromptSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto pt-35 w-full px-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <SavedPromptSkeleton key={index} />
      ))}
    </div>
  );
}

// "use client";

// import SavedPromptSkeleton from "@/components/prompts/SavedPromptSkeleton";
// import { useState, useEffect } from "react";

// export default function Loading() {
//   const [showSkeleton, setShowSkeleton] = useState(false);

//   useEffect(() => {
//     // Wait 300ms before showing the skeleton.
//     // If the actual data loads before 300ms, the user never sees a jarring flash of the skeleton.
//     const timer = setTimeout(() => {
//       setShowSkeleton(true);
//     }, 3000);

//     // Cleanup the timer if the component unmounts before the timeout finishes
//     return () => clearTimeout(timer);
//   }, []);

//   // Return nothing while we wait for the timeout
//   if (!showSkeleton) return null;

//   return (
//     <div className="max-w-7xl mx-auto pt-35 w-full px-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//       {[...Array(6)].map((_, index) => (
//         <SavedPromptSkeleton key={index} />
//       ))}
//     </div>
//   );
// }
