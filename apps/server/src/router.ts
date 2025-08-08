import { Router } from "express";
import { categoryRouter } from "./features/category/category.routes";
import { authenticate } from "./middlewares/authenticate";

export const router: Router = Router();

router.use("/categories", authenticate, categoryRouter);
