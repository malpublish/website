<!-- Last updated: 2026-01-07 | Status: Active -->

# Architecture

---

## Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 16 (App Router) | React framework with SSR/SSG |
| Styling | Tailwind CSS | Utility-first CSS |
| Database | Supabase (PostgreSQL) | Data persistence, auth, RLS |
| Hosting | Vercel | Deployment, edge functions |
| Auth | Supabase Auth | Optional user accounts |
| Domain | publishingpolicy.org | Primary domain |

---

## Project Structure

```
├── public/
│   ├── logo.svg                # Brand logo (document with checkmark)
│   └── favicon.svg             # Same as logo
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page with org carousel
│   │   ├── about/              # About page (mission, malpublish concept)
│   │   ├── build/              # 4-section wizard
│   │   │   ├── page.tsx        # Wizard page (fetches sectors + templates)
│   │   │   └── PolicyWizard.tsx
│   │   ├── directory/          # Public policy listing
│   │   ├── new/                # Legacy 3-step wizard (deprecated)
│   │   ├── policy/
│   │   │   ├── [token]/        # View policy
│   │   │   └── edit/[token]/   # Edit policy
│   │   └── api/
│   │       ├── policies/       # Policy API routes
│   │       └── organizations/  # Organization API routes
│   │           ├── route.ts              # GET /api/organizations
│   │           └── [slug]/
│   │               ├── route.ts          # GET /api/organizations/[slug]
│   │               └── claim/route.ts    # POST/PUT DNS verification
│   ├── components/
│   │   ├── home/               # Homepage components
│   │   │   ├── OrganizationCarousel.tsx  # Auto-scrolling org logos
│   │   │   ├── OrganizationModal.tsx     # Click-to-view modal
│   │   │   ├── OrganizationShowcase.tsx  # Wrapper component
│   │   │   └── index.ts
│   │   ├── layout/             # Header, Footer
│   │   └── wizard/             # 4-section wizard components
│   │       ├── WizardProgress.tsx
│   │       ├── IdentitySection.tsx
│   │       ├── CommitmentsSection.tsx
│   │       ├── AccountabilitySection.tsx
│   │       ├── MalpublishSection.tsx
│   │       └── index.ts
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts       # Browser client
│   │       ├── server.ts       # Server client
│   │       └── admin.ts        # Service role client
│   └── types/
│       └── database.ts         # Generated Supabase types + custom interfaces
├── supabase/
│   ├── migrations/             # SQL migrations
│   └── seed.sql                # Reference data
└── .claude/
    └── docs/
        ├── README.md           # Docs index
        ├── architecture.md     # This file
        ├── integrations.md     # Service configuration
        ├── initiatives/        # Active work streams
        ├── artifacts/          # Archived content
        └── users/              # User research (JTBD)
```

---

## Database Schema

### Reference Data (read-only for users)

| Table | Description | Rows |
|-------|-------------|------|
| `facets` | 4 categories: Content Violations, Production Failures, Contractual Obligations, Intent & Negligence | 4 |
| `standard_items` | Checklist items organized by facet and category | 25 |
| `prevention_guidelines` | Best practices for ethical publishing | 8 |
| `sector_templates` | Industry presets across 7 categories | 31 |
| `commitment_templates` | Maps commitments to malpublish definitions for auto-generation | 24 |

### User Data (RLS-protected)

| Table | Description |
|-------|-------------|
| `policies` | User-created policy documents with edit/view tokens |
| `policy_items` | Junction table: which standard items are selected for a policy |
| `policy_guidelines` | Junction table: which guidelines are selected |
| `organizations` | Organization profiles with DNS verification support |
| `user_profiles` | Links Supabase Auth users to organizations |

### Organizations Table (Extended for Carousel)

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Primary key |
| `name` | TEXT | Organization name |
| `slug` | TEXT | URL-friendly identifier |
| `domain` | TEXT | Primary web domain (e.g., nytimes.com) |
| `sector` | TEXT | Industry category |
| `website` | TEXT | Full website URL |
| `logo_url` | TEXT | Custom logo URL (optional, Google Favicon fallback) |
| `transparency_status` | TEXT | unknown, unclaimed, claimed, verified |
| `is_featured` | BOOLEAN | Show in homepage carousel |
| `is_public` | BOOLEAN | Show in public directory |
| `dns_verification_code` | TEXT | TXT record for domain verification |
| `dns_verified_at` | TIMESTAMPTZ | When DNS was verified |

