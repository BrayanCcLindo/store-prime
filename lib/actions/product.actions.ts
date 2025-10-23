"use server";

import { prisma } from "@/db/prisma";

export async function latestProducts(number: number) {
  const products = prisma.product.findMany({
    take: number,
    orderBy: {
      createdAt: "desc"
    }
  });
  return (await products).map(product => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString()
  }));
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
