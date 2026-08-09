// "use client";

// import { motion } from "framer-motion";

// interface LoadingProgressProps {
//   progress: number;
// }

// export default function LoadingProgress({
//   progress,
// }: LoadingProgressProps) {
//   return (
//     <div className="mx-auto w-full max-w-xl">
//       {/* Percentage */}

//       <div className="mb-3 flex items-center justify-between">
//         <p className="text-sm font-medium text-slate-500">
//           AI Processing
//         </p>

//         <motion.span
//           key={progress}
//           initial={{
//             scale: 1.15,
//             opacity: 0,
//           }}
//           animate={{
//             scale: 1,
//             opacity: 1,
//           }}
//           className="text-lg font-bold text-emerald-600"
//         >
//           {progress}%
//         </motion.span>
//       </div>

//       {/* Progress */}

//       <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
//         <motion.div
//           animate={{
//             width: `${progress}%`,
//           }}
//           transition={{
//             ease: "easeOut",
//           }}
//           className="relative h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500"
//         >
//           <motion.div
//             animate={{
//               x: ["-100%", "250%"],
//             }}
//             transition={{
//               repeat: Infinity,
//               duration: 1.6,
//               ease: "linear",
//             }}
//             className="absolute inset-y-0 w-20 -skew-x-12 bg-white/40"
//           />
//         </motion.div>
//       </div>

//       {/* Status */}

//       <motion.p
//         key={progress}
//         initial={{
//           opacity: 0,
//           y: 6,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         className="mt-5 text-center text-sm text-slate-500"
//       >
//         {progress < 30 &&
//           "Analyzing your responses..."}

//         {progress >= 30 &&
//           progress < 60 &&
//           "Understanding your mental patterns..."}

//         {progress >= 60 &&
//           progress < 90 &&
//           "Generating AI recommendations..."}

//         {progress >= 90 &&
//           progress < 100 &&
//           "Almost done..."}

//         {progress === 100 &&
//           "Redirecting to your report..."}
//       </motion.p>
//     </div>
//   );
// }