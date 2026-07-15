"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

import {
  Eye,
  EyeSlash,
  Person,
  Envelope,
  Link as LinkIcon,
  Lock,
  ArrowRight,
} from "@gravity-ui/icons";

import {
  Button,
  Form,
  FieldError,
  Input,
  InputGroup,
  Label,
  Separator,
  TextField,
} from "@heroui/react";

import RoleSelector from "./RoleSelector";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const { name, email, password, photoUrl } = formData;

      const { data: authData, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoUrl,
        role,
      });

      if (authData) {
        toast.success("🎉 Welcome to PromptVerse!");
      }
      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      setTimeout(() => {
        router.push(redirectTo);
        window.location.reload;
      }, 1000);
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
      toast.error("Google Sign-In failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div>
      <Toaster />

      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-6"
      >
        {/* Name */}
        <TextField isRequired>
          <Label className="mb-2 font-semibold text-default-700">
            Full Name
          </Label>

          <InputGroup className="relative">
            <div className="absolute left-4 top-8 z-10 -translate-y-1/2">
              <Person width={18} className="text-violet-500" />
            </div>

            <Input
              {...register("name")}
              placeholder="Enter Your Name"
              className="h-12 rounded-2xl w-full mt-2 bg-white pl-12 shadow-md"
            />
          </InputGroup>

          <FieldError />
        </TextField>

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
            <div className="absolute left-4 top-8 z-10 -translate-y-1/2">
              <Envelope width={18} className="text-sky-500" />
            </div>

            <Input
              {...register("email")}
              placeholder="Enter Your Email"
              className="h-12 rounded-2xl w-full mt-2 bg-white pl-12 shadow-md"
            />
          </InputGroup>

          <FieldError />
        </TextField>

        {/* Photo URL */}
        <TextField>
          <Label className="mb-2 font-semibold text-default-700">
            Profile Photo URL
          </Label>

          <InputGroup className="relative">
            <div className="absolute left-4 top-8 z-10 -translate-y-1/2">
              <LinkIcon width={18} className="text-emerald-500" />
            </div>

            <Input
              {...register("photoUrl")}
              placeholder="Enter Your Photo URL"
              className="h-12 rounded-2xl w-full mt-2 bg-white pl-12 shadow-md"
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
            <div className="absolute left-4 top-8 z-10 -translate-y-1/2">
              <Lock width={18} className="text-orange-500" />
            </div>

            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className="h-12 rounded-2xl w-full mt-2 bg-white pl-12 shadow-md"
            />

            <Button
              isIconOnly
              variant="light"
              type="button"
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-8.5 z-10 -translate-y-1/2"
            >
              {showPassword ? <Eye width={18} /> : <EyeSlash width={18} />}
            </Button>
          </InputGroup>

          <FieldError />
        </TextField>

        {/* Role Selector */}
        <RoleSelector role={role} setRole={setRole} />

        {/* Terms */}
        <div className="flex items-start gap-3 rounded-2xl bg-violet-50 p-4">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 accent-violet-600"
          />

          <p className="text-sm leading-6 text-default-600">
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-semibold text-violet-600 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-semibold text-violet-600 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Create Account Button */}

        <Button
          type="submit"
          isLoading={loading}
          className="
    h-14
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
    hover:scale-[1.02]
    hover:shadow-xl
  "
        >
          {!loading && (
            <div className="flex items-center gap-3 justify-center">
              <div>Create Account</div>
              <div>
                <ArrowRight width={18} className="" />
              </div>
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
          onPress={handleGoogleSignIn}
          isLoading={googleLoading}
          className="
    h-14
    w-full
    rounded-2xl
    shadow-md
    bg-white
    text-default-700
    font-semibold
    transition-all
    duration-300
    hover:bg-default-50
    hover:shadow-lg
    hover:scale-103
  "
        >
          {!googleLoading && (
            <div className="flex items-center justify-center gap-4">
              <div>
                <Image
                  width={200}
                  height={200}
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
              </div>
              <div>Continue with Google</div>
            </div>
          )}
        </Button>

        {/* Footer */}

        <div className="pt-2 text-center text-sm text-default-600">
          Already have an account?{" "}
          <Link
            href={`/signin?redirect=${redirectTo}`}
            className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </Form>
    </div>
  );
}
