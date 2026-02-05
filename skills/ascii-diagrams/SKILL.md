---
name: ascii-diagrams
description: Generate ASCII/Unicode flowcharts, process diagrams, decision trees, and sequence diagrams directly in markdown. Use when Claude needs to create visual diagrams that render in any markdown viewer without requiring Mermaid.js or external diagramming libraries. Supports: (1) Vertical flowcharts with boxes and arrows, (2) Horizontal flowcharts, (3) Decision trees with yes/no branching, (4) Sequence diagrams showing component interactions
---

# ASCII Diagrams

Generate clean, portable ASCII/Unicode diagrams that work in any markdown viewer.

## Quick Start

Use the bundled script to generate diagrams programmatically:

```bash
python3 scripts/ascii_diagram.py <diagram_type> '<json_data>'
```

Or generate diagrams directly by understanding the user's requirements and creating appropriate ASCII art.

## Supported Diagram Types

### 1. Vertical Flowcharts

Top-to-bottom process flows with labeled arrows.

**Example input:**
```json
{
  "steps": [
    {"text": "User", "label": "request"},
    {"text": "Agent", "label": "activate"},
    {"text": "Skill", "label": "calls"},
    {"text": "MCP Tool"}
  ]
}
```

**Example output:**
```
┌─────────────┐
│    User     │
└──────┬──────┘
       │ request
       │
       ▼
┌─────────────┐
│    Agent    │
└──────┬──────┘
       │ activate
       │
       ▼
┌─────────────┐
│    Skill    │
└──────┬──────┘
       │ calls
       │
       ▼
┌─────────────┐
│  MCP Tool   │
└─────────────┘
```

### 2. Horizontal Flowcharts

Left-to-right process flows.

**Example input:**
```json
{
  "steps": [
    {"text": "Start"},
    {"text": "Process", "label": "data"},
    {"text": "End"}
  ]
}
```

**Example output:**
```
┌──────────┐      ┌──────────┐      ┌──────────┐
│  Start   │ ────▶│ Process  │ ────▶│   End    │
└──────────┘      └──────────┘      └──────────┘
```

### 3. Decision Trees

Branching diagrams with diamond-shaped decision nodes.

**Example input:**
```json
{
  "text": "Is logged in?",
  "yes": {
    "text": "Show Dashboard"
  },
  "no": {
    "text": "Redirect to Login"
  }
}
```

### 4. Sequence Diagrams

Show interactions between components over time.

**Example input:**
```json
{
  "actors": ["User", "Agent", "Skill"],
  "interactions": [
    {"from": "User", "to": "Agent", "label": "request"},
    {"from": "Agent", "to": "Skill", "label": "activate", "return": true}
  ]
}
```

## Script Usage

The `scripts/ascii_diagram.py` script provides a reliable, deterministic way to generate diagrams.

### CLI Interface

```bash
# Vertical flowchart
python3 scripts/ascii_diagram.py vertical '{"steps": [{"text": "Step 1"}, {"text": "Step 2"}]}'

# Horizontal flowchart
python3 scripts/ascii_diagram.py horizontal '{"steps": [{"text": "A"}, {"text": "B"}]}'

# Decision tree
python3 scripts/ascii_diagram.py decision '{"tree": {"text": "Condition?", "yes": {"text": "Action A"}, "no": {"text": "Action B"}}}'

# Sequence diagram
python3 scripts/ascii_diagram.py sequence '{"actors": ["A", "B"], "interactions": [{"from": "A", "to": "B", "label": "message"}]}'
```

### Data Structure Reference

**Vertical/Horizontal Flows:**
- `steps`: Array of objects
  - `text` (required): Content of the box
  - `label` (optional): Text to display on the arrow

**Decision Trees:**
- `tree`: Object (can be nested)
  - `text` (required): Decision or action text
  - `yes` (optional): Branch for true condition
  - `no` (optional): Branch for false condition

**Sequence Diagrams:**
- `actors`: Array of strings (actor names)
- `interactions`: Array of objects
  - `from` (required): Source actor name
  - `to` (required): Target actor name
  - `label` (optional): Message text
  - `return` (optional): Boolean, add spacing for return message

## Design Principles

1. **Portability**: Pure Unicode box-drawing characters work everywhere
2. **Readability**: Consistent spacing and alignment
3. **Flexibility**: Support for common diagram types
4. **Simplicity**: No external dependencies or rendering engines

## Best Practices

- Keep text in boxes concise (prefer short phrases)
- Use clear, descriptive labels on arrows
- For complex flows, consider breaking into multiple diagrams
- Test diagrams in your target markdown viewer
- Use monospace font for best alignment
