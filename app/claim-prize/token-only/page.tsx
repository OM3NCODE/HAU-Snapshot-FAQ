"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TokenOnlyPage() {
	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#1b0821] via-[#2b0a2e] to-[#4d0f55] text-white">
			{/* Soft glow accents */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<motion.div
					className="absolute left-[10%] top-[12%] h-48 w-48 rounded-full bg-[#ff00fc]/30 blur-3xl"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				/>
				<motion.div
					className="absolute right-[8%] top-[18%] h-56 w-56 rounded-full bg-[#8cff6a]/20 blur-3xl"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
				/>
				<motion.div
					className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#1d041f] via-transparent to-transparent"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
				/>
			</div>

			<main
				className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-0 pb-[340px] text-center"
				style={{ fontFamily: "var(--font-montserrat)" }}
			>
				<motion.div
					className="relative mt-0 h-[180px] w-[180px] sm:h-[210px] sm:w-[210px] md:h-[233px] md:w-[233px]"
					initial={{ y: -15, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					<Image
						src="/assets/Confirmation/Confirmation.png"
						alt="Confirmed"
						fill
						className="object-contain"
						priority
						unoptimized
					/>
				</motion.div>

				<motion.h1
					className="mt-6 font-sugar text-[72px] leading-none tracking-wide text-white drop-shadow-[0_0_25px_rgba(255,0,252,0.7)]"
					style={{
						WebkitTextStroke: "16px #ff00fc",
						paintOrder: "stroke fill",
					}}
					initial={{ scale: 0.92, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
				>
					THANK YOU !
				</motion.h1>

				<motion.p
					className="mt-[23px] font-sugar text-[48px] uppercase leading-tight text-[#E7C2FF]"
					style={{
						WebkitTextStroke: "16px #320052",
						paintOrder: "stroke fill",
					}}
					initial={{ y: 8, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
				>
					YOUR TOKEN REWARDS WILL BE SENT AUTOMATICALLY
				</motion.p>

				<motion.div
					className="mt-[23px] max-w-4xl space-y-4 text-sm font-[300] leading-relaxed text-[#d6b9d9] sm:text-base"
					style={{ textShadow: "0 0 10px #FF00FC", fontFamily: "var(--font-montserrat)" }}
					initial={{ y: 12, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
				>
					<p className="italic">
						Your wallet has only won token prizes as shown in the beginning, so you don&apos;t need to take any additional action.
						All eligible rewards from the 12-12 snapshot will be automatically distributed to the wallet address that held your
						HAUWEE NFTs at the time of the snapshot.
					</p>
					<p className="italic">
						Once the distribution window opens, your tokens will be sent directly—no forms, no claims, and no extra steps required.
					</p>
				</motion.div>

				<motion.div
					className="pointer-events-none fixed inset-x-0 bottom-[-90px] sm:bottom-[-115px] md:bottom-[-110px] flex justify-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
				>
					<div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[420px] md:w-[420px]">
						<Image
							src="/assets/Confirmation/Confirm-HAUWEE.png"
							alt="HAUWEE character"
							fill
							className="object-contain"
							priority
							unoptimized
						/>
					</div>
				</motion.div>
			</main>
		</div>
	);
}
