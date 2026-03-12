"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexingStatsDto = exports.BatchSearchResponseDto = exports.SearchResponseDto = exports.SearchResultDto = exports.SearchResultDocumentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SearchResultDocumentDto {
}
exports.SearchResultDocumentDto = SearchResultDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document ID' }),
    __metadata("design:type", String)
], SearchResultDocumentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document title' }),
    __metadata("design:type", String)
], SearchResultDocumentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File path' }),
    __metadata("design:type", String)
], SearchResultDocumentDto.prototype, "file_path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Source type' }),
    __metadata("design:type", String)
], SearchResultDocumentDto.prototype, "source_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document type' }),
    __metadata("design:type", String)
], SearchResultDocumentDto.prototype, "doc_type", void 0);
class SearchResultDto {
}
exports.SearchResultDto = SearchResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chunk ID' }),
    __metadata("design:type", String)
], SearchResultDto.prototype, "chunk_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chunk content' }),
    __metadata("design:type", String)
], SearchResultDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Similarity score (0-1)' }),
    __metadata("design:type", Number)
], SearchResultDto.prototype, "similarity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chunk metadata', required: false }),
    __metadata("design:type", Object)
], SearchResultDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document information', type: SearchResultDocumentDto }),
    __metadata("design:type", SearchResultDocumentDto)
], SearchResultDto.prototype, "document", void 0);
class SearchResponseDto {
}
exports.SearchResponseDto = SearchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Search query', required: false }),
    __metadata("design:type", String)
], SearchResponseDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of results returned' }),
    __metadata("design:type", Number)
], SearchResponseDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Search results', type: [SearchResultDto] }),
    __metadata("design:type", Array)
], SearchResponseDto.prototype, "results", void 0);
class BatchSearchResponseDto {
}
exports.BatchSearchResponseDto = BatchSearchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of search results', type: [SearchResponseDto] }),
    __metadata("design:type", Array)
], BatchSearchResponseDto.prototype, "searches", void 0);
class IndexingStatsDto {
}
exports.IndexingStatsDto = IndexingStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of documents' }),
    __metadata("design:type", Number)
], IndexingStatsDto.prototype, "total_documents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of chunks' }),
    __metadata("design:type", Number)
], IndexingStatsDto.prototype, "total_chunks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of documents with embeddings' }),
    __metadata("design:type", Number)
], IndexingStatsDto.prototype, "documents_with_embeddings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of chunks with embeddings' }),
    __metadata("design:type", Number)
], IndexingStatsDto.prototype, "chunks_with_embeddings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document count by source type' }),
    __metadata("design:type", Object)
], IndexingStatsDto.prototype, "by_source_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document count by document type' }),
    __metadata("design:type", Object)
], IndexingStatsDto.prototype, "by_doc_type", void 0);
//# sourceMappingURL=search-response.dto.js.map