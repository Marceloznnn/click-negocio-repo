import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get("/", (req, res) => {
  res.send("🚀 API do Rangogo rodando!");
});

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes); // <<--- nova rota

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
