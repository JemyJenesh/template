import { cloudinary } from "@/lib/cloudinary";
import type { IMediaProvider } from "@/types";
import fs from "fs";

class CloudinaryMediaProvider implements IMediaProvider {
  async upload(filePath: string, folder: string) {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      use_filename: true,
      unique_filename: false,
    });

    fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  async delete(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
  }
}

export const cloudinaryMediaProvider = new CloudinaryMediaProvider();
