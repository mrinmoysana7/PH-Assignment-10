// "use client";

// import { motion } from "framer-motion";

// const models = [
//   {
//     name: "GPT-4",
//     angle: 0,
//   },
//   {
//     name: "Claude",
//     angle: 72,
//   },
//   {
//     name: "Gemini",
//     angle: 144,
//   },
//   {
//     name: "Llama",
//     angle: 216,
//   },
//   {
//     name: "Mistral",
//     angle: 288,
//   },
// ];

// export default function BannerLoading() {
//   return (
//     <section className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950">
//       {/* Background Grid */}

//       <div
//         className="absolute inset-0 opacity-[0.05]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
//           backgroundSize: "45px 45px",
//         }}
//       />

//       {/* Glow */}

//       <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[180px]" />

//       <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[180px]" />

//       {/* Orbital Loader */}

//       <div className="relative flex h-[420px] w-[420px] items-center justify-center">
//         {/* Outer Ring */}

//         <motion.div
//           animate={{
//             rotate: 360,
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 22,
//             ease: "linear",
//           }}
//           className="
//             absolute
//             h-[340px]
//             w-[340px]
//             rounded-full
//             border
//             border-violet-500/20
//           "
//         >
//           {models.map((model) => (
//             <div
//               key={model.name}
//               className="absolute left-1/2 top-1/2"
//               style={{
//                 transform: `
//                   rotate(${model.angle}deg)
//                   translateY(-170px)
//                 `,
//               }}
//             >
//               <div
//                 className="
//                   -translate-x-1/2
//                   rounded-full
//                   border
//                   border-white/10
//                   bg-white/10
//                   px-4
//                   py-2
//                   text-xs
//                   font-semibold
//                   text-white
//                   backdrop-blur-xl
//                 "
//               >
//                 {model.name}
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         {/* Inner Ring */}

//         <motion.div
//           animate={{
//             rotate: -360,
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 15,
//             ease: "linear",
//           }}
//           className="
//             absolute
//             h-[240px]
//             w-[240px]
//             rounded-full
//             border
//             border-cyan-400/20
//           "
//         />

//         {/* AI Core */}

//         <motion.div
//           animate={{
//             scale: [1, 1.08, 1],
//             boxShadow: [
//               "0 0 30px rgba(139,92,246,.35)",
//               "0 0 90px rgba(139,92,246,.75)",
//               "0 0 30px rgba(139,92,246,.35)",
//             ],
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 2.8,
//           }}
//           className="
//             relative
//             flex
//             h-36
//             w-36
//             items-center
//             justify-center
//             rounded-full
//             border
//             border-violet-400/40
//             bg-gradient-to-br
//             from-violet-600
//             via-purple-600
//             to-blue-600
//           "
//         >
//           {/* Core Glow */}

//           <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-xl" />

//           {/* Center Text */}

//           <div className="relative text-center">
//             <h2 className="text-2xl font-black tracking-wide text-white">AI</h2>

//             <p className="mt-1 text-xs uppercase tracking-[0.35em] text-violet-100">
//               Core
//             </p>
//           </div>
//         </motion.div>
//         {/* Floating Particles */}

//         {[...Array(18)].map((_, index) => (
//           <motion.div
//             key={index}
//             animate={{
//               y: [0, -40, 0],
//               x: [0, 20, 0],
//               opacity: [0.2, 1, 0.2],
//               scale: [0.8, 1.2, 0.8],
//             }}
//             transition={{
//               repeat: Infinity,
//               duration: 3 + index * 0.2,
//               delay: index * 0.15,
//             }}
//             className="absolute h-2 w-2 rounded-full bg-violet-300"
//             // style={{
//             //   left: `${15 + Math.random() * 70}%`,
//             //   top: `${15 + Math.random() * 70}%`,
//             // }}
//           />
//         ))}
//       </div>

//       {/* Heading */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 30,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           delay: 0.3,
//         }}
//         className="absolute bottom-36 text-center"
//       >
//         <h1 className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-5xl font-black text-transparent">
//           PromptVerse
//         </h1>

//         <p className="mt-4 text-lg text-slate-300">
//           Initializing AI Workspace...
//         </p>
//       </motion.div>

//       {/* Progress */}

//       <div className="absolute bottom-20 w-[320px]">
//         <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
//           <span>Loading Experience</span>

//           <span>100%</span>
//         </div>

//         <div className="h-2 overflow-hidden rounded-full bg-white/10">
//           <motion.div
//             initial={{
//               width: 0,
//             }}
//             animate={{
//               width: "100%",
//             }}
//             transition={{
//               duration: 3,
//               ease: "easeInOut",
//             }}
//             className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
//           />
//         </div>
//       </div>

//       {/* Bottom Glass Panel */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 20,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           delay: 0.6,
//         }}
//         className="
//           absolute
//           bottom-6
//           rounded-full
//           border
//           border-white/10
//           bg-white/5
//           px-6
//           py-3
//           backdrop-blur-xl
//         "
//       >
//         <div className="flex items-center gap-3">
//           <motion.div
//             animate={{
//               scale: [1, 1.4, 1],
//               opacity: [0.4, 1, 0.4],
//             }}
//             transition={{
//               repeat: Infinity,
//               duration: 1.2,
//             }}
//             className="h-3 w-3 rounded-full bg-emerald-400"
//           />

//           <p className="text-sm text-slate-300">
//             Preparing premium AI prompts...
//           </p>
//         </div>
//       </motion.div>
//     </section>
//   );
// }
