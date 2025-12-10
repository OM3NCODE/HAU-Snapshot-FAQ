"use client";
// Page for showing the prizes when the api call returns winning traits in the users wallet

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import PrizeCarousel from "@/components/PrizeCarousel";
import LoadingSpinner from "@/components/LoadingSpinner";
import { mockPrizes } from "@/data/prizes";

export default function PrizesPage() {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const prizes = mockPrizes; // Replace with actual API data

  // Check if user has any IRL prizes
  const hasIRLPrizes = prizes.some((prize) => prize.isIRL);

  // Handle claim button click
  const handleClaim = async () => {
    setIsLoading(true);
    
    // BACKEND IMPLEMENTATION NOTE:
    // When the user clicks the claim button and is redirected to the form,
    // show the loading screen with the message below.
    // 
    // TODO: Add API call here to validate/prepare form data
    // Example:
    // try {
    //   const response = await fetch('/api/prepare-form', {
    //     method: 'POST',
    //     body: JSON.stringify({ walletAddress, prizeIds: prizes.map(p => p.id) }),
    //   });
    //   const data = await response.json();
    //   // Use data as needed before navigation
    // } catch (error) {
    //   console.error("Error preparing form:", error);
    //   setIsLoading(false);
    //   return;
    // }

    if (hasIRLPrizes) {
      router.push("/IRL-Form");
    } else {
      router.push("/claim-prize/token-only");
    }
  };

  // Create particle elements for confetti burst effect
  const particles = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 0.3,
    duration: 2 + Math.random() * 1.5,
    x: (Math.random() * 200 - 100) * (Math.random() > 0.5 ? 1 : -1), // Larger spread
    y: (Math.random() * 200 - 100) * (Math.random() > 0.5 ? 1 : -1), // Larger spread
    rotation: Math.random() * 360,
  }));

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#1A071D] via-[#2D0D32] to-[#6D1A7A]"> {/* Purple gradient background */}
      
      {/* PARTICLE BURST EFFECT - Confetti burst on page load, in front of content but not blocking on mobile */}
      <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full"
            initial={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: 0,
              scale: 0,
              x: particle.x,
              y: particle.y,
              rotate: particle.rotation,
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
            }}
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-6px",
              marginTop: "-6px",
              background: `hsl(${Math.random() * 60 + 240}, 100%, 60%)`, // Random purple/pink hue
              boxShadow: "0 0 15px currentColor",
            }}
          />
        ))}
      </div>

      {/* FIXED CONFETTI DECORATIONS - Bottom corners, behind carousel */}
      <div className="fixed bottom-0 left-0 w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 z-0 pointer-events-none">
        <Image
          src="/assets/Congratulations/Confetti L.png"
          alt="Confetti"
          fill
          className="object-contain object-bottom-left"
          unoptimized
        />
      </div>
      <div className="fixed bottom-0 right-0 w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 z-0 pointer-events-none">
        <Image
          src="/assets/Congratulations/Confetti R.png"
          alt="Confetti"
          fill
          className="object-contain object-bottom-right"
          unoptimized
        />
      </div>

      <main className="relative flex flex-col items-center justify-start min-h-screen px-4 md:px-8 py-8 md:py-12 z-10">
        
        {/* SHOW LOADING SPINNER WHEN LOADING */}
        {isLoading ? (
          <div className="flex-grow flex flex-col items-center justify-center w-full">
            <LoadingSpinner 
              message="Preparing your form..." 
              showCharacter={true}
            />
          </div>
        ) : (
          <>
        
        {/* CHARACTER WITH HALO - Behind title but above background */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 mb-[-40px] md:mb-[-80px] z-10 pointer-events-none"
        >
          <Image
            src="/assets/Congratulations/HAUWEE CONG.png"
            alt="HAU Character"
            fill
            className="object-contain"
            unoptimized
            priority
          />
        </motion.div>

        {/* CONGRATULATIONS TITLE */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-sugar text-[44px] sm:text-[64px] md:text-[90px] lg:text-[120px] text-center leading-[0.85] tracking-widest relative z-20 px-4"
          style={{
            color: "#FFD700", // Golden yellow text
            WebkitTextStroke: "20px #FF00FC", // Pink stroke
            paintOrder: "stroke fill",
            filter: "drop-shadow(0px 0px 40px rgba(255, 0, 252, 0.7))", // Pink glow
            textShadow: "0 0 20px rgba(255, 0, 252, 0.6)", // Additional glow
          }}
        >
          CONGRATULATIONS!
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-luckiest text-white text-xs sm:text-sm md:text-base lg:text-lg text-center max-w-5xl uppercase tracking-widest leading-snug px-4 mt-[50px] mb-8 md:mb-12" // White text with 30px gap
          style={{
            fontSize: "clamp(10px, 2.5vw, 18px)", // Responsive font size
            WebkitTextStroke: "0.5px #000000", // Thin dark stroke for visibility
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.5)", // Dark shadow for contrast
          }}
        >
          YOUR WALLET GETS THE TOKENS PRIZES AUTOMATICALLY — BUT REAL-WORLD <br className="hidden sm:block" />
          GOODIES NEED A SHIPPING ADDRESS. CLICK CLAIM NOW TO LOCK THEM IN!
        </motion.p>

        {/* INFO TEXT WITH ICON - Now inside carousel */}
        <PrizeCarousel prizes={prizes} onClaimClick={handleClaim} showInfo={showInfo} setShowInfo={setShowInfo} />
          </>
        )}
      </main>
    </div>
  );
}
