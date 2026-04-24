---
description: Start spec-driven development — write a structured specification before writing code
---

Invoke the spec-driven-development skill.

Begin by understanding what the user wants to build. Ask clarifying questions about:
1. The objective and target users
2. Which service in the monorepo (apps/auth, apps/api, or new service)
3. Core features and acceptance criteria
4. Database changes needed (new models, migrations)
5. API endpoints (method, path, auth requirements)
6. Known boundaries (what to always do, ask first about, and never do)

Then generate a structured spec covering all core areas: objective, target service, tech stack, commands, project structure, code style, testing strategy, and boundaries.

Save the spec to `docs/specs/<feature-name>.md` and confirm with the user before proceeding.
