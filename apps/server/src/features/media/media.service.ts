import { cloudinaryMediaProvider, prismaClient } from "@/lib";

const service = {
  create: async (filePath: string, folder: string) => {
    const uploaded = await cloudinaryMediaProvider.upload(filePath, folder);

    const media = await prismaClient.media.create({
      data: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
    });

    return media;
  },

  delete: async (id: string) => {
    const media = await prismaClient.media.findUnique({
      where: { id },
    });

    if (!media) return;

    await cloudinaryMediaProvider.delete(media.publicId);
    await prismaClient.media.delete({ where: { id } });
  },

  update: async (id: string, newFilePath: string, folder: string) => {
    const media = await prismaClient.media.findUnique({
      where: { id },
    });

    if (media) {
      await cloudinaryMediaProvider.delete(media?.publicId);
      const uploaded = await cloudinaryMediaProvider.upload(
        newFilePath,
        folder
      );

      return prismaClient.media.update({
        where: { id },
        data: {
          ...media,
          publicId: uploaded.publicId,
          url: uploaded.url,
        },
      });
    }
  },
};

export const mediaService = service;
