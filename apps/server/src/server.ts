import { auth } from "@/lib/auth";
import { errorHandler } from "@/middlewares";
import { router } from "@/router";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Express } from "express";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createServer = (): Express => {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.all("/api/auth/{*any}", toNodeHandler(auth));

  app.use(express.json());
  app.use(express.static(path.join(__dirname, "static")));

  app.get("/", (_, res) => {
    return res.send("Template server with express with typescript!");
  });

  app.get("/api/status", (_, res) => {
    return res.json({
      ok: true,
    });
  });

  app.use("/api", router);
  app.use(errorHandler);

  return app;
};
