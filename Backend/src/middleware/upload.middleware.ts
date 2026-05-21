import multer from "multer";
import { env } from "../config/env";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: env.MAX_UPLOAD_MB * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedImageTypes.has(file.mimetype)) {
      return callback(new Error("Only jpg, png, webp, and gif image uploads are allowed"));
    }
    callback(null, true);
  },
});
