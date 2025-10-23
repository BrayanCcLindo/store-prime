import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export const prisma = new PrismaClient().$extends({
  result: {
    product: {
      price: {
        needs: { price: true }, // ← ESTO FALTABA
        compute(product) {
          return product.price.toString();
        }
      },
      rating: {
        needs: { rating: true }, // ← ESTO FALTABA
        compute(product) {
          return product.rating.toString();
        }
      }
    },
    cart: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart) {
          return cart.itemsPrice.toString();
        }
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart) {
          return cart.shippingPrice.toString();
        }
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart) {
          return cart.taxPrice.toString();
        }
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart) {
          return cart.totalPrice.toString();
        }
      }
    }
  }
});
