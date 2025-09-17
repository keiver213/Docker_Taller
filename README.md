# ts-express-postgres-todos

Proyecto mínimo TypeScript + Express + Postgres (pg) con caso de uso de *todos*.

## Dev rápido
```bash
npm i
# (opcional) Levantar Postgres con docker-compose:
docker compose up -d
# Configura DATABASE_URL en .env (ver .env.example)
npm run db:migrate
npm run dev
```

**Endpoints**:
- `GET /health`
- `GET /todos`
- `GET /todos/:id`
- `POST /todos` body: `{ "title": "..." }`
- `PUT /todos/:id` body opcional: `{ "title": "...", "done": true }`
- `DELETE /todos/:id`
