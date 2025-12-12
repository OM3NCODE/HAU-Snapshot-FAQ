import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TraitPrizeMapping } from "@/data/traitPrizeMapping";

interface PrizeCardProps {
  prize: TraitPrizeMapping;
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
            <h3 className="font-sugar text-[#FFB800] text-2xl md:text-3xl mb-2 tracking-wider">
              {" "}
              {/* Golden yellow text */}
              PRIZE
            </h3>

            {/* Prize Image */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2">
              <Image
                src={prize.prizeImage}
                alt={prize.prizeName}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Prize Name */}
            <p className="font-luckiest text-[#FFB800] text-base md:text-lg text-center uppercase tracking-wide">
              {" "}
              {/* Golden yellow text */}
              {prize.prizeName}
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
            <h3 className="font-sugar text-[#1A1A1A] text-2xl md:text-3xl mb-2 tracking-wider">
              {" "}
              {/* Dark text */}
              TRAIT
            </h3>

            {/* Trait Icon */}
            <div className="relative w-14 h-14 md:w-16 md:h-16 mb-2">
              <Image
                src={prize.traitIcon}
                alt={prize.traitName}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Trait Name */}
            <p className="font-luckiest text-[#1A1A1A] text-base md:text-lg text-center uppercase tracking-wide">
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
