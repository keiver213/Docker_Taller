import { pool } from "../db";
import { Todo } from "./todo.model";

export async function listTodos(): Promise<Todo[]> {
  const r = await pool.query("SELECT id, title, done, created_at FROM todos ORDER BY id DESC");
  return r.rows;
}

export async function getTodo(id: number): Promise<Todo | null> {
  const r = await pool.query("SELECT id, title, done, created_at FROM todos WHERE id=$1", [id]);
  return r.rows[0] ?? null;
}

export async function createTodo(title: string): Promise<Todo> {
  const r = await pool.query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING id, title, done, created_at",
    [title]
  );
  return r.rows[0];
}

export async function updateTodo(id: number, title?: string, done?: boolean): Promise<Todo | null> {
  const r = await pool.query(
    `UPDATE todos
     SET title = COALESCE($2, title),
         done  = COALESCE($3, done)
     WHERE id = $1
     RETURNING id, title, done, created_at`,
    [id, title ?? null, typeof done === "boolean" ? done : null]
  );
  return r.rows[0] ?? null;
}

export async function deleteTodo(id: number): Promise<boolean> {
  const r = await pool.query("DELETE FROM todos WHERE id=$1", [id]);
  return (r.rowCount??0) > 0;
}
