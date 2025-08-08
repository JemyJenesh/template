import { prismaClient } from "@/lib";
import type {
  CategoryCreateInput,
  CategoryUpdateInput,
  Filter,
} from "@repo/shared/schemas";

const service = {
  create: async (data: CategoryCreateInput) => {
    return await prismaClient.category.create({
      data,
      include: {
        media: true,
      },
    });
  },

  delete: async (id: string) => {
    return await prismaClient.$transaction(async (tx) => {
      const beforeDelete = await tx.category.findUnique({
        where: { id },
        select: { id: true, mediaId: true },
      });

      const deleted = await tx.category.delete({
        where: { id },
      });

      return { ...deleted, mediaId: beforeDelete?.mediaId };
    });
  },

  getAll: async (filters: Filter) => {
    const { page, pageSize, sortOrder = "asc", sortBy = "name" } = filters;
    const skip = (page - 1) * pageSize;

    const where = {
      parentId: null,
    };

    const [categories, totalCount] = await Promise.all([
      prismaClient.category.findMany({
        skip,
        take: pageSize,
        orderBy: {
          [sortBy]: sortOrder,
        },
        where,
        include: {
          subCategories: {
            orderBy: {
              name: "asc",
            },
          },
          media: true,
        },
      }),
      prismaClient.category.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data: categories,
      meta: {
        page,
        pageSize,
        totalCount,
        totalPages,
      },
    };
  },

  getOne: async (id: string) => {
    return await prismaClient.category.findUnique({
      where: { id },
      include: { media: true },
    });
  },

  update: async (data: CategoryUpdateInput) => {
    return await prismaClient.category.update({
      where: { id: data.id },
      data,
      include: {
        media: true,
      },
    });
  },
};

export const categoryService = service;
