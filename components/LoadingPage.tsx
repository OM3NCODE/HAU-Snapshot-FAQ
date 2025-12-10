"use client";

import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";

interface LoadingPageProps {
  message?: string;
  showCharacters?: boolean;
}

export default function LoadingPage({ 
  message = "Checking your wallet...", 
  showCharacters = true 
}: LoadingPageProps) {
  
  return (
    <div className="relative flex flex-col flex-grow w-full overflow-x-hidden min-h-screen">
      
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 w-full mx-auto px-5">
        
        {/* ANIMATED BACKGROUND ELEMENTS */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-[#FF00FC]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-[#00FFFF]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        />

        {/* MAIN LOADING CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative z-20 flex flex-col items-center gap-8"
        >
          <LoadingSpinner message={message} showCharacter={showCharacters} />
        </motion.div>

      </main>

      {/* LEFT CHARACTER */}
      {showCharacters && (
        <motion.div 
          className="fixed bottom-0 left-0 z-20 pointer-events-none"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Empty or use a different asset if desired */}
        </motion.div>
      )}

      {/* RIGHT CHARACTER */}
      {showCharacters && (
        <motion.div 
          className="fixed bottom-0 right-0 z-20 pointer-events-none"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Can add character here if needed */}
        </motion.div>
      )}
    </div>
  );
}
