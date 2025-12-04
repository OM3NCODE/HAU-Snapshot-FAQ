import { Search } from "lucide-react";
import { useState } from "react";
import { motion, Variants  } from "framer-motion"; // Import Animation Library

export default function Hero({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  // Animation Config
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  return (
    // Wrap in motion.div for animation coordination
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center w-full mt-8 lg:mt-[78px] text-center relative z-10 px-4"
    >
      
      {/* --- 12-12 BADGE --- */}
      <motion.div variants={itemVariants} className="relative z-20 leading-[0.8]">
        <h2 
          className="font-luckiest text-[80px] md:text-[120px] text-white"
          style={{
            WebkitTextStroke: "10px #FC00FF", 
            paintOrder: "stroke fill", 
            filter: "drop-shadow(0px 0px 10px rgba(255, 0, 252, 0.25))" 
          }}
        >
          <span className="md:hidden" style={{ WebkitTextStroke: "12px #FC00FF" }}>12-12</span>
          <span className="hidden md:inline" style={{ WebkitTextStroke: "19px #FC00FF" }}>12-12</span>
        </h2>
      </motion.div>
      
      {/* --- MAIN TITLE --- */}
      <motion.h1 
        variants={itemVariants}
        className="font-sugar text-[40px] md:text-[72px] text-white relative z-10 mt-[-5px] md:mt-[-10px] tracking-wider leading-tight"
        style={{
            WebkitTextStroke: "9px #FC00FF", 
            paintOrder: "stroke fill",
            filter: "drop-shadow(0px 0px 10px rgba(255, 0, 252, 0.25))"
        }}
      >
        SNAPSHOT F.A.Q&apos;S
      </motion.h1>
      
      {/* --- CAPTION --- */}
      <motion.p 
        variants={itemVariants}
        className="font-luckiest text-[14px] md:text-[18px] mt-[20px] md:mt-[30px] uppercase tracking-widest px-4"
        style={{
            color: "#EDE8F5",
            filter: "drop-shadow(0px 4px 4px rgba(242, 169, 0, 0.28))"
        }}
      >
        Your one-stop guide for all snapshot questions.
      </motion.p>

      {/* --- SEARCH BAR --- */}
      <motion.div 
        variants={itemVariants} 
        className="relative mt-[30px] md:mt-[50px] group w-full max-w-[727px]"
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          placeholder="What are you looking for?"
          value={query}
          onChange={handleChange}
          className="w-full rounded-full bg-white text-gray-800 font-montserrat focus:outline-none focus:ring-4 focus:ring-hau-pink/50 transition-all text-sm placeholder:text-gray-400"
          style={{
              height: "36px",
              paddingLeft: "40px", 
              paddingRight: "20px"
          }}
        />
      </motion.div>

    </motion.div>
  );
}