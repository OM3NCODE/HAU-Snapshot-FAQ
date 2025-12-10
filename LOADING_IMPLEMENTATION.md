# Loading Page Implementation Guide

## Overview
I've created a loading experience that matches your HAU theme with purple/pink gradient colors and animated spinners. The solution includes reusable components integrated across the entire prize claim flow.

## Components Created

### 1. **LoadingSpinner.tsx** (`components/LoadingSpinner.tsx`)
A reusable loading spinner component with customizable options.

**Props:**
- `message?: string` - Loading message (default: "Fetching your prizes...")
- `showCharacter?: boolean` - Whether to show the HAU character (default: false)

**Features:**
- Rotating rings with pink/cyan colors
- Animated bouncing dots
- Glowing effect matching your theme
- Responsive sizing

**Usage:**
```tsx
import LoadingSpinner from "@/components/LoadingSpinner";

<LoadingSpinner 
  message="Checking your wallet..." 
  showCharacter={true}
/>
```

### 2. **LoadingPage.tsx** (`components/LoadingPage.tsx`)
A full-page loading component for when you need the entire screen to show loading state.

**Props:**
- `message?: string` - Loading message
- `showCharacters?: boolean` - Whether to show characters

**Usage:**
```tsx
import LoadingPage from "@/components/LoadingPage";

<LoadingPage 
  message="Processing your request..." 
  showCharacters={true}
/>
```

## Updated: ClaimPrizePage

The claim-prize page (`app/claim-prize/page.tsx`) has been updated with:

1. **Loading State Management**
   ```tsx
   const [isLoading, setIsLoading] = useState(false);
   ```

2. **Updated handleConnect Function**
   ```tsx
   const handleConnect = async () => {
       setIsLoading(true);
       setWalletAddress("8x...42a");
       
       try {
           // Replace with your actual API call
           await fetch('/api/check-prizes', { ... });
           
           router.push("/claim-prize/prizes");
       } catch (error) {
           console.error("Error fetching prizes:", error);
           setIsLoading(false);
       }
   };
   ```

3. **Conditional Rendering**
   - Shows `LoadingSpinner` while `isLoading` is true
   - Shows normal connect page when loading is false
   - Button is disabled during loading

## Integration with Your API

### 1. Wallet Connection - Check Prizes API

Replace the simulated timeout in `handleConnect` with your actual API call in `/app/claim-prize/page.tsx`:

```tsx
const handleConnect = async () => {
    setIsLoading(true);
    setWalletAddress("8x...42a");
    
    try {
        // Replace this with your actual API endpoint
        const response = await fetch('/api/check-prizes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                walletAddress: "8x...42a"
            }),
        });
        
        if (!response.ok) throw new Error('Failed to fetch prizes');
        
        const data = await response.json();
        // Use data to determine which prizes the user has
        // Example: data.hasIRLPrizes, data.prizes, data.traits
        
        router.push("/claim-prize/prizes");
    } catch (error) {
        console.error("Error fetching prizes:", error);
        // Optionally show an error message to user
        setIsLoading(false);
    }
};
```

**Loading Screen Message**: "Checking your wallet..."

---

### 2. Prize Display Page - Prepare Form Data API

When user clicks "Claim" on the prizes page and redirects to the form, show loading screen with:

**File**: `/app/claim-prize/prizes/page.tsx`

```tsx
const handleClaim = async () => {
    setIsLoading(true);
    
    try {
        // Optional: Prepare form data before showing form
        const response = await fetch('/api/prepare-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                walletAddress,
                prizeIds: prizes.map(p => p.traitName)
            }),
        });
        
        if (!response.ok) throw new Error('Failed to prepare form');
        
        const data = await response.json();
        // Use data if needed (pre-fill form fields, etc.)
        
        router.push(hasIRLPrizes ? "/IRL-Form" : "/claim-prize/token-only");
    } catch (error) {
        console.error("Error preparing form:", error);
        setIsLoading(false);
    }
};
```

**Loading Screen Message**: "Preparing your form..."

---

### 3. IRL Form Submission - Submit Form API

When user clicks "Confirm" on the final form step and submits, show loading screen with:

**File**: `/app/IRL-Form/page.tsx`

The `handleNext` function will show loading when `stepIndex === STEP_SEQUENCE.length - 1` (final step):

```tsx
const handleNext = async () => {
    if (!isStepValid) return;
    
    if (stepIndex === STEP_SEQUENCE.length - 1) {
        setIsLoading(true);
        
        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    walletAddress,
                    formData: form,
                    prizeTraits: prizes.map(p => p.traitName)
                }),
            });
            
            if (!response.ok) throw new Error('Form submission failed');
            
            const data = await response.json();
            // Handle success response (submission ID, confirmation number, etc.)
            
            setIsLoading(false);
            router.push("/IRL-Form/submission_success");
        } catch (error) {
            console.error("Error submitting form:", error);
            setIsLoading(false);
            // TODO: Show error message to user
        }
        return;
    }
    
    // Not final step, just move to next
    setStepIndex((idx) => Math.min(idx + 1, STEP_SEQUENCE.length - 1));
};
```

