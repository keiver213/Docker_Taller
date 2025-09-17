import dotenv from "dotenv";
dotenv.config();

import { buildApp } from "./app";

const PORT = Number(process.env.PORT || 3000);
const app = buildApp();

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
