import HeroSection from "@/components/Homepage/Banner/HeroSection";
import FeaturedPrompts from "@/components/Homepage/FeaturedPrompts/FeaturedPrompts";
import { getFeaturedPrompts } from "@/lib/api/prompts";

export default async function Home() {
  const featuredPrompts = await getFeaturedPrompts();
  return (
    <div className=" min-h-screen">
      <HeroSection></HeroSection>
      <FeaturedPrompts prompts={featuredPrompts}></FeaturedPrompts>
    </div>
  );
}
