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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchSearchRequestDto = exports.SearchRequestDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const prisma_client_1 = require("@rag/prisma-client");
class SearchRequestDto {
    constructor() {
        this.limit = 10;
        this.threshold = 0.7;
    }
}
exports.SearchRequestDto = SearchRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Query text to search for' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchRequestDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Maximum number of results to return', default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SearchRequestDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Minimum similarity threshold (0-1)', default: 0.7 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SearchRequestDto.prototype, "threshold", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by source type', enum: prisma_client_1.source_type }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_client_1.source_type),
    __metadata("design:type", typeof (_a = typeof prisma_client_1.source_type !== "undefined" && prisma_client_1.source_type) === "function" ? _a : Object)
], SearchRequestDto.prototype, "source_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by document type', enum: prisma_client_1.doc_type }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_client_1.doc_type),
    __metadata("design:type", typeof (_b = typeof prisma_client_1.doc_type !== "undefined" && prisma_client_1.doc_type) === "function" ? _b : Object)
], SearchRequestDto.prototype, "doc_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Keyword filter for hybrid search' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchRequestDto.prototype, "keyword_filter", void 0);
class BatchSearchRequestDto {
    constructor() {
        this.limit_per_query = 5;
        this.threshold = 0.7;
    }
}
exports.BatchSearchRequestDto = BatchSearchRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of query texts to search for', type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], BatchSearchRequestDto.prototype, "queries", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Maximum number of results per query', default: 5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], BatchSearchRequestDto.prototype, "limit_per_query", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Minimum similarity threshold (0-1)', default: 0.7 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BatchSearchRequestDto.prototype, "threshold", void 0);
//# sourceMappingURL=search-request.dto.js.map