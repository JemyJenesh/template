import { auth } from "@/lib/auth";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Express } from "express";

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

  app.get("/", (_, res) => {
    return res.send("Template server with express with typescript!");
  });

  app.get("/api/status", (_, res) => {
    return res.json({
      ok: true,
    });
  });

  return app;
};
