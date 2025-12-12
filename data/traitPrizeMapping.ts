// This file maps trait names to their corresponding prizes and images

export interface TraitPrizeMapping {
  traitName: string;
  prizeName: string;
  prizeImage: string;
  traitIcon: string;
  isIRL: boolean; // true for physical items, false for tokens
  prizeType: "shirt" | "cap" | "visor" | "wine" | "rune" | "token"; // Type of prize - used for form field routing
  tokenAmount?: number; // Amount of tokens (only for token prizes)
}

export const traitToPrizeMap: Record<string, TraitPrizeMapping> = {
  // Make sure to updated the Prize Name with Quantity of the tokens
  
    // Wine Prizes
  "Future BASC Helmet": {
    traitName: "Future BASC Helmet",
    prizeName: "BASC Wine",
    prizeImage: "/assets/Prize_Icons/Pengwine.png",
    traitIcon: "/assets/Trait_Icons/BASC Helmet.png",
    isIRL: true,
    prizeType: "wine",
  },
  "PW Rainbow Bottle": {
    traitName: "PW Rainbow Bottle",
    prizeName: "Emperor Wine",
    prizeImage: "/assets/Prize_Icons/EmperorWine.png",
    traitIcon: "/assets/Trait_Icons/PW Rainbow Horn.png",
    isIRL: true,
    prizeType: "wine",
  },

  // Shirt Prizes
  "HAU deco": {
    traitName: "HAU deco",
    prizeName: "HAU T-Shirt",
    prizeImage: "/assets/Prize_Icons/HauShirt.png",
    traitIcon: "/assets/Trait_Icons/HAU Hoodie deco.png",
    isIRL: true,
    prizeType: "shirt",
  },
  "Rainbow Chicken": {
    traitName: "Rainbow Chicken",
    prizeName: "HAU T-Shirt",
    prizeImage: "/assets/Prize_Icons/HauShirt.png",
    traitIcon: "/assets/Trait_Icons/Rainbow Chicken.png",
    isIRL: true,
    prizeType: "shirt",
  },
  "Bear Hoodie": {
    traitName: "Bear Hoodie",
    prizeName: "HAU T-Shirt",
    prizeImage: "/assets/Prize_Icons/HauShirt.png",
    traitIcon: "/assets/Trait_Icons/Bear Hoodie.png",
    isIRL: true,
    prizeType: "shirt",
  },
  "PW Hoodie deco": {
    traitName: "PW Hoodie deco",
    prizeName: "PW Shirt",
    prizeImage: "/assets/Prize_Icons/PengwineShirt.png",
    traitIcon: "/assets/Trait_Icons/PW Hoodie Deco.png",
    isIRL: true,
    prizeType: "shirt",
  },

  // Visor & Hat Prizes
  "PW Visor": {
    traitName: "PW Visor",
    prizeName: "PW Visor",
    prizeImage: "/assets/Prize_Icons/Pengwine_Visor.png",
    traitIcon: "/assets/Trait_Icons/PW VISOR .png",
    isIRL: true,
    prizeType: "visor",
  },
  "OG Red eyes": {
    traitName: "OG Red eyes",
    prizeName: "PW Hat",
    prizeImage: "/assets/Prize_Icons/Pengwine.png", // Need to be updated with Hat image
    traitIcon: "/assets/Trait_Icons/OG eyes.png",
    isIRL: true,
    prizeType: "cap",
  },

  // Token Prizes
  "LFGO Handdrawn Design": {
    traitName: "LFGO Handdrawn Design",
    prizeName: "16,792 $LFGO TOKENS",
    prizeImage: "/assets/Prize_Icons/LFGOtoken.png",
    traitIcon: "/assets/Trait_Icons/LFGO Hoodie Deco.png",
    isIRL: false,
    prizeType: "token",
    tokenAmount: 16792,
  },
  "CFC Hand Blue": {
    traitName: "CFC Hand Blue",
    prizeName: "45,455 $SOAP Token",
    prizeImage: "/assets/Prize_Icons/$SOAP token.png",
    traitIcon: "/assets/Trait_Icons/CFC Hand blue.png",
    isIRL: false,
    prizeType: "token",
    tokenAmount: 45455,
  },
  "CFC Hand Yellow": {
    traitName: "CFC Hand Yellow",
    prizeName: "45,455$SOAP Token",
    prizeImage: "/assets/Prize_Icons/$SOAP token.png",
    traitIcon: "/assets/Trait_Icons/CFC Hand Yellow.png",
    isIRL: false,
    prizeType: "token",
    tokenAmount: 45455,
  },
  "CFC Hand Purple": {
    traitName: "CFC Hand Purple",
    prizeName: "45,455 $SOAP Token",
    prizeImage: "/assets/Prize_Icons/$SOAP token.png",
    traitIcon: "/assets/Trait_Icons/CFC Hand purple.png",
    isIRL: false,
    prizeType: "token",
    tokenAmount: 45455,
  },
  "Wizard Hat": {
    traitName: "Wizard Hat",
    prizeName: "400,000 $HAU Token",
    prizeImage: "/assets/Prize_Icons/$HAU token.png",
    traitIcon: "/assets/Trait_Icons/Wizard Hat.png",
    isIRL: false,
    prizeType: "token",
    tokenAmount: 400000,
  },
  "Shit Happens deco": {
    traitName: "Shit Happens deco",
    prizeName: "400,000 $HAU Token",
    prizeImage: "/assets/Prize_Icons/$HAU token.png",
    traitIcon: "/assets/Trait_Icons/ShirtHappens Deco.png",
    isIRL: false,
    prizeType: "token",
    tokenAmount: 400000,
  },
  "Tiger Hoodie": {
    traitName: "Tiger Hoodie",
    prizeName: "400,000 $HAU Token",
    prizeImage: "/assets/Prize_Icons/$HAU token.png",
    traitIcon: "/assets/Trait_Icons/Tiger Hoodie.png",
    isIRL: false,
    prizeType: "token",
    tokenAmount: 400000,
  },
  "Touch Grass Hoodie": {
    traitName: "Touch Grass Hoodie",
    prizeName: "4,200 TG Rune",
    prizeImage: "/assets/Prize_Icons/Touch_Grass Token.png",
    traitIcon: "/assets/Trait_Icons/Touch Grass Hoodie.png",
    isIRL: true,
    prizeType: "rune",
    tokenAmount: 4200,
  },
  "cluster fk": {
    traitName: "cluster fk",
    prizeName: "105,200 $CFUCK Token",
    prizeImage: "/assets/Prize_Icons/CFC token.png",
    traitIcon: "/assets/Trait_Icons/CLusterFuck.png",
    isIRL: false,
    prizeType: "token",
    tokenAmount: 105200,
  },
  "WGA skull": {
    traitName: "WGA skull",
    prizeName: "100,000 $WGA Token",
    prizeImage: "/assets/Prize_Icons/WGA token.png",
    traitIcon: "/assets/Trait_Icons/WGA Skull.png",
    isIRL: false,
    prizeType: "token",
    tokenAmount: 100000,
  },
  "BTC #1934 Tattoo": {
    traitName: "BTC #1934 Tattoo",
    prizeName: "40,000 HAU Rune",
    prizeImage: "/assets/Prize_Icons/HAU Rune Token.png",
    traitIcon: "/assets/Trait_Icons/BTC 1934 Tattoo.png",
    isIRL: true,
    prizeType: "rune",
    tokenAmount: 40000,
  },
};

/**
 * Get prize details by trait name
 * @param traitName - The trait name from the API
 * @returns Complete prize mapping or null if not found
 */
export function getPrizeByTrait(
  traitName: string
): TraitPrizeMapping | null {
  return traitToPrizeMap[traitName] || null;
}

/**
 * Get multiple prizes from trait names
 * @param traitNames - Array of trait names from the API
 * @returns Array of prize mappings
 */
export function getPrizesByTraits(traitNames: string[]): TraitPrizeMapping[] {
  return traitNames
    .map((trait) => getPrizeByTrait(trait))
    .filter((prize): prize is TraitPrizeMapping => prize !== null);
}
