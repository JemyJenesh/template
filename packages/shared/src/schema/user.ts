import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  emailVerified: z.boolean().default(false).optional(),
  name: z.string(),
  image: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof userSchema>;
export type UserCreateInput = Omit<
  User & { password: string },
  "id" | "createdAt" | "updatedAt"
>;
