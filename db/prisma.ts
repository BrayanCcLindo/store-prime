// import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaClient } from "@prisma/client";

import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export const prisma = new PrismaClient().$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toNumber();
        }
      },
      rating: {
        compute(product) {
          return product.rating.toNumber();
        }
      }
    }
  }
});
