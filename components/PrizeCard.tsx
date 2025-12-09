import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Prize } from "@/types";

interface PrizeCardProps {
  prize: Prize;
}

export default function PrizeCard({ prize }: PrizeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseLeave={() => setIsFlipped(false)} // Flip back when cursor leaves
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          // FRONT OF CARD
          <motion.div
            key="front"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full bg-[#2A2A2A] rounded-2xl p-4 flex flex-col items-center justify-center border-2 border-[#3A3A3A]" // Dark gray background
            style={{
              boxShadow: "0px 14.3px 14.3px rgba(42, 0, 67, 0.3)", // Drop shadow: #2A0043 at 30% opacity, blur 14.3px
            }}
          >
            {/* "PRIZE" text at top */}
            <h3 className="font-sugar text-[#FFB800] text-xl md:text-2xl mb-2 tracking-wider">
              {" "}
              {/* Golden yellow text */}
              PRIZE
            </h3>

            {/* Prize Image */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
              <Image
                src={prize.prizeImage}
                alt={prize.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Prize Name */}
            <p className="font-luckiest text-[#FFB800] text-sm md:text-base text-center uppercase tracking-wide">
              {" "}
              {/* Golden yellow text */}
              {prize.name}
            </p>
          </motion.div>
        ) : (
          // BACK OF CARD
          <motion.div
            key="back"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full bg-[#FFB800] rounded-2xl p-4 flex flex-col items-center justify-center border-2 border-[#FF9500]" // Golden yellow background with orange border
            style={{
              boxShadow: "0px 14.3px 14.3px rgba(42, 0, 67, 0.3)", // Drop shadow: #2A0043 at 30% opacity, blur 14.3px
            }}
          >
            {/* "TRAIT" text at top */}
            <h3 className="font-sugar text-[#1A1A1A] text-xl md:text-2xl mb-2 tracking-wider">
              {" "}
              {/* Dark text */}
              TRAIT
            </h3>

            {/* Trait Icons */}
            <div className="flex gap-2 mb-2">
              {prize.traitIcons.map((icon, idx) => (
                <div key={idx} className="relative w-10 h-10 md:w-12 md:h-12">
                  <Image
                    src={icon}
                    alt="trait icon"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* Trait Name */}
            <p className="font-luckiest text-[#1A1A1A] text-sm md:text-base text-center uppercase tracking-wide">
              {" "}
              {/* Dark text */}
              {prize.traitName}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
