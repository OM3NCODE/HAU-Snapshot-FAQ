"use client";
// Connect wallet page in claiming prizes section [ENTRY FOR USER]
import { useState } from "react";
import { useRouter } from "next/navigation";
import BreathingItem from "@/components/Claim_Breathing_prizes";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ClaimPrizePage() {
    const router = useRouter();
    const[walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleConnect = async () => {
        setIsLoading(true);
        setWalletAddress("8x...42a");
        
        // BACKEND IMPLEMENTATION NOTE:
        // When wallet is connected, show loading spinner while fetching user's prize data
        // Replace the simulated timeout below with your actual API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2s API call
            
            // TODO: Replace with actual API call to check user's prizes
            
            router.push("/claim-prize/prizes"); // Navigate after API call completes
        } catch (error) {
            console.error("Error fetching prizes:", error);
            // TODO: Show error message to user if API fails
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col flex-grow w-full overflow-x-hidden">

            {/* SHOW LOADING SPINNER WHEN LOADING */}
            {isLoading ? (
                <main className="flex-grow flex flex-col items-center justify-center relative z-10 w-full mx-auto px-5">
                    <LoadingSpinner 
                        message="Checking your wallet..." 
                        showCharacter={true}
                    />
                </main>
            ) : (
                <>
            <main className="flex-grow flex flex-col items-center justify-center relative z-10 w-full mx-auto px-5">
                {/*Trophy Icon at the Top*/}
                <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative w-[240px] h-[240px] md:w-[350px] md:h-[300px] z-0 pointer-events-none -mt-[100px] md:-mt-[150px]"
                >
                    <Image
                        src="/assets/Claim_Prize/Trophy.png"
                        alt="Trophy Icon"
                        fill 
                        className="object-contain" 
                        unoptimized
                     />
                </motion.div>

                {/* BREATHING ITEMS CONTAINER - Behind Title */}
                <div className="relative w-full flex items-center justify-center pointer-events-none z-0">
                    <div className="absolute left-0 md:left-[5%] w-[120px] h-[240px] md:w-[325.8px] md:h-[325.8px] -mt-[60px] md:-mt-[100px]">
                        <BreathingItem 
                            imageA="/assets/Claim_Prize/HauShirt.png" 
                            imageB="/assets/Claim_Prize/Pengwine.png"       
                            className="rotate-[-15deg]"
                        />
                    </div>
                    
                    <div className="absolute right-0 md:right-[5%] w-[120px] h-[240px] md:w-[325.8px] md:h-[325.8px] -mt-[60px] md:-mt-[100px]">
                        <BreathingItem 
                            imageA="/assets/Claim_Prize/PengwineShirt.png" 
                            imageB="/assets/Claim_Prize/EmperorWine.png"
                            className="rotate-[15deg]"
                            delay={2} 
                        />
                    </div>
                </div>

                {/* TITLE: CLAIM YOUR PRIZE */}
                <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-sugar text-[60px] md:text-[100px] text-white text-center leading-[0.9] tracking-wider relative z-20 -mt-[40px] md:-mt-[60px]"
                style={{
                    WebkitTextStroke: "12px #FC00FF", 
                    paintOrder: "stroke fill",
                    filter: "drop-shadow(0px 0px 20px rgba(255, 0, 252, 0.5))"
                }}
                >
                CLAIM YOUR <br />
                <span className="text-white">PRIZE</span>
                </motion.h1>

             {/* SUBTITLE */}
            <p className="font-luckiest text-[14px] md:text-[18px] text-center mt-8 max-w-xl uppercase tracking-widest leading-relaxed text-white drop-shadow-md">
            Please connect your wallet to see what <br className="hidden md:block" />
            prizes you have won and claim it!
            </p>

            {/* CONNECT BUTTON */}
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConnect}
            disabled={isLoading}
            className="mt-8 bg-[#FF00FC] text-white font-luckiest text-[20px] px-8 py-3 rounded-xl shadow-[0_0_20px_#FF00FC] border-2 border-white/20 transition-all hover:bg-[#D900FF] uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
            </motion.button>
        
        </main>

      <motion.div 
        className="fixed bottom-0 left-0 z-20 pointer-events-none"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
         <Image 
            src="/assets/Claim_Prize/Byte_left.png" 
            alt="Character"
            width={400} 
            height={400}
            className="w-[80px] sm:w-[200px] md:w-[80px] lg:w-[200px] xl:w-[170px] 2xl:w-[200px] min-[1800px]:w-[350px] h-auto object-contain object-bottom transition-all duration-500 ease-in-out scale-x-[-1]"
            unoptimized
         />
      </motion.div>

      <motion.div 
        className="fixed bottom-0 right-0 z-20 pointer-events-none"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
         <Image 
            src="/assets/Claim_Prize/Hauwee connect wallet.png" 
            alt="Character"
            width={400} 
            height={400}
            className="w-[90px] sm:w-[120px] md:w-[180px] lg:w-[260px] xl:w-[350px] 2xl:w-[480px] min-[1800px]:w-[420px] h-auto object-contain object-bottom transition-all duration-500 ease-in-out" 
            unoptimized
         />
      </motion.div>
                </>
            )}

    </div>
  );
    

}
