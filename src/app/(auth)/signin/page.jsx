import AnimatedBackground from "@/components/auth/AnimatedBackground";
import SignInHero from "@/components/auth/SignInHero";
import SignInForm from "@/components/auth/SignInForm";
// import { getUserSession } from "@/lib/core/session";
// import { redirect } from "next/navigation";

const SignInPage = async () => {
  // const user = await getUserSession();

  // if (user) {
  //   redirect("/dashboard");
  // }

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-violet-50 via-white to-sky-50">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="container mx-auto">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Side */}
            <SignInHero />

            {/* Right Side */}
            <div className="flex justify-center">
              <SignInForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
