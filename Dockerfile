# Etapa 1: dependencias (incluye dev para compilar)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Etapa 2: build (usa devDependencies para compilar)
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Etapa 3: runtime (solo prod deps + dist)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN apk add --no-cache curl

# Solo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar compilados y node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -fsS http://localhost:3000/health || exit 1

USER node

CMD ["node", "dist/src/index.js"]
