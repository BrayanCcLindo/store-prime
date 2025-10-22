"use server";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { CardItem } from "@/type/productType";
import { cookies } from "next/headers";
import { convertToPlainObject, round2 } from "../utils";
import { cartItemSchema, insertCartSchema } from "../constants/validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

const calcPrice = (items: CardItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2)
  };
};

export async function addItemToCart(data: CardItem) {
  try {
    const sessionIdCart = (await cookies()).get("sessionIdCart")?.value;
    if (!sessionIdCart) {
      throw new Error("Cart session not found");
    }

    const session = await auth();
    const userId = session?.user?.id ? session.user.id : undefined;

    const cart = await getMyCart();
    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findFirst({
      where: { id: item.productId }
    });

    if (!product) throw new Error("Product not found");

    if (!cart) {
      // Create new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionIdCart: sessionIdCart,
        ...calcPrice([item])
      });

      await prisma.cart.create({
        data: newCart
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} added to cart`
      };
    } else {
      const existItem = (cart.items as CardItem[]).find(
        x => x.productId === item.productId
      );
      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }

        (cart.items as CardItem[]).find(
          x => x.productId === item.productId
        )!.qty = existItem.qty + 1;
      } else {
        if (product.stock < 1) throw new Error("Not enough stock");

        // Add item to the cart.items
        cart.items.push(item);
      }
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CardItem[])
        }
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${existItem ? "updated in" : "added to"} cart`
      };
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "error"
    };
  }
}

export async function getMyCart() {
  const sessionIdCart = (await cookies()).get("sessionIdCart")?.value;
  if (!sessionIdCart) throw new Error("Cart session not found");

  const session = await auth();
  const userId = session?.user?.id ? session.user.id : undefined;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionIdCart: sessionIdCart }
  });

  if (!cart) {
    return undefined;
  }

  return convertToPlainObject({
    ...cart,
    items: cart.items,
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString()
  });
}
