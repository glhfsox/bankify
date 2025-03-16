import { Suspense, lazy } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import LoadingSpinner from "@/components/ui/loading-spinner";

// Lazy load less critical sections
const FeaturesSection = lazy(() => import("@/components/sections/FeaturesSection"));
const BenefitsSection = lazy(() => import("@/components/sections/BenefitsSection"));
const HowItWorksSection = lazy(() => import("@/components/sections/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const IntegrationsSection = lazy(() => import("@/components/sections/IntegrationsSection"));
const BlogPreviewSection = lazy(() => import("@/components/sections/BlogPreviewSection"));
const FaqSection = lazy(() => import("@/components/sections/FaqSection"));
const CtaSection = lazy(() => import("@/components/sections/CtaSection"));

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturesSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <BenefitsSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <HowItWorksSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <IntegrationsSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <BlogPreviewSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <FaqSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <CtaSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
