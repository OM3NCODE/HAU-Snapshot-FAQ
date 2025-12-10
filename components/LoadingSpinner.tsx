"use client";

import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import Image from "next/image";

interface LoadingSpinnerProps {
  message?: string;
  showCharacter?: boolean;
}

export default function LoadingSpinner({ 
  message = "Fetching your prizes...", 
  showCharacter = false 
}: LoadingSpinnerProps) {
  
  // Rotating circle animation
  const spinVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      } as any,
    },
  };

  // Pulsing glow animation
  const glowVariants: Variants = {
    animate: {
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 2,
        repeat: Infinity,
      } as any,
    },
  };

  // Bouncing dots animation
  const dotVariants: Variants = {
    animate: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        duration: 1.4,
        delay: i * 0.2,
        repeat: Infinity,
      } as any,
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* SPINNER */}
      <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px]">
        {/* Outer rotating ring */}
        <motion.div
          variants={spinVariants}
          animate="animate"
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FF00FC] border-r-[#00FFFF]"
        />

        {/* Middle rotating ring */}
        <motion.div
          variants={spinVariants}
          animate="animate"
          style={{ animationDirection: "reverse" }}
          className="absolute inset-2 rounded-full border-3 border-transparent border-b-[#D900FF]"
        />

        {/* Inner glowing circle */}
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute inset-4 rounded-full bg-[#FF00FC]/10 shadow-[0_0_30px_rgba(255,0,252,0.5)]"
        />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF00FC] to-[#00FFFF] shadow-[0_0_15px_rgba(255,0,252,0.8)]" />
        </div>
      </div>

      {/* MESSAGE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center px-6 py-4 rounded-xl border-2 border-[#FF00FC] bg-[#2D0A31]/50 shadow-[0_0_20px_rgba(255,0,252,0.3)]"
      >
        <h3 className="font-sugar text-[24px] md:text-[32px] text-white tracking-wider mb-2">
          {message}
        </h3>
        
        {/* Bouncing dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              variants={dotVariants}
              animate="animate"
              custom={i}
              className="w-2 h-2 rounded-full bg-[#FF00FC]"
            />
          ))}
        </div>
      </motion.div>

      {/* OPTIONAL CHARACTER */}
      {showCharacter && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
        >
          <Image
            src="/assets/Claim_Prize/Hauwee connect wallet.png"
            alt="Loading Character"
            fill
            className="object-contain object-bottom"
            unoptimized
          />
        </motion.div>
      )}
    </div>
  );
}
