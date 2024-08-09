import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tmpDir = path.join(__dirname, "../public/tmp/");

if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const upload = multer({ storage: storage });

export default upload;
