import SignupHero from "./SignupHero";
import SignupForm from "./SignupForm";
import { Suspense } from "react";

const SignUpPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="relative py-15 overflow-hidden bg-linear-to-br from-violet-50 via-white to-sky-50">
        {/* Background Glow */}

        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-sky-300/20 blur-[120px]" />

        <div className="container relative mx-auto grid min-h-screen items-start gap-16 px-6 py-7 md:py-15 lg:grid-cols-2">
          {/* Left Side */}

          <SignupHero />

          {/* Right Side */}

          <div className="flex justify-center">
            <div className="w-full max-w-lg rounded-4xl bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-black">
                  Create Your Account
                </h2>

                <p className="mt-3 text-default-500">
                  Join PromptVerse and unlock the future of AI prompts.
                </p>
              </div>

              <SignupForm />
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
};

export default SignUpPage;

// import { Suspense } from "react";
// import SignupForm from "@/components/auth/SignupForm";

// export default function SignupPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <SignupForm />
//     </Suspense>
//   );
// }
