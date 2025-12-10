import { FAQCategory } from "@/types";

interface SidebarProps {
  categories: FAQCategory[];
  activeId: string;
  onSelect: (category: FAQCategory) => void;
}

export default function FAQSidebar({ categories, activeId, onSelect }: SidebarProps) {
  return (
    // Left Section width is flexible but fits within the layout
    <div className="flex flex-col items-start w-full lg:w-auto">
      <div className="flex flex-col gap-[15px] w-full">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            style={{ letterSpacing: "0.05em" }} // 5% letter spacing
            className={`text-left font-luckiest text-[24px] md:text-[28px] transition-all duration-300
              ${activeId === cat.id 
                ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-105" 
                : "text-white/50 hover:text-white/80"}`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}