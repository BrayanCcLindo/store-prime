"use server";

import { signInFormSchema } from "../constants/validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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
