// // "use client";

// // import { motion } from "framer-motion";
// // import HeroSearchBar from "./HeroSearchBar";
// // import TrendingTags from "./TrendingTags";
// // import FloatingCard from "./FloatingCard";
// // import HeroStats from "./HeroStats";
// // import HeroOrb from "./HeroOrb";
// // import Link from "next/link";

// // const particles = [
// //   { left: "10%", top: "20%" },
// //   { left: "30%", top: "40%" },
// //   { left: "50%", top: "15%" },
// //   { left: "70%", top: "65%" },
// //   { left: "90%", top: "30%" },
// // ];

// // export default function HeroSection() {
// //   return (
// //     <section className="relative overflow-hidden bg-white py-27">
// //       {/* Background Glow */}
// //       <div className="absolute left-1/2 top-20 h-150 w-150 -translate-x-1/2 rounded-full bg-violet-400/20 blur-[140px]" />

// //       {/* Orbital Circles */}
// //       <div className="absolute left-1/2 top-40 h-225 w-225 -translate-x-1/2 rounded-full border border-violet-100" />

// //       <div className="absolute left-1/2 top-52 h-175 w-175 -translate-x-1/2 rounded-full border border-blue-100" />

// //       {particles.map((particle, index) => (
// //         <motion.span
// //           key={index}
// //           className="absolute h-2 w-2 rounded-full bg-violet-400"
// //           style={{
// //             left: particle.left,
// //             top: particle.top,
// //           }}
// //           animate={{
// //             y: [0, -15, 0],
// //             opacity: [0.4, 1, 0.4],
// //           }}
// //           transition={{
// //             duration: 4 + index,
// //             repeat: Infinity,
// //           }}
// //         />
// //       ))}

// //       <div className="container relative z-10 mx-auto px-4">
// //         <FloatingCard
// //           title="Prompt Power"
// //           description="Create amazing AI prompts."
// //           icon="⚡"
// //           className="left-10 top-32"
// //         />

// //         <FloatingCard
// //           title="Automate"
// //           description="Save hours every day."
// //           icon="⚙️"
// //           className="right-10 top-32"
// //         />

// //         <FloatingCard
// //           title="AI Assistant"
// //           description="Your creative partner."
// //           icon="🤖"
// //           className="left-5 bottom-80"
// //         />

// //         <FloatingCard
// //           title="Create"
// //           description="Turn ideas into content."
// //           icon="✏️"
// //           className="right-5 bottom-80"
// //         />

// //         <div className="mx-auto max-w-5xl text-center">
// //           <motion.div
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="inline-flex rounded-full border border-violet-200 bg-white px-5 py-2 shadow-md"
// //           >
// //             <span className="text-sm font-medium text-violet-600">
// //               ✨ Your Ideas. Limitless Possibilities.
// //             </span>
// //           </motion.div>

// //           <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
// //             Unlock the <br />
// //             True Potential of
// //             <br />
// //             <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
// //               Generative AI
// //             </span>
// //           </h1>

// //           <p className="mx-auto mt-6 max-w-3xl leading-6 text-md md:text-lg text-gray-500">
// //             Discover, create, and share powerful AI prompts. Boost productivity,
// //             automate workflows and spark creativity.
// //           </p>

// //           <HeroSearchBar />

// //           <TrendingTags />

// //           <div className="flex gap-5 justify-center">
// //             <Link href="/prompts">
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="mt-10 rounded-2xl bg-linear-to-r text-sm md:text-lg from-violet-600 to-blue-600 px-4.5 sm:px-5 md:px-10 py-4 font-semibold text-white shadow-xl"
// //             >
// //               Explore Prompts →
// //             </motion.button>
// //           </Link>

// //           <Link href="/prompts">
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="mt-10 rounded-2xl border text-sm md:text-lg border-purple-600 bg-transparent px-4.5 sm:px-5 md:px-10 py-4 font-semibold shadow-xl"
// //             >
// //               Become a Creator
// //             </motion.button>
// //           </Link>
// //           </div>

// //           <p className="mt-4 text-gray-500">
// //             Join thousands of creators and innovators
// //           </p>

// //           <HeroOrb />

// //           <HeroStats />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { motion } from "framer-motion";
// import HeroSearchBar from "./HeroSearchBar";
// import TrendingTags from "./TrendingTags";
// import FloatingCard from "./FloatingCard";
// import HeroStats from "./HeroStats";
// import HeroOrb from "./HeroOrb";
// import Link from "next/link";

// const particles = [
//   { left: "10%", top: "20%" },
//   { left: "30%", top: "40%" },
//   { left: "50%", top: "15%" },
//   { left: "70%", top: "65%" },
//   { left: "90%", top: "30%" },
// ];

// // Staggered container for main content
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.1,
//     },
//   },
// };

// // Smooth spring animation for individual items
// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 80,
//       damping: 15,
//     },
//   },
// };

