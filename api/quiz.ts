import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../server/app.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    return new Promise((resolve, reject) => {
      app(req as any, res as any, (err: any) => {
        if (err) {
          console.error("API Error:", err);
          return reject(err);
        }
        return resolve(undefined);
      });
    });
  } catch (error) {
    console.error("Handler Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
