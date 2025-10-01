import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Rotas públicas
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout); // 👈 agora tem logout

// Rotas protegidas
router.get("/admin", authenticate, authorizeRoles("ADMIN"), (req, res) => {
  res.json({ message: "✅ Welcome Admin" });
});

router.get("/merchant", authenticate, authorizeRoles("MERCHANT"), (req, res) => {
  res.json({ message: "✅ Welcome Merchant" });
});

router.get("/user", authenticate, authorizeRoles("USER"), (req, res) => {
  res.json({ message: "✅ Welcome User" });
});

export default router;
