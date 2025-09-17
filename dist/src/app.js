"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const express_1 = __importDefault(require("express"));
const todo_routes_1 = require("./todos/todo.routes");
function buildApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/health", (_req, res) => res.json({ status: "ok" }));
    app.use("/todos", todo_routes_1.todoRouter);
    return app;
}
