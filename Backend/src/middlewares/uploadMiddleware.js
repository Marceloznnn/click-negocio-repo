import multer from "multer";
import path from "path";

// Configura o Multer para salvar arquivos temporariamente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp/"); // pasta temporária
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Formato inválido. Apenas JPG e PNG são permitidos."));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