// // Continuous floating animation for cards
// const floatingCardVariants = (delay) => ({
//   hidden: { opacity: 0, scale: 0.8, y: 20 },
//   show: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       delay: delay,
//     },
//   },
// });

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-white py-27">
//       {/* Background Glow */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 2, ease: "easeOut" }}
//         className="absolute left-1/2 top-20 h-150 w-150 -translate-x-1/2 rounded-full bg-violet-400/20 blur-[140px]"
//       />

//       {/* Orbital Circles - Added slow rotation for a premium feel */}
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//         className="absolute left-1/2 top-40 h-225 w-225 -translate-x-1/2 rounded-full border border-violet-100/60 border-dashed"
//       />

//       <motion.div
//         animate={{ rotate: -360 }}
//         transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
//         className="absolute left-1/2 top-52 h-175 w-175 -translate-x-1/2 rounded-full border border-blue-100/60 border-dashed"
//       />

//       {/* Floating Particles */}
//       {particles.map((particle, index) => (
//         <motion.span
//           key={index}
//           className="absolute h-2 w-2 rounded-full bg-violet-400"
//           style={{
//             left: particle.left,
//             top: particle.top,
//           }}
//           initial={{ opacity: 0 }}
//           animate={{
//             y: [0, -20, 0],
//             opacity: [0.2, 0.8, 0.2],
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             duration: 4 + index,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: index * 0.5,
//           }}
//         />
//       ))}

//       <div className="container relative z-10 mx-auto px-4">
//         {/* Floating Cards with distinct entrance delays */}
//         <motion.div
//           variants={floatingCardVariants(0.2)}
//           initial="hidden"
//           animate="show"
//           className="absolute left-10 top-32 z-20 hidden lg:block"
//         >
//           <FloatingCard
//             title="Prompt Power"
//             description="Create amazing AI prompts."
//             icon="⚡"
//           />
//         </motion.div>

//         <motion.div
//           variants={floatingCardVariants(0.4)}
//           initial="hidden"
//           animate="show"
//           className="absolute right-10 top-32 z-20 hidden lg:block"
//         >
//           <FloatingCard
//             title="Automate"
//             description="Save hours every day."
//             icon="⚙️"
//           />
//         </motion.div>

//         <motion.div
//           variants={floatingCardVariants(0.6)}
//           initial="hidden"
//           animate="show"
//           className="absolute left-5 bottom-80 z-20 hidden lg:block"
//         >
//           <FloatingCard
//             title="AI Assistant"
//             description="Your creative partner."
//             icon="🤖"
//           />
//         </motion.div>

//         <motion.div
//           variants={floatingCardVariants(0.8)}
//           initial="hidden"
//           animate="show"
//           className="absolute right-5 bottom-80 z-20 hidden lg:block"
//         >
//           <FloatingCard
//             title="Create"
//             description="Turn ideas into content."
//             icon="✏️"
//           />
//         </motion.div>

//         {/* Main Content Container with Staggered Animations */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="show"
//           className="mx-auto max-w-5xl text-center relative z-30"
//         >
//           {/* Badge */}
//           <motion.div variants={itemVariants}>
//             <div className="inline-flex rounded-full border border-violet-200 bg-white/80 backdrop-blur-md px-5 py-2 shadow-sm transition-colors hover:border-violet-300">
//               <span className="text-sm font-semibold text-violet-700 tracking-wide">
//                 ✨ Your Ideas. Limitless Possibilities.
//               </span>
//             </div>
//           </motion.div>

//           {/* Headline */}
//           <motion.h1
//             variants={itemVariants}
//             className="mt-8 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
//           >
//             Unlock the <br />
//             True Potential of
//             <br />
//             <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
//               Generative AI
//             </span>
//           </motion.h1>

//           {/* Subheadline */}
//           <motion.p
//             variants={itemVariants}
//             className="mx-auto mt-6 max-w-2xl leading-relaxed text-md md:text-lg text-slate-500"
//           >
//             Discover, create, and share powerful AI prompts. Boost productivity,
//             automate workflows and spark creativity.
//           </motion.p>

//           {/* Interactive Elements wrapped in motion divs for staggering */}
//           <motion.div variants={itemVariants} className="mt-8">
//             <HeroSearchBar />
//           </motion.div>

//           <motion.div variants={itemVariants} className="mt-6">
//             <TrendingTags />
//           </motion.div>

//           {/* CTA Buttons */}
//           <motion.div
//             variants={itemVariants}
//             className="mt-10 flex gap-5 justify-center flex-wrap"
//           >
//             <Link href="/prompts">
//               <motion.button
//                 whileHover={{ scale: 1.03, translateY: -2 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="rounded-full bg-linear-to-r text-sm md:text-base from-violet-600 to-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40"
//               >
//                 Explore Prompts &rarr;
//               </motion.button>
//             </Link>

//             <Link href="/prompts">
//               <motion.button
//                 whileHover={{ scale: 1.03, translateY: -2 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="rounded-full border-2 text-sm md:text-base border-violet-200 bg-white/50 backdrop-blur-sm px-8 py-4 font-bold text-slate-700 shadow-sm transition-all hover:border-violet-300 hover:bg-white hover:shadow-md"
//               >
//                 Become a Creator
//               </motion.button>
//             </Link>
//           </motion.div>

