# Shared Claude Skills

This folder contains custom skills that are automatically available to Claude CLI inside the Docker container.

## How It Works

The skills folder is mounted at `/home/nodejs/.claude/skills` inside the Docker container (read-only). Any skill you place here will be available when you run Claude commands.

## Adding Custom Skills

1. Create a new folder in this directory for your skill
2. Add your skill files following the Claude Code skill format
3. The skill will be immediately available in the container (no rebuild needed)

## Skill Structure

```
skills/
├── my-custom-skill/
│   ├── skill.md          # Skill description and instructions
│   ├── package.json      # Optional: dependencies
│   └── src/              # Optional: helper code
└── another-skill/
    └── skill.md
```

## Example

See the [example-skills](https://github.com/anthropics/claude-code/tree/main/example-skills) repository for skill examples.

## Testing Skills

To test your skill inside the container:

```bash
docker exec -it claude-nodejs-dev sh
claude "Use my-custom-skill to do something"
```

## Notes

- Skills are mounted as read-only (`:ro`) for security
- Changes to skills are reflected immediately without restarting the container
- Skills defined here override built-in skills with the same name
