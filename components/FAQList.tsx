import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { Question } from "@/types";

interface FAQListProps {
  title: string;
  questions: Question[];
  monsterImage: string;
}

export default function FAQList({ title, questions, monsterImage }: FAQListProps) {
  const [openId, setOpenId] = useState<string | null>(questions[0]?.id || null);

  return (
    <div className="relative w-full mt-12 md:mt-0"> {/* Added mt-12 on mobile to make room for the monster head */}
        
      {/* --- RIGHT SECTION BOX --- */}
      <div 
        className="relative w-full rounded-[30px] p-6 md:p-12 z-10"
        style={{
            background: "linear-gradient(180deg, #320538 0%, #401346 100%)",
            border: "2px solid rgba(255, 0, 252, 0.4)",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.2)"
        }}
      >
        {/* --- HEADER --- */}
        <div className="flex items-center gap-[11px] mb-[21px] relative z-20">
            {/* Title */}
            <h3 
                className="font-luckiest text-[32px] md:text-[48px] text-white"
                style={{ 
                    letterSpacing: "0.05em",
                    filter: "drop-shadow(0px 0px 4px rgba(255, 0, 252, 0.65))"
                }}
            >
                {title}
            </h3>
        </div>

        {/* --- ACCORDION LIST --- */}
        <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
                {questions.map((q) => (
                <AccordionItem 
                    key={q.id} 
                    item={q} 
                    isOpen={openId === q.id} 
                    onClick={() => setOpenId(openId === q.id ? null : q.id)}
                />
                ))}
            </AnimatePresence>
            {questions.length === 0 && (
                <p className="text-center text-white/50 font-luckiest py-10">No questions found.</p>
            )}
        </div>

      </div>

      {/* --- FLOATING MONSTER IMAGE --- 
          - Mobile: Visible (block), smaller size (120px), positioned closer to corner
          - Desktop: Larger size (240px), positioned further out
      */}
      <div className="absolute -top-[50px] -right-[10px] md:-top-[100px] md:-right-[80px] lg:-right-[100px] z-20 pointer-events-none block">
        <motion.div
            key={monsterImage} 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
             <Image 
                src={monsterImage}
                alt="Monster"
                width={240}
                height={216}
                // Responsive Sizing:
                // Mobile: w-[120px]
                // Tablet (md): w-[180px]
                // Desktop (lg): w-[240px]
                className="w-[120px] h-auto md:w-[180px] lg:w-[240px] object-contain drop-shadow-xl"
                unoptimized
            />
        </motion.div>
      </div>

    </div>
  );
}

// --- ACCORDION ITEM ---
function AccordionItem({ item, isOpen, onClick }: { item: Question, isOpen: boolean, onClick: () => void }) {
  return (
    <motion.div 
      initial={false}
      animate={{ 
        backgroundColor: isOpen ? "#2A05D8" : "#C970FF",
      }}
      style={{
        boxShadow: isOpen ? "0px 4px 15px rgba(255, 0, 252, 0.35)" : "none",
      }}
      className="rounded-[20px] overflow-hidden transition-colors duration-300 relative w-full"
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left relative z-10"
      >
        <span 
            className="font-luckiest text-[18px] md:text-[24px] lg:text-[32px]"
            style={{
                color: "#FF00FC",
                WebkitTextStroke: "1.5px #2A05D8",
                paintOrder: "stroke fill",
                letterSpacing: "0.05em"
            }}
        >
          {item.question}
        </span>
        
        <div className="bg-black/20 rounded-full p-1 text-white flex-shrink-0 ml-2 md:ml-4">
            {isOpen ? <Minus size={20} className="md:w-6 md:h-6" /> : <Plus size={20} className="md:w-6 md:h-6" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div 
                className="px-4 md:px-6 pb-6 pt-[8px] md:pt-[12px] font-luckiest text-[12px] md:text-[14px] leading-relaxed text-justify"
                style={{ color: "#FFC3FE" }}
            >
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}