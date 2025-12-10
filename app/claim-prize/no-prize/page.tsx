"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NoPrizePage() {
	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#1b0821] via-[#2b0a2e] to-[#4d0f55] text-white">
			{/* Soft glow accents */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<motion.div
					className="absolute left-[12%] top-[10%] h-48 w-48 rounded-full bg-[#ff00fc]/25 blur-3xl"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				/>
				<motion.div
					className="absolute right-[12%] top-[16%] h-48 w-48 rounded-full bg-[#ff9a00]/20 blur-3xl"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
				/>
			</div>

			<main className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-10 text-center" style={{ fontFamily: "var(--font-montserrat)" }}>
				<motion.div
					className="relative h-[180px] w-[180px] sm:h-[220px] sm:w-[220px]"
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.55, ease: "easeOut" }}
				>
					<Image
						src="/assets/Confirmation/Sorry.png"
						alt="No prizes emoji"
						fill
						className="object-contain"
						priority
						unoptimized
					/>
				</motion.div>

				<motion.h1
					className="mt-6 font-sugar text-[64px] leading-none tracking-wide text-white drop-shadow-[0_0_24px_rgba(255,0,252,0.7)] sm:text-[72px]"
					style={{
						WebkitTextStroke: "16px #ff00fc",
						paintOrder: "stroke fill",
					}}
					initial={{ scale: 0.92, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
				>
					SORRY
				</motion.h1>

				<motion.p
					className="mt-5 font-sugar text-[34px] uppercase leading-tight text-[#f6e9ff] sm:text-[38px]"
					style={{
						WebkitTextStroke: "12px #2c0b31",
						paintOrder: "stroke fill",
					}}
					initial={{ y: 8, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
				>
					NO PRIZES THIS TIME 🦄💔
				</motion.p>

				<motion.div
					className="mt-8 max-w-3xl space-y-2 text-lg font-[300] italic leading-relaxed text-[#e9d4ff] sm:text-xl"
					style={{ textShadow: "0 0 10px #FF00FC" }}
					initial={{ y: 10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
				>
					<p>Your wallet didn&apos;t qualify for rewards in this snapshot, but the unicorn magic never stops.</p>
					<p>Explore our mint and start stacking traits for future drops.</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
				>
					<Link
						href="https://www.launchmynft.io/collections/BVtq5962a6WfPtCKxCKVwpFhqjvUq6nzWr2frq9Lv7Rk/lckk20uox2pLnOhcjpG7"
						className="mt-10 inline-flex min-w-[240px] items-center justify-center rounded-xl bg-[#1E2019] px-8 py-4 text-lg font-sugar uppercase tracking-wide text-[#FFFFFF] shadow-[0_0_24px_rgba(255,0,252,0.55)] transition-transform hover:scale-[1.02] hover:bg-[#ffc8ff]"
					>
						CHECK OUT THE MINT
					</Link>
				</motion.div>
			</main>
		</div>
	);
}