### Policies Table (Extended for New Wizard)

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Primary key |
| `name` | TEXT | Policy name |
| `sector` | TEXT | Industry sector |
| `publishing_identity` | JSONB | Section 1: org name, sector, audience, mission |
| `editorial_commitments` | JSONB | Section 2: sourcing, accuracy, transparency, independence |
| `accountability_framework` | JSONB | Section 3: corrections, feedback, contact, review |
| `malpublish_definitions` | JSONB | Section 4: auto-generated + custom definitions |
| `certification_tier` | TEXT | declared, committed, verified, exemplary |
| `certification_date` | TIMESTAMPTZ | When certified |
| `policy_url` | TEXT | External URL for verification |
| `edit_token` | TEXT | 64-char hex for editing |
| `view_token` | TEXT | 32-char hex for sharing |
| `is_public` | BOOLEAN | Listed in directory |
| `is_claimed` | BOOLEAN | Has authenticated owner |

---

## TypeScript Interfaces

```typescript
interface PublishingIdentity {
  organization_name: string
  sector: string
  primary_audience: string
  publishing_mission: string
}

interface EditorialCommitments {
  sourcing: 'single_verified' | 'two_independent' | 'three_or_more' | 'varies'
  accuracy: 'formal_process' | 'editor_review' | 'self_verified' | 'no_formal'
  transparency: {
    funding: boolean
    ownership: boolean
    corrections: boolean
    editorial_process: boolean
  }
  independence: 'disclosure_policy' | 'recusal_policy' | 'no_formal'
}

interface AccountabilityFramework {
  correction_timeframe: '24h' | '48h' | '1_week' | 'no_policy'
  feedback_mechanism: ('email' | 'form' | 'public_comment')[]
  accountability_contact: string
  review_schedule: 'quarterly' | 'annually' | 'as_needed'
}

interface MalpublishDefinition {
  id: string
  text: string
  source_commitment?: string
  is_auto_generated: boolean
  is_custom: boolean
}
```

---

## Auth Strategy

**Hybrid approach supporting both anonymous and authenticated users:**

1. **Anonymous users**: Create policies without accounts
   - `edit_token`: 64-char hex for editing (keep private)
   - `view_token`: 32-char hex for sharing (public-safe)
   - URLs: `/policy/edit/{edit_token}` and `/policy/{view_token}`

2. **Authenticated users**: Optional account creation
   - Claim existing policies via edit_token
   - Create organization profiles
   - Manage multiple policies

---

## Data Flow (New Wizard)

```
User lands on /
    ↓
Clicks "Build Your Policy" → /build
    ↓
Section 1: Publishing Identity
  - Organization name, sector, audience, mission
    ↓
Section 2: Editorial Commitments
  - Sourcing, accuracy, transparency, independence
    ↓
Section 3: Accountability Framework
  - Correction timeframe, feedback, contact, review schedule
    ↓
Section 4: The Malpublish Moment
  - Auto-generated definitions from commitments (via commitment_templates)
  - Edit/customize definitions
  - Add custom definitions
    ↓
Save → API creates policy with all JSONB data
    ↓
Redirect to /policy/edit/{edit_token}
    ↓
Optional: Make public (appears in /directory)
```

---

## Patterns

### Supabase Client Usage

```typescript
// Client-side (browser)
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

// Server-side (RSC, API routes)
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()

// Admin (bypasses RLS for server-side inserts)
import { createAdminClient } from '@/lib/supabase/admin'
const supabase = createAdminClient()
```

### Type Safety

```bash
# Regenerate types after schema changes
npx supabase gen types typescript --project-id fidjzybkjowguvdlzahs > src/types/database.ts
```

---

## Security

- **RLS enabled** on all user-facing tables (policies, policy_items, etc.)
- **Reference data** (facets, standard_items) is read-only via RLS
- **Tokens** generated server-side with `gen_random_bytes()`
- **No PII** stored for anonymous users

---

## External APIs

| Service | Purpose | Endpoint |
|---------|---------|----------|
| Google Favicon API | Organization logos | `https://www.google.com/s2/favicons?domain={domain}&sz=128` |
| Google DNS API | TXT record verification | `https://dns.google/resolve?name={domain}&type=TXT` |
