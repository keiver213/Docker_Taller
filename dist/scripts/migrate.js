"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../src/db");
async function main() {
    await db_1.pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
    console.log("Migración OK");
    await db_1.pool.end();
}
main().catch(async (e) => {
    console.error(e);
    await db_1.pool.end();
    process.exit(1);
});
