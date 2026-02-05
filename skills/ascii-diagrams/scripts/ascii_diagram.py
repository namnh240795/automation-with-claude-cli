#!/usr/bin/env python3
"""
ASCII Diagram Generator
Creates ASCII/Unicode flowcharts, process diagrams, and decision trees for markdown.
"""

import json
import sys
from typing import List, Dict, Any, Optional


class ASCIIDiagramGenerator:
    """Generate ASCII-style diagrams for markdown."""

    def __init__(self):
        self.box_chars = {
            'tl': '┌', 'tr': '┐', 'bl': '└', 'br': '┘',
            'h': '─', 'v': '│', 'hl': '├', 'hr': '┤',
            'ht': '┬', 'hb': '┴', 'cross': '┼',
            'arrow_down': '▼',
            'arrow_right': '▶', 'arrow_left': '◀',
        }

    def create_box(self, text: str, width: Optional[int] = None) -> str:
        """Create a single box with text."""
        text = text.strip().replace('\n', ' ')
        if not width:
            width = max(len(text) + 4, 13)

        padding = width - len(text) - 2
        left_pad = padding // 2
        right_pad = padding - left_pad

        top = self.box_chars['tl'] + self.box_chars['h'] * (width - 2) + self.box_chars['tr']
        middle = self.box_chars['v'] + ' ' * left_pad + text + ' ' * right_pad + self.box_chars['v']
        bottom = self.box_chars['bl'] + self.box_chars['h'] * (width - 2) + self.box_chars['br']

        return f"{top}\n{middle}\n{bottom}"

    def create_vertical_flow(self, steps: List[Dict[str, Any]]) -> str:
        """Create a vertical flowchart."""
        boxes = []
        max_width = 0

        for step in steps:
            box = self.create_box(step['text'])
            boxes.append(box)
            max_width = max(max_width, len(box.split('\n')[0]))

        # Recreate boxes with uniform width
        boxes = []
        for step in steps:
            box = self.create_box(step['text'], max_width)
            boxes.append(box)

        result = []
        for i, box in enumerate(boxes):
            result.append(box)
            if i < len(boxes) - 1:
                label = steps[i].get('label', '')
                if label:
                    connector_space = (max_width - len(label)) // 2
                    result.append(self.box_chars['v'] + ' ' * (connector_space - 1) + label + ' ' * (max_width - connector_space - len(label) - 1) + self.box_chars['v'])
                result.append(self.box_chars['v'] + ' ' * (max_width - 2) + self.box_chars['v'])
                result.append(self.box_chars['arrow_down'])

        return '\n'.join(result)

    def create_horizontal_flow(self, steps: List[Dict[str, Any]]) -> str:
        """Create a horizontal flowchart."""
        boxes = []
        box_heights = []

        for step in steps:
            lines = self.create_box(step['text']).split('\n')
            boxes.append(lines)
            box_heights.append(len(lines))

        max_height = max(box_heights)

        # Pad boxes to uniform height
        padded_boxes = []
        for box_lines in boxes:
            padded = []
            padding_top = (max_height - len(box_lines)) // 2
            padding_bottom = max_height - len(box_lines) - padding_top
            for _ in range(padding_top):
                padded.append(' ' * len(box_lines[0]))
            padded.extend(box_lines)
            for _ in range(padding_bottom):
                padded.append(' ' * len(box_lines[0]))
            padded_boxes.append(padded)

        # Build horizontal flow
        result = []
        middle_row = max_height // 2

        for row in range(max_height):
            line_parts = []
            for i, box in enumerate(padded_boxes):
                line_parts.append(box[row])
                if i < len(padded_boxes) - 1:
                    label = steps[i].get('label', '')
                    if row == middle_row:
                        # Arrow row
                        if label:
                            line_parts.append(f' {self.box_chars['arrow_right']} {label} ')
                        else:
                            line_parts.append(f' {self.box_chars['arrow_right']} ')
                    else:
                        line_parts.append(' ' * 4)
            result.append(''.join(line_parts))

        return '\n'.join(result)

    def create_decision_tree(self, tree: Dict[str, Any]) -> str:
        """Create a decision tree with diamond-shaped decision nodes."""
        def build_tree_lines(node: Dict[str, Any], depth: int = 0) -> List[str]:
            if not node:
                return []

            text = node.get('text', '')
            is_decision = 'yes' in node or 'no' in node

            indent = '    ' * depth

            if is_decision:
                # Diamond shape for decision
                width = max(len(text) + 2, 7)
                padding = (width - len(text)) // 2

                # Create a diamond shape
                top_pad = width // 2
                lines = [
                    indent + ' ' * top_pad + '▼',
                    indent + '┌' + self.box_chars['h'] * width + '┐',
                    indent + '│' + ' ' * padding + text + ' ' * (width - padding - len(text)) + '│',
                    indent + '└' + self.box_chars['h'] * width + '┘',
                ]
            else:
                # Box for leaf nodes
                box_lines = self.create_box(text).split('\n')
                lines = [indent + line for line in box_lines]

            # Build branches
            yes_branch = node.get('yes')
            no_branch = node.get('no')

            if yes_branch or no_branch:
                lines.append(indent + self.box_chars['v'])

            if yes_branch:
                yes_lines = build_tree_lines(yes_branch, depth + 1)
                if yes_lines:
                    lines.append(indent + self.box_chars['hl'] + self.box_chars['h'] * 2 + ' yes ─')
                    lines.extend(yes_lines)

            if no_branch:
                no_lines = build_tree_lines(no_branch, depth + 1)
                if no_lines:
                    lines.append(indent + self.box_chars['hl'] + self.box_chars['h'] * 2 + ' no  ─')
                    lines.extend(no_lines)

            return lines

        lines = build_tree_lines(tree)
        return '\n'.join(lines)

    def create_sequence_diagram(self, actors: List[str], interactions: List[Dict[str, Any]]) -> str:
        """Create a sequence diagram showing interactions between actors."""
        if not actors:
            return ""

        col_width = max(len(a) for a in actors) + 4
        col_width = max(col_width, 15)

        num_actors = len(actors)
        line_width = num_actors * col_width + (num_actors - 1) * 3

        result = []

        # Header with actor names
        header_parts = []
        for i, actor in enumerate(actors):
            padding = (col_width - len(actor)) // 2
            header_parts.append(' ' * padding + actor + ' ' * (col_width - len(actor) - padding))
            if i < num_actors - 1:
                header_parts.append('   ')

        result.append(''.join(header_parts))
        result.append(self.box_chars['h'] * line_width)

        # Process interactions
        actor_positions = {actor: i * (col_width + 3) + col_width // 2 for i, actor in enumerate(actors)}

        for interaction in interactions:
            from_actor = interaction['from']
            to_actor = interaction['to']
            label = interaction.get('label', '')
            has_return = interaction.get('return', False)

            if from_actor not in actor_positions or to_actor not in actor_positions:
                continue

            from_pos = actor_positions[from_actor]
            to_pos = actor_positions[to_actor]

            if from_pos < to_pos:
                # Left to right
                line = self.box_chars['h'] * from_pos + self.box_chars['arrow_right'] + self.box_chars['h'] * (to_pos - from_pos - 1)
                if label:
                    label_pos = from_pos + (to_pos - from_pos) // 2 - len(label) // 2
                    label_line = ' ' * label_pos + label
                    result.append(label_line[:line_width])
                result.append(line)
            else:
                # Right to left
                line = ' ' * to_pos + self.box_chars['arrow_left'] + ' ' * (from_pos - to_pos - 1) + self.box_chars['h'] * (line_width - from_pos)
                if label:
                    label_pos = to_pos + (from_pos - to_pos) // 2 - len(label) // 2
                    label_line = ' ' * label_pos + label
                    result.append(label_line[:line_width])
                result.append(line)

            if has_return:
                result.append(' ' * line_width)

        return '\n'.join(result)


def main():
    """CLI interface for the ASCII diagram generator."""
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: ascii_diagram.py <diagram_type> <json_data>"}))
        sys.exit(1)

    diagram_type = sys.argv[1]
    data = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}

    gen = ASCIIDiagramGenerator()

    if diagram_type == "vertical":
        result = gen.create_vertical_flow(data.get('steps', []))
    elif diagram_type == "horizontal":
        result = gen.create_horizontal_flow(data.get('steps', []))
    elif diagram_type == "decision":
        result = gen.create_decision_tree(data.get('tree', {}))
    elif diagram_type == "sequence":
        result = gen.create_sequence_diagram(data.get('actors', []), data.get('interactions', []))
    else:
        result = f"Unknown diagram type: {diagram_type}"

    print(result)


if __name__ == "__main__":
    main()