//           <motion.p
//             variants={itemVariants}
//             className="mt-6 text-sm font-medium text-slate-400"
//           >
//             Join thousands of creators and innovators
//           </motion.p>

//           {/* Footer Hero Elements */}
//           <motion.div variants={itemVariants} className="mt-12">
//             <HeroOrb />
//           </motion.div>

//           <motion.div variants={itemVariants} className="mt-8">
//             <HeroStats />
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import HeroSearchBar from "./HeroSearchBar";
import TrendingTags from "./TrendingTags";
import FloatingCard from "./FloatingCard";
import HeroStats from "./HeroStats";
import HeroOrb from "./HeroOrb";
import Link from "next/link";

const particles = [
  { left: "10%", top: "20%" },
  { left: "30%", top: "40%" },
  { left: "50%", top: "15%" },
  { left: "70%", top: "65%" },
  { left: "90%", top: "30%" },
];

// Staggered container for main content
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Smooth spring animation for individual items
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

// Continuous floating animation for cards
const floatingCardVariants = (delay) => ({
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      delay: delay,
    },
  },
});

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-25 md:py-30">
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute left-1/2 top-20 h-150 w-150 -translate-x-1/2 rounded-full bg-violet-400/20 blur-[140px]"
      />

      {/* Orbital Circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-40 h-225 w-225 -translate-x-1/2 rounded-full border border-violet-100/60 border-dashed"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-52 h-175 w-175 -translate-x-1/2 rounded-full border border-blue-100/60 border-dashed"
      />

      {/* Floating Particles */}
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute h-2 w-2 rounded-full bg-violet-400"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-4">
        {/* 
          Floating Cards - FIXED POSITIONING 
          Using left-1/2 & translate-x anchors them to the center content 
          rather than the screen edges, preventing them from drifting away on wide screens.
        */}
        <motion.div
          variants={floatingCardVariants(0.2)}
          initial="hidden"
          animate="show"
          className="absolute left-2/5 top-35 z-20 hidden lg:block -translate-x-113 xl:-translate-x-145"
        >
          <FloatingCard
            title="Prompt Power"
            description="Create amazing AI prompts."
            icon="⚡"
          />
        </motion.div>

        <motion.div
          variants={floatingCardVariants(0.4)}
          initial="hidden"
          animate="show"
          className="absolute right-5/10 top-25 z-20 hidden lg:block translate-x-113 xl:translate-x-145"
        >
          <FloatingCard
            title="Automate"
            description="Save hours every day."
            icon="⚙️"
          />
        </motion.div>

        <motion.div
          variants={floatingCardVariants(0.6)}
          initial="hidden"
          animate="show"
          className="absolute left-3/10 bottom-120 z-20 hidden lg:block -translate-x-105 xl:-translate-x-135"
        >
          <FloatingCard
            title="AI Assistant"
            description="Your creative partner."
            icon="🤖"
          />
        </motion.div>

        <motion.div
          variants={floatingCardVariants(0.8)}
          initial="hidden"
          animate="show"
          className="absolute right-1/2 bottom-130 z-20 hidden lg:block translate-x105 xl:translate-x-135"
        >
          <FloatingCard
            title="Create"
            description="Turn ideas into content."
            icon="✏️"
          />
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-5xl text-center relative z-30"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex rounded-full border border-violet-200 bg-white/80 backdrop-blur-md px-5 py-2 shadow-sm transition-colors hover:border-violet-300">
              <span className="text-sm font-semibold text-violet-700 tracking-wide">
                ✨ Your Ideas. Limitless Possibilities.
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-8 text-[42px] sm:text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
          >
            Unlock the <br />
            True Potential of
            <br />
            <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
              Generative AI
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl leading-relaxed text-md md:text-lg text-slate-500"
          >
            Discover, create, and share powerful AI prompts. Boost productivity,
            automate workflows and spark creativity.
          </motion.p>

          {/* Interactive Elements */}
          <motion.div variants={itemVariants} className="mt-8">
            <HeroSearchBar />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6">
            <TrendingTags />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex gap-5 justify-center flex-wrap"
          >
            <Link href="/prompts">
              <motion.button
                whileHover={{ scale: 1.03, translateY: -2 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-linear-to-r text-sm md:text-base from-violet-600 to-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40"
              >
                Explore Prompts &rarr;
              </motion.button>
            </Link>

            <Link href="/prompts">
              <motion.button
                whileHover={{ scale: 1.03, translateY: -2 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border-2 text-sm md:text-base border-violet-200 bg-white/50 backdrop-blur-sm px-8 py-4 font-bold text-slate-700 shadow-sm transition-all hover:border-violet-300 hover:bg-white hover:shadow-md"
              >
                Become a Creator
              </motion.button>
            </Link>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-sm font-medium text-slate-400"
          >
            Join thousands of creators and innovators
          </motion.p>

          {/* Footer Hero Elements */}
          <motion.div variants={itemVariants} className="mt-12">
            <HeroOrb />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <HeroStats />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
