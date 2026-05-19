# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/auth/package.json ./apps/auth/
COPY libs ./libs
COPY packages ./packages

# Install dependencies
RUN corepack enable && pnpm install --frozen-lockfile

# Build auth service
RUN pnpm rspack:auth

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy built artifacts
COPY --from=builder /app/apps/auth/dist ./apps/auth/dist
COPY --from=builder /app/packages/auth-prisma-client/src ./packages/auth-prisma-client/src
COPY --from=builder /app/libs ./libs

# Copy package files for production
COPY apps/auth/package.json ./apps/auth/
COPY libs/auth-utilities/package.json ./libs/auth-utilities/
COPY libs/app-logger/package.json ./libs/app-logger/
COPY libs/caching/package.json ./libs/caching/
COPY libs/health/package.json ./libs/health/
COPY libs/common/package.json ./libs/common/

# Install production dependencies only
RUN corepack enable && pnpm install --frozen-lockfile --prod

# Set environment
ENV NODE_ENV=production
ENV SERVICE_PREFIX=auth
ENV PORT=3001

EXPOSE 3001

CMD ["node", "apps/auth/dist/main.js"]