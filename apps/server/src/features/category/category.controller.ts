import { mediaService } from "@/features/media/media.service";
import { type CategoryCreateInput, filterSchema } from "@repo/shared/schemas";
import type { Request, Response } from "express";
import { categoryService } from "./category.service";

const controller = {
  create: async (req: Request<unknown, CategoryCreateInput>, res: Response) => {
    const filePath = req.file?.path;
    const folder = "categories";

    try {
      const media = filePath
        ? await mediaService.create(filePath, folder)
        : undefined;

      const input: CategoryCreateInput = {
        ...req.body,
        ...(media && {
          mediaId: media.id,
        }),
      };

      const category = await categoryService.create(input);

      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: "Failed to create category" });
    }
  },

  delete: async (req: Request<{ id: string }>, res: Response) => {
    const deleted = await categoryService.delete(req.params.id);

    if (deleted.mediaId) {
      await mediaService.delete(deleted.mediaId);
    }

    res.json(deleted);
  },

  getAll: async (req: Request, res: Response) => {
    const categories = await categoryService.getAll(
      filterSchema.parse(req.query)
    );

    res.json(categories);
  },

  getOne: async (req: Request<{ id: string }>, res: Response) => {
    const category = await categoryService.getOne(req.params.id);

    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  },

  update: async (req: Request, res: Response) => {
    const filePath = req.file?.path;
    const folder = "categories";

    const updated = await categoryService.update(req.body);

    if (updated) {
      if (updated.mediaId && filePath) {
        await mediaService.update(updated.mediaId, filePath, folder);
      }

      res.json(updated);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  },
};

export const categoryController = controller;
