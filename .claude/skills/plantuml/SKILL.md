---
name: plantuml
description: Generate PlantUML diagrams as SVG files and embed them in markdown. Use when Claude needs to create sequence diagrams, class diagrams, component diagrams, activity diagrams, state diagrams, use case diagrams, or any visual architecture documentation. Generates .puml source + .svg output in docs/diagrams/ and returns a markdown image link.
---

# PlantUML Diagram Generator

Generate professional PlantUML diagrams, render to SVG, and embed in markdown.

## Usage

Use the bundled script to generate diagrams:

```bash
# From inline PlantUML text
python3 .claude/skills/plantuml/scripts/plantuml.py <name> --text '<plantuml_code>'

# From a .puml file
python3 .claude/skills/plantuml/scripts/plantuml.py <name> --source docs/diagrams/<name>.puml

# Get server URL only (no download)
python3 .claude/skills/plantuml/scripts/plantuml.py <name> --text '<plantuml_code>' --url-only

# JSON output
python3 .claude/skills/plantuml/scripts/plantuml.py <name> --text '<plantuml_code>' --json
```

**Output:**
- `docs/diagrams/<name>.puml` — PlantUML source (editable)
- `docs/diagrams/<name>.svg` — Rendered SVG image
- Markdown link printed to stdout: `![name](docs/diagrams/<name>.svg)`

## Workflow

1. **Write PlantUML syntax** based on user's diagram request
2. **Run the script** to encode, fetch SVG, and save files
3. **Insert the markdown link** into the document

## Supported Diagram Types

### Sequence Diagrams (most common)
```plantuml
@startuml
actor User
participant "Auth Service" as Auth
database "PostgreSQL" as DB

User -> Auth: POST /auth/signup
Auth -> DB: Create user
DB --> Auth: User created
Auth --> User: 201 { access_token }
@enduml
```

### Component Diagrams
```plantuml
@startuml
package "Monorepo" {
  [Auth Service] as Auth
  [API Service] as API
}

package "Shared Libraries" {
  [auth-utilities] as AU
  [app-logger] as Log
  [caching] as Cache
}

database "PostgreSQL" as DB {
  [auth_db]
  [api_db]
}

Auth --> AU
Auth --> Log
Auth --> DB
API --> AU
API --> Cache
@enduml
```

### Class Diagrams
```plantuml
@startuml
class UserService {
  +findAll(): Promise<User[]>
  +findOne(id: string): Promise<User>
  +create(dto: CreateUserDto): Promise<User>
}

class PrismaService {
  +user: Prisma.UserDelegate
  +$connect(): Promise<void>
  +$disconnect(): Promise<void>
}

class AuthGuard {
  +canActivate(): Promise<boolean>
}

UserService --> PrismaService
UserService ..> AuthGuard
@enduml
```

### Activity / Flow Diagrams
```plantuml
@startuml
start
:Receive request;
if (Has JWT token?) then (yes)
  :Validate token;
  if (Token valid?) then (yes)
    :Process request;
  else (no)
    :Return 401;
  endif
else (no)
  :Return 401;
endif
stop
@enduml
```

### State Diagrams
```plantuml
@startuml
[*] --> Pending
Pending --> Active : Verify email
Active --> Suspended : Admin action
Suspended --> Active : Reactivate
Active --> Deleted : Soft delete
Deleted --> [*]
@enduml
```

### ER / Database Diagrams
```plantuml
@startuml
entity "user" as user {
  * id : UUID
  --
  email : VARCHAR(255)
  password_hash : VARCHAR(255)
  first_name : VARCHAR(100)
  is_active : BOOLEAN
  created_at : TIMESTAMP
}

entity "organization" as org {
  * id : UUID
  --
  name : VARCHAR(255)
  type : VARCHAR(50)
  display_id : VARCHAR(100)
}

user ||--o{ org : "belongs to"
@enduml
```

### Use Case Diagrams
```plantuml
@startuml
left to right direction
actor User
actor Admin

rectangle "Auth System" {
  usecase "Sign Up" as UC1
  usecase "Sign In" as UC2
  usecase "Reset Password" as UC3
  usecase "Manage Users" as UC4
}

User --> UC1
User --> UC2
User --> UC3
Admin --> UC2
Admin --> UC4
@enduml
```

## Styling Tips

### Clean modern look
```plantuml
skinparam backgroundColor #FEFEFE
skinparam shadowing false
skinparam defaultFontName sans-serif
skinparam monochrome true
```

### Color scheme for architecture diagrams
```plantuml
skinparam component {
  BackgroundColor #E3F2FD
  BorderColor #1565C0
}
skinparam database {
  BackgroundColor #FFF3E0
  BorderColor #E65100
}
```

## Best Practices

- Keep diagram names descriptive: `auth-flow`, `user-crud-lifecycle`, `deployment-architecture`
- Store .puml source alongside .svg for future editing
- Use `skinparam` for consistent styling across diagrams
- Use aliases (`as Auth`) to keep arrows short and readable
- Group related participants with `package` or `rectangle`
- Add notes with `note left/right/top/bottom` for important context
