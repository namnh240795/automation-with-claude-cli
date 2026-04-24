---
description: Conduct a five-axis code review — correctness, readability, architecture, security, performance
---

Invoke the code-review-and-quality skill alongside gitnexus-pr-review.

Review the current changes (staged or recent commits) across all five axes:

1. **Correctness** — Does it match the spec? Edge cases handled? Tests adequate?
2. **Readability** — Clear names? Straightforward logic? Well-organized?
3. **Architecture** — Follows existing patterns? Clean boundaries? Right abstraction level?
4. **Security** — Input validated? Secrets safe? Auth checked? (Use security-and-hardening skill)
5. **Performance** — No N+1 queries? No unbounded ops? Proper Prisma `select` usage?

Project-specific review checks:
- [ ] All queries filter `deleted_at: null`
- [ ] No `password_hash` in any response (always use `select`)
- [ ] DTOs use snake_case properties
- [ ] `@Version('1')` on all endpoints
- [ ] Swagger decorators present (`@ApiTags`, `@ApiOperation`, `@ApiResponse`, `@ApiBearerAuth`)
- [ ] `@LogActivity()` on service methods
- [ ] Audit fields set (`created_by`, `updated_by`)
- [ ] `ConfigService` used instead of `process.env`
- [ ] No SERVICE_PREFIX duplication in `@Controller()`
- [ ] Prisma schema has no `url` in datasource block

Categorize findings as Critical, Important, or Suggestion.
Output a structured review with specific file:line references and fix recommendations.
