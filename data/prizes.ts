import {
  getPrizesByTraits,
  type TraitPrizeMapping,
} from "./traitPrizeMapping";

// Simulated API response - only contains trait names
export const mockApiResponse: string[] = [
  "LFGO Handdrawn Design",
  "CFC Hand Blue",
  "CFC Hand Yellow",
  "CFC Hand Purple",
  "Wizard Hat",
  "Shit Happens deco",
  "Tiger Hoodie",
  "cluster fk",
  "WGA skull",
  "Future BASC Helmet",
  "Touch Grass Hoodie"
];

/**
 * Convert API trait names to complete prize objects
 */
export function transformApiToPrizes(
  traitNames: string[]
): TraitPrizeMapping[] {
  return getPrizesByTraits(traitNames);
}

// For immediate use in the component
export const mockPrizes = transformApiToPrizes(mockApiResponse);
