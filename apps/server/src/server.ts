import { cloudinary, upload } from "@/lib";
import { auth } from "@/lib/auth";
import { errorHandler } from "@/middlewares";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Express } from "express";
import fs from "fs";

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

  app.post("/api/users", upload.single("image"), async (req, res) => {
    const filePath = req.file?.path;
    const folder = "users";

    if (!filePath) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
        use_filename: true,
        unique_filename: false,
      });

      // Remove temp file
      fs.unlinkSync(filePath);

      return res.json({
        message: "Upload successful",
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error) {
      console.error("Upload error:", error);

      return res.status(500).json({ error: "Cloudinary upload failed" });
    }
  });

  app.use(errorHandler);

  return app;
};
