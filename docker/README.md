# Docker Development Environment for Node.js with Claude CLI

## Quick Start

### Build and start the container:

```bash
cd docker
docker-compose up -d --build
```

### Enter the container:

```bash
docker-compose exec nodejs-dev sh
```

Or use docker directly:

```bash
docker exec -it claude-nodejs-dev sh
```

## Usage

Once inside the container, you can:

- **Run Node.js commands**: `node`, `npm`, `npx`, etc.
- **Use Claude CLI**: `claude` commands are available
- **Develop projects**: Your code is mounted at `/workspace`

### Example workflow:

```bash
# Enter the container
docker-compose exec nodejs-dev sh

# Create a new Node.js project
cd /workspace
npm init -y

# Use Claude to help with development
claude "Help me create a simple Express server"
```

## Stopping the container

```bash
docker-compose down
```

## Shared Skills Folder

Custom Claude skills can be placed in the `../skills/` folder (outside the docker directory). These are automatically available inside the container at `/home/nodejs/.claude/skills`.

### Adding Custom Skills

1. Create a new folder in `skills/` with your skill files
2. Skills are mounted read-only and available immediately
3. See `skills/README.md` for skill structure examples

### Example Skill Structure

```
skills/
├── my-custom-skill/
│   └── skill.md
└── another-skill/
    └── skill.md
```

## Notes

- Your projects in the parent directory are mounted to `/workspace`
- Claude CLI cache and config are persisted in Docker volumes
- Custom skills from `../skills/` are mounted at `/home/nodejs/.claude/skills`
- The container stays running until you stop it with `docker-compose down`
