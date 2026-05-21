import type { UploadApiResponse } from "cloudinary";
import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary";
import { db } from "../lib/db";
import { AppError } from "../utils/errors";

function uploadBuffer(file: Express.Multer.File, folder: string) {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"));
        resolve(result);
      },
    );
    stream.end(file.buffer);
  });
}

export const mediaService = {
  async upload(userId: string, file: Express.Multer.File | undefined, kind: "AVATAR" | "BANNER" | "POST") {
    if (!file) throw new AppError(400, "Image file is required", "FILE_REQUIRED");
    if (!isCloudinaryConfigured) {
      throw new AppError(503, "Cloudinary is not configured", "UPLOAD_PROVIDER_NOT_CONFIGURED");
    }

    const uploaded = await uploadBuffer(file, `labmentix/${kind.toLowerCase()}`);
    return db.mediaAsset.create({
      data: {
        provider: "cloudinary",
        publicId: uploaded.public_id,
        url: uploaded.secure_url,
        mimeType: file.mimetype,
        size: file.size,
        kind,
        uploaderId: userId,
      },
    });
  },
};
