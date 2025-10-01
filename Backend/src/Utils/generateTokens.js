import jwt from "jsonwebtoken";

export function generateTokens(user) {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
}
