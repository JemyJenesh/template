export type IMediaProvider = {
  upload(
    filePath: string,
    folder: string
  ): Promise<{
    url: string;
    publicId: string;
  }>;

  delete(publicId: string): Promise<void>;
};
