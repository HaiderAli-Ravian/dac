# CLAUDE.md — Dealers Auto Center Frontend Task

## Project Overview

This is a frontend assessment project for **Dealers Auto Center** — a dealership management SaaS platform.
The project consists of two tasks built as separate pages in a single Next.js application:

- **Task 1** (`/`) — Vehicle Listing Mini Dashboard (API-based)
- **Task 2** (`/form`) — User Registration Form with Validation

The goal is clean, modern, production-quality UI that reflects Dealers Auto Center's brand.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework |
| TypeScript (strict) | Language |
| Tailwind CSS | Styling |
| shadcn/ui | Component library |
| @tanstack/react-query | Server state & data fetching |
| Axios | HTTP client |
| Zod | Schema validation |
| react-hook-form | Form state management |
| @hookform/resolvers | Zod + react-hook-form bridge |
| Sonner | Toast notifications |

---

## Color Schema

Based on Dealers Auto Center's official brand palette.

### CSS Variables (add to `globals.css`)

```css
:root {
  --brand-primary: #2563EB;       /* blue-600 — buttons, links, accents */
  --brand-primary-hover: #1D4ED8; /* blue-700 — hover states */
  --brand-light: #EFF6FF;         /* blue-50 — subtle backgrounds */
  --brand-dark: #0F172A;          /* slate-900 — dark sections, footer */
  --brand-card: #FFFFFF;          /* white — card backgrounds */
  --brand-text: #0F172A;          /* slate-900 — primary text */
  --brand-muted: #64748B;         /* slate-500 — secondary text */
  --brand-border: #E2E8F0;        /* slate-200 — borders, dividers */
  --brand-success: #16A34A;       /* green-600 — success states */
  --brand-error: #DC2626;         /* red-600 — error states */
}
```

### Tailwind Usage Convention
- Primary actions: `bg-blue-600 hover:bg-blue-700`
- Page background: `bg-slate-50`
- Cards: `bg-white border border-slate-200`
- Primary text: `text-slate-900`
- Muted text: `text-slate-500`
- Badges: `bg-blue-50 text-blue-700`
- Dark sections: `bg-slate-900 text-slate-100`

---

## Installed shadcn/ui Components

Located in `src/components/ui/`:

| Component | Used In |
|-----------|---------|
| `card` | Vehicle listing cards |
| `skeleton` | Loading states for cards and form |
| `input` | Search bar, form fields |
| `select` | Sort dropdown |
| `badge` | Price tags, category labels |
| `button` | All CTAs and actions |
| `separator` | Layout dividers |
| `alert` | Error states, success messages |
| `pagination` | Vehicle listing pagination |
| `field` | Form field wrapper (new shadcn) |
| `label` | Form field labels |
| `sonner` | Toast notifications |
| `tooltip` | Hover hints on actions |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with QueryProvider + Toaster
│   ├── globals.css             # Global styles + CSS variables
│   ├── page.tsx                # Task 1: Vehicle Listing Page (/)
│   ├── form/
│   │   └── page.tsx            # Task 2: User Registration Form (/form)
│   └── api/
│       ├── auth/
│       │   └── route.ts        # POST /api/auth — exchanges token+secret for JWT
│       └── vehicles/
│           └── route.ts        # GET /api/vehicles — proxies CarAPI trims endpoint
├── components/
│   ├── ui/                     # shadcn components (do not modify)
│   ├── shared/
│   │   └── Navbar.tsx          # Shared navbar across all pages
│   ├── listing/                # Task 1 components
│   │   ├── VehicleCard.tsx
│   │   ├── VehicleCardSkeleton.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SortSelect.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorState.tsx
│   └── form/                   # Task 2 components
│       └── RegistrationForm.tsx
├── hooks/
│   ├── useVehicles.ts          # React Query hook for vehicles
│   └── useDebounce.ts          # Debounce hook for search input
├── lib/
│   ├── utils.ts                # shadcn utils (do not modify)
│   ├── axios.ts                # Axios instance with base config
│   ├── carImageUrl.ts          # imagin.studio URL generator utility
│   └── api/
│       └── vehicles.ts         # Raw API functions (calls internal proxy)
└── types/
    └── vehicle.ts              # Vehicle TypeScript interfaces
