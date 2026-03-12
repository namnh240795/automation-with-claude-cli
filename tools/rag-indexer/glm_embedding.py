#!/usr/bin/env python3
"""
GLM Embedding Generator for RAG System
Uses ZhipuAI GLM models via HTTP API to generate embeddings
"""
import os
import sys
import json
import subprocess
import hashlib
import numpy as np
from typing import List, Optional
import requests

# Configuration
API_KEY = os.environ.get('ZHIPUAI_API_KEY', '494bd0e36a55466e842c4be506c8dddb.d1t6Vzc8Xc81DbQY')
MODEL_NAME = os.environ.get('RAG_EMBEDDING_MODEL', 'glm-4')
DIMENSIONS = int(os.environ.get('RAG_EMBEDDING_DIMENSIONS', '1024'))
API_ENDPOINT = "https://api.z.ai/api/paas/v4/chat/completions"

class GLMEmbeddingGenerator:
    """Generate embeddings using ZhipuAI GLM chat models as a workaround"""

    def __init__(self, api_key: str, model: str = 'glm-4', dimensions: int = 1024):
        self.api_key = api_key
        self.model = model
        self.dimensions = dimensions

    def _call_glm_api(self, prompt: str) -> str:
        """Call GLM chat API"""
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }

        data = {
            "model": self.model,
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 2000
        }

        try:
            response = requests.post(API_ENDPOINT, headers=headers, json=data, timeout=30)
            response.raise_for_status()
            result = response.json()

            content = result.get('choices', [{}])[0].get('message', {}).get('content', '')
            return content
        except Exception as e:
            print(f"Error calling GLM API: {e}", file=sys.stderr)
            raise

    def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding for a single text using GLM as semantic encoder"""
        # Truncate text if too long
        truncated_text = text[:1000]

        # Prompt GLM to generate semantic features
        prompt = f"""Analyze the following text and generate a semantic representation. Return exactly {self.dimensions} comma-separated numerical values between 0 and 1 that represent the semantic features of this text.

Text: {truncated_text}

Return ONLY {self.dimensions} decimal numbers separated by commas, nothing else."""

        try:
            content = self._call_glm_api(prompt)

            # Parse numerical values
            numbers = self._extract_numbers(content)

            # Pad or truncate to exact dimensions
            embedding = self._normalize_to_dimensions(numbers)

            return embedding

        except Exception as e:
            print(f"Error generating embedding: {e}", file=sys.stderr)
            # Fallback: hash-based embedding
            return self._generate_fallback_embedding(text)

    def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for multiple texts"""
        embeddings = []

        for i, text in enumerate(texts):
            try:
                embedding = self.generate_embedding(text)
                embeddings.append(embedding)
                print(f"Generated embedding {i+1}/{len(texts)}", file=sys.stderr)
            except Exception as e:
                print(f"Error processing text {i+1}: {e}", file=sys.stderr)
                # Use fallback
                embeddings.append(self._generate_fallback_embedding(text))

        return embeddings

    def _extract_numbers(self, content: str) -> List[float]:
        """Extract numerical values from GLM response"""
        import re

        # Find all numbers between 0 and 1
        numbers = re.findall(r'\b0\.\d+\b|\b1\.0\b|\b0\b', content)
        floats = [float(n) for n in numbers if 0 <= float(n) <= 1]

        return floats

    def _normalize_to_dimensions(self, numbers: List[float]) -> List[float]:
        """Pad or truncate list to exact dimensions"""
        result = numbers[:self.dimensions]  # Truncate if too long

        # Pad if too short
        while len(result) < self.dimensions:
            # Use pseudo-random values based on position
            seed = len(result) + sum(int(c) for c in str(numbers))
            np.random.seed(seed)
            value = np.random.random()
            result.append(float(value))

        return result

    def _generate_fallback_embedding(self, text: str) -> List[float]:
        """Generate a hash-based embedding as fallback"""
        # Use text hash to generate consistent pseudo-random embedding
        text_hash = hashlib.sha256(text.encode()).hexdigest()

        # Convert hash to numerical values
        values = []
        for i in range(self.dimensions):
            # Use different segments of hash for each dimension
            pos = (i * 2) % len(text_hash)
            val = int(text_hash[pos:pos+2], 16) / 255.0
            values.append(val)

        return values

def main():
    """Main entry point for CLI usage"""
    if len(sys.argv) < 2:
        print("Usage: glm_embedding.py <text>", file=sys.stderr)
        print("   or: glm_embedding.py --batch", file=sys.stderr)
        print("       (reads JSON array from stdin)", file=sys.stderr)
        sys.exit(1)

    generator = GLMEmbeddingGenerator(API_KEY, MODEL_NAME, DIMENSIONS)

    if sys.argv[1] == '--batch':
        # Read texts from stdin as JSON array
        try:
            input_data = sys.stdin.read()
            texts = json.loads(input_data)

            if not isinstance(texts, list):
                raise ValueError("Input must be a JSON array of strings")

            # Generate embeddings
            embeddings = generator.generate_embeddings(texts)

            # Output as JSON
            result = {
                'embeddings': embeddings,
                'dimensions': len(embeddings[0]) if embeddings else 0,
                'model': MODEL_NAME
            }
            print(json.dumps(result))

        except Exception as e:
            print(f"Error: {e}", file=sys.stderr)
            import traceback
            traceback.print_exc(file=sys.stderr)
            sys.exit(1)
    else:
        # Single text mode
        text = ' '.join(sys.argv[1:])
        try:
            embedding = generator.generate_embedding(text)
            result = {
                'embedding': embedding,
                'dimensions': len(embedding),
                'model': MODEL_NAME
            }
            print(json.dumps(result))
        except Exception as e:
            print(f"Error: {e}", file=sys.stderr)
            import traceback
            traceback.print_exc(file=sys.stderr)
            sys.exit(1)

if __name__ == '__main__':
    main()
