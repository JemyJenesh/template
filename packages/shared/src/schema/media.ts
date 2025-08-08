import z from "zod";

export const mediaSchema = z.object({
  id: z.string(),

  url: z.string(),
  publicId: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const mediaCreateInputSchema = mediaSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Media = z.infer<typeof mediaSchema>;
export type MediaCreateInput = z.infer<typeof mediaCreateInputSchema>;
