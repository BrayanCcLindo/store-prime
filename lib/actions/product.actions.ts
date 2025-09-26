"use server";

import { prisma } from "@/db/prisma";

// import { prisma } from "@/db/prisma";
// import { PrismaClient } from "../generated/prisma";

// get latest products

export async function latestProducts(number: number) {
  //   const prisma = new PrismaClient();

  const data = prisma.product.findMany({
    take: number,
    orderBy: {
      createdAt: "desc"
    }
  });
  return data;
}

//get single product by slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: {
      slug: slug
    }
  });
}
