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
  const [matchedQuestionId, setMatchedQuestionId] = useState<string | null>(FAQ_DATA[0].questions[0]?.id || null);

  const findBestMatch = (query: string) => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return null;

    let bestScore = 0;
    let bestCategory = FAQ_DATA[0];
    let bestQuestion = FAQ_DATA[0].questions[0] || null;

    const terms = trimmed.split(/\s+/).filter(Boolean);

    FAQ_DATA.forEach((category) => {
      category.questions.forEach((q) => {
        const questionLower = q.question.toLowerCase();
        const answerLower = q.answer.toLowerCase();
        let score = 0;

        // Whole-query match boosts
        if (questionLower.includes(trimmed)) score += 6;
        if (answerLower.includes(trimmed)) score += 4;

        // Term-by-term boosts
        terms.forEach((term) => {
          if (questionLower.includes(term)) score += 3;
          if (answerLower.includes(term)) score += 1;
          if (questionLower.startsWith(term)) score += 1; // slight bump for leading match
        });

        if (score > bestScore) {
          bestScore = score;
          bestCategory = category;
          bestQuestion = q;
        }
      });
    });

    if (bestScore === 0 || !bestQuestion) return null;
    return { category: bestCategory, question: bestQuestion };
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const match = findBestMatch(query);

    if (!match) {
      // No strong match: reset to the first category, show its first item
      setActiveCategory(FAQ_DATA[0]);
      setMatchedQuestionId(FAQ_DATA[0].questions[0]?.id || null);
      return;
    }

    setActiveCategory(match.category);
    setMatchedQuestionId(match.question.id);
  };

  const questionsToShow =
    searchQuery.trim() && matchedQuestionId
      ? activeCategory.questions.filter((q) => q.id === matchedQuestionId)
      : activeCategory.questions;

  return (
    <div className="min-h-screen bg-hau-gradient text-white overflow-x-hidden relative flex flex-col">
      
      <Hero onSearch={handleSearch} />

      <main className="w-full max-w-[1080px] mx-auto px-[20px] py-[20px] mt-10 relative z-10 flex-grow pb-32">
        
        <div className="flex flex-col lg:flex-row gap-[25px] items-start">
            
            {/* LEFT COLUMN */}
            <div className="w-full lg:w-[250px] flex-shrink-0 pt-0 lg:pt-20">
                <FAQSidebar 
                    categories={FAQ_DATA} 
                    activeId={activeCategory.id} 
                onSelect={(cat) => {
                  setActiveCategory(cat);
                  setMatchedQuestionId(cat.questions[0]?.id || null);
                }} 
                />
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex-grow w-full relative">
                <FAQList 
                key={`${activeCategory.id}-${matchedQuestionId || "all"}`}
                title={activeCategory.title} 
                questions={questionsToShow}
                monsterImage={activeCategory.sideImage} 
                initialOpenId={matchedQuestionId}
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