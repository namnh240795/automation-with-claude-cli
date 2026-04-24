---
description: Run TDD workflow — write failing tests, implement, verify. For bugs, use the Prove-It pattern.
---

Invoke the test-driven-development skill alongside nestjs-unit-testing.

For new features:
1. Write tests that describe the expected behavior (they should FAIL)
2. Implement the code to make them pass
3. Refactor while keeping tests green

For bug fixes (Prove-It pattern):
1. Write a test that reproduces the bug (must FAIL)
2. Confirm the test fails
3. Implement the fix
4. Confirm the test passes
5. Run the full test suite for regressions

Test commands:
- All tests: `pnpm test`
- Service-specific: `cd apps/[service] && pnpm test`
- Watch mode: `cd apps/[service] && pnpm test:watch`
- Coverage: `cd apps/[service] && pnpm test:cov`

For NestJS-specific test patterns (mocking PrismaService, testing guards, DTO validation), reference the nestjs-unit-testing skill.

For coverage gap analysis, use the test-coverage-analyzer skill.
