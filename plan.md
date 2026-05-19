# Implementation Plan: Kafka + OpenSearch Logging Integration

## Overview

Add Kafka + OpenSearch infrastructure to this monorepo template and integrate them with the existing `@app/app-logger` library so that all `@LogActivity()` decorated service methods automatically send structured logs through Kafka → Consumer → OpenSearch, enabling full-text search and PPL queries via OpenSearch dashboards.

## Architecture

```
@Service Method with @LogActivity()
         │
         ▼
┌─────────────────────────────────┐
│       libs/app-logger           │
│   AppLogger.customLog()         │
│   → Kafka Producer (async)     │
└─────────────────────────────────┘
         │ (Kafka topic: workflow-logs)
         ▼
┌─────────────────────────────────┐
│     libs/messaging              │
│  KafkaProducerService           │
│  ensureTopicExists()            │
│  sendLog(log)                   │
└─────────────────────────────────┘
         │
         ▼ (Kafka topic: workflow-logs)
┌─────────────────────────────────┐
│     libs/messaging              │
│  LoggingConsumerService         │
│  onModuleInit() → subscribe     │
│  handleMessage()                │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│     libs/opensearch              │
│  OpenSearchService              │
│  indexLog(log)                  │
└─────────────────────────────────┘
         │
         ▼ (OpenSearch index: workflow-logs)
┌─────────────────────────────────┐
│     OpenSearch (port 9200)      │
│  Full-text search               │
│  PPL queries (Dashboards :5601) │
└─────────────────────────────────┘
```

## Key Architecture Decisions

1. **Singleton producer** - Kafka producer is a singleton `LoggingProducerService` in `libs/messaging`, shared globally via module exports. Messages are sent async (fire-and-forget) so logging never blocks the service.
2. **Graceful degradation** - If Kafka is unavailable, `AppLogger.customLog()` falls back to `console.log(JSON.stringify(...))` so the service continues working.
3. **OpenSearch as supplementary store** - PostgreSQL remains the primary database. OpenSearch is added only for high-volume workflow/event logging with full-text search capability.
4. **Topic auto-creation** - Kafka producer auto-creates `workflow-logs` topic on first send.

## Task List

### Phase 1: Infrastructure

#### Task 1: Add Kafka + OpenSearch to docker-compose.yml
- [ ] Add Kafka service (KRaft mode, no ZooKeeper) with health check
- [ ] Add OpenSearch service with single-node config and disabled security
- [ ] Add OpenSearch Dashboards service (port 5601)
- [ ] Update app service to connect to `host.docker.internal:9092` for Kafka and `host.docker.internal:9200` for OpenSearch

**Files:**
- `docker/docker-compose.yml`

**Verification:**
- `docker compose up -d` starts all services
- `curl http://localhost:9200` returns OpenSearch health
- `curl http://localhost:5601` returns Dashboards

---

#### Task 2: Create `libs/messaging` - Kafka producer/consumer
- [ ] Create `libs/messaging/src/index.ts` - barrel export
- [ ] Create `libs/messaging/src/messaging.module.ts` - Global NestJS module
- [ ] Create `libs/messaging/src/kafka-producer.service.ts` - `OnModuleInit`, connects Kafka, `sendLog(event)`, auto-creates topic
- [ ] Create `libs/messaging/src/kafka-consumer.service.ts` - `OnModuleInit`, subscribes to `workflow-logs`, `handleMessage(payload)` calls `OpenSearchService.indexLog()`
- [ ] Create `libs/messaging/src/interfaces/log-event.interface.ts` - shared `LogEvent` interface (same schema as external repo)

**Files:**
- `libs/messaging/src/index.ts`
- `libs/messaging/src/messaging.module.ts`
- `libs/messaging/src/kafka-producer.service.ts`
- `libs/messaging/src/kafka-consumer.service.ts`
- `libs/messaging/src/interfaces/log-event.interface.ts`
- `libs/messaging/package.json`
- `libs/messaging/tsconfig.json`

**Dependencies:** Task 1 (needs Kafka running)

---

#### Task 3: Create `libs/opensearch` - OpenSearch client
- [ ] Create `libs/opensearch/src/index.ts` - barrel export
- [ ] Create `libs/opensearch/src/opensearch.module.ts` - Global NestJS module
- [ ] Create `libs/opensearch/src/opensearch.service.ts` - `OnModuleInit`, creates `workflow-logs` index with proper mappings, `indexLog(log)`, `searchLogs(query)`

**Files:**
- `libs/opensearch/src/index.ts`
- `libs/opensearch/src/opensearch.module.ts`
- `libs/opensearch/src/opensearch.service.ts`
- `libs/opensearch/package.json`
- `libs/opensearch/tsconfig.json`

**Dependencies:** Task 1 (needs OpenSearch running)

---

### Checkpoint: Infrastructure
- [ ] `docker compose up -d` starts kafka + opensearch + dashboards
- [ ] `libs/messaging` has Kafka producer + consumer services
- [ ] `libs/opensearch` has OpenSearch service with index creation

---

### Phase 2: Integration

