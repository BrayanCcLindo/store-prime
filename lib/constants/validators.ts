import { z } from "zod";

// const currency = z
//   .string()
//   .refine(
//     value => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
//     "Price must have exactly two decimal places"
//   );
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

//schema to validator sign in

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "password debe tener minimo 6 digitos")
});

// schema for validator sign up

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre es demasiado largo")
      .trim(),
    email: z
      .string()
      .email("El formato del correo electrónico no es válido")
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(100, "La contraseña es demasiado larga"),
    confirmPassword: z
      .string()
      .min(1, "La confirmación de contraseña no puede estar vacía")
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
  });

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: z.number()
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: z.number(),
  totalPrice: z.number(),
  shippingPrice: z.number(),
  taxPrice: z.number(),
  sessionIdCart: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable()
});
