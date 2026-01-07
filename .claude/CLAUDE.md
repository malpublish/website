---
project: PublishingPolicy
stack: full-stack
services:
  github:
    username: "InformationEcosystem"
    repo: "PublishingPolicy"
  supabase:
    project_ref: "fidjzybkjowguvdlzahs"
  vercel:
    team: "InformationEcosystem"
    project: "publishingpolicy"
status: active
---

# Project Configuration - PublishingPolicy

**Inherits**: `~/.claude/CLAUDE.md`

---

## Session Bootstrap

| Current Focus | Status |
|---------------|--------|
| PublishingPolicy.org | MVP Live - Strategic expansion phase |

**Start here**: Read this file, then check `docs/initiatives/` for active work.

**Strategic context**: See `~/.claude/plans/sorted-questing-torvalds.md` for grassroots-to-platform strategy.

---

## Project

| Setting | Value |
|---------|-------|
| Stack | Next.js 16 + Supabase + Vercel |
| URL | https://publishingpolicy.org |
| Status | Active |

---

## Credential Check

```bash
echo $PUBLISHINGPOLICY_GITHUB_TOKEN           # Required
echo $PUBLISHINGPOLICY_SUPABASE_ACCESS_TOKEN  # Required for MCP
gh auth status                                # Should show: InformationEcosystem
```

---

## Documentation

| When | Read |
|------|------|
| Stack, patterns, schema | `docs/architecture.md` |
| Services, credentials | `docs/integrations.md` |
| Active work streams | `docs/initiatives/` |
| User research (JTBD) | `docs/users/` |
| Archived content | `docs/artifacts/` |

---

## Quick Commands

```bash
npm run dev          # Local development
npm run build        # Production build
```

---

## Deploy

**Auto-deploy**: After completing work, push to main and deploy automatically. Don't wait for user to say "deploy".

```bash
git push origin main                    # Triggers Vercel preview
vercel --prod --token $VERCEL_TOKEN     # Deploy to production
```

**Verify**: Check https://publishingpolicy.org after deploy.

---

## MCP Servers

| Server | Purpose |
|--------|---------|
| GitHub | Repository operations |
| Supabase | Database operations |

---

## Session Lifecycle

1. `git status` → 2. Work (use TodoWrite) → 3. Commit → 4. Push → 5. Deploy → 6. Verify
