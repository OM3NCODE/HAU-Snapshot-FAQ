export interface Question {
    id : string;
    question: string;
    answer: string;
}

export interface FAQCategory {
    id : string;
    title: string;
    sideImage: string; // Path to the changing image
    questions: Question[];
}

export interface Prize {
    id: string;
    name: string;
    prizeImage: string; // Path to prize image (front of card)
    tokens?: number; // Number of tokens (if applicable)
    isIRL: boolean; // Is this a physical/IRL prize
    prizeType: "shirt" | "cap" | "visor" | "wine" | "rune" | "token"; // Type of prize - used for form field routing
    traitName: string; // Name of the trait that won this prize
    traitIcons: string[]; // Array of trait icon paths (for card back)
}

// Export the mapping type as well
export type { TraitPrizeMapping } from "@/data/traitPrizeMapping";