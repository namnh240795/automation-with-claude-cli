---
description: Run the pre-launch checklist via parallel fan-out to specialist personas, then synthesize a go/no-go decision
---

`/ship` is a **fan-out orchestrator**. It runs three specialist reviews in parallel against the current change, then merges their reports into a single go/no-go decision with a rollback plan.

## Phase A — Parallel fan-out

Spawn three agents concurrently using the Agent tool. **Issue all three Agent tool calls in a single assistant turn so they execute in parallel.**

1. **Code Reviewer** — Run a five-axis review (correctness, readability, architecture, security, performance) on the staged changes or recent commits. Use the project-specific review checklist from `/review`.

2. **Security Auditor** — Run a vulnerability and threat-model pass using the security-and-hardening skill. Check:
   - OWASP Top 10 compliance
   - JWT/auth patterns per `auth-guard-patterns.md` rule
   - No secrets in code or `.env` files committed
   - Input validation on all DTOs per `dto-validation.md` rule
   - SQL injection prevention (Prisma parameterized queries)
   - Rate limiting on auth endpoints
   - Dependency CVEs

3. **Test Engineer** — Analyze test coverage using test-coverage-analyzer skill. Check:
   - Coverage targets: Lines >80%, Branches >75%, Functions >80%
   - Services and controllers at 100%
   - Happy path, edge cases, error paths covered
   - Prisma error codes tested (P2002, P2025)
   - Auth guard behavior tested

## Phase B — Merge in main context

Once all three reports are back, synthesize them:

1. **Code Quality** — Aggregate Critical/Important findings from code reviewer. Resolve duplicates.
2. **Security** — Promote any Critical/High security findings to launch blockers.
3. **Performance** — Check for N+1 queries, missing Prisma `select`, unbounded `findMany`.
4. **Infrastructure** — Env vars configured, Prisma migrations ready, monitoring/alerting set up.
5. **Documentation** — `docs/services/<name>/README.md` updated, diagrams current, ER diagram updated if schema changed.

## Phase C — Decision and rollback

Produce a single output:

```markdown
## Ship Decision: GO | NO-GO

### Blockers (must fix before ship)
- [Source: Critical finding + file:line]

### Recommended fixes (should fix before ship)
- [Source: Important finding + file:line]

### Acknowledged risks (shipping anyway)
- [Risk + mitigation]

### Rollback plan
- Trigger conditions: [what signals would prompt rollback]
- Rollback procedure: [exact steps — revert commit, re-run migration, etc.]
- Recovery time objective: [target]

### Specialist reports (full)
- [Code reviewer report]
- [Security auditor report]
- [Test engineer report]
```

## Rules

1. The three Phase A agents run in parallel — never sequentially.
2. The rollback plan is mandatory before any GO decision.
3. If any agent returns a Critical finding, the default verdict is NO-GO unless the user explicitly accepts the risk.
4. **Skip the fan-out only if all of the following are true:** the change touches 2 files or fewer, the diff is under 50 lines, and it does not touch auth, database access, or config/env.
