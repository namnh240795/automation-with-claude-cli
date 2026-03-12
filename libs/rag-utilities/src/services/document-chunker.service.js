"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentChunkerService = void 0;
class DocumentChunkerService {
    constructor(options = {}) {
        this.maxChunkSize = options.maxChunkSize || 1000;
        this.chunkOverlap = options.chunkOverlap || 200;
        this.separator = options.separator || '\n\n';
    }
    chunkDocument(content, metadata) {
        const chunks = [];
        const paragraphs = this.splitBySeparators(content);
        let currentChunk = '';
        let chunkIndex = 0;
        for (const paragraph of paragraphs) {
            if (paragraph.length > this.maxChunkSize) {
                if (currentChunk.trim().length > 0) {
                    chunks.push({
                        content: currentChunk.trim(),
                        index: chunkIndex++,
                        metadata,
                    });
                    currentChunk = '';
                }
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
            if (currentChunk.length + paragraph.length > this.maxChunkSize) {
                if (currentChunk.trim().length > 0) {
                    chunks.push({
                        content: currentChunk.trim(),
                        index: chunkIndex++,
                        metadata,
                    });
                    const overlapText = this.getOverlapText(currentChunk);
                    currentChunk = overlapText + paragraph;
                }
                else {
                    currentChunk = paragraph;
                }
            }
            else {
                currentChunk += (currentChunk.length > 0 ? this.separator : '') + paragraph;
            }
        }
        if (currentChunk.trim().length > 0) {
            chunks.push({
                content: currentChunk.trim(),
                index: chunkIndex,
                metadata,
            });
        }
        return chunks;
    }
    splitBySeparators(content) {
        const separators = [
            '\n\n\n',
            '\n\n',
            '\n',
            '. ',
            '! ',
            '? ',
            '; ',
            ', ',
            ' ',
        ];
        let paragraphs = [content];
        for (const separator of separators) {
            if (separator === ' ') {
                if (paragraphs.length === 1 && paragraphs[0].length > this.maxChunkSize) {
                    paragraphs = this.splitBySize(content, this.maxChunkSize);
                }
                break;
            }
            const newParagraphs = [];
            let allChunksValid = true;
            for (const paragraph of paragraphs) {
                if (paragraph.length <= this.maxChunkSize) {
                    newParagraphs.push(paragraph);
                }
                else {
                    const parts = paragraph.split(separator);
                    let combined = '';
                    for (const part of parts) {
                        const testLength = combined.length + part.length + separator.length;
                        if (combined.length > 0 && testLength > this.maxChunkSize) {
                            newParagraphs.push(combined.trim());
                            combined = part + separator;
                        }
                        else {
                            combined += part + separator;
                        }
                    }
                    if (combined.trim().length > 0) {
                        newParagraphs.push(combined.trim());
                    }
                }
            }
            const oversizedChunks = newParagraphs.filter(p => p.length > this.maxChunkSize);
            if (oversizedChunks.length === 0) {
                paragraphs = newParagraphs;
                break;
            }
        }
        return paragraphs.filter(p => p.trim().length > 0);
    }
    splitLargeText(text) {
        const chunks = [];
        const words = text.split(' ');
        let currentChunk = '';
        for (const word of words) {
            if (currentChunk.length + word.length + 1 > this.maxChunkSize) {
                if (currentChunk.length > 0) {
                    chunks.push(currentChunk.trim());
                }
                currentChunk = word;
            }
            else {
                currentChunk += (currentChunk.length > 0 ? ' ' : '') + word;
            }
        }
        if (currentChunk.length > 0) {
            chunks.push(currentChunk.trim());
        }
        return chunks;
    }
    splitBySize(text, size) {
        const chunks = [];
        for (let i = 0; i < text.length; i += size) {
            chunks.push(text.slice(i, i + size));
        }
        return chunks;
    }
    getOverlapText(chunk) {
        const words = chunk.split(' ');
        const overlapWords = [];
        let length = 0;
        for (let i = words.length - 1; i >= 0; i--) {
            const wordLength = words[i].length + 1;
            if (length + wordLength > this.chunkOverlap) {
                break;
            }
            overlapWords.unshift(words[i]);
            length += wordLength;
        }
        return overlapWords.join(' ') + (overlapWords.length > 0 ? ' ' : '');
    }
    estimateTokenCount(text) {
        return Math.ceil(text.length / 4);
    }
}
exports.DocumentChunkerService = DocumentChunkerService;
//# sourceMappingURL=document-chunker.service.js.map