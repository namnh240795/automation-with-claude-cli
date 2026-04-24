#!/usr/bin/env python3
"""
PlantUML to SVG Generator

Encodes PlantUML text, fetches SVG from PlantUML server,
saves it locally, and outputs a markdown image link.

Usage:
  python3 plantuml.py <output_name> [--source <file.puml> | --text '<plantuml>']
  python3 plantuml.py auth-flow --source docs/auth-flow.puml
  python3 plantuml.py auth-flow --text '@startuml\nAlice -> Bob: Hello\n@enduml'

Output:
  - SVG saved to docs/diagrams/<output_name>.svg
  - PUML source saved to docs/diagrams/<output_name>.puml
  - Markdown link printed to stdout
"""

import sys
import os
import zlib
import urllib.request
import urllib.parse
import json
import argparse

# PlantUML encoding uses a custom base64 alphabet
PLANTUML_ALPHABET = (
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"
)
PLANTUML_SERVER = "https://www.plantuml.com/plantuml"
DEFAULT_OUTPUT_DIR = "docs/diagrams"


def encode_plantuml(plantuml_text: str) -> str:
    """Encode PlantUML text using PlantUML's custom deflate+base64 encoding."""
    # PlantUML expects @startuml / @enduml wrappers
    if "@startuml" not in plantuml_text:
        plantuml_text = f"@startuml\n{plantuml_text}\n@enduml"

    # Encode to UTF-8, deflate compress (raw, no zlib/gzip headers)
    compressed = zlib.compress(
        plantuml_text.encode("utf-8"), level=9
    )
    # Strip zlib header (2 bytes) and checksum (4 bytes) to get raw deflate
    raw_deflate = compressed[2:-4]

    # Custom base64 encoding
    result = []
    for i in range(0, len(raw_deflate), 3):
        if i + 2 < len(raw_deflate):
            # 3 bytes → 4 chars
            b1, b2, b3 = raw_deflate[i], raw_deflate[i + 1], raw_deflate[i + 2]
            result.append(PLANTUML_ALPHABET[b1 >> 2])
            result.append(PLANTUML_ALPHABET[((b1 & 0x3) << 4) | (b2 >> 4)])
            result.append(PLANTUML_ALPHABET[((b2 & 0xF) << 2) | (b3 >> 6)])
            result.append(PLANTUML_ALPHABET[b3 & 0x3F])
        elif i + 1 < len(raw_deflate):
            # 2 bytes → 3 chars
            b1, b2 = raw_deflate[i], raw_deflate[i + 1]
            result.append(PLANTUML_ALPHABET[b1 >> 2])
            result.append(PLANTUML_ALPHABET[((b1 & 0x3) << 4) | (b2 >> 4)])
            result.append(PLANTUML_ALPHABET[(b2 & 0xF) << 2])
        else:
            # 1 byte → 2 chars
            b1 = raw_deflate[i]
            result.append(PLANTUML_ALPHABET[b1 >> 2])
            result.append(PLANTUML_ALPHABET[(b1 & 0x3) << 4])

    return "".join(result)


def get_svg_url(encoded: str) -> str:
    """Get the PlantUML server URL for SVG rendering."""
    return f"{PLANTUML_SERVER}/svg/{encoded}"


def fetch_svg(url: str) -> str:
    """Fetch SVG content from PlantUML server."""
    req = urllib.request.Request(url, headers={"User-Agent": "PlantUML-Skill/1.0"})
    with urllib.request.urlopen(req, timeout=30) as response:
        return response.read().decode("utf-8")


def save_files(
    plantuml_text: str,
    svg_content: str,
    output_name: str,
    output_dir: str = DEFAULT_OUTPUT_DIR,
) -> dict:
    """Save PUML source and SVG file, return paths."""
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Ensure @startuml/@enduml wrappers
    if "@startuml" not in plantuml_text:
        plantuml_text = f"@startuml\n{plantuml_text}\n@enduml"

    # Save .puml source
    puml_path = os.path.join(output_dir, f"{output_name}.puml")
    with open(puml_path, "w") as f:
        f.write(plantuml_text)

    # Save .svg
    svg_path = os.path.join(output_dir, f"{output_name}.svg")
    with open(svg_path, "w") as f:
        f.write(svg_content)

    # Markdown relative path
    md_link = f"![{output_name}]({output_dir}/{output_name}.svg)"

    return {
        "puml_path": puml_path,
        "svg_path": svg_path,
        "markdown_link": md_link,
    }


def main():
    parser = argparse.ArgumentParser(description="PlantUML to SVG generator")
    parser.add_argument("name", help="Output filename (without extension)")
    parser.add_argument(
        "--source", help="Path to .puml file", default=None
    )
    parser.add_argument(
        "--text", help="PlantUML text string", default=None
    )
    parser.add_argument(
        "--output-dir",
        default=DEFAULT_OUTPUT_DIR,
        help=f"Output directory (default: {DEFAULT_OUTPUT_DIR})",
    )
    parser.add_argument(
        "--url-only",
        action="store_true",
        help="Only output the PlantUML server URL (no download)",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Output as JSON",
    )

    args = parser.parse_args()

    # Get PlantUML text
    if args.source:
        with open(args.source, "r") as f:
            plantuml_text = f.read()
    elif args.text:
        plantuml_text = args.text
    else:
        # Read from stdin
        plantuml_text = sys.stdin.read()

    if not plantuml_text.strip():
        print(json.dumps({"error": "No PlantUML text provided"}))
        sys.exit(1)

    # Encode
    encoded = encode_plantuml(plantuml_text)
    svg_url = get_svg_url(encoded)

    if args.url_only:
        if args.json:
            print(json.dumps({"url": svg_url, "encoded": encoded}))
        else:
            print(svg_url)
        return

    # Fetch SVG from server
    try:
        svg_content = fetch_svg(svg_url)
    except Exception as e:
        if args.json:
            print(json.dumps({"error": f"Failed to fetch SVG: {str(e)}", "url": svg_url}))
        else:
            print(f"Error: Failed to fetch SVG: {e}", file=sys.stderr)
            print(f"Fallback URL: {svg_url}", file=sys.stderr)
        sys.exit(1)

    # Save files
    result = save_files(plantuml_text, svg_content, args.name, args.output_dir)

    if args.json:
        print(
            json.dumps(
                {
                    "puml_path": result["puml_path"],
                    "svg_path": result["svg_path"],
                    "markdown_link": result["markdown_link"],
                    "server_url": svg_url,
                },
                indent=2,
            )
        )
    else:
        # Just output the markdown link (most useful for Claude)
        print(result["markdown_link"])


if __name__ == "__main__":
    main()
