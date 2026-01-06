# Initiative: Publishing Policy Platform

**Status**: Phase 3B - PublishingPolicy.org Rebrand
**Created**: 2026-01-03
**Updated**: 2026-01-05

---

## Vision

Enable organizations to define their publishing commitments and, from those commitments, derive what "malpublishing" means in their specific context. The platform inverts the traditional approach: instead of "here's what's bad, select what applies," users define "what do you stand for" and the platform generates malpractice definitions from their positive commitments.

**Domain**: publishingpolicy.org (primary), malpublish.org (term landing page)

---

## Core Concept

Organizations:
1. **Define** their publishing identity (who they are, their audience, their mission)
2. **Commit** to editorial standards (sourcing, accuracy, transparency, independence)
3. **Establish** accountability framework (corrections, feedback, review schedule)
4. **Generate** malpublishing definitions from their commitments (auto + custom)
5. **Publish** their policy for public accountability

---

## Progress

### Phase 0: Infrastructure ✅
- [x] Initialize Next.js 16 + Supabase stack
- [x] Configure project credentials (GitHub, Supabase, Vercel)
- [x] Set up MCP integrations
- [x] Configure Vercel with GitHub auto-deploy

### Phase 1: Database ✅
- [x] Design schema (facets, items, policies, organizations)
- [x] Create migration (`20260104000000_initial_schema.sql`)
- [x] Seed reference data from content archive
- [x] Enable RLS on user-facing tables

### Phase 2: UI Development ✅
- [x] Policy builder wizard (3-step legacy version)
- [x] Sector template selection
- [x] Checklist interface for selecting items
- [x] Preview/save functionality
- [x] Directory page with sector filtering
- [x] Edit page with auto-save
- [x] View page for public policies

### Phase 3B: PublishingPolicy.org Rebrand ⬅️ CURRENT

**Sprint 1: Rebrand & Schema** ✅
- [x] Update app metadata for publishingpolicy.org
- [x] Update Header/Footer branding
- [x] Create schema migration with new JSONB columns
- [x] Expand sector_templates to 31 sectors (7 categories)
- [x] Add commitment_templates table for auto-generation
- [x] Regenerate TypeScript types
- [x] Verify build passes

**Sprint 2: New Wizard Sections 1-3** ✅
- [x] Section 1: Publishing Identity form
- [x] Section 2: Editorial Commitments (4 question groups)
- [x] Section 3: Accountability Framework (4 questions)
- [x] Progress indicator (4 sections)
- [x] State management for new form structure
- [x] New /build route with PolicyWizard

**Sprint 3: The Malpublish Moment** (Next)
- [ ] Transitional screen design
- [ ] Template substitution engine
- [ ] Editable generated definitions UI
- [ ] Final save with full policy data

**Sprint 4: Landing Page & Directory**
- [ ] Rewrite landing page with positive framing
- [ ] Add audience expectation messaging
- [ ] Update directory with commitment summaries
- [ ] Add "coming soon" certification messaging

### Future (Post-MVP)
- User authentication (claim policies)
- Paid certification tiers (Verified, Exemplary)
- PDF/Markdown export
- Organization profiles

---

## Database Schema

| Table | Purpose | Rows |
|-------|---------|------|
| `facets` | 4 categories of malpublishing | 4 |
| `standard_items` | Checklist items organized by facet | 25 |
| `prevention_guidelines` | Best practices for avoiding malpublishing | 8 |
| `sector_templates` | Pre-configured templates by industry | 31 |
| `commitment_templates` | Auto-generation mappings | 24 |
| `policies` | User-created policy documents | - |
| `policy_items` | Selected items for a policy | - |
| `policy_guidelines` | Selected guidelines for a policy | - |
| `organizations` | Claimed organization profiles | - |
| `user_profiles` | User accounts linked to auth | - |

**New Policy Columns (Phase 3B):**
- `publishing_identity` (JSONB): Section 1 data
- `editorial_commitments` (JSONB): Section 2 data
- `accountability_framework` (JSONB): Section 3 data
- `malpublish_definitions` (JSONB): Section 4 generated + custom definitions
- `certification_tier`: declared | committed | verified | exemplary
- `certification_date`: When verified/certified
- `policy_url`: External URL for verification

---

## Decisions Made

| Question | Answer |
|----------|--------|
| Static vs full-stack? | Full-stack (Next.js + Supabase) |
| Authentication? | Hybrid: anonymous with tokens, optional accounts |
| Storage? | PostgreSQL via Supabase |
| Templates? | Yes, 31 sector templates across 7 categories |
| MVP scope? | Rebrand first, auth later |
| Auto-generation? | Template substitution (not AI) |
| Certification? | Free tiers only for MVP, paid "coming soon" |

---

## Sector Categories (31 Total)

| Category | Sectors |
|----------|---------|
| Media & Journalism | newsroom, local_news, digital_media, newsletter, podcast, documentary |
| Academic & Research | academic_journal, university, research_institution, think_tank |
| Government & Public | federal_agency, state_government, municipal, school_district, public_library |
| Corporate & Professional | corporate_comms, pr_agency, internal_comms, industry_association |
| Platform & Technology | social_platform, content_platform, community_forum, ai_content, platform |
| Nonprofit & Advocacy | nonprofit, foundation, advocacy_org, religious_org |
| Individual & Creator | independent_journalist, blogger, consultant, creator |

---

## Wizard Structure (New)

### Section 1: Publishing Identity
- Organization name
- Sector (from 31 templates)
- Primary audience
- Publishing mission

### Section 2: Editorial Commitments
- Sourcing standards (single, two, three+, varies)
- Accuracy commitment (formal, editor, self, none)
- Transparency practices (funding, ownership, corrections, editorial process)
- Independence (disclosure, recusal, none)

### Section 3: Accountability Framework
- Correction timeframe (24h, 48h, 1 week, none)
- Feedback mechanism (email, form, public comment)
- Accountability contact (name/role)
- Review schedule (quarterly, annually, as needed)

### Section 4: The Malpublish Moment
- Transitional screen explaining the concept
- Auto-generated definitions from commitments
- Editable/customizable definitions
- Add custom definitions

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | App metadata (publishingpolicy.org) |
| `src/components/layout/Header.tsx` | Brand name |
| `src/components/layout/Footer.tsx` | Brand + malpublish definition |
| `src/types/database.ts` | TypeScript types + new interfaces |
| `supabase/migrations/20260105000000_publishing_policy_rebrand.sql` | New columns + sectors |
