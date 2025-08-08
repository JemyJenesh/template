import { upload } from "@/lib";
import { validateRequestPayload } from "@/middlewares";
import {
  categoryCreateInputSchema,
  categoryUpdateInputSchema,
  filterSchema,
} from "@repo/shared/schemas";
import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router.post(
  "/",
  validateRequestPayload({ body: categoryCreateInputSchema }),
  upload.single("image"),
  categoryController.create
);

router.get(
  "/",
  validateRequestPayload({ query: filterSchema }),
  categoryController.getAll
);

router.get("/:id", categoryController.getOne);

router.put(
  "/",
  validateRequestPayload({ body: categoryUpdateInputSchema }),
  categoryController.update
);

router.delete("/:id", categoryController.delete);

export const categoryRouter: Router = router;
