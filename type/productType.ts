import { insertProductSchema } from "@/lib/constants/validators";
import { Decimal } from "@/lib/generated/prisma/runtime/library";
import { z } from "zod";

export type ProductType = z.infer<typeof insertProductSchema> & {
  name: string;
  id: string;
  rating: number;
  createdAt: Date;
};
