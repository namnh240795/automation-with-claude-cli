FROM node:20-alpine

# Install Claude CLI
RUN npm install -g @anthropic-ai/claude-code

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /workspace

# Change ownership of workspace to nodejs user
RUN chown -R nodejs:nodejs /workspace

# Switch to non-root user
USER nodejs

# Keep the container running
CMD ["tail", "-f", "/dev/null"]
