"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // <--- 2. Get current path

  // Helper to check if link is active
  const isActive = (path: string) => pathname === path;

  // Common Styles
  const activeStyle = "text-hau-pink drop-shadow-[0_0_5px_#D900FF] whitespace-nowrap";
  const inactiveStyle = "hover:text-hau-pink transition-colors whitespace-nowrap text-white";


  return (
    <div className="w-full relative z-50">
      
      {/* NAVBAR CONTAINER 
        - Mobile: h-[70px], px-5 (Smaller, standard padding)
        - Desktop (lg): h-[87px], pl-[74px] pr-[86px] (Your exact Figma values)
      */}
      <nav className="w-full h-[70px] lg:h-[87px] px-5 lg:pl-[74px] lg:pr-[86px] flex items-center justify-between relative bg-transparent">
        
        {/* --- LEFT: LOGO --- */}
        <div className="flex-shrink-0 flex items-center h-full z-50">
            <Link href="/" className="relative flex items-center h-full">
              <Image 
                src="/assets/High As Unicorn Logo [H].png" 
                alt="High As Unicorn Logo"
                width={252} 
                height={209}
                // Mobile: h-[60%] (smaller), Desktop: h-[90%]
                className="h-[60%] lg:h-[90%] w-auto object-contain" 
                priority
                unoptimized
              />
            </Link>
        </div>

        {/* --- CENTER: LINKS (Desktop Only) --- 
            - hidden: Hides on mobile
            - lg:flex: Shows on large screens
            - Absolute centering ensures it ignores Logo width
        */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-[40px] font-montserrat font-bold text-lg text-white h-[25px]">
          <Link href="/" className={isActive("/") ? activeStyle : inactiveStyle}>Home</Link>
          <Link href="/claim-prize" className={isActive("/claim-prize") ? activeStyle : inactiveStyle}>Claim Prize</Link>
          <Link href="/FAQ" className={isActive("/FAQ") ? activeStyle : inactiveStyle}>FAQ&apos;s</Link>
        </div>

        {/* --- RIGHT SECTION (Twitter + Discord + Mobile Toggle) --- */}
        <div className="flex items-center gap-4 z-50">
            
            {/* Twitter Link (Visible on Mobile & Desktop) */}
            <a 
              href="https://x.com/HighAsUnicorn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-[28px] h-[28px] lg:w-[40px] lg:h-[40px] hover:opacity-80 transition-opacity"
            >
              <Image 
                  src="/assets/X.png" 
                  alt="Twitter" 
                  width={70} 
                  height={70} 
                  className="w-full h-full object-contain"
                  unoptimized 
              />
            </a>

            {/* Discord Link (Visible on Mobile & Desktop) */}
            <a 
              href="https://discord.gg/TDVMeFr4kK" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-[28px] h-[28px] lg:w-[40px] lg:h-[40px] hover:opacity-80 transition-opacity"
            >
              <Image 
                  src="/assets/Discord.png" 
                  alt="Discord" 
                  width={70} 
                  height={70} 
                  className="w-full h-full object-contain"
                  unoptimized 
              />
            </a>

            {/* Hamburger Button (Mobile Only) */}
            <button 
              className="lg:hidden text-white p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
        </div>

      </nav>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isMobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-[#2D0A31]/95 backdrop-blur-md border-b border-white/10 p-6 flex flex-col gap-6 items-center text-white font-montserrat font-bold text-xl lg:hidden shadow-2xl animate-in slide-in-from-top-5">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={isActive("/") ? "text-hau-pink drop-shadow-[0_0_5px_#D900FF]" : "hover:text-hau-pink"}>Home</Link>
          <Link href="/claim-prize" onClick={() => setIsMobileMenuOpen(false)} className={isActive("/claim-prize") ? "text-hau-pink drop-shadow-[0_0_5px_#D900FF]" : "hover:text-hau-pink"}>Claim Prize</Link>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-hau-pink">FAQ&apos;s</Link>
        </div>
      )}

    </div>
  );
}