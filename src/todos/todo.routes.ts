import { Router } from "express";
import { listTodos, getTodo, createTodo, updateTodo, deleteTodo } from "./todo.service";

export const todoRouter = Router();

todoRouter.get("/", async (_req, res) => {
  const data = await listTodos();
  res.json(data);
});

todoRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const todo = await getTodo(id);
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json(todo);
});

todoRouter.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });
  const todo = await createTodo(title);
  res.status(201).json(todo);
});

todoRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, done } = req.body;
  const todo = await updateTodo(id, title, done);
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json(todo);
});

todoRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const ok = await deleteTodo(id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});
