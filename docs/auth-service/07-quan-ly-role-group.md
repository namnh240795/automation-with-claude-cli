# Phần 7: Roles & Groups (RBAC)

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ Role-Based Access Control (RBAC)
- ✅ Role hierarchy và composite roles
- ✅ Group management
- ✅ User-Role và User-Group assignments

---

## 🔑 7.1 Role-Based Access Control

### RBAC Overview

```
┌─────────────────────────────────────────────────────────┐
│                    RBAC Hierarchy                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                    Realm                                │
│                      │                                   │
│     ┌────────────────┼────────────────┐                 │
│     │                │                │                 │
│  ┌──▼──┐          ┌──▼──┐          ┌──▼──┐             │
│  │Role │          │Role │          │Role │             │
│  │Admin│          │User │          │Guest│             │
│  └──┬──┘          └──┬──┘          └─────┘             │
│     │                │                                  │
│     │         ┌──────┴───────┐                          │
│     │         │              │                          │
│  ┌──▼──┐   ┌──▼──┐       ┌──▼──┐                       │
│  │User │   │User │       │User │                       │
│  │Alice│   │Bob  │       │Carol│                       │
│  └─────┘   └─────┘       └─────┘                       │
│                                                          │
│  Permissions:                                           │
│  • Admin: All permissions                               │
│  • User: Read + Write own resources                     │
│  • Guest: Read only                                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Role Entity

```prisma
model keycloak_role {
  id                      String          @id @db.VarChar(36)
  name                    String?         @db.VarChar(255)
  description             String?         @db.VarChar(255)
  client_role             Boolean         @default(false)
  client                  String?         @db.VarChar(36)
  realm                   String?         @db.VarChar(36)
  client_realm_constraint String?         @db.VarChar(255)

  // Composite roles (role hierarchy)
  composite_role_composite_role_compositeTokeycloak_role  composite_role[]
  composite_role_composite_role_child_roleTokeycloak_role composite_role[]
  role_attribute          role_attribute[]

  @@unique([name, client_realm_constraint])
  @@index([client])
  @@index([realm])
}
```

### Composite Role (Role Hierarchy)

```prisma
model composite_role {
  composite String        @db.VarChar(36)  // Parent role
  child_role String       @db.VarChar(36)  // Child role

  keycloak_role_composite_role_compositeTokeycloak_role  keycloak_role @relation("composite_role_compositeTokeycloak_role", fields: [composite], references: [id])
  keycloak_role_composite_role_child_roleTokeycloak_role keycloak_role @relation("composite_role_child_roleTokeycloak_role", fields: [child_role], references: [id])

  @@id([composite, child_role])
  @@index([composite])
  @@index([child_role])
}
```

---

## 📝 7.2 Create Role

### Request DTO

```typescript
export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  realm_id?: string;

  @IsString()
  @IsOptional()
  client_id?: string;

  @IsBoolean()
  @IsOptional()
  client_role?: boolean = false;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  composites?: string[];  // Child role IDs
}
```

### Service Method

```typescript
@LogActivity()
async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
  const { name, description, realm_id, client_id, client_role, composites } = createRoleDto;

  // Create role
  const role = await this.prisma.keycloak_role.create({
    data: {
      name,
      description,
      realm: realm_id,
      client: client_id,
      client_role: client_role || false,
      client_realm_constraint: client_id ? client_id : realm_id,
    },
  });

  // Add composite roles if specified
  if (composites && composites.length > 0) {
    await this.prisma.composite_role.createMany({
      data: composites.map(childRoleId => ({
        composite: role.id,
        child_role: childRoleId,
      })),
    });
  }

  return this.toResponseDto(role);
}
```

### API Endpoint

```bash
POST /auth/v1/roles
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "admin",
  "description": "Administrator with full access",
  "realm_id": "master",
  "client_role": false,
  "composites": ["user-role-id"]
}
```

---

## 👥 7.3 Group Management

### Group Entity

```prisma
model keycloak_group {
  id           String               @id @db.VarChar(36)
  name         String?              @db.VarChar(255)
  parent_group String               @db.VarChar(36)  // For hierarchy
  realm_id     String?              @db.VarChar(36)
  type         Int                  @default(0)

  group_attribute    group_attribute[]
  group_role_mapping group_role_mapping[]

  @@unique([realm_id, parent_group, name], map: "sibling_names")
}
```

### Group Hierarchy

```
realm: "acme"
├── Everyone (parent_group: null)
│   ├── Employees (parent_group: everyone-id)
│   │   ├── Engineering (parent_group: employees-id)
│   │   │   ├── Backend Team
│   │   │   └── Frontend Team
│   │   └── Sales (parent_group: employees-id)
│   └── Contractors (parent_group: everyone-id)
```

### Create Group

```typescript
@LogActivity()
async createGroup(createGroupDto: CreateGroupDto): Promise<GroupResponseDto> {
  const { name, realm_id, parent_id } = createGroupDto;

  const group = await this.prisma.keycloak_group.create({
    data: {
      name,
      realm_id,
      parent_group: parent_id || '0',  // Root if no parent
      type: 0,
    },
  });

  return this.toResponseDto(group);
}
```

---

## 🔗 7.4 User-Role Assignment

### user_role_mapping Entity

```prisma
model user_role_mapping {
  role_id     String      @db.VarChar(255)
  user_id     String      @db.VarChar(36)

  user_entity user_entity @relation(fields: [user_id], references: [id])

  @@id([role_id, user_id])
  @@index([user_id])
}
```

### Assign Role to User

```typescript
async assignRole(userId: string, roleId: string) {
  await this.prisma.user_role_mapping.create({
    data: {
      user_id: userId,
      role_id: roleId,
    },
  });
}
```

### Remove Role from User

```typescript
async removeRole(userId: string, roleId: string) {
  await this.prisma.user_role_mapping.deleteMany({
    where: {
      user_id: userId,
      role_id: roleId,
    },
  });
}
```

### Get User Roles

```typescript
async getUserRoles(userId: string) {
  const mappings = await this.prisma.user_role_mapping.findMany({
    where: { user_id: userId },
    include: {
      // Include role details
    },
  });

  return mappings.map(m => m.role_id);
}
```

---

## 👨‍👩‍👧‍👦 7.5 User-Group Assignment

### user_group_membership Entity

```prisma
model user_group_membership {
  group_id        String      @db.VarChar(36)
  user_id         String      @db.VarChar(36)
  membership_type String      @db.VarChar(255)

  user_entity     user_entity @relation(fields: [user_id], references: [id])

  @@id([group_id, user_id])
  @@index([user_id])
}
```

### Assign User to Group

```typescript
async addToGroup(userId: string, groupId: string) {
  await this.prisma.user_group_membership.create({
    data: {
      user_id: userId,
      group_id: groupId,
      membership_type: 'STANDARD',
    },
  });
}
```

### Get User Groups

```typescript
async getUserGroups(userId: string) {
  const memberships = await this.prisma.user_group_membership.findMany({
    where: { user_id: userId },
    include: {
      // Include group details
    },
  });

  return memberships.map(m => m.group);
}
```

---

## 🔄 7.6 Role-Group Assignment

### group_role_mapping Entity

```prisma
model group_role_mapping {
  role_id        String         @db.VarChar(36)
  group_id       String         @db.VarChar(36)

  keycloak_group keycloak_group @relation(fields: [group_id], references: [id])

  @@id([role_id, group_id])
  @@index([group_id])
}
```

### Assign Role to Group

```typescript
async assignRoleToGroup(groupId: string, roleId: string) {
  await this.prisma.group_role_mapping.create({
    data: {
      group_id: groupId,
      role_id: roleId,
    },
  });
}
```

### Benefit

When user joins group, they automatically inherit group roles:
```typescript
async addToGroup(userId: string, groupId: string) {
  // Add user to group
  await this.addToGroup(userId, groupId);

  // Get group roles
  const groupRoles = await this.prisma.group_role_mapping.findMany({
    where: { group_id: groupId },
  });

  // Assign group roles to user
  await this.prisma.user_role_mapping.createMany({
    data: groupRoles.map(gr => ({
      user_id: userId,
      role_id: gr.role_id,
    })),
    skipDuplicates: true,
  });
}
```

---

## 🎯 7.7 Permission Checking

### Check User Roles

```typescript
async hasRole(userId: string, roleName: string): Promise<boolean> {
  const mappings = await this.prisma.user_role_mapping.findMany({
    where: {
      user_id: userId,
    },
    include: {
      // Include role to check name
    },
  });

  return mappings.some(m => m.role.name === roleName);
}
```

### Check User Groups

```typescript
async isInGroup(userId: string, groupName: string): Promise<boolean> {
  const memberships = await this.prisma.user_group_membership.findMany({
    where: { user_id: userId },
    include: {
      // Include group to check name
    },
  });

  return memberships.some(m => m.group.name === groupName);
}
```

### Get All User Permissions

```typescript
async getUserPermissions(userId: string) {
  // Get direct roles
  const directRoles = await this.prisma.user_role_mapping.findMany({
    where: { user_id: userId },
  });

  // Get groups
  const groups = await this.prisma.user_group_membership.findMany({
    where: { user_id: userId },
    include: {
      // Include group roles
    },
  });

  // Get group roles
  const groupRoles = groups.flatMap(g => g.group.group_role_mapping);

  // Combine and deduplicate
  const allRoleIds = [
    ...directRoles.map(r => r.role_id),
    ...groupRoles.map(gr => gr.role_id),
  ];

  const roles = await this.prisma.keycloak_role.findMany({
    where: {
      id: { in: allRoleIds },
    },
  });

  return roles;
}
```

---

## 📊 7.8 Role & Group Examples

### Example 1: Company Structure

```typescript
// Create roles
await createRole({ name: 'admin', description: 'Full access' });
await createRole({ name: 'manager', description: 'Team management' });
await createRole({ name: 'employee', description: 'Standard access' });

