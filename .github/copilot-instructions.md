# Copilot Instructions for Snapshot-HAU

## Project Overview
**Snapshot-HAU** is a Next.js 16 web application for a blockchain-based prize claim system. The site features animated UI components, wallet integration points, and a custom-branded visual identity with vibrant gradients and custom fonts.

### Tech Stack
- **Framework**: Next.js 16 with App Router (uses `"use client"` for client components)
- **Styling**: Tailwind CSS v4 + PostCSS with custom theme colors
- **Animation**: Framer Motion for breathing effects and smooth transitions
- **Fonts**: Google Fonts (Montserrat, Luckiest Guy) + Local Font (SugarBomb)
- **UI Icons**: Lucide React
- **Image Handling**: Next.js Image component with `unoptimized` flag (custom assets)

## Architecture & Key Components

### Theme & Visual Identity
Custom Tailwind extensions in `tailwind.config.js`:
- **Colors**: `hau-purple` (#2D0A31), `hau-pink` (#D900FF), `hau-cyan` (#00FFFF)
- **Gradient**: `bg-hau-gradient` (purple→pink vertical gradient)
- **Fonts**: `font-sugar` (SugarBomb), `font-luckiest` (Luckiest Guy), `font-montserrat` (default body)

Use these custom utilities in components—avoid generic color names.

### Component Patterns

**Client Components** (`"use client"`):
- `Navbar.tsx`: Mobile-responsive with hamburger menu, uses `usePathname()` to highlight active links
- `Claim_Breathing_prizes.tsx`: Controlled image animations with staggered delays
- `page.tsx` (claim-prize): Demonstrates wallet state management and multi-layer z-index composition

**Layout Fundamentals**:
- Mobile-first responsive design (`hidden` + `lg:flex` patterns)
- Z-index layering: background (z-0) → content (z-10/z-20) → overlays (z-50)
- Text stroke effects: Use `style={{ WebkitTextStroke, paintOrder, filter }}` for styled text headers

**Image Handling**:
All Image components use `unoptimized={true}` (custom assets, not optimized by Next.js). Always include `fill` with `sizes` for responsive images, or explicit `width`/`height`.

### Animation Patterns (Framer Motion)

Consistent motion setup across components:
```tsx
<motion.div
  initial={{ y: -50, opacity: 0 }}      // Start state
  animate={{ y: 0, opacity: 1 }}        // Final state
  transition={{ duration: 0.8, type: "spring" }}
  whileHover={{ scale: 1.05 }}          // Interactive feedback
  whileTap={{ scale: 0.95 }}            // Button press feedback
>
```

Use `AnimatePresence` for element exit animations (see `Claim_Breathing_prizes.tsx`).

## Workflows

### Development
```bash
npm run dev          # Start dev server on http://localhost:3000 with hot reload
npm run build        # Production build with Next.js optimization
npm run lint         # ESLint check (fix with eslint --fix)
npm start            # Run production build locally
```

### File Structure
- `app/` – Page routes (Next.js App Router)
- `components/` – Reusable React components
- `data/` – Static data objects (e.g., `faq.ts`)
- `types/` – TypeScript interfaces (`index.ts`)
- `public/assets/` – Image and font files

## Code Conventions

### TypeScript Interfaces
Define component props in a named interface (see `Claim_Breathing_prizes.tsx`):
```tsx
interface BreathingItem {
  imageA: string;
  imageB: string;
  className?: string;
  delay?: number;
}
```

### State Management
- Local state with `useState` for UI state (form inputs, modals, menu toggles)
- No external state management library—keep it simple for this scale
- Wallet address is mocked in `claim-prize/page.tsx` (hardcoded "8x...42a" on button click)

### Styling Approach
1. **Tailwind first**: Use utility classes for responsive design
2. **Custom Tailwind utilities**: Leverage `hau-*` color/gradient utilities
3. **Inline styles**: Only for dynamic values or WebKit vendor prefixes
4. **className merging**: Import `clsx` or `tailwind-merge` for complex class logic

### Path Aliases
Use `@/` for absolute imports (configured in `tsconfig.json`):
```tsx
import Navbar from "@/components/Navbar";
import { Question } from "@/types";
```

## Common Tasks

**Adding a Page**: Create `.tsx` in `app/` folder, export default function. Use `"use client"` if interactive.

**Adding a Component**: Create `.tsx` in `components/`, define TypeScript interface for props, use custom theme colors.

**Styling a Component**: Use Tailwind utilities with mobile-first responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`). Reference `Navbar.tsx` for responsive pattern examples.

**Animating Content**: Use Framer Motion with `initial`/`animate`/`transition`. Check `Claim_Breathing_prizes.tsx` for interval-based state cycling.

## Integration Points

- **Wallet Connection**: Mocked in `claim-prize/page.tsx`. Future integration will replace `handleConnect()` with Web3 library (e.g., wagmi).
- **FAQ Data**: Static JSON in `data/faq.ts` with `FAQCategory[]` interface (defined in `types/index.ts`).
- **Image Assets**: All in `public/assets/` with subfolders by feature (e.g., `Claim_Prize/`).

## Important Notes

- **Next.js Image**: Always use `/assets/` prefix for public assets, never relative paths
- **Mobile Testing**: Test at breakpoints: 320px (mobile), 768px (tablet), 1024px+ (desktop)
- **Performance**: Framer Motion animations use GPU acceleration; check `scale` and `opacity` transforms
- **Fonts**: Custom `font-sugar` may have rendering quirks—test across browsers
