"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const PORT = Number(process.env.PORT || 3000);
const app = (0, app_1.buildApp)();
app.listen(PORT, () => {
    console.log(`API escuchando en http://localhost:${PORT}`);
});
