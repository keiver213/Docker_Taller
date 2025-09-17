# Etapa 1: dependencias (incluye dev para compilar)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci
# ⬅️ copiamos todo lo necesario para compilar
COPY tsconfig.json ./
COPY src ./src
COPY scripts ./scripts 
RUN npm run build

# Etapa 2: runtime (solo prod deps + dist)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN apk add --no-cache curl

# Solo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar compilados desde deps
COPY --from=deps /app/dist ./dist
COPY --from=deps /app/scripts ./scripts
COPY --from=deps /app/src ./src

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -fsS http://localhost:3000/health || exit 1

USER node

CMD ["node", "dist/src/index.js"]
