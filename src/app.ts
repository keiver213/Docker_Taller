import express from "express";
import { todoRouter } from "./todos/todo.routes";

export function buildApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/todos", todoRouter);

  return app;
}
