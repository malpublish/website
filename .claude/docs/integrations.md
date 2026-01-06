<!-- Last updated: 2026-01-05 (Phase 3B Complete) | Status: Active -->

# Integrations

## Credential Security

### This Project's Configuration

| Setting | Value |
|---------|-------|
| **GitHub Account** | `malpublish` |
| **Token Variable** | `MALPUBLISH_GITHUB_TOKEN` |
| **Username Variable** | `MALPUBLISH_GITHUB_USERNAME` |
| **Credential File** | `~/.env.credentials/malpublish.env` |
| **Isolation** | direnv - only this project's tokens loaded |

### Security Rules

1. **NEVER embed tokens** in git remote URLs
2. **NEVER hardcode tokens** in .mcp.json - use `${VAR}` syntax
3. **NEVER use `gh auth login`** - breaks per-project isolation
4. **After credential changes**: Run `~/.claude/scripts/audit.sh`

### Verification

```bash
echo $MALPUBLISH_GITHUB_TOKEN  # Should show token (not NOT_CONFIGURED)
gh auth status                  # Should show configured account
```

**Full credential documentation**: `~/.claude/docs/credential-security.md`

---

## GitHub

**Owner**: `malpublish`
**Repository**: `website`
**URL**: https://github.com/malpublish/website

---

## Supabase

**Account**: malpublish (stopmalpublishing@gmail.com)
**Project**: `fidjzybkjowguvdlzahs`
**Dashboard**: https://supabase.com/dashboard/project/fidjzybkjowguvdlzahs

### Configuration

| Setting | Value |
|---------|-------|
| URL | `https://fidjzybkjowguvdlzahs.supabase.co` |
| Access Token Var | `MALPUBLISH_SUPABASE_ACCESS_TOKEN` |
| Project Ref Var | `MALPUBLISH_SUPABASE_PROJECT_REF` |

### Client Setup

| File | Use Case |
|------|----------|
| `src/lib/supabase/client.ts` | Browser/client-side |
| `src/lib/supabase/server.ts` | Server components, API routes |

### CLI Quirks

```bash
# Login requires access token (sbp_*), not service role key
supabase login

# Link to project
supabase link --project-ref fidjzybkjowguvdlzahs

# Push migrations
supabase db push

# Push with seed data
supabase db push --include-seed

# Reset failed migration
supabase migration repair --status reverted
```

### MCP Configuration

The correct `.mcp.json` configuration for Supabase MCP:

```json
{
  "supabase": {
    "command": "npx",
    "args": ["-y", "@supabase/mcp-server-supabase@latest", "--project-ref", "${MALPUBLISH_SUPABASE_PROJECT_REF}"],
    "env": {
      "SUPABASE_ACCESS_TOKEN": "${MALPUBLISH_SUPABASE_ACCESS_TOKEN}"
    }
  }
}
```

**Quirks**:
- Package is `@supabase/mcp-server-supabase` (NOT `supabase-mcp-server`)
- Project ref must be `--project-ref` CLI arg, not env var
- After config changes, restart Claude Code session
- Verify with `/mcp` command

### Regeneration Commands

```bash
# Regenerate TypeScript types from schema
npx supabase gen types typescript --project-id fidjzybkjowguvdlzahs > src/types/database.ts
```

### Database Summary

| Table | Purpose | Count |
|-------|---------|-------|
| `facets` | Malpublishing categories | 4 |
| `standard_items` | Checklist items per facet | 25 |
| `prevention_guidelines` | Best practice steps | 8 |
| `sector_templates` | Industry presets (7 categories) | 31 |
| `commitment_templates` | Auto-generation mappings | 24 |
| `policies` | User-created policies | - |
| `organizations` | Claimed orgs | - |

---

## Vercel

**Account**: malpublish (team)
**Project**: malpublish
**Dashboard**: https://vercel.com/malpublish/malpublish
**Live URLs**:
- https://publishingpolicy.org (primary)
- https://malpublish.vercel.app (Vercel default)

### Configuration

| Setting | Value |
|---------|-------|
| Token Variable | `MALPUBLISH_VERCEL_TOKEN` |
| Project | `malpublish` |
| GitHub Repo | `malpublish/website` |
| Auto-deploy | ✅ Connected |

### CLI Commands

```bash
# Deploy manually
npx vercel --token=$VERCEL_TOKEN --yes

# Link project
npx vercel link --yes --project=malpublish

# Connect GitHub repo
npx vercel git connect https://github.com/malpublish/website --yes
```

### Quirks: GitHub Integration

**Two auth layers required** for auto-deploy:
1. **OAuth login**: Connect GitHub to Vercel account (Settings → Login Connections)
2. **GitHub App**: Install Vercel app on the GitHub org

Check which orgs have the app installed:
```bash
curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
  "https://api.vercel.com/v1/integrations/git-namespaces?provider=github"
```

If org missing, install at: https://github.com/apps/vercel/installations/new

### Environment Variables (Vercel Dashboard)

```
NEXT_PUBLIC_SUPABASE_URL=https://fidjzybkjowguvdlzahs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from Supabase dashboard>
```

---

## Adding New Services

When integrating a new service (Vercel, Supabase, Stripe, etc.), document using this pattern:

### [Service Name]

**Account**: `account-name` (email@example.com)
**Project/Team**: `project-id`
**Dashboard**: [link]

#### Configuration
| Setting | Value |
|---------|-------|
| Token Variable | `MALPUBLISH_[SERVICE]_TOKEN` |
| Project ID | `xxx` |

#### CLI Quirks
Document any non-obvious CLI behavior:
```bash
# Example: Vercel CLI ignores env var, must use flag
vercel --prod --token $MALPUBLISH_VERCEL_TOKEN
```

#### Client Setup (if multiple clients)
| File | Use Case |
|------|----------|
| client.ts | Browser/client-side |
| server.ts | Server-side, API routes |

#### Regeneration Commands
```bash
# Example: Regenerate database types
npx supabase gen types typescript --project-id xxx > src/types/database.ts
```

> **Document quirks immediately**: When you discover a CLI gotcha or non-obvious behavior, add it here. Future sessions will thank you.
