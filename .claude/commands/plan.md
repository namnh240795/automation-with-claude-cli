---
description: Break work into small verifiable tasks with acceptance criteria and dependency ordering
---

Invoke the planning-and-task-breakdown skill.

Read the existing spec (from `docs/specs/`) and the relevant codebase sections. Then:

1. Enter plan mode — read only, no code changes
2. Run `gitnexus_impact` on symbols that will be modified
3. Identify the dependency graph between components (schema → client → service → controller → API)
4. Slice work vertically (one complete path per task, not horizontal layers)
5. Write tasks with acceptance criteria and verification steps
6. Add checkpoints between phases
7. Present the plan for human review

Save the plan to `docs/specs/<feature-name>-plan.md` and the task list to `docs/specs/<feature-name>-tasks.md`.
