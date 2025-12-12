import {
  getPrizesByTraits,
  type TraitPrizeMapping,
} from "./traitPrizeMapping";

// Re-export TraitPrizeMapping for use in other components
export type { TraitPrizeMapping };

// API Response structure
export interface WinningTrait {
  name: string;
  claimable: string; // "true" or "false"
}

export interface PrizesApiResponse {
  identifier: string; // Session token
  winningTrait: WinningTrait[];
}

// Simulated API response - matches real API structure
export const mockApiResponse: PrizesApiResponse = {
  identifier: "mock-session-token-12345",
  winningTrait: [
    { name: "LFGO Handdrawn Design", claimable: "true" },
    { name: "CFC Hand Blue", claimable: "true" },
    { name: "CFC Hand Yellow", claimable: "false" }, // Not claimable - won't show in IRL form
    { name: "CFC Hand Purple", claimable: "true" },
    { name: "Wizard Hat", claimable: "true" },
    { name: "Shit Happens deco", claimable: "true" },
    { name: "Tiger Hoodie", claimable: "true" },
    { name: "cluster fk", claimable: "true" },
    { name: "WGA skull", claimable: "true" },
    { name: "Future BASC Helmet", claimable: "true" },
    { name: "Touch Grass Hoodie", claimable: "true" },
     { name: "PW Rainbow Bottle", claimable: "false" },
    //"PW Rainbow Bottle"
  ],
};

/**
 * Transform API response to prize objects
 * Use this for displaying all won prizes (regardless of claimable status)
 * @param apiResponse - API response with winning traits
 * @returns Array of all prize mappings
 */
export function transformApiToPrizes(
  apiResponse: PrizesApiResponse
): TraitPrizeMapping[] {
  const traitNames = apiResponse.winningTrait.map((trait) => trait.name);
  return getPrizesByTraits(traitNames);
}

/**
 * Transform API response to only claimable prizes
 * Use this for IRL form to show only prizes user can still claim
 * @param apiResponse - API response with winning traits
 * @returns Array of claimable prize mappings
 */
export function transformApiToClaimablePrizes(
  apiResponse: PrizesApiResponse
): TraitPrizeMapping[] {
  const claimableTraitNames = apiResponse.winningTrait
    .filter((trait) => trait.claimable === "true")
    .map((trait) => trait.name);
  const allClaimablePrizes = getPrizesByTraits(claimableTraitNames);
  
  // Filter to only IRL prizes (physical items that need shipping)
  return allClaimablePrizes.filter((prize) => prize.isIRL === true);
}

/**
 * Fetch prizes from API
 * TODO: Replace with actual API endpoint
 * @param sessionToken - User's session token
 * @returns Promise with API response
 */
export async function fetchPrizesFromAPI(
  sessionToken?: string
): Promise<PrizesApiResponse> {
  // TODO: Replace this with actual API call
  // Example:
  // const response = await fetch('/api/prizes', {
  //   headers: {
  //     'Authorization': `Bearer ${sessionToken}`,
  //   },
  // });
  // return await response.json();

  // For now, return mock data
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return mockApiResponse;
}

// For immediate use in components (all prizes)
export const mockPrizes = transformApiToPrizes(mockApiResponse);

// For IRL form (only claimable prizes)
export const mockClaimablePrizes = transformApiToClaimablePrizes(mockApiResponse);
