"use client";

import { useState } from "react";
import Hero from "@/components/Hero"; 
import FAQSidebar from "@/components/FAQSidebar";
import FAQList from "@/components/FAQList";
import { FAQ_DATA } from "@/data/faq";
import Image from "next/image";
import { motion } from "framer-motion"; // Add this

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(FAQ_DATA[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuestions = activeCategory.questions.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-hau-gradient text-white overflow-x-hidden relative flex flex-col">
      
      <Hero onSearch={setSearchQuery} />

      <main className="w-full max-w-[1080px] mx-auto px-[20px] py-[20px] mt-10 relative z-10 flex-grow pb-32">
        
        <div className="flex flex-col lg:flex-row gap-[25px] items-start">
            
            {/* LEFT COLUMN */}
            <div className="w-full lg:w-[250px] flex-shrink-0 pt-0 lg:pt-20">
                <FAQSidebar 
                    categories={FAQ_DATA} 
                    activeId={activeCategory.id} 
                    onSelect={setActiveCategory} 
                />
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex-grow w-full relative">
                <FAQList 
                    title={activeCategory.title} 
                    questions={filteredQuestions}
                    monsterImage={activeCategory.sideImage} 
                />
            </div>

        </div>

      </main>

      {/* --- BOTTOM LEFT UNICORN (Animated) --- 
          - Slide Up Animation using framer-motion
          - Updated Filename: Hauwee-left.png
          - Updated Resizing: Calculated to respect "10% overlap" rule on sidebar
            * lg (1024px): 90px (Tight fit)
            * xl (1280px): 130px (Safe overlap)
            * 2xl (1536px): 250px (Safe overlap)
            * min-[1800px]: 600px (Grand scale)
      */}
      <motion.div 
        className="fixed bottom-0 left-0 z-20 pointer-events-none"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 50 }}
      >
         <Image 
            src="/assets/Hauwee-left.png" 
            alt="Character"
            width={700} 
            height={700}
            className="w-[120px] md:w-[160px] lg:w-[90px] xl:w-[130px] 2xl:w-[250px] min-[1800px]:w-[600px] h-auto object-contain object-bottom transition-all duration-500 ease-in-out" 
            unoptimized
         />
      </motion.div>

    </div>
  );
}