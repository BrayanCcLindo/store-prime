import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "@prisma/client";
import ws from "ws";
import { Decimal } from "@prisma/client/runtime/library";

neonConfig.webSocketConstructor = ws;

export const prisma = new PrismaClient().$extends({
  result: {
    product: {
      price: {
        compute(product: { price: Decimal }) {
          return product.price.toString();
        }
      },
      rating: {
        compute(product: { rating: Decimal }) {
          return product.rating.toString();
        }
      }
    },
    cart: {
      itemsPrice: {
        compute(cart: { itemsPrice: Decimal }) {
          return cart.itemsPrice.toString();
        }
      },
      shippingPrice: {
        compute(cart: { shippingPrice: Decimal }) {
          return cart.shippingPrice.toString();
        }
      },
      taxPrice: {
        compute(cart: { taxPrice: Decimal }) {
          return cart.taxPrice.toString();
        }
      },
      totalPrice: {
        compute(cart: { totalPrice: Decimal }) {
          return cart.totalPrice.toString();
        }
      }
    }
  }
});
