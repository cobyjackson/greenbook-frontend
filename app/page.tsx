import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import FeaturedCourses from "@/components/landing/FeaturedCourses";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-surface-primary text-text-primary">
      <Hero />
      <Features />
      <FeaturedCourses />
      <Footer />
    </main>
  );
}
