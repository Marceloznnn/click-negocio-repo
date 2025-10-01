import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { generateTokens } from "../Utils/generateTokens.js";

const prisma = new PrismaClient();

export async function register(req, res) {
  try {
    const { fullName, email, password, role } = req.body;

    // Validar role
    const allowedRoles = ["USER", "MERCHANT", "ADMIN"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: "❌ Role inválido" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { fullName, email, password: hashed, role },
    });

    res.status(201).json({
      message: "✅ User registered",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(400).json({ error: "❌ Registration failed", details: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ error: "❌ Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "❌ Invalid credentials" });

    const tokens = generateTokens(user);

    res.json({
      message: "✅ Login successful",
      user: { id: user.id, email: user.email, role: user.role },
      ...tokens,
    });
  } catch (err) {
    res.status(500).json({ error: "❌ Login failed", details: err.message });
  }
}

export async function logout(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "❌ Refresh token required" });
    }

    // Invalida o refresh token no banco
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });

    res.json({ message: "✅ Logout successful" });
  } catch (err) {
    res.status(500).json({ error: "❌ Logout failed", details: err.message });
  }
}
