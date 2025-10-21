"use server";

import { prisma } from "@/db/prisma";

export async function latestProducts(number: number) {
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
