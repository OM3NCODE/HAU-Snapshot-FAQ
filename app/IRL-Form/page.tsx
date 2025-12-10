"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Country, City } from "country-state-city";
import type { ICountry, ICity } from "country-state-city";
import * as flags from "country-flag-icons/react/3x2";
import FormCard from "@/components/FormCard";
import { mockPrizes } from "@/data/prizes";
import { steps, FieldConfig, StepId } from "./formConfig";

type FormState = Record<string, string | boolean>;

const STEP_SEQUENCE: StepId[] = ["basic", "shipping", "prize", "confirm"];

// Helper to filter options based on search
function filterOptions<T>(items: T[], searchTerm: string, getLabel: (item: T) => string): T[] {
	if (!searchTerm.trim()) return items;
	const lower = searchTerm.toLowerCase();
	return items.filter((item) => getLabel(item).toLowerCase().includes(lower));
}

const heroTitle = "Just one more step to unlock your prize";
const heroSubtitle =
	"Fill in your details so we can deliver your goodies — make sure everything's accurate, this is the address your loot will ship to!";

function getPrizeFromParams(prizeId?: string) {
	if (!prizeId) return mockPrizes[0];
	return mockPrizes.find((p) => p.id === prizeId) ?? mockPrizes[0];
}

function getPrizesFromParams(prizeIds?: string) {
	if (!prizeIds) {
		// Default: load ALL prizes (for testing all field types)
		return mockPrizes;
	}
	const ids = prizeIds.split(",").map(id => id.trim());
	const prizes = ids
		.map(id => mockPrizes.find((p) => p.id === id))
		.filter((p): p is typeof mockPrizes[0] => p !== undefined);
	return prizes.length > 0 ? prizes : mockPrizes;
}

function isFieldVisible(field: FieldConfig, prizeIsIRL: boolean, prize: any) {
	if (!field.show) return true;
	return field.show(prize ?? { isIRL: prizeIsIRL });
}

