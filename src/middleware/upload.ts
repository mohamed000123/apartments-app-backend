import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const uploadDir = "uploads/";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req: Request, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
