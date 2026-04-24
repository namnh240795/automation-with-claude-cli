# Testing — Coverage Thresholds and Test Patterns

> Source: Testing standards for this monorepo (see also nestjs-unit-testing skill and test-driven-development skill)

## Coverage Thresholds

| Metric | Minimum | Target |
|--------|---------|--------|
| Lines | 80% | 90% |
| Branches | 75% | 85% |
| Functions | 80% | 90% |
| Statements | 80% | 90% |

Run `pnpm test:cov` to check coverage.

## What Must Have Tests

| File Type | Required | Priority |
|-----------|----------|----------|
| Services (`*.service.ts`) | YES | High |
| Controllers (`*.controller.ts`) | YES | High |
| Utility functions | YES | High |
| Guards (custom logic) | YES | Medium |
| DTOs (complex validation) | If complex | Medium |
| Modules | Optional | Low |
| main.ts | NO (use E2E) | — |
| Interfaces/Enums | NO | — |

## Test File Placement

- Unit tests: Same directory as source file (`auth.service.spec.ts` next to `auth.service.ts`)
- E2E tests: `apps/<service>/test/` directory
- Shared library tests: Same directory as source in `libs/`

## Test Structure

```typescript
describe('FeatureService', () => {
  let service: FeatureService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    // Fresh module for each test
    const module = await Test.createTestingModule({
      providers: [
        FeatureService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<FeatureService>(FeatureService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  // Tests organized by method
  describe('findAll', () => {
    it('returns active records excluding soft-deleted', async () => { /* ... */ });
    it('filters by organization_id', async () => { /* ... */ });
  });

  describe('create', () => {
    it('sets created_by and updated_by', async () => { /* ... */ });
    it('throws ConflictException on P2002 error', async () => { /* ... */ });
  });
});
```

## Testing Commands

```bash
pnpm test                      # Run all tests
pnpm test:watch                # Watch mode
pnpm test:cov                  # With coverage report
pnpm test -- feature.service   # Specific file
cd apps/auth && pnpm test      # Service-specific
```

## Anti-Patterns

- Never skip tests to make the suite pass
- Never test framework behavior (NestJS, Prisma internals)
- Never use `any` in test mocks — type your mocks
- Never share mutable state between tests
- Never write tests that depend on execution order
