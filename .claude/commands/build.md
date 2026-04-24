---
description: Implement the next task incrementally — build, test, verify, commit
---

Invoke the incremental-implementation skill alongside test-driven-development.

Pick the next pending task from the plan. For each task:

1. Read the task's acceptance criteria
2. Run `gitnexus_impact` on any symbol you're about to modify
3. Load relevant context (existing code, patterns, types)
4. Write a failing test for the expected behavior (RED)
5. Implement the minimum code to pass the test (GREEN)
6. Run the full test suite to check for regressions: `cd apps/[service] && pnpm test`
7. Run the Rspack build to verify compilation: `pnpm rspack:[service]`
8. Run `gitnexus_detect_changes` to verify expected scope
9. Update documentation if endpoints or DB schema changed
10. Commit with a descriptive message
11. Mark the task complete and move to the next one

If any step fails, use the gitnexus-debugging skill to diagnose the root cause.
