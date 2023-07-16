import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import { AppError } from "./AppError.js";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const mimetypes = ["image/png", "image/png", "image/jpg", "image/jpeg", "gif"];

const storage = multer.diskStorage({
  destination: join(CURRENT_DIR, "../uploads"),
  filename: (req, file, cb) => {
    const fileExtension = extname(file.originalname);
    return cb(null, `${file.fieldname}_${Date.now()}${fileExtension}`);
  },
});

const fileUpload = multer({
  storage,
  limits: { fileSize: 35 * 1024 * 1024 }, // 35MB
  fileFilter: (req, file, cb) => {
    if (mimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new AppError(`Only ${mimetypes.join(" ")} mimetypes are allowed.`),
      );
    }
  },
  onError: (err, next) => {
    next(err);
  },
}).single("photo");

export default fileUpload;
