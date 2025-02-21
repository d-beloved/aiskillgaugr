import express from "express";
import cors from "cors";
import routes from "./routes/quiz";

const app = express();

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "https://my-domain.vercel.dev" : "http://localhost:3000",
  }),
);

app.use(express.json());
app.use("/api", routes);

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
