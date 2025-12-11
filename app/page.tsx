"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const featureCards = [
	{
		title: "CHECK YOUR REWARDS",
		body:
			"View every prize your NFT traits unlocked in the snapshot — from tokens to exclusive IRL items — all in one place.",
		icon: "/assets/Home_Page/Reward Icon.png",
	},
	{
		title: "CLAIM YOUR IRL LOOT",
		body:
			"Token rewards are sent automatically, but IRL prizes need your details. Submit once and you're all set for shipping.",
		icon: "/assets/Home_Page/Shipping Icon.png",
	},
	{
		title: "EXPLORE OUR MINT",
		body:
			"Dive into the HAUWEE collection, check traits, and see what's popping on Magic Eden's secondary market.",
		icon: "/assets/Home_Page/NFT Icon.png",
	},
];

const galleryImages = [
	"/assets/About us Gallery/1.png",
	"/assets/About us Gallery/2.png",
	"/assets/About us Gallery/3.png",
	"/assets/About us Gallery/4.png",
	"/assets/About us Gallery/5.png",
	"/assets/About us Gallery/6.png",
	"/assets/About us Gallery/7.png",
	"/assets/About us Gallery/8.png",
];

export default function HomePage() {
	const marqueeImages = [...galleryImages, ...galleryImages];
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("section-visible");
				}
			});
		}, { threshold: 0.1 });

		const sections = document.querySelectorAll(".section-observer");
		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
		};
	}, []);

	useEffect(() => {
		if (isHovered) return;

		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [isHovered]);

	return (
		<main className="relative flex-1 w-full overflow-hidden snap-y snap-mandatory">
			{/* HERO */}
			<section className="relative min-h-screen snap-start overflow-hidden flex items-start px-4 sm:px-8 pt-[140px] pb-16">
				<div className="absolute left-[-10px] bottom-16 sm:bottom-20 md:bottom-32 w-[160px] sm:w-[220px] lg:w-[280px] xl:w-[340px] pointer-events-none">
					<Image
						src="/assets/Home_Page/Byte left.png"
						alt="Mascot on the left"
						width={420}
						height={420}
						className="w-full h-auto scale-x-[-1]"
						priority
						unoptimized
					/>
				</div>

				<div className="absolute -right-32 -bottom-20 w-[380px] sm:w-[520px] lg:w-[680px] xl:w-[800px] pointer-events-none">
					<Image
						src="/assets/Home_Page/Hauwee Right .png"
						alt="Mascot on the right"
						width={900}
						height={900}
						className="w-full h-auto"
						priority
						unoptimized
					/>
				</div>

				<div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 gap-5">
					<div className="bg-[#2a0730]/60 backdrop-blur-md rounded-3xl px-4 py-2 border border-white/10 animate-rise" style={{ animationDelay: "0.05s" }}>
						<p className="font-luckiest text-xs sm:text-lg tracking-[0.2em] text-white uppercase">
							Your traits. Your rewards. Your moment.
						</p>
					</div>

					<h1
						className="font-sugar text-white text-[48px] sm:text-[64px] md:text-[84px] leading-[0.95] drop-shadow-[0_0_18px_rgba(255,0,252,0.45)] animate-rise"
						style={{ WebkitTextStroke: "8px #FC00FF", paintOrder: "stroke fill", animationDelay: "0.12s" }}
					>
						WELCOME TO THE $HAU
						<br />
						SNAPSHOT HUB
					</h1>

					<p className="font-montserrat text-lg sm:text-xl max-w-3xl text-white/80 animate-rise mt-6" style={{ animationDelay: "0.2s" }}>
						Your one-stop portal to see what you unlocked, confirm your details, and collect everything you earned from the snapshot.
					</p>

					<Link
						href="/claim-prize"
						className="mt-8 inline-flex items-center justify-center bg-hau-pink text-white font-luckiest text-xl sm:text-2xl px-9 sm:px-12 py-4 rounded-2xl shadow-[0_12px_30px_rgba(217,0,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-transform animate-rise"
						style={{ animationDelay: "0.28s" }}
					>
						CLAIM PRIZE
					</Link>
				</div>
			</section>

			{/* FEATURE ROW */}
			<section className="section-observer relative min-h-screen snap-start w-full bg-[#7a138f] py-16 sm:py-20 lg:py-24 px-8 sm:px-16 lg:px-24 overflow-hidden flex flex-col justify-center">
				<div className="w-full text-center flex flex-col gap-8 animate-rise mb-12" style={{ animationDelay: "0.1s" }}>
					<h2
						className="font-sugar text-white text-[36px] sm:text-[48px] md:text-[64px] leading-tight"
						style={{ WebkitTextStroke: "10px #FC00FF", paintOrder: "stroke fill", filter: "drop-shadow(0 0 30px rgba(217, 0, 255, 0.8))" }}
					>
						YOUR ONE-STOP PORTAL FOR SNAPSHOT REWARDS
					</h2>
					<p className="font-montserrat text-base sm:text-lg text-white/90 mx-auto">
						This hub was built to make collecting your rewards simple, transparent, and actually fun.
					</p>
				</div>

				<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-24 lg:gap-32 px-4">
					{featureCards.map((card, idx) => (
						<div
							key={card.title}
							className="flex flex-col items-center text-center gap-10 animate-rise bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-sm shadow-[0_8_32px_rgba(0,0,0,0.3)]"
							style={{ animationDelay: `${0.18 + idx * 0.08}s` }}
						>
							<Image
								src={card.icon}
								alt={card.title}
								width={200}
								height={200}
								className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
								unoptimized
							/>
							<h3 className="font-luckiest text-2xl sm:text-3xl text-white drop-shadow-md">{card.title}</h3>
							<p className="font-montserrat text-base sm:text-lg text-white/85 leading-relaxed max-w-[360px]">
								{card.body}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* WHO WE ARE */}
			<section className="section-observer relative min-h-screen snap-start w-full py-16 lg:py-20 px-4 sm:px-8 flex items-center">
				<div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-start lg:items-start">
					<div className="flex-1 space-y-8 animate-rise" style={{ animationDelay: "0.12s" }}>
						<h1
							className="font-sugar text-white text-[60px] sm:text-[50px] md:text-[90px] leading-[0.95]"
							style={{ WebkitTextStroke: "6px #FC00FF", paintOrder: "stroke fill", filter: "drop-shadow(0 0 25px rgba(217, 0, 255, 0.7))", letterSpacing: "0.05em" }}
						>
							WHO WE ARE
						</h1>

						<div className="space-y-6 font-montserrat text-lg sm:text-xl md:text-2xl text-white/85 leading-relaxed text-left" style={{ letterSpacing: "0.05em" }}>
							<p>
								We're a one-year-old Web3 project building across BTC Runes and Solana (proud holders of Rune #1934). Through every market pump, dump, and sideways meme zone, we've been creating real opportunities for our community — vibing, building, and growing together actually shows what this hub is all about.
							</p>
							<p>
								Most recently, we launched HAUWEE, a hand-drawn traits NFT collection that blends art, chaos, and community energy. Our official snapshot is on 12-12-25, and the rewards flowing from it are what this hub is all about.
							</p>
							<p>
								We also produce Degen Diaries, an AI animated series focused on crypto safety and smart onboarding — mixing education, humor, and Web3 culture into one degenerate-friendly package.
							</p>
						</div>

						<div className="flex flex-wrap gap-3">
							<a
								href="https://www.launchmynft.io/collections/BVtq5962a6WfPtCKxCKVwpFhqjvUq6nzWr2frq9Lv7Rk/lckk20uox2pLnOhcjpG7"
								className="px-8 py-4 rounded-xl bg-white/10 border border-white/15 text-white font-luckiest text-lg sm:text-xl tracking-widest hover:bg-white/15 transition"
							>
								NFT MINT PAGE
							</a>
                            <a
								href="https://magiceden.io/marketplace/hauwee"
								className="px-8 py-4 rounded-xl bg-white/10 border border-white/15 text-white font-luckiest text-lg sm:text-xl tracking-widest hover:bg-white/15 transition"
							>
								Magic Eden PAGE
							</a>
							<a
								href="https://x.com/HighAsUnicorn"
								target="_blank"
								rel="noopener noreferrer"
								className="px-8 py-4 rounded-xl bg-white/10 border border-white/15 text-white font-luckiest text-lg sm:text-xl tracking-widest hover:bg-white/15 transition"
							>
								X HANDLE
							</a>
							<a
								href="https://x.com/HighAsUnicorn/status/1957866831361774014?s=20"
								className="px-8 py-4 rounded-xl bg-white/10 border border-white/15 text-white font-luckiest text-lg sm:text-xl tracking-widest hover:bg-white/15 transition"
							>
								DEGEN DAIRIES LINK
							</a>
						</div>
					</div>

					<div className="w-full lg:w-auto lg:flex-1 relative animate-rise" style={{ animationDelay: "0.1s" }}>
						<div
							className="relative w-full aspect-square overflow-hidden rounded-[40px] border-4 border-hau-pink bg-black/40 shadow-[0_0_30px_rgba(217,0,255,0.5)] cursor-pointer"
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<Image
								src={galleryImages[currentImageIndex]}
								alt="Community gallery"
								fill
								className="object-cover transition-opacity duration-700 ease-in-out"
								unoptimized
								key={currentImageIndex}
							/>
						</div>
						<p className="mt-4 text-sm text-white/60 font-montserrat">Auto-rotating image — {currentImageIndex + 1} of {galleryImages.length}</p>
					</div>
				</div>
			</section>

			{/* FINAL CTA */}
			<section className="section-observer relative min-h-screen snap-start w-full bg-[#7a138f] px-4 sm:px-8 py-16 sm:py-20 lg:py-24 flex items-center">
				<div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-5 animate-rise" style={{ animationDelay: "0.12s" }}>
					<h2
						className="font-sugar text-white text-[36px] sm:text-[46px] md:text-[100px] leading-tight drop-shadow-[0_0_18px_rgba(255,0,252,0.4)]"
						style={{ WebkitTextStroke: "25px #FC00FF", paintOrder: "stroke fill" }}
					>
						READY TO CLAIM WHAT'S YOURS?
					</h2>
					<p className="font-luckiest text-sm sm:text-base text-white/90 uppercase tracking-widest max-w-3xl">
						Your rewards are waiting — some already on the way, others needing your final confirmation.
					</p>

					<Link
						href="/claim-prize"
						className="mt-1 inline-flex items-center justify-center bg-hau-pink text-white font-luckiest text-lg sm:text-xl px-7 sm:px-9 py-3 rounded-2xl shadow-[0_12px_30px_rgba(217,0,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
					>
						CLAIM MY IRL PRIZES
					</Link>
				</div>

				<div className="absolute -right-32 -bottom-20 w-[380px] sm:w-[520px] lg:w-[680px] xl:w-[800px] pointer-events-none">
					<Image
						src="/assets/Home_Page/CTA Icon.png"
						alt="CTA Icon"
						width={900}
						height={900}
						className="w-full h-auto"
						unoptimized
					/>
				</div>
			</section>
		</main>
	);
}