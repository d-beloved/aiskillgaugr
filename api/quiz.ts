import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../server";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Forward the request to the Express app
  return new Promise((resolve, reject) => {
    app(req as any, res as any, (err: any) => {
      if (err) {
        return reject(err);
      }
      return resolve(undefined);
    });
  });
}
