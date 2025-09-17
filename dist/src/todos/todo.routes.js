"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const todo_service_1 = require("./todo.service");
exports.todoRouter = (0, express_1.Router)();
exports.todoRouter.get("/", async (_req, res) => {
    const data = await (0, todo_service_1.listTodos)();
    res.json(data);
});
exports.todoRouter.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const todo = await (0, todo_service_1.getTodo)(id);
    if (!todo)
        return res.status(404).json({ error: "Not found" });
    res.json(todo);
});
exports.todoRouter.post("/", async (req, res) => {
    const { title } = req.body;
    if (!title)
        return res.status(400).json({ error: "title is required" });
    const todo = await (0, todo_service_1.createTodo)(title);
    res.status(201).json(todo);
});
exports.todoRouter.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { title, done } = req.body;
    const todo = await (0, todo_service_1.updateTodo)(id, title, done);
    if (!todo)
        return res.status(404).json({ error: "Not found" });
    res.json(todo);
});
exports.todoRouter.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const ok = await (0, todo_service_1.deleteTodo)(id);
    if (!ok)
        return res.status(404).json({ error: "Not found" });
    res.status(204).send();
});
