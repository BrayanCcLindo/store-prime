import { PrismaClient } from "@/lib/generated/prisma";
import sampleData from "./sample-data";
async function Main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  console.log("database succefull seeded");
}

Main();
