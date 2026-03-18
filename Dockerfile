# ── Stage 1: Build ────────────────────────────────────────────
FROM node:22-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency manifests first for layer caching
COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the source
COPY . .

# Build the Vite app (outputs to dist/public/)
RUN pnpm run build

# ── Stage 2: Serve ────────────────────────────────────────────
FROM nginx:stable-alpine AS runner

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist/public /usr/share/nginx/html

# Nginx config: serve SPA with client-side routing support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on $PORT (default 8080)
ENV PORT=8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
