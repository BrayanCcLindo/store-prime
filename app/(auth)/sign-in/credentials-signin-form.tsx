"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredential } from "@/lib/actions/user.action";
import { Lock, Mail } from "lucide-react";
import React, { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";

const signInDefaultValues = {
  email: "",
  password: ""
};

export default function CredentialsSignInForm() {
  const [data, action] = useActionState(signInWithCredential, {
    success: false,
    message: ""
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        type="submit"
      >
        {pending ? "pending " : "Sign In"}
      </Button>
    );
  };

  //   console.log(data, "data credentials");

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            defaultValue={signInDefaultValues.email}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Contraseña</Label>
          <button
            //   onClick={() => console.log("Forgot password")}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        {data && !data.success && (
          <div className="text-red-500">{data.message}</div>
        )}
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="password"
            type={"password"}
            placeholder="••••••••"
            name="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10"
          />
          <button
            type="button"
            // onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
          >
            {/* {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} */}
          </button>
        </div>
      </div>
      <SignInButton />
    </form>
  );
}
