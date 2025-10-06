"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignUpUser } from "@/lib/actions/user.action";
import { Label } from "@radix-ui/react-label";
import { Eye, Lock, Mail, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export default function CredentialsSignUpForm() {
  const [data, action] = useActionState(SignUpUser, {
    success: false,
    message: ""
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return <Button>{pending ? "Submiting " : "Sign Up"}</Button>;
  };

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Label htmlFor="name">Nombre completo</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Juan Pérez"
            defaultValue={signUpDefaultValues.name}
            //   value={formData.name}
            //   onChange={handleChange}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={signUpDefaultValues.email}
            placeholder="tu@email.com"
            //   value={formData.email}
            //   onChange={handleChange}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            defaultValue={signUpDefaultValues.password}
            //   value={formData.password}
            //   onChange={handleChange}
            className="pl-10"
          />
          <button
            type="button"
            //   onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={"password"}
            placeholder="••••••••"
            defaultValue={signUpDefaultValues.confirmPassword}
            //   value={formData.confirmPassword}
            //   onChange={handleChange}
            className={`pl-10 pr-10`}
          />
          <button
            type="button"
            //   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {<Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <SignUpButton />
      {data && !data.success && (
        <div className="text-red-500">{data.message}</div>
      )}
    </form>
  );
}
