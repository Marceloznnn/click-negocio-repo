import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "❌ Nenhum arquivo enviado." });
    }

    // Faz o upload para o Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: process.env.CLOUDINARY_FOLDER,
    });

    // Remove o arquivo local temporário
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: "✅ Upload realizado com sucesso!",
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "❌ Falha no upload", details: error.message });
  }
};
