import { z } from "zod";
// import { Decimal } from "../generated/prisma/runtime/library";

export const insertProductSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  category: z.string().min(1, "La categoría es requerida"),
  images: z.array(z.string()).min(1, "Se requiere al menos una imagen"),
  brand: z.string().min(1, "La marca es requerida"),
  description: z.string().min(1, "La descripción es requerida"),
  stock: z.coerce.number(),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: z.number()
});
