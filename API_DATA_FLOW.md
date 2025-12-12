# API Data Flow Documentation

## Overview
This document explains how prize data flows from the API through the application uniformly across all pages.

## Data Structure

### API Response Format
```typescript
interface WinningTrait {
  name: string;           // Trait name (e.g., "CFC Hand Yellow")
  claimable: string;      // "true" or "false"
}

interface PrizesApiResponse {
  identifier: string;     // Session token
  winningTrait: WinningTrait[];
}
```

### Example API Response
```json
{
  "identifier": "session-token-abc123",
  "winningTrait": [
    { "name": "Future BASC Helmet", "claimable": "true" },
    { "name": "Touch Grass Hoodie", "claimable": "true" },
    { "name": "CFC Hand Yellow", "claimable": "false" }
  ]
}
```

## File Structure

### 1. `data/traitPrizeMapping.ts`
**Purpose:** Core mapping of trait names to complete prize details

**Exports:**
- `TraitPrizeMapping` interface - Complete prize object structure
- `traitToPrizeMap` - Map of all trait names to prize details
- `getPrizeByTrait()` - Get single prize by trait name
- `getPrizesByTraits()` - Get multiple prizes by trait names array

**Usage:** Low-level data access, used by prizes.ts

---

### 2. `data/prizes.ts`
**Purpose:** API integration layer and data transformation

**Exports:**
- `PrizesApiResponse` interface - API response structure
- `WinningTrait` interface - Individual winning trait structure
- `fetchPrizesFromAPI()` - Fetch prizes from API endpoint
- `transformApiToPrizes()` - Transform API response to ALL won prizes
- `transformApiToClaimablePrizes()` - Transform API response to ONLY claimable prizes
- `mockApiResponse` - Mock data for testing
- `mockPrizes` - Pre-transformed mock prizes (all)
- `mockClaimablePrizes` - Pre-transformed mock prizes (claimable only)

**Key Functions:**

```typescript
// Fetch from API
async function fetchPrizesFromAPI(sessionToken?: string): Promise<PrizesApiResponse>

// Transform all prizes (for display pages)
function transformApiToPrizes(apiResponse: PrizesApiResponse): TraitPrizeMapping[]

// Transform only claimable prizes (for IRL form)
function transformApiToClaimablePrizes(apiResponse: PrizesApiResponse): TraitPrizeMapping[]
```

---

## Usage by Page

### Congratulations/Prizes Page (`app/claim-prize/prizes/page.tsx`)

**Purpose:** Show ALL won prizes (regardless of claimable status)

**Flow:**
1. Fetch API response: `fetchPrizesFromAPI(sessionToken)`
2. Transform to ALL prizes: `transformApiToPrizes(apiResponse)`
3. Display prizes in carousel
4. Check if user has IRL prizes to show claim button

**Code:**
```typescript
const apiResponse = await fetchPrizesFromAPI(sessionToken);
const prizes = transformApiToPrizes(apiResponse);  // All won prizes
const hasIRLPrizes = prizes.some(p => p.isIRL);
```

---

### IRL Form Page (`app/IRL-Form/page.tsx`)

**Purpose:** Show ONLY claimable prizes for form submission

**Flow:**
1. Fetch API response: `fetchPrizesFromAPI(sessionToken)`
2. Transform to CLAIMABLE prizes only: `transformApiToClaimablePrizes(apiResponse)`
3. Show prize selection checkboxes
4. Conditional form fields based on selected prizes

**Code:**
```typescript
const apiResponse = await fetchPrizesFromAPI(sessionToken);
const prizes = transformApiToClaimablePrizes(apiResponse);  // Only claimable
```

**Why filter claimable?**
- Users can only submit forms for prizes they haven't claimed yet
- Already claimed prizes show in congratulations page but not in form

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          API Server                              │
│  Returns: { identifier, winningTrait: [{ name, claimable }] }   │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    fetchPrizesFromAPI()                          │
│                   (in data/prizes.ts)                            │
│  • Makes API call with session token                             │
│  • Returns PrizesApiResponse                                     │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                ┌─────────┴─────────┐
                │                   │
                ▼                   ▼
┌───────────────────────┐  ┌────────────────────────────┐
│ transformApiToPrizes()│  │transformApiToClaimable()   │
│  (ALL prizes)         │  │  (CLAIMABLE only)          │
└──────────┬────────────┘  └──────────┬─────────────────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐    ┌────────────────────────┐
│ getPrizesByTraits()  │    │ getPrizesByTraits()    │
│ (all trait names)    │    │ (filtered trait names) │
└──────────┬───────────┘    └──────────┬─────────────┘
           │                           │
           ▼                           ▼
┌──────────────────────┐    ┌────────────────────────┐
│ Congratulations Page │    │    IRL Form Page       │
│ • Show all prizes    │    │ • Show claimable only  │
│ • Prize carousel     │    │ • Prize checkboxes     │
│ • Claim button       │    │ • Conditional fields   │
└──────────────────────┘    └────────────────────────┘
```

---

## Key Differences

| Aspect | Congratulations Page | IRL Form Page |
|--------|---------------------|---------------|
| **Data Source** | `transformApiToPrizes()` | `transformApiToClaimablePrizes()` |
| **Prizes Shown** | ALL won prizes | ONLY claimable prizes |
| **Purpose** | Display achievements | Allow claiming unclaimed prizes |
| **Filter** | None (all traits) | Filter by `claimable === "true"` |

---

## Implementation Checklist

### To Connect Real API:

1. **Update `fetchPrizesFromAPI()` in `data/prizes.ts`:**
   ```typescript
   export async function fetchPrizesFromAPI(sessionToken?: string) {
     const response = await fetch('/api/prizes', {
       headers: {
         'Authorization': `Bearer ${sessionToken}`,
       },
     });
     return await response.json();
   }
   ```

2. **Pass session token from authentication:**
   - Update congratulations page to get token from auth/wallet
   - Update IRL form to receive token from URL or auth

3. **No other changes needed!**
   - The transformation logic handles everything
   - Both pages already use the correct functions

---

## Benefits of This Structure

✅ **Uniform Data Flow:** Same API response structure everywhere  
✅ **Reusable Functions:** One place to update API integration  
✅ **Clear Separation:** Display logic separate from data transformation  
✅ **Type Safety:** Full TypeScript interfaces throughout  
✅ **Easy Testing:** Mock data uses same structure as real API  
✅ **Flexible Filtering:** Can filter by claimable status anywhere  

---

## Example Usage

### Congratulations Page
```typescript
// Show ALL won prizes
useEffect(() => {
  async function loadPrizes() {
    const apiResponse = await fetchPrizesFromAPI(sessionToken);
    const allPrizes = transformApiToPrizes(apiResponse);
    setPrizes(allPrizes);
  }
  loadPrizes();
}, []);
```

### IRL Form
```typescript
// Show ONLY claimable prizes
useEffect(() => {
  async function loadPrizes() {
    const apiResponse = await fetchPrizesFromAPI(sessionToken);
    const claimablePrizes = transformApiToClaimablePrizes(apiResponse);
    setPrizes(claimablePrizes);
  }
  loadPrizes();
}, []);
```

---

## Notes

- Mock data in `prizes.ts` simulates the exact API structure
- "CFC Hand Yellow" is set to `claimable: "false"` in mock data for testing
- Session token should come from wallet connection or authentication
- Both pages now fetch data dynamically instead of using static imports
