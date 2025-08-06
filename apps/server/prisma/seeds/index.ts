import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./user";

const prisma = new PrismaClient();

const main = async () => {
  await seedUsers();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
