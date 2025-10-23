import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema
} from "@/lib/constants/validators";
import { z } from "zod";

export type ProductType = z.infer<typeof insertProductSchema> & {
  name: string;
  id: string;
  rating: string;
  createdAt: Date;
};

export type CardType = z.infer<typeof insertCartSchema>;
export type CardItem = z.infer<typeof cartItemSchema>;
