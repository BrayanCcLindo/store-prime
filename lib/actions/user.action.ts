"use server";

import { signInFormSchema, signUpFormSchema } from "../constants/validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { ZodError } from "zod";

export async function signInWithCredential(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password")
    });

    await signIn("credentials", user);
    return {
      success: true,
      message: "sign in perfectly"
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "invalid credentials"
    };
  }
}

//sign put

export async function signOutUser() {
  await signOut();
}

export async function SignUpUser(prevState: unknown, formatData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formatData.get("name"),
      email: formatData.get("email"),
      password: formatData.get("password"),
      confirmPassword: formatData.get("confirmPassword")
    });
    console.log(user, "usser");

    const plainPassword = user.password;
    const hashedPassword = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword
      }
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword
    });

    return {
      message: ["User register successfully"],
      success: true
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof ZodError) {
      const fieldErrors: string[] = [];

      error.issues.forEach(err => {
        fieldErrors.push(err.message);
      });

      return {
        success: false,
        message: fieldErrors
      };
    }
  }
}
