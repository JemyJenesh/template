import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": // Unique constraint violation
        res.status(409).json({ error: "Duplicate entry", details: err.meta });
      case "P2025": // Record not found
        res.status(404).json({ error: "Record not found", details: err.meta });
      default:
        res.status(400).json({ error: "Bad Request", details: err.message });
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    // Handle Prisma validation errors (e.g., invalid input types)
    res.status(400).json({ error: "Validation Error", details: err.message });
  } else {
    // Handle other unexpected errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};
