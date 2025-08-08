import z from "zod";
import { CONFIGS } from "../config/index";

export const filterSchema = z.object({
  page: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .optional()
    .default(1),
  pageSize: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .optional()
    .default(CONFIGS.DEFAULT_PAGE_SIZE),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const paginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
});

export type PaginatedData<T> = {
  data: T[];
  meta: Pagination;
};

export type Filter = z.infer<typeof filterSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
