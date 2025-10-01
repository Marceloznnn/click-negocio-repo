import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota protegida - só usuários autenticados podem enviar imagens
router.post("/", authenticate, upload.single("image"), uploadImage);

export default router;
