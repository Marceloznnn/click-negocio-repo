import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const fullName = "Marcelo MERCHANT";     // nome do usuário
  const email = "MERCHANT@example.com";    // email do usuário
  const password = "123456";            // senha do usuário
  const role = "MERCHANT";                 // role: ADMIN | MERCHANT | USER

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      role,
    },
  });

  console.log("✅ Usuário criado:", user);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