#### Task 4: Integrate Kafka into `libs/app-logger` @LogActivity()
- [ ] Update `libs/app-logger/src/app-logger.ts`:
  - Inject `KafkaProducerService` (optional, graceful fallback)
  - In `customLog()`: send log to Kafka async via producer if available, else `console.log(JSON.stringify())` as fallback
  - Add `service_name` field to `CustomLog` type for multi-service identification
- [ ] Create `libs/app-logger/src/interfaces/app-logger-log.interface.ts` extending `LogEvent` with `service_name`

**Files:**
- `libs/app-logger/src/app-logger.ts`
- `libs/app-logger/src/interfaces/app-logger-log.interface.ts`

**Dependencies:** Tasks 2 + 3 (need services to be registered)

**Note:** This is the critical integration point. All `@LogActivity()` decorated methods will now automatically send structured logs to Kafka → OpenSearch.

---

### Checkpoint: Integration
- [ ] `@LogActivity()` sends logs to Kafka (check with `docker compose logs kafka`)
- [ ] Logs appear in OpenSearch (check with `curl http://localhost:9200/workflow-logs/_search`)
- [ ] Logs visible in OpenSearch Dashboards at http://localhost:5601

---

### Phase 3: Verification

#### Task 5: Add demo endpoint to `apps/api` using `@LogActivity()`
- [ ] Create `apps/api/src/common/demo/` with:
  - `demo.controller.ts` - `POST /api/v1/demo/log` and `GET /api/v1/demo/log`
  - `demo.service.ts` - methods with `@LogActivity()` that send sample logs
  - `dto/create-demo-log.dto.ts`
  - `dto/query-log.dto.ts` (re-use from messaging if possible)
  - `demo.module.ts`
- [ ] Update `apps/api/src/app.module.ts` to import `KafkaModule` and `OpenSearchModule`
- [ ] Update `apps/api/rspack.config.js` to add `@app/messaging` and `@app/opensearch` aliases
- [ ] Update `tsconfig.json` paths to include `@app/messaging` and `@app/opensearch`

**Files:**
- `apps/api/src/common/demo/demo.controller.ts`
- `apps/api/src/common/demo/demo.service.ts`
- `apps/api/src/common/demo/demo.module.ts`
- `apps/api/src/common/demo/dto/create-demo-log.dto.ts`
- `apps/api/src/common/demo/dto/query-log.dto.ts`
- `apps/api/src/common/demo/index.ts`
- `apps/api/src/app.module.ts`
- `apps/api/rspack.config.js`
- `tsconfig.json`

**Dependencies:** Tasks 2 + 3 + 4

**Verification:**
- `POST http://localhost:3000/api/v1/demo/log` creates a log
- `GET http://localhost:3000/api/v1/demo/log` queries logs from OpenSearch
- Logs appear in OpenSearch Dashboards

---

### Checkpoint: Complete
- [ ] All services healthy in docker compose
- [ ] `@LogActivity()` decorator sends structured logs to OpenSearch via Kafka
- [ ] OpenSearch Dashboards show logs at http://localhost:5601
- [ ] API endpoint returns logs from OpenSearch

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Kafka connection failure blocks service startup | High | Producer uses `try/catch` + graceful fallback to console.log; consumer logs errors and continues |
| OpenSearch unavailable at startup | Med | Consumer `onModuleInit` uses `try/catch`, logs warning; Kafka producer still works |
| Circular dependency (app-logger → messaging → app-logger) | High | `libs/app-logger` does NOT import `KafkaModule` directly — uses a separate `LogPublisher` interface injected via `APP_INTERCEPTOR` or lazy injection |
| Kafka JS library not in rspack externals | Med | Add `kafkajs` to externals in all rspack configs |

## Open Questions

- **Q1:** Should we use `@nestjs/microservices` transport for Kafka, or keep raw `kafkajs`? → **Decision: Raw kafkajs** (simpler, same as external repo pattern, no transport complexity)
- **Q2:** Should we use a shared `LogPublisher` interface to avoid circular deps between `app-logger` and `messaging`? → **Decision: Yes** — create `libs/app-logger/src/interfaces/log-publisher.interface.ts` that `KafkaProducerService` implements

## Package Additions

```
kafkajs: ^2.2.4              # Kafka client (libs/messaging)
@opensearch-project/opensearch: ^2.3.1  # OpenSearch client (libs/opensearch)
```

## External Repo Reference

The external repo (`nestjs-kafka-opensearch`) provides the pattern to follow:
- `LoggingProducerService.sendLog()` → Kafka topic `workflow-logs`
- `LoggingConsumerService.handleMessage()` → OpenSearch `indexLog()`
- `OpenSearchService.searchLogs()` → full-text search with pagination
- `LogsController` → REST endpoints for `POST /logs` and `GET /logs`

---

## Summary: What Gets Added

| Component | Location | Purpose |
|-----------|----------|---------|
| Kafka + OpenSearch + Dashboards | `docker/docker-compose.yml` | Infrastructure |
| `libs/messaging` | Kafka producer/consumer services | Async log delivery |
| `libs/opensearch` | OpenSearch client service | Log indexing and search |
| Enhanced `@app/app-logger` | `LogActivity` → Kafka | Auto-capture all service logs |
| Demo API endpoint | `apps/api` | Verify the flow end-to-end |