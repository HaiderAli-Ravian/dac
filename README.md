# Dealers Auto Center — Frontend Assessment

A Next.js frontend assessment demonstrating vehicle search, filtering, sorting, pagination, and form validation with TypeScript and TanStack Query.

Vehicle records are mock data. Registration validates inputs and simulates feedback; it does not create an account or persist credentials.

## 🚀 Live Demo

**[https://dac-psi.vercel.app/](https://dac-psi.vercel.app/)**

## 📁 Repository

**[https://github.com/HaiderAli-Ravian/dac](https://github.com/HaiderAli-Ravian/dac)**

---

## 📋 Tasks

### Task 1 — Vehicle Inventory Dashboard (`/`)
A fully functional vehicle listing page with server-side filtering, sorting, and pagination.

- 50 curated vehicle records across 12+ makes (Ford, Toyota, BMW, Tesla, Honda, Chevrolet, Audi, Mercedes-Benz, Hyundai, Kia, Nissan, Porsche)
- Real-time search by make, model, trim, or type — debounced at 300ms
- Sort by Name A→Z, Name Z→A, Price Low→High, Price High→Low
- Server-side filtering, sorting, and pagination via Next.js API route
- 8 vehicles per page with full pagination
- Skeleton loading states matching card dimensions
- Error state with retry functionality
- Empty state when search returns no results
- Vehicle images via [imagin.studio](https://cdn.imagin.studio) car image API
- "View Details" expands a full-screen modal with image, specs (engine, horsepower, drivetrain, transmission, MPG, seating), key features list, and a "Schedule a Test Drive" CTA
- Fully responsive: 1 col mobile → 2 col tablet → 3 col desktop → 4 col xl

### Task 2 — User Registration Form (`/register`)
A clean, validated user registration form.

- Fields: Full Name, Email, Phone Number, Password
- Zod schema validation with react-hook-form
- Inline error messages on blur (not on every keystroke)
- Password show/hide toggle
- Loading spinner on submit
- Success toast notification on valid submission
- Form resets after successful submission

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 (App Router) | Framework |
| motion | Animations |
| TypeScript | Language |
| Tailwind CSS | Styling |
| shadcn/ui | Component library |
| @tanstack/react-query | Server state & data fetching |
| Axios | HTTP client |
| Zod | Schema validation |
| react-hook-form | Form state management |
| @hookform/resolvers | Zod + react-hook-form bridge |
| use-debounce | Search input debouncing |
| Sonner | Toast notifications |
| imagin.studio CDN | Vehicle images |

---

## 🏗 Architecture

### API Design
The vehicle listing uses a proper REST API pattern with server-side data processing:

```
GET /api/vehicles
  ?search=ford        — filter by make, model, trim, or type
  ?type=sedan         — filter by vehicle type (Sedan, SUV, Truck, Coupe, etc.)
  ?sort=price-asc     — name-asc | name-desc | price-asc | price-desc
  ?page=1             — page number
  ?limit=8            — items per page

Response:
{
  "data": [...],    — vehicles for current page
  "total": 50,      — total matching records
  "pages": 7,       — total pages
  "page": 1         — current page
}
```

### Data Flow
```
User Input (search/sort/page)
  → useDebounce (300ms)
  → useVehicles hook (React Query)
  → GET /api/vehicles?params
  → Next.js API route (filter → sort → paginate)
  → Response { data, total, pages, page }
  → UI renders cards / skeletons / error / empty state
```

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   └── vehicles/route.ts     # Server-side filter, sort, paginate
│   ├── register/
│   │   └── page.tsx              # Task 2: Registration form
│   ├── layout.tsx                # Root layout with QueryProvider
│   └── page.tsx                  # Task 1: Vehicle listing
├── components/
│   ├── shared/
│   │   ├── Navbar.tsx            # Sticky navigation
│   │   └── QueryProvider.tsx     # React Query provider
│   ├── listing/                  # Task 1 components
│   │   ├── VehicleCard.tsx
│   │   ├── VehicleCardSkeleton.tsx
│   │   ├── VehicleDetailScreen.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SortSelect.tsx
│   │   ├── TypeFilter.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorState.tsx
│   └── form/
│       └── RegistrationForm.tsx  # Task 2 form with validation
├── hooks/
│   └── useVehicles.ts            # React Query hook with params
├── lib/
│   ├── mockVehicles.ts           # 50 curated vehicle records
│   ├── axios.ts                  # Axios instance
│   ├── carImageUrl.ts            # imagin.studio URL builder
│   ├── utils.ts                  # cn() className helper
│   └── api/
│       └── vehicles.ts           # API fetch function
└── types/
    └── vehicle.ts                # TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.9+ (Node.js 22 recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/HaiderAli-Ravian/dac.git
cd dac

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## ✅ Features Checklist

### Task 1
- [x] Vehicle listing with card/grid layout
- [x] Real vehicle images via imagin.studio API
- [x] Search filter (debounced 300ms) by make, model, trim, type
- [x] Sort by name and price (ascending/descending)
- [x] Server-side filtering, sorting, and pagination
- [x] Loading skeleton states
- [x] Error state with retry
- [x] Empty state for no results
- [x] Pagination (8 items per page)
- [x] Vehicle detail modal (specs, features, Schedule a Test Drive CTA)
- [x] Fully responsive layout

### Task 2
- [x] Full Name, Email, Phone, Password fields
- [x] Zod validation schema
- [x] Inline error messages on blur
- [x] Password show/hide toggle
- [x] Submit loading state with spinner
- [x] Success toast notification
- [x] Form reset on success
- [x] Fully responsive layout

### Bonus
- [x] Next.js 16 (preferred qualification) instead of plain React
- [x] Full-screen vehicle detail modal with specs grid, features list, and test drive CTA
- [x] TypeScript (preferred qualification)
- [x] Tailwind CSS (preferred qualification)
- [x] Server-side API with proper query parameters
- [x] Deployed on Vercel with live URL

---

## 🎨 Design

Colors match Dealers Auto Center's brand palette:
- Primary: `#2563EB` (blue-600)
- Dark: `#0F172A` (slate-900)
- Background: `#F8FAFC` (slate-50)

---

Built by **Haider Ali** — Full Stack Developer
