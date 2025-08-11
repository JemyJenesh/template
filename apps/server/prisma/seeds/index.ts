import { prismaClient } from "@/lib";
import { seedCategories } from "./category";
import { seedUsers } from "./user";

const main = async () => {
  await seedUsers();
  await seedCategories();
};

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
