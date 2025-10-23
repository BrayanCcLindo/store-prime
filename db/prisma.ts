import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient, Prisma } from "@prisma/client";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export const prisma = new PrismaClient().$extends({
  result: {
    product: {
      price: {
        compute(product: { price: Prisma.Decimal }) {
          return product.price.toString();
        }
      },
      rating: {
        compute(product: { rating: Prisma.Decimal }) {
          return product.rating.toString();
        }
      }
    },
    cart: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart: { itemsPrice: Prisma.Decimal }) {
          return cart.itemsPrice.toString();
        }
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart: { shippingPrice: Prisma.Decimal }) {
          return cart.shippingPrice.toString();
        }
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart: { taxPrice: Prisma.Decimal }) {
          return cart.taxPrice.toString();
        }
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart: { totalPrice: Prisma.Decimal }) {
          return cart.totalPrice.toString();
        }
      }
    }
  }
});