export default function IRLFormPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const prizeIds = searchParams.get("prizeId") ?? undefined;
	const prizes = getPrizesFromParams(prizeIds);
	const prize = prizes[0]; // Primary prize for display
	
	// Collect all prize types from all prizes
	const allPrizeTypes = new Set<string>(prizes.map(p => p.prizeType));
	const hasPrizeType = (type: string) => allPrizeTypes.has(type);
	const hasAnyPrizeType = (types: string[]) => types.some(t => allPrizeTypes.has(t));

	const [stepIndex, setStepIndex] = useState(0);
	const [form, setForm] = useState<FormState>({});
	const [countrySearch, setCountrySearch] = useState("");
	const [citySearch, setCitySearch] = useState("");
	const [phoneCodeSearch, setPhoneCodeSearch] = useState("");
	const [fieldErrors, setFieldErrors] = useState<Set<string>>(new Set());

	const countryOptions = useMemo<ICountry[]>(() => Country.getAllCountries(), []);
	
	// Map phone codes to countries (with flag support)
	const phoneCodeToCountryMap = useMemo(() => {
		const map = new Map<string, ICountry>();
		countryOptions.forEach((c) => {
			const code = c.phonecode.startsWith("+") ? c.phonecode : `+${c.phonecode}`;
			if (!map.has(code)) {
				map.set(code, c);
			}
		});
		return map;
	}, [countryOptions]);

	const phoneCodeOptions = useMemo(
		() =>
			Array.from(phoneCodeToCountryMap.keys()).sort((a: string, b: string) => a.localeCompare(b)),
		[phoneCodeToCountryMap]
	);

	const citiesForCountry = useMemo(() => {
		const countryIso = (form.country as string) || undefined;
		if (!countryIso) return [];
		return (City.getCitiesOfCountry(countryIso) as ICity[]) ?? [];
	}, [form.country]);

	// Basic validation per step
	const currentStepId = STEP_SEQUENCE[stepIndex];
	const currentConfig = steps.find((s) => s.id === currentStepId);
	const currentFields = currentConfig?.fields ?? [];
	
	// Create combined prize object with all prize types for field visibility
	const combinedPrize = {
		...prize,
		allPrizeTypes,
		hasPrizeType,
		hasAnyPrizeType,
	};
	const visibleFields = currentFields.filter((f) => isFieldVisible(f, prize.isIRL, combinedPrize));

	const isStepValid = visibleFields.every((field) => {
		if (!field.required) return true;
		const value = form[field.name];
		if (field.type === "checkbox") return Boolean(value);
		
		// Basic required check
		if (!value || String(value).trim().length === 0) return false;
		
		// BTC Taproot address validation
		if (field.name === "btcTaproot") {
			const address = String(value).trim();
			// Must start with bc1p and be max 64 characters
			return address.toLowerCase().startsWith("bc1p") && address.length <= 64;
		}
		
		return true;
	});

	const handleChange = (name: string, value: string | boolean) => {
		setForm((prev) => ({ ...prev, [name]: value }));
		// Validate field and update error state
		const field = visibleFields.find(f => f.name === name);
		if (field && field.required) {
			const isValid = validateField(field, value);
			setFieldErrors((prev) => {
				const newErrors = new Set(prev);
				if (isValid) {
					newErrors.delete(name);
				} else {
					newErrors.add(name);
				}
				return newErrors;
			});
		}
	};

	const validateField = (field: FieldConfig, value: string | boolean): boolean => {
		if (!field.required) return true;
		if (field.type === "checkbox") return Boolean(value);
		
		// Basic required check
		if (!value || String(value).trim().length === 0) return false;
		
		// BTC Taproot address validation
		if (field.name === "btcTaproot") {
			const address = String(value).trim();
			// Must start with bc1p and be max 64 characters
			return address.toLowerCase().startsWith("bc1p") && address.length <= 64;
		}
		
		return true;
	};

	const handleNext = () => {
		if (!isStepValid) return;
		if (stepIndex === STEP_SEQUENCE.length - 1) {
			// Final confirmation step, redirect to success page
			router.push("/IRL-Form/submission_success");
		} else {
			setStepIndex((idx) => Math.min(idx + 1, STEP_SEQUENCE.length - 1));
		}
	};

	const handleBack = () => {
		setStepIndex((idx) => Math.max(idx - 1, 0));
	};

	// Scroll to top on step change for a smoother UX
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [stepIndex]);

	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-hau-gradient">
			{/* Character on bottom right - fixed position, partially hidden at corner */}
			<div className="hidden lg:block fixed bottom-[-80px] right-[-80px] w-[700px] h-[700px] z-0 pointer-events-none" style={{ transform: "rotate(-4deg)" }}>
				<Image
					src="/assets/Form/Form Page Hauwee.png"
					alt="HAU Character"
					fill
					className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
					priority
					unoptimized
				/>
			</div>

			{/* Main content area */}
			<div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
				{/* Hero text section - centered */}
				<div className="mb-8 sm:mb-12 w-full flex flex-col items-center text-center">
					<h1
						className="font-sugar text-[32px] sm:text-[44px] md:text-[56px] lg:text-[70px] xl:text-[80px] leading-[0.95] text-[#FFC700] drop-shadow-[0_4px_0_#8B3B00] max-w-5xl mb-[30px]"
						style={{ textShadow: "6px 6px 0 #8B3B00" }}
					>
						{heroTitle.toUpperCase()}
					</h1>
					<p className="max-w-4xl font-luckiest text-white text-xs sm:text-sm md:text-base uppercase tracking-wider leading-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
						{heroSubtitle}
					</p>
				</div>

				{/* Form card - centered with left gap, responsive sizing based on 864w x 624h ratio */}
				<div className="w-full sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[864px] mx-auto">
					{currentConfig ? (
						<>
							<FormCard
								title={currentConfig.title.toUpperCase()}
								subtitle={currentConfig.subtitle}
								footer={
									<div className="flex items-center justify-between gap-4">
										<button
											type="button"
											onClick={handleBack}
											disabled={stepIndex === 0}
											className="px-4 sm:px-6 py-3 rounded-xl bg-black/70 text-white font-sugar text-lg shadow-[0_6px_0_rgba(0,0,0,0.45)] disabled:opacity-40"
										>
											Back
										</button>
										<button
											type="button"
											onClick={handleNext}
											disabled={!isStepValid}
											className="px-6 sm:px-8 py-3 rounded-xl bg-black text-white font-sugar text-lg shadow-[0_6px_0_rgba(0,0,0,0.45)] disabled:opacity-40"
										>
											{stepIndex === STEP_SEQUENCE.length - 1 ? "Confirm" : "Next"}
										</button>
									</div>
								}
							>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									{visibleFields.map((field, idx) => {
										// Check if this is a grouped field (like phone with code)
										const isGrouped = field.rowGroup;
										const nextField = visibleFields[idx + 1];
										const isGroupStart = isGrouped && (!visibleFields[idx - 1] || visibleFields[idx - 1].rowGroup !== field.rowGroup);

										// Skip rendering if this is not the start of a group
										if (isGrouped && !isGroupStart) return null;

										// If this is the start of a grouped row, render both fields side by side
										if (isGroupStart && nextField?.rowGroup === field.rowGroup) {
											return (
												<div key={`group-${field.name}`} className="col-span-full flex flex-col">
													{/* Single Phone label */}
													<label className="text-white font-luckiest text-xs uppercase tracking-wider mb-2 block">
														{nextField.label}
													</label>
													{/* Fields in row: code (small) and phone (large) */}
													<div className="flex gap-3">
														<FieldInput
															field={field}
															value={form[field.name] ?? ""}
															onChange={handleChange}
															countryOptions={countryOptions}
															phoneCodeOptions={phoneCodeOptions}
															phoneCodeToCountryMap={phoneCodeToCountryMap}
															cities={citiesForCountry}
															hideLabel={true}
															className="w-24 sm:w-28"
															hasError={fieldErrors.has(field.name)}
														/>
														<FieldInput
															field={nextField}
															value={form[nextField.name] ?? ""}
															onChange={handleChange}
															countryOptions={countryOptions}
															phoneCodeOptions={phoneCodeOptions}
															phoneCodeToCountryMap={phoneCodeToCountryMap}
															cities={citiesForCountry}
															hideLabel={true}
															className="flex-1"
															hasError={fieldErrors.has(nextField.name)}
														/>
													</div>
												</div>
											);
										}

										// Regular field
										return (
											<FieldInput
												key={field.name}
												field={field}
												value={form[field.name] ?? ""}
												onChange={handleChange}
												countryOptions={countryOptions}
												phoneCodeOptions={phoneCodeOptions}
												phoneCodeToCountryMap={phoneCodeToCountryMap}
												cities={citiesForCountry}
												hasError={fieldErrors.has(field.name)}
											/>
										);
									})}
								</div>
							</FormCard>

							{/* Progress bar below card */}
							<div className="mt-6 w-full">
								<div className="flex gap-2">
									{Array.from({ length: 4 }).map((_, idx) => (
										<div
											key={idx}
											className="h-1.5 flex-1 rounded-full transition-all"
											style={{
												backgroundColor:
													idx < stepIndex
														? "#00FFFF" // completed: cyan
														: idx === stepIndex
															? "#D900FF" // current: pink
															: "rgba(255, 255, 255, 0.2)", // upcoming: faded white
											}}
										/>
									))}
								</div>
							</div>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
}

interface FieldInputProps {
	field: FieldConfig;
	value: string | boolean;
	onChange: (name: string, value: string | boolean) => void;
	countryOptions: ReturnType<typeof Country.getAllCountries>;
	phoneCodeOptions: string[];
	phoneCodeToCountryMap: Map<string, ICountry>;
	cities: ReturnType<typeof City.getCitiesOfCountry>;
	hideLabel?: boolean;
	className?: string;
	hasError?: boolean;
	errorMessage?: string;
}

function FieldInput({ field, value, onChange, countryOptions, phoneCodeOptions, phoneCodeToCountryMap, cities, hideLabel = false, className = "", hasError = false, errorMessage = "Invalid" }: FieldInputProps) {
	const [phoneCodeSearch, setPhoneCodeSearch] = useState("");
	const [countrySearch, setCountrySearch] = useState("");
	const [citySearch, setCitySearch] = useState("");
	const baseLabel = !hideLabel ? (
		<label className="text-white font-luckiest text-sm sm:text-base uppercase tracking-wider mb-2 block">
			{field.label}
		</label>
	) : null;

	const inputClasses = `w-full rounded-md bg-[#dba4e2] text-black placeholder-black/60 font-montserrat text-sm px-3 py-3 focus:outline-none focus:ring-2 focus:ring-white/60 border-[3px] ${
		hasError ? "border-red-500" : "border-[#730071]"
	}`;
	
	const errorDisplay = hasError && (
		<p className="text-red-400 font-montserrat text-xs mt-1">Invalid</p>
	);

	if (field.type === "checkbox") {
		return (
			<label className="flex items-start gap-3 text-white font-montserrat text-sm sm:text-base leading-6">
				<input
					type="checkbox"
					checked={Boolean(value)}
					onChange={(e) => onChange(field.name, e.target.checked)}
					className="mt-1 h-5 w-5 accent-black"
				/>
				{field.label}
			</label>
		);
	}

	if (field.name === "phoneCountry") {
		const filteredCodes = filterOptions(phoneCodeOptions, phoneCodeSearch, (code) => code);
		const selectedCountryForCode = phoneCodeToCountryMap.get(value as string);
		
		// Helper to get flag component
		const getFlagComponent = (isoCode: string) => {
			const FlagComponent = (flags as any)[isoCode];
			return FlagComponent ? <FlagComponent className="w-5 h-3.5 object-cover rounded-sm" /> : null;
		};

		return (
			<div className="flex flex-col relative">
				{baseLabel}
				<div className="relative">
					{selectedCountryForCode && (
						<div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
							{getFlagComponent(selectedCountryForCode.isoCode)}
						</div>
					)}
					<input
						type="text"
						className={`${inputClasses} ${selectedCountryForCode ? 'pl-11' : ''}`}
						placeholder="Eg: +91 "
						value={phoneCodeSearch || (value as string)}
						onChange={(e) => {
							setPhoneCodeSearch(e.target.value);
						}}
						onFocus={() => setPhoneCodeSearch("")} 
						onBlur={() => {
							setTimeout(() => setPhoneCodeSearch(""), 200);
						}}
					/>
				</div>
				{phoneCodeSearch && (
					<div className="absolute top-full left-0 right-0 mt-1 bg-[#dba4e2] border-[3px] border-[#730071] rounded-md max-h-60 overflow-y-auto z-50 shadow-lg">
						{filteredCodes.length > 0 ? (
							filteredCodes.map((code) => {
								const country = phoneCodeToCountryMap.get(code);
								return (
									<div
										key={code}
										className="px-3 py-2 cursor-pointer hover:bg-[#c88ed1] text-black font-montserrat text-sm flex items-center gap-2"
										onMouseDown={() => {
											onChange(field.name, code);
											setPhoneCodeSearch("");
										}}
									>
										{country && getFlagComponent(country.isoCode)}
										<span>{code}</span>
										{country && <span className="text-xs opacity-70">{country.name}</span>}
									</div>
								);
							})
						) : (
							<div className="px-3 py-2 text-black/60 font-montserrat text-sm">No matches</div>
						)}
					</div>
				)}
				{errorDisplay}
			</div>
		);
	}

	if (field.type === "country") {
		const selectedCountry = countryOptions.find((c) => c.isoCode === value);
		const filteredCountries = filterOptions(countryOptions, countrySearch, (c) => c.name);
		return (
			<div className="flex flex-col relative">
				{baseLabel}
				<input
					type="text"
					className={inputClasses}
					placeholder="Select country"
					value={countrySearch || selectedCountry?.name || ""}
					onChange={(e) => {
						setCountrySearch(e.target.value);
					}}
					onFocus={() => setCountrySearch("")} 
					onBlur={() => {
						setTimeout(() => setCountrySearch(""), 200);
					}}
				/>
				{countrySearch && (
					<div className="absolute top-full left-0 right-0 mt-1 bg-[#dba4e2] border-[3px] border-[#730071] rounded-md max-h-60 overflow-y-auto z-50 shadow-lg">
						{filteredCountries.length > 0 ? (
							filteredCountries.map((c: ICountry) => (
								<div
									key={c.isoCode}
									className="px-3 py-2 cursor-pointer hover:bg-[#c88ed1] text-black font-montserrat text-sm"
									onMouseDown={() => {
										onChange(field.name, c.isoCode);
										setCountrySearch("");
									}}
								>
									{c.name}
								</div>
							))
						) : (
							<div className="px-3 py-2 text-black/60 font-montserrat text-sm">No matches</div>
						)}
					</div>
				)}
				{errorDisplay}
			</div>
		);
	}

	if (field.type === "city") {
		const filteredCities = filterOptions(cities, citySearch, (c) => c.name);
		return (
			<div className="flex flex-col relative">
				{baseLabel}
				<input
					type="text"
					className={inputClasses}
					placeholder={cities.length > 0 ? "Select city" : "Select country first"}
					value={citySearch || (value as string)}
					onChange={(e) => {
						setCitySearch(e.target.value);
					}}
					onFocus={() => setCitySearch("")} 
					onBlur={() => {
						setTimeout(() => setCitySearch(""), 200);
					}}
					disabled={!cities.length}
				/>
				{citySearch && cities.length > 0 && (
					<div className="absolute top-full left-0 right-0 mt-1 bg-[#dba4e2] border-[3px] border-[#730071] rounded-md max-h-60 overflow-y-auto z-50 shadow-lg">
						{filteredCities.length > 0 ? (
							filteredCities.map((c: ICity, idx: number) => (
								<div
									key={`${c.name}-${idx}`}
									className="px-3 py-2 cursor-pointer hover:bg-[#c88ed1] text-black font-montserrat text-sm"
									onMouseDown={() => {
										onChange(field.name, c.name);
										setCitySearch("");
									}}
								>
									{c.name}
								</div>
							))
						) : (
							<div className="px-3 py-2 text-black/60 font-montserrat text-sm">No matches</div>
						)}
					</div>
				)}
				{errorDisplay}
			</div>
		);
	}

	if (field.type === "select") {
		return (
			<div className="flex flex-col">
				{baseLabel}
				<select
					className={inputClasses}
					value={value as string}
					onChange={(e) => onChange(field.name, e.target.value)}
				>
					<option value="">Select</option>
					{(field.options || []).map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
				{errorDisplay}
			</div>
		);
	}

	return (
		<div className={`flex flex-col ${className}`}>
			{baseLabel}
			<input
				type={field.type === "email" ? "email" : field.type === "tel" ? "tel" : "text"}
				className={inputClasses}
				placeholder={field.placeholder ?? ""}
				value={typeof value === "string" ? value : ""}
				onChange={(e) => onChange(field.name, e.target.value)}
			/>
			{errorDisplay}
		</div>
	);
}

