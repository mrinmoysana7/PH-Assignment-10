import HeroSection from "@/components/Homepage/Banner/HeroSection";
import FeaturedPrompts from "@/components/Homepage/FeaturedPrompts/FeaturedPrompts";
import Testimonials from "@/components/Homepage/Testimonials/Testimonials";
import TopCreators from "@/components/Homepage/TopCreators/TopCreators";
import WhyChoose from "@/components/Homepage/WhyChoose/WhyChoose";

import { getFeaturedPrompts } from "@/lib/api/prompts";
import { getHomepageReviews } from "@/lib/api/reviews";

export default async function Home() {
  const featuredPrompts = await getFeaturedPrompts();
  const homepageReviews = await getHomepageReviews();
  return (
    <div className=" min-h-screen">
      <HeroSection></HeroSection>
      <FeaturedPrompts prompts={featuredPrompts}></FeaturedPrompts>
      <WhyChoose></WhyChoose>
      <TopCreators></TopCreators>
      <Testimonials reviews={homepageReviews}></Testimonials>
    </div>
  );
}
