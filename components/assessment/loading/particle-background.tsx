"use client";

import { motion } from "framer-motion";

const particles = [
  {
    size: 10,
    top: "12%",
    left: "18%",
    delay: 0,
    duration: 5,
  },
  {
    size: 14,
    top: "22%",
    right: "16%",
    delay: 0.6,
    duration: 6,
  },
  {
    size: 8,
    top: "48%",
    left: "10%",
    delay: 1,
    duration: 5.5,
  },
  {
    size: 16,
    bottom: "22%",
    right: "18%",
    delay: 1.3,
    duration: 7,
  },
  {
    size: 12,
    bottom: "12%",
    left: "22%",
    delay: 2,
    duration: 6,
  },
  {
    size: 9,
    top: "68%",
    left: "48%",
    delay: 2.4,
    duration: 5,
  },
  {
    size: 13,
    top: "36%",
    left: "72%",
    delay: 3,
    duration: 6,
  },
  {
    size: 11,
    bottom: "35%",
    right: "40%",
    delay: 3.5,
    duration: 7,
  },
];

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
            y: [0, -30, 0],
            x: [0, 12, -8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            rounded-full
            bg-gradient-to-r
            from-emerald-400
            via-cyan-400
            to-violet-400
            blur-[2px]
          "
          style={{
            width: particle.size,
            height: particle.size,
            top: particle.top,
            left: particle.left,
            right: particle.right,
            bottom: particle.bottom,
          }}
        />
      ))}

      {/* Large Glow */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-r
          from-emerald-500/20
          via-cyan-500/20
          to-violet-500/20
          blur-3xl
        "
      />
    </div>
  );
}