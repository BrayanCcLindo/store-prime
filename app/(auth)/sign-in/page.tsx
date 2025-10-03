import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import React from "react";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Bienvenido
          </h1>
          <p className="text-slate-600">Inicia sesión en tu cuenta</p>
        </div>

        <Card className="shadow-xl border-slate-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tu email y contraseña para continuar
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <CredentialsSignInForm />
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-500 mt-6">
          Al continuar, aceptas nuestros{" "}
        </p>
      </div>
    </div>
  );
}
