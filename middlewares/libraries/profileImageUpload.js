import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import CustomError from "../../helpers/errors/CustomError.js";

// Storage , FileFilter

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const __fileName = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__fileName);
    const rootDir = path.resolve(__dirname, "../../");
    cb(null, path.join(rootDir, "/public/uploads"));
  },

  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    const profileName = "image_" + req.user.id + "." + extension;
    req.savedProfileImage = profileName;
    cb(null, profileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/webp",
  ];

  if (!allowedMimeTypes.includes(file.mimetype))
    return cb(new CustomError("Please Provide a valid image file", 400), false);

  return cb(null, true);
};

const profileImageUpload = multer({
  storage,
  fileFilter,
});

export default profileImageUpload;
