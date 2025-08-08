import { mediaSchema, type Media } from "@/schema/media";
import z from "zod";
import { paginationSchema } from "./common";

type TCategory = {
  id: string;

  name: string;
  description?: string;
  parentId?: string;
  parent?: TCategory;
  subCategories: TCategory[];
  mediaId?: string;
  media?: Media;

  createdAt: Date;
  updatedAt: Date;
};

export const categoryBaseSchema = z.object({
  id: z.string(),

  name: z.string().min(1, "Name is required."),
  description: z.string().optional(),
  parentId: z.string().optional(),
  mediaId: z.string().optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const categorySchema: z.ZodType<TCategory> = z.lazy(() =>
  categoryBaseSchema.extend({
    media: mediaSchema.optional(),
    parent: categorySchema.optional(),
    subCategories: z.array(categorySchema),
  })
);

export const categoryCreateInputSchema = categoryBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const categoryUpdateInputSchema = categoryBaseSchema
  .partial()
  .required({ id: true });

export const categoryGetAllResponseSchema = z.object({
  data: categorySchema.array(),
  meta: paginationSchema,
});

export type Category = z.infer<typeof categorySchema>;
export type CategoryCreateInput = z.infer<typeof categoryCreateInputSchema>;
export type CategoryUpdateInput = z.infer<typeof categoryUpdateInputSchema>;
export type CategoryGetAllResponse = z.infer<
  typeof categoryGetAllResponseSchema
>;
