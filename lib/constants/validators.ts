import { z } from "zod";

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
    name: z.string().min(3, "El nombre debe tener 3 digitos"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "password debe tener minimo 6 digitos"),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Password doesnt match",
    path: ["confirmPassword"]
  });
