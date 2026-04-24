# Git Workflow — Branching and Commit Conventions

> Source: Git branching strategy and commit message standards for this monorepo

## Branching Strategy

### Branch naming
```
feature/add-user-roles        # New feature
bugfix/fix-signin-rate-limit  # Bug fix
hotfix/patch-jwt-expiry       # Production hotfix
refactor/extract-auth-logger  # Refactoring
chore/update-dependencies     # Maintenance
```

### Branch flow
```
main ──── feature/branch ──── PR ──── main
  │                                   │
  └── hotfix/branch ──── PR ──────────┘
```

- `main` is always deployable
- Create branch from `main`, merge back via PR
- Never commit directly to `main`
- Delete branch after merge

## Commit Messages

### Conventional Commits format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
| Type | When |
|------|------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring (no behavior change) |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `chore` | Build, deps, tooling |
| `perf` | Performance improvement |
| `ci` | CI/CD changes |

### Scope = service or library name
```
feat(auth): add refresh token rotation
fix(auth): handle expired JWT gracefully
feat(caching): add cache invalidation helper
chore: update rspack config for new alias
docs(auth): document sign-in endpoint
```

### Commit size
- One logical change per commit
- ~100 lines max per commit (split if larger)
- Each commit should leave the codebase in a working state
- Run `pnpm test` and `pnpm lint` before committing

## Pull Request Standards

### PR title
```
feat(auth): add user role management
```

### PR description should include
- What changed and why
- How to test
- Any breaking changes
- Screenshots for UI changes

### Before merging
- [ ] All tests pass (`pnpm test`)
- [ ] Build succeeds (`pnpm build:auth`)
- [ ] Lint clean (`pnpm lint`)
- [ ] Code reviewed via `/review` command
- [ ] No secrets in diff
- [ ] Documentation updated if needed

## .gitignore Requirements

These must be in `.gitignore`:
```
.env
.env.local
.env.*.local
*.pem
*.key
node_modules/
dist/
```