```

---

## API Architecture

### Why a Proxy?
CarAPI does not support CORS. All CarAPI calls must happen server-side.
We use Next.js API routes as a lightweight proxy — the frontend never calls CarAPI directly.

```
Browser → /api/vehicles (Next.js route) → CarAPI → response → Browser
```

---

## CarAPI Integration

### Credentials (store in `.env.local`)
```env
CARAPI_TOKEN=your_token_here
CARAPI_SECRET=your_secret_here
```

### Step 1 — Get JWT (`/api/auth/route.ts`)
```ts
// POST https://carapi.app/api/auth/token
// Body: { api_token: token, api_secret: secret }
// Returns: JWT string (plain text, not JSON)
// Cache this JWT — it expires after 10 minutes
```

### Step 2 — Fetch Trims (`/api/vehicles/route.ts`)
```ts
// GET https://carapi.app/api/trims
// Headers: Authorization: Bearer <jwt>
// Query params: limit=20&page=1&verbose=yes
// verbose=yes returns make, model, year, msrp nested in one response
```

### CarAPI Trim Response Shape
```ts
interface CarApiTrim {
  id: number;
  year: number;
  make: string;        // e.g. "Ford"
  model: string;       // e.g. "F-150"
  trim: string;        // e.g. "King Ranch"
  description: string;
  msrp: number | null; // price in USD
}
```

### Internal `/api/vehicles` Response Shape
Transform CarAPI response into this clean shape before returning to frontend:
```ts
interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  trim: string;
  description: string;
  msrp: number;        // fallback to random 20000-80000 if null
  imageUrl: string;    // generated from imagin.studio
  type: string;        // derive from description or default to "Vehicle"
}
```

---

## imagin.studio Car Images

No API key required. Use `customer=img` for the free public tier (has subtle watermark).

### URL Generator (`src/lib/carImageUrl.ts`)
```ts
export const getCarImageUrl = (make: string, model: string, year: number): string => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  url.searchParams.append('customer', 'img');
  url.searchParams.append('make', make.toLowerCase());
  url.searchParams.append('modelFamily', model.split(' ')[0].toLowerCase());
  url.searchParams.append('modelYear', String(year));
  url.searchParams.append('zoomType', 'fullscreen');
  return url.toString();
};
```

### Usage
```ts
const imageUrl = getCarImageUrl('Ford', 'F-150', 2020);
// → https://cdn.imagin.studio/getimage?customer=img&make=ford&modelFamily=f-150&modelYear=2020&zoomType=fullscreen
```

### Notes
- Always returns an image — falls back to closest match if exact not found
- Add `cdn.imagin.studio` to allowed image domains in `next.config.ts`

---

## API Strategy (3-Step Pattern)

Always follow this exact pattern for all data fetching:

### Step 1 — Raw API function (`src/lib/api/vehicles.ts`)
```ts
// Calls our internal Next.js proxy, never CarAPI directly
export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const { data } = await axiosInstance.get('/api/vehicles');
  return data;
};
```

### Step 2 — Custom React Query hook (`src/hooks/useVehicles.ts`)
```ts
export const useVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
};
```

### Step 3 — Consumption in component
```tsx
const { data: vehicles = [], isLoading, isError, refetch } = useVehicles();
```

---

## Task 1: Vehicle Listing Page (`/`)

### Requirements
- [ ] Fetch vehicles via `useVehicles` hook (React Query)
- [ ] Card grid: 1 col mobile, 2 col tablet, 3 col desktop, 4 col xl
- [ ] Each card shows: Car image (imagin.studio), Make + Model, Year, Trim, MSRP price, Type badge
- [ ] Search by make or model name — debounced 300ms
- [ ] Search input has clear (X) button when text is present
- [ ] Sort by: Name A→Z, Name Z→A, Price Low→High, Price High→Low
- [ ] Search and sort work simultaneously
- [ ] Loading state: skeleton cards in same grid layout (8 skeletons)
- [ ] Error state: Alert component + Retry button that calls `refetch()`
- [ ] Empty state: icon + message when search returns no results
- [ ] Pagination: 8 items per page using shadcn Pagination component

### VehicleCard Layout
```
[ Car Image — imagin.studio, aspect-video, object-cover ]
[ Make • Model           ] [ Type badge            ]
[ Year  •  Trim name                               ]
[ Description (1 line, truncated)                  ]
[ $XX,XXX MSRP              [ View Details button ]]
```

---

## Task 2: User Registration Form (`/form`)

### Zod Schema
```ts
const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone must contain only numbers'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
```

### Requirements
- [ ] Fields: Full Name, Email, Phone Number, Password
- [ ] Use `field` (new shadcn component) for all field wrappers
- [ ] Inline error messages below each field
- [ ] Errors appear on blur, not on every keystroke
- [ ] Password field has show/hide toggle (Eye / EyeOff icon)
- [ ] On valid submit: Sonner success toast + form reset
- [ ] On invalid submit: show all inline errors, prevent submission
- [ ] Submit button shows loading spinner while submitting (simulate 1.5s async delay)
- [ ] Submit button disabled while submitting

### Form Layout
- Centered card layout on `bg-slate-50` page
- DAC logo + "Dealers Auto Center" branding at the top of the card
- Label → Input → Error message stacking per field
- Full width submit button at bottom

---

## Shared Navbar

Both pages share a consistent sticky navbar:

```tsx
// Left: branding
<div className="flex items-center gap-2">
  <div className="w-8 h-8 bg-blue-600 rounded text-white font-bold flex items-center justify-center">D</div>
  <span className="font-semibold text-slate-900">Dealers Auto Center</span>
</div>

// Right: nav links
<nav className="flex gap-6">
  <Link href="/">Listings</Link>
  <Link href="/form">Register</Link>
</nav>
```

- `sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm`
- Active link: `text-blue-600 font-medium`
- Inactive link: `text-slate-600 hover:text-slate-900`

---

## next.config.ts — Required Image Domain

```ts
const nextConfig = {
  images: {
    domains: ['cdn.imagin.studio'],
  },
};
```

---

## Root Layout Setup (`src/app/layout.tsx`)

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

// QueryClientProvider must wrap everything
// Toaster renders Sonner notifications
// Navbar renders on all pages
```

---

## Code Rules

1. **TypeScript strict** — no `any`, all props typed with interfaces
2. **Functional components only** — no class components
3. **Named exports** for components, default export for pages
4. **No inline styles** — Tailwind classes only
5. **Separate concerns** — API functions, hooks, and UI always in separate files
6. **React Query** for all async data — no raw `useEffect` for fetching
7. **Zod** for all validation schemas
8. **Always handle** loading, error, and empty states — never skip these
9. **Responsive first** — mobile → tablet → desktop
10. **Clean imports** — use `@/` alias for all internal imports

---

## Do Not

- Do not modify files in `src/components/ui/` (shadcn components)
- Do not use `useEffect` for data fetching — use React Query
- Do not call CarAPI directly from the browser — always go through `/api/` proxy routes
- Do not expose `CARAPI_TOKEN` or `CARAPI_SECRET` to the client
- Do not use inline styles or arbitrary Tailwind values without reason
- Do not use `any` type anywhere in TypeScript
- Do not skip loading, error, or empty states
