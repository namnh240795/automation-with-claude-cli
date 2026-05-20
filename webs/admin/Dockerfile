# syntax=docker/dockerfile

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm and dependencies
RUN corepack enable && corepack prepare
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY webs/admin/package.json webs/admin/
COPY webs/common/package.json webs/common/
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY webs/ webs/
WORKDIR /app/webs/admin
RUN pnpm exec vite build

# Stage 2: Production nginx
FROM nginx:alpine AS production
COPY --from=builder /app/webs/admin/.svelte-kit/output/client /usr/share/nginx/html
COPY docker/nginx/admin.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]