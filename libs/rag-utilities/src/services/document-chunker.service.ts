export interface ChunkOptions {
  maxChunkSize?: number;
  chunkOverlap?: number;
  separator?: string;
}

export interface DocumentChunk {
  content: string;
  index: number;
  metadata?: Record<string, any>;
}

export class DocumentChunkerService {
  private readonly maxChunkSize: number;
  private readonly chunkOverlap: number;
  private readonly separator: string;

  constructor(options: ChunkOptions = {}) {
    this.maxChunkSize = options.maxChunkSize || 1000;
    this.chunkOverlap = options.chunkOverlap || 200;
    this.separator = options.separator || '\n\n';
  }

  /**
   * Split document into chunks for embedding
   */
  chunkDocument(content: string, metadata?: Record<string, any>): DocumentChunk[] {
    const chunks: DocumentChunk[] = [];

    // First, try to split by natural separators (paragraphs, code blocks, etc.)
    const paragraphs = this.splitBySeparators(content);

    let currentChunk = '';
    let chunkIndex = 0;

    for (const paragraph of paragraphs) {
      // If a single paragraph is larger than max chunk size, split it by sentences
      if (paragraph.length > this.maxChunkSize) {
        // Save current chunk if it has content
        if (currentChunk.trim().length > 0) {
          chunks.push({
            content: currentChunk.trim(),
            index: chunkIndex++,
            metadata,
          });
          currentChunk = '';
        }

        // Split large paragraph into smaller chunks
        const sentenceChunks = this.splitLargeText(paragraph);
        for (const sentenceChunk of sentenceChunks) {
          chunks.push({
            content: sentenceChunk,
            index: chunkIndex++,
            metadata,
          });
        }
        continue;
      }

      // Check if adding this paragraph would exceed chunk size
      if (currentChunk.length + paragraph.length > this.maxChunkSize) {
        // Save current chunk
        if (currentChunk.trim().length > 0) {
          chunks.push({
            content: currentChunk.trim(),
            index: chunkIndex++,
            metadata,
          });

          // Start new chunk with overlap
          const overlapText = this.getOverlapText(currentChunk);
          currentChunk = overlapText + paragraph;
        } else {
          currentChunk = paragraph;
        }
      } else {
        currentChunk += (currentChunk.length > 0 ? this.separator : '') + paragraph;
      }
    }

    // Add final chunk
    if (currentChunk.trim().length > 0) {
      chunks.push({
        content: currentChunk.trim(),
        index: chunkIndex,
        metadata,
      });
    }

    return chunks;
  }

  /**
   * Split content by natural separators
   */
  private splitBySeparators(content: string): string[] {
    // Try different separators in order of preference
    const separators = [
      '\n\n\n', // Triple newline (major sections)
      '\n\n',   // Double newline (paragraphs)
      '\n',     // Single newline (lines)
      '. ',     // Sentence end
      '! ',     // Exclamation end
      '? ',     // Question end
      '; ',     // Semicolon
      ', ',     // Comma (last resort)
      ' ',      // Space (very last resort)
    ];

    let paragraphs: string[] = [content];

    for (const separator of separators) {
      if (separator === ' ') {
        // Only split by space if all other methods failed to produce chunks
        if (paragraphs.length === 1 && paragraphs[0].length > this.maxChunkSize) {
          paragraphs = this.splitBySize(content, this.maxChunkSize);
        }
        break;
      }

      const newParagraphs: string[] = [];
      let allChunksValid = true;

      for (const paragraph of paragraphs) {
        if (paragraph.length <= this.maxChunkSize) {
          newParagraphs.push(paragraph);
        } else {
          const parts = paragraph.split(separator);
          let combined = '';

          for (const part of parts) {
            const testLength = combined.length + part.length + separator.length;
            if (combined.length > 0 && testLength > this.maxChunkSize) {
              newParagraphs.push(combined.trim());
              combined = part + separator;
            } else {
              combined += part + separator;
            }
          }

          if (combined.trim().length > 0) {
            newParagraphs.push(combined.trim());
          }
        }
      }

      // Check if this split produced reasonable chunks
      const oversizedChunks = newParagraphs.filter(p => p.length > this.maxChunkSize);
      if (oversizedChunks.length === 0) {
        paragraphs = newParagraphs;
        break;
      }
    }

    return paragraphs.filter(p => p.trim().length > 0);
  }

  /**
   * Split large text into fixed-size chunks
   */
  private splitLargeText(text: string): string[] {
    const chunks: string[] = [];
    const words = text.split(' ');
    let currentChunk = '';

    for (const word of words) {
      if (currentChunk.length + word.length + 1 > this.maxChunkSize) {
        if (currentChunk.length > 0) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = word;
      } else {
        currentChunk += (currentChunk.length > 0 ? ' ' : '') + word;
      }
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }

  /**
   * Split by exact size (for very long texts without natural breaks)
   */
  private splitBySize(text: string, size: number): string[] {
    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += size) {
      chunks.push(text.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Get overlap text from end of previous chunk
   */
  private getOverlapText(chunk: string): string {
    const words = chunk.split(' ');
    const overlapWords: string[] = [];
    let length = 0;

    for (let i = words.length - 1; i >= 0; i--) {
      const wordLength = words[i].length + 1; // +1 for space
      if (length + wordLength > this.chunkOverlap) {
        break;
      }
      overlapWords.unshift(words[i]);
      length += wordLength;
    }

    return overlapWords.join(' ') + (overlapWords.length > 0 ? ' ' : '');
  }

  /**
   * Estimate token count (rough approximation: ~4 chars per token)
   */
  estimateTokenCount(text: string): number {
    return Math.ceil(text.length / 4);
  }
}
