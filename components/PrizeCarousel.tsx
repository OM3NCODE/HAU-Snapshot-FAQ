import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TraitPrizeMapping } from "@/data/traitPrizeMapping";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import PrizeCard from "./PrizeCard";

interface PrizeCarouselProps {
  prizes: TraitPrizeMapping[];
  onClaimClick: () => void;
  showInfo: boolean;
  setShowInfo: (show: boolean) => void;
}

export default function PrizeCarousel({ prizes, onClaimClick, showInfo, setShowInfo }: PrizeCarouselProps) {
  const itemsPerPage = 6;
  const [pageIndex, setPageIndex] = useState(0);

  const nextSlide = () => {
    const nextStart = (pageIndex + 1) * itemsPerPage;
    if (nextStart < prizes.length) {
      setPageIndex(pageIndex + 1);
    }
  };

  const prevSlide = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const start = pageIndex * itemsPerPage;
  const visiblePrizes = prizes.slice(start, start + itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="relative w-full max-w-[1127px] mb-8 md:mb-12 z-20" // Figma width: 1127px
    >
      {/* Purple container background with diamond gradient and drop shadow */}
      <div 
        className="rounded-3xl p-6 md:p-8 lg:p-10 relative min-h-[539px]" // Figma height: 539px
        style={{
          background: "radial-gradient(ellipse at center, #9F00FF 0%, #5F0099 100%)", // Diamond gradient: #9F00FF to #5F0099
          boxShadow: "0px 14.3px 14.3px rgba(42, 0, 67, 0.3)", // Drop shadow: #2A0043 at 30% opacity, blur 14.3px
        }}
      >
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={pageIndex === 0}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-2 md:p-3 transition-all" // Semi-transparent white
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />{" "}
          {/* White icon */}
        </button>
        <button
          onClick={nextSlide}
          disabled={(pageIndex + 1) * itemsPerPage >= prizes.length}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-2 md:p-3 transition-all" // Semi-transparent white
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />{" "}
          {/* White icon */}
        </button>
        {/* Cards Grid - 2 rows of 3 cards (Figma card size: 301x187) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 sm:px-8 md:px-12 justify-items-center mb-6">
          {visiblePrizes.map((prize, idx) => (
            <motion.div
              key={prize.traitName}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="w-full h-[187px] flex justify-center" // Figma card dimensions: 301w x 187h (width is responsive, height fixed)
              style={{
                maxWidth: "301px", // Figma card width: 301px
              }}
            >
              <PrizeCard prize={prize} />
            </motion.div>
          ))}
        </div>

        {/* CLAIM NOW BUTTON - Inside carousel */}
        <div className="flex justify-center pb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClaimClick}
            className="font-luckiest text-[#1A1A1A] px-12 md:px-16 py-3 md:py-4 rounded-xl border-4 border-[#FF9500] transition-all uppercase hover:bg-[#FFB800]" // Dark text, orange border, hover: lighter golden
            style={{
              fontSize: "24px", // Font size: 24px
              letterSpacing: "-0.01em", // Letter spacing: -1%
              backgroundColor: "#F2A900", // Background color: #F2A900
              boxShadow: "0px 16px 16px rgba(242, 169, 0, 0.3)", // Drop shadow: #F2A900 at 30% opacity, blur 16px
            }}
          >
            CLAIM NOW
          </motion.button>
        </div>

        {/* INFO ICON - Bottom left of carousel */}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-40">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-[#FFB800] rounded-full p-2 hover:bg-[#FFC500] transition-colors"> {/* Golden yellow circle */}
              <Info className="w-5 h-5 text-[#1A1A1A]" /> {/* Dark icon */}
            </div>
          </button>

          {/* Info text - appears when icon is clicked */}
          <AnimatePresence>
            {showInfo && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="font-luckiest text-white text-xs md:text-sm italic tracking-wide mt-2 w-max" // White text
              >
                Tap on any card to see which trait earned that prize
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
