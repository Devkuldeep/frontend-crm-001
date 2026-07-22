"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { loginSchema, LoginInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setApiError("");
    try {
      // Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (data.email === "error@example.com") {
        throw new Error("Invalid email or password.");
      }
      // Redirect to Dashboard on success
      router.push(ROUTES.dashboard.root);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-text-secondary">
          Enter your email to sign in to your account
        </p>
      </div>
      
      {apiError && (
        <div className="p-3 rounded-md bg-danger/10 border border-danger/20 text-danger text-sm font-medium">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input 
            id="email" 
            placeholder="name@example.com" 
            type="email" 
            autoCapitalize="none" 
            autoComplete="email" 
            autoCorrect="off" 
            disabled={isLoading}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-danger font-medium">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <Link href={ROUTES.auth.forgotPassword} className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              Forgot password?
            </Link>
          </div>
          <Input 
            id="password" 
            placeholder="••••••••" 
            type="password" 
            disabled={isLoading}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-danger font-medium">{errors.password.message}</p>
          )}
        </div>

        <Button className="w-full mt-2 rounded-lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface px-2 text-text-secondary">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="w-full bg-surface" disabled={isLoading}>
          {/* Google SVG */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        </Button>
        <Button variant="outline" className="w-full bg-surface" disabled={isLoading}>
          {/* Apple SVG */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.25.82 3.03.85 1.18.06 2.53-.87 4.02-.75 1.76.12 3.19.85 4.09 2.16-3.41 1.94-2.86 6.33.6 7.64-1.07 2.4-2.25 4.31-3.74 5.07zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.4 2.22-1.74 4.31-3.74 4.25z" />
          </svg>
        </Button>
        <Button variant="outline" className="w-full bg-surface" disabled={isLoading}>
          {/* Meta/Facebook SVG */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="#1877F2"/>
          </svg>
        </Button>
      </div>

      <p className="text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href={ROUTES.auth.register} className="font-medium text-primary hover:text-primary-dark transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}
