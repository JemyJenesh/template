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

  delete: async (mediaId: string) => {
    const media = await prismaClient.media.findUnique({
      where: { id: mediaId },
    });
    if (!media) return;

    await cloudinaryMediaProvider.delete(media.publicId);
    await prismaClient.media.delete({ where: { id: mediaId } });
  },

  update: async (oldMediaId: string, newFilePath: string, folder: string) => {
    await service.delete(oldMediaId);
    return service.create(newFilePath, folder);
  },
};

export const mediaService = service;
