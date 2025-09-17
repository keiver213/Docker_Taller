"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTodos = listTodos;
exports.getTodo = getTodo;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
const db_1 = require("../db");
async function listTodos() {
    const r = await db_1.pool.query("SELECT id, title, done, created_at FROM todos ORDER BY id DESC");
    return r.rows;
}
async function getTodo(id) {
    const r = await db_1.pool.query("SELECT id, title, done, created_at FROM todos WHERE id=$1", [id]);
    return r.rows[0] ?? null;
}
async function createTodo(title) {
    const r = await db_1.pool.query("INSERT INTO todos (title) VALUES ($1) RETURNING id, title, done, created_at", [title]);
    return r.rows[0];
}
async function updateTodo(id, title, done) {
    const r = await db_1.pool.query(`UPDATE todos
     SET title = COALESCE($2, title),
         done  = COALESCE($3, done)
     WHERE id = $1
     RETURNING id, title, done, created_at`, [id, title ?? null, typeof done === "boolean" ? done : null]);
    return r.rows[0] ?? null;
}
async function deleteTodo(id) {
    const r = await db_1.pool.query("DELETE FROM todos WHERE id=$1", [id]);
    return (r.rowCount ?? 0) > 0;
}
