# Module Structure — NestJS Feature Patterns

> Source: NestJS feature module organization and code patterns

## 📁 Feature Folder Structure

### ✅ Every feature follows this layout
```
feature/
├── feature.controller.ts
├── feature.service.ts
├── feature.module.ts
└── dto/
    ├── create-feature.dto.ts
    ├── update-feature.dto.ts
    ├── feature-response.dto.ts
    └── index.ts         ← barrel export
```

### ✅ Shared utilities go in `common/`
```
src/common/
├── guard/              # Custom guards
├── middleware/         # Custom middleware
├── pipes/              # Custom pipes
├── validator/          # Custom validators
├── enum/               # Shared enums
└── dto/                # Shared DTOs
```

---

## 🎮 Controller Pattern

### ✅ Thin controllers — delegate to service
```typescript
// ❌ Bad — business logic in controller
@Post()
async create(@Body() dto: CreateFeatureDto) {
  const existing = await this.prisma.feature.findUnique({ ... });
  if (existing) throw new ConflictException('Already exists');
  return this.prisma.feature.create({ ... });
}

// ✅ Good — delegate to service
@Post()
@Version('1')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Create feature' })
@ApiResponse({ status: 201, description: 'Created' })
async create(@AuthUser() user: JwtPayloadDto, @Body() dto: CreateFeatureDto) {
  return this.featureService.create(user, dto);
}
```

### ✅ Use readonly injection for services
```typescript
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}
}
```

---

## ⚙️ Service Pattern

### ✅ Use @LogActivity() decorator on service methods
```typescript
// ❌ Bad — no logging
async findAll(user: JwtPayloadDto) {
  return this.prisma.feature.findMany({ ... });
}

// ✅ Good — logged activity
@LogActivity()
async findAll(user: JwtPayloadDto) {
  return this.prisma.feature.findMany({
    where: { organization_id: user.organization_id, deleted_at: null }
  });
}
```

### ✅ Always filter soft deletes in queries
```typescript
// ❌ Bad — returns deleted records
return this.prisma.feature.findMany({});

// ✅ Good — excludes soft-deleted
return this.prisma.feature.findMany({
  where: { deleted_at: null }
});
```

### ✅ Set audit fields on create and update
```typescript
// ❌ Bad — no audit trail
return this.prisma.feature.create({ data: dto });

// ✅ Good
return this.prisma.feature.create({
  data: {
    ...dto,
    created_by: user.sub,
    updated_by: user.sub,
  }
});
```

---

## 🧩 Module Pattern

### ✅ Register all providers and imports explicitly
```typescript
@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [FeatureController],
  providers: [FeatureService, JwtStrategy],
  exports: [FeatureService],  // Only if needed by other modules
})
export class FeatureModule {}
```

---

## 🚫 Checklist

- ❌ Never put business logic in controllers
- ❌ Never query the database without filtering `deleted_at`
- ❌ Never create records without `created_by` / `updated_by`
- ❌ Never forget `@LogActivity()` on service methods
- ❌ Never skip `readonly` on injected services
- ✅ Always use barrel exports (`index.ts`) in `dto/` folders
- ✅ Always keep controllers thin — delegate to services