**Loading Screen Message**: "Submitting your form..."

## Customization Options

### Change Loading Message
```tsx
<LoadingSpinner message="Verifying your NFTs..." />
```

### Add Custom Colors
Edit `LoadingSpinner.tsx` border colors:
```tsx
border-t-[#YOUR_COLOR] border-r-[#YOUR_COLOR]
border-b-[#YOUR_COLOR]
```

### Adjust Animation Speed
Modify the `duration` values in animation variants:
```tsx
const spinVariants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 3, // Change this value
            repeat: Infinity,
            ease: "linear",
        },
    },
};
```

### Show/Hide Character
```tsx
<LoadingSpinner 
  message="Loading..." 
  showCharacter={false} // Set to false to hide
/>
```

## Theme Consistency

The loading components use your app's established color scheme:
- **Primary Pink**: `#FF00FC` / `#D900FF`
- **Cyan Accent**: `#00FFFF`
- **Fonts**: Uses `font-sugar` for messages (matches your brand)
- **Glow Effects**: Drop shadows matching theme
- **Background Gradient**: Uses your existing HAU gradient

---

## Loading Flow Summary

### Complete User Journey with Loading States

```
1. Claim Prize Page (connect-wallet)
   ↓ User clicks "Connect Wallet"
   ↓ setIsLoading(true)
   ↓ 🔄 LoadingSpinner shows: "Checking your wallet..."
   ↓ API call to /api/check-prizes
   ↓ 
   → Redirects to Prizes Page

2. Prizes Display Page (prizes)
   ↓ Shows user's winning prizes
   ↓ User clicks "Claim Prizes"
   ↓ setIsLoading(true)
   ↓ 🔄 LoadingSpinner shows: "Preparing your form..."
   ↓ API call to /api/prepare-form (optional)
   ↓
   → Redirects to IRL Form or Token-Only page

3. IRL Form Page (form with multiple steps)
   ↓ User fills in: Basic Info → Shipping → Prize → Confirm
   ↓ On final step, user clicks "Confirm"
   ↓ setIsLoading(true)
   ↓ 🔄 LoadingSpinner shows: "Submitting your form..."
   ↓ API call to /api/submit-form
   ↓
   → Redirects to Success Page
```

---

## All Updated Files

## Using LoadingPage Standalone

If you want a standalone loading page (e.g., for a loading route):

```tsx
"use client";
import LoadingPage from "@/components/LoadingPage";

export default function Page() {
  return <LoadingPage message="Processing..." />;
}
```

## All Updated Files

### New Components Created
- `components/LoadingSpinner.tsx` - Reusable spinner component
- `components/LoadingPage.tsx` - Full page loading component

### Updated Pages with Loading Integration
- `app/claim-prize/page.tsx` - Shows loading when connecting wallet
- `app/claim-prize/prizes/page.tsx` - Shows loading when preparing form
- `app/IRL-Form/page.tsx` - Shows loading when submitting form

## Testing the Loading States

### 1. Wallet Connection Loading
1. Navigate to `/claim-prize`
2. Click "Connect Wallet"
3. See "Checking your wallet..." loading spinner for 2 seconds
4. Auto-redirects to prizes page

### 2. Form Preparation Loading
1. On prizes page, click "Claim Prizes"
2. See "Preparing your form..." loading spinner
3. Auto-redirects to IRL Form or Token-Only page

### 3. Form Submission Loading
1. On IRL Form, fill all steps: Basic Info → Shipping → Prize → Confirm
2. On final Confirm step, click "Confirm"
3. See "Submitting your form..." loading spinner
4. Auto-redirects to success page

## Browser Support

- Uses Framer Motion (already in your project)
- Responsive design (mobile, tablet, desktop)
- Works with all modern browsers

## Next Steps for Backend Developer

1. ✅ Loading components are set up and integrated
2. ✅ Loading state management is in place
3. ✅ Backend developer comments are included in code
4. 🔄 **TODO**: Implement these API endpoints:
   - `/api/check-prizes` - Verify wallet and check eligibility
   - `/api/prepare-form` - Optional: prepare form data before display
   - `/api/submit-form` - Submit form data to database
5. 🔄 **TODO**: Replace simulated `setTimeout` calls with actual API calls
6. 🔄 **TODO**: Add error handling for failed API calls
7. 🔄 **TODO**: Show user-friendly error messages on API failures
