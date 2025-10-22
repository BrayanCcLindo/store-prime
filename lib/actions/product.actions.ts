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
  const product = await prisma.product.findFirst({
    where: {
      slug: slug
    }
  });
  if (!product) return null;

  return {
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString()
  };
}
