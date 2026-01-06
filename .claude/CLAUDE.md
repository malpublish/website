# Project Configuration - Malpublish

**Inherits**: Global SuperClaude Framework (`~/.claude/CLAUDE.md`)
**Framework Docs**: `~/.claude/docs/` (on-demand loading)

---

## Session Bootstrap


**Start here**: Read this file, then check `docs/initiatives/` for active work.

| Current Focus | Status |
|---------------|--------|
| PublishingPolicy.org Rebrand | Sprint 2 Complete - Ready for Sprint 3 (Malpublish Moment) |

> **Keep this table updated**: When work focus changes, update silently. This helps future sessions pick up where you left off.

## Project Type

| Setting | Value |
|---------|-------|
| **Type** | `full-stack` |
| **Stack** | Next.js 16 + Supabase + Vercel |
| **Status** | `active` |

> **Update this section** when setting up the project:
> - `static`: GitHub Pages (just needs GitHub credentials)
> - `full-stack`: Vercel + Next.js + Supabase (needs GitHub + Vercel + Supabase credentials)
> - Status: `active` | `pending-setup` | `pending-migration`

---

## Session Start: Credential Check

On session start, Claude should verify required credentials exist based on project type:

**For static projects:**
```bash
echo $MALPUBLISH_GITHUB_TOKEN  # Should show token (not "NOT_CONFIGURED")
```

**For full-stack projects:**
```bash
echo $MALPUBLISH_GITHUB_TOKEN      # Required
echo $MALPUBLISH_VERCEL_TOKEN      # Required for troubleshooting
echo $MALPUBLISH_SUPABASE_URL      # Required
echo $MALPUBLISH_SUPABASE_ACCESS_TOKEN  # Required for MCP
```

If any are missing or show "NOT_CONFIGURED", prompt:
> "This project needs [service] credentials. Add `MALPUBLISH_[VAR]` to
> `~/.env.credentials/malpublish.env` and run `direnv allow`."

---

## Credential Security (CRITICAL)

### This Project's Configuration

| Setting | Value |
|---------|-------|
| **GitHub Account** | `malpublish` |
| **Token Variable** | `MALPUBLISH_GITHUB_TOKEN` |
| **Username Variable** | `MALPUBLISH_GITHUB_USERNAME` |
| **Credential File** | `~/.env.credentials/malpublish.env` (600 permissions) |
| **Isolation** | direnv - only this project's tokens loaded |
| **MCP Config** | `.mcp.json` |

### GitHub Tools (Dual-Path)

Both MCP tools and gh CLI are isolated to this project via `GITHUB_TOKEN` env var.

| Tool | Use When |
|------|----------|
| MCP tools | Normal operations (structured, auditable) |
| gh CLI | MCP unavailable, complex queries, scripting |

### Verify Isolation
```bash
gh auth status  # Should show: malpublish
```

### AI Self-Guidance - Security Rules

1. **NEVER embed tokens** in git remote URLs
2. **NEVER hardcode tokens** in .mcp.json - use \${VAR} syntax
3. **Use MCP tools or gh CLI** - both are isolated via GITHUB_TOKEN
4. **Be explicit about repo**: `owner:malpublish repo:website`
5. **NEVER use `gh auth login`** - breaks per-project isolation
6. **After credential changes**: Run `~/.claude/scripts/audit.sh`

### Correct Usage
```bash
# MCP (preferred)
Use mcp__github__list_issues for owner:malpublish repo:website

# gh CLI (alternative - same isolation)
gh issue list
gh pr create --title "..." --body "..."
```

**Full credential documentation**: `~/.claude/docs/credential-security.md`

---

## MCP Servers Configured

| Server | Status | Purpose |
|--------|--------|---------|
| GitHub | Configured | Repository operations via `MALPUBLISH_GITHUB_TOKEN` |

---

---

## Documentation (Consult Proactively)

| When you need to... | Read |
|---------------------|------|
| Understand the stack | `docs/architecture.md` |
| Debug service issues (OAuth, API) | `docs/integrations.md` |
| Work streams, decisions | `docs/initiatives/` |

> **Proactive reading**: Don't wait until stuck. Check relevant docs before starting unfamiliar work.

---

## Recipes

Common task patterns for this project:

### Add a New Feature
1. Check `docs/initiatives/` for related active work
2. Review `docs/architecture.md` for patterns to follow
3. Implement following existing conventions
4. Update docs if patterns change

### Debug an Integration Issue
1. Check `docs/integrations.md` for known quirks
2. Verify credentials (see integrations.md)
3. Check service dashboard (links in integrations.md)

### Make a Significant Technical Decision
1. Document in `## Decisions` section of the relevant initiative
2. Initiative file IS the decision record

> **Add project-specific recipes** as common patterns emerge.

---

## Current Work

Check `docs/initiatives/` for active work streams.

When starting a multi-session initiative:
1. Create `docs/initiatives/[name].md`
2. Update the Session Bootstrap table above
3. Track progress with phase checklists


## Framework Access

Load docs on-demand from `~/.claude/docs/` when needed:

| Need | Read |
|------|------|
| UI work | `~/.claude/docs/mcp/MCP_Magic.md` |
| Complex analysis | `~/.claude/docs/mcp/MCP_Sequential.md` |
| Research | `~/.claude/docs/mcp/MCP_Tavily.md` |
| Code editing | `~/.claude/docs/mcp/MCP_Serena.md` |

---

## Session Lifecycle

1. **Start**: `git status`
2. **Work**: Use TodoWrite for multi-step tasks
3. **End**: Commit changes, verify audit passes

---

**Philosophy**: Lightweight bootstrap -> On-demand framework loading -> Context efficiency
