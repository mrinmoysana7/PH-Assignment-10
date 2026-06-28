"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

import { Eye, EyeSlash, Envelope, Lock, ArrowRight } from "@gravity-ui/icons";

import {
  Button,
  Checkbox,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  Separator,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";
  const { register, handleSubmit } = useForm();

  const inputClass = `
    h-14
    rounded-2xl
    bg-white
    px-4
    shadow-lg
    transition-all
    duration-300
  `;

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const { email, password } = formData;

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL: redirectTo,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome back to PromptVerse! 🚀");

      setTimeout(() => {
        router.push(redirectTo);
        router.refresh();
      }, 1200);
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch (error) {
      console.error(error);

      toast.error("Google Sign In failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
    w-full
    max-w-md
    rounded-4xl
    border
    border-white/70
    bg-white/80
    p-8
    backdrop-blur-2xl
    shadow-[0_25px_80px_rgba(139,92,246,0.15)]
  "
    >
      <Toaster />

      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-6"
      >
        {/* Email */}

        <TextField
          isRequired
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address.";
            }

            return null;
          }}
        >
          <Label className="mb-2 font-semibold text-default-700">
            Email Address
          </Label>

          <InputGroup className="relative">
            <div className="absolute left-4 top-9.5 z-10 -translate-y-1/2">
              <Envelope width={18} className="text-violet-600" />
            </div>

            <Input
              {...register("email")}
              placeholder="Enter your Email"
              className={inputClass + " pl-12 w-full mt-2"}
            />
          </InputGroup>

          <FieldError />
        </TextField>

        {/* Password */}

        <TextField isRequired>
          <Label className="mb-2 font-semibold text-default-700">
            Password
          </Label>

          <InputGroup className="relative">
            <div className="absolute left-4 top-9 z-10 -translate-y-1/2">
              <Lock width={18} className="text-sky-600" />
            </div>

            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={inputClass + " pl-12 pr-14 w-full mt-2"}
            />

            <Button
              type="button"
              variant="light"
              isIconOnly
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9.5 z-10 -translate-y-1/2 rounded-full"
            >
              {showPassword ? <Eye width={18} /> : <EyeSlash width={18} />}
            </Button>
          </InputGroup>

          <FieldError />
        </TextField>

        {/* Remember Me + Forgot Password */}

        <div className="flex items-center justify-between">
          {/* Remember Me */}

          <Checkbox
            isSelected={rememberMe}
            onValueChange={setRememberMe}
            classNames={{
              base: "gap-3",
              label: "text-sm text-default-600 font-medium",
            }}
          >
            Remember me
          </Checkbox>

          {/* Forgot Password */}

          <Link
            href="/auth/forgot-password"
            className="
      text-sm
      font-semibold
      text-violet-600
      transition-colors
      duration-300
      hover:text-violet-700
      hover:underline
    "
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}

        <Button
          type="submit"
          isLoading={loading}
          className="
    group
    h-12
    w-full
    rounded-2xl
    bg-linear-to-r
    from-violet-600
    via-purple-600
    to-blue-600
    text-base
    font-semibold
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:shadow-[0_20px_40px_rgba(139,92,246,0.35)]
"
        >
          {!loading && (
            <div className="flex justify-center gap-2 items-center">
              <div>Sign In</div>
              <ArrowRight
                width={18}
                className="mt-1 transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          )}
        </Button>

        {/* Divider */}

        <div className="flex items-center gap-4 py-2">
          <Separator className="flex-1" />

          <span className="text-sm text-default-500 whitespace-nowrap">
            Or continue with
          </span>

          <Separator className="flex-1" />
        </div>

        {/* Google Button */}

        <Button
          type="button"
          variant="bordered"
          isLoading={googleLoading}
          onPress={handleGoogleSignIn}
          className="
    h-14
    w-full
    rounded-2xl
    border-default-200
    bg-white
    font-semibold
    text-default-700
    shadow-sm
    transition-all
    duration-300
    hover:border-violet-300
    hover:bg-violet-50
    hover:shadow-lg
"
        >
          {!googleLoading && (
            <div className="flex justify-center items-center gap-2">
              
              <FcGoogle size="2em"/>
              <h2>Continue with Google</h2>
            </div>
          )}
        </Button>

        {/* Footer */}

        <div className="pt-4 text-center">
          <p className="text-sm text-default-600">
            Dont have an account?{" "}
            <Link
              href={`/signup?redirect=${redirectTo}`}
              className="
        font-semibold
        text-violet-600
        transition-colors
        hover:text-violet-700
        hover:underline
      "
            >
              Create Account
            </Link>
          </p>
        </div>
      </Form>
    </motion.div>
  );
}
