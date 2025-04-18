import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path, { dirname } from "path";
import cors from "cors";
import router from "./routes/quiz.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "https://aiskillgaugr.vercel.app" : "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Server Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
