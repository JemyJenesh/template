import cors from "cors";
import express, { type Express } from "express";

export const createServer = (): Express => {
  const app = express();

  app.use(cors());
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