// Create groups
await createGroup({ name: 'Engineering', realm_id: 'acme' });
await createGroup({ name: 'Sales', realm_id: 'acme' });

// Assign roles to groups
await assignRoleToGroup('engineering-id', 'employee-id');
await assignRoleToGroup('sales-id', 'employee-id');

// Add users to groups
await addToGroup('user-alice-id', 'engineering-id');
await addToGroup('user-bob-id', 'sales-id');
```

### Example 2: Composite Role

```typescript
// Base roles
const userRole = await createRole({ name: 'user', description: 'Basic user' });
const editorRole = await createRole({ name: 'editor', description: 'Can edit content' });

// Admin role composites both
await createRole({
  name: 'admin',
  description: 'Full access',
  composites: [userRole.id, editorRole.id],
});
```

---

## ❓ FAQ

### Q1: Role và Group khác gì nhau?

**A**:
- **Role**: Defines permissions (what user CAN do)
- **Group**: Defines organization (who user IS)

Best practice: Use groups to organize, roles to define permissions.

### Q2: Composite role hoạt động như thế nào?

**A**: When user has composite role, they inherit ALL child roles:
```
Admin (composite)
  ├── Editor (child)
  └── User (child)

User with Admin → has Editor + User permissions
```

### Q3: Làm sao để check permission trong code?

**A**: Use `@Roles()` decorator:
```typescript
@Post('sensitive')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
async sensitiveAction() {
  // Only users with 'admin' role can access
}
```

---

## 🎯 Summary

### Key Concepts

1. ✅ **Role** = Permissions (what user can do)
2. ✅ **Group** = Organization (who user is)
3. ✅ **Composite Role** = Role hierarchy
4. ✅ **User-Role Mapping** = Direct role assignment
5. ✅ **User-Group Membership** = Organizational assignment

### CRUD Operations

| Entity | Create | Read | Update | Delete |
|--------|--------|------|--------|--------|
| Role | `POST /roles` | `GET /roles` | `PATCH /roles/:id` | `DELETE /roles/:id` |
| Group | `POST /groups` | `GET /groups` | `PATCH /groups/:id` | `DELETE /groups/:id` |
| User-Role | Custom | Get roles | N/A | Remove role |
| User-Group | Custom | Get groups | N/A | Remove from group |

### Next Steps

- **[Phần 8: Client Management](./08-quan-ly-client.md)** - OAuth/OIDC clients

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
