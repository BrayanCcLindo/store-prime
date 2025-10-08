import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import React from "react";
import CredentialsSignUpForm from "./credentials-sign-up-form";

export default async function SignUpPage({
  searchParams
}: {
  searchParams: { callbackUrl: string };
}) {
  const session = await auth();

  const { callbackUrl } = searchParams;

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Crear cuenta
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tus datos para registrarte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CredentialsSignUpForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <button className="text-blue-600 hover:underline font-medium">
              Inicia sesión
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
