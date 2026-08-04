import HeroSection from '@/sections/HeroSection'
import StatsSection from '@/sections/StatsSection'
import HowItWorksSection from '@/sections/HowItWorksSection'
import BenefitsSection from '@/sections/BenefitsSection'
import PropertiesSection from '@/sections/PropertiesSection'
import DifferentialsSection from '@/sections/DifferentialsSection'
import TestimonialsSection from '@/sections/TestimonialsSection'
import FAQSection from '@/sections/FAQSection'
import CTAFinalSection from '@/sections/CTAFinalSection'
import type { PlatformContent, PlatformSettings } from '@lar/shared'

interface HomePageProps {
  content?: PlatformContent | null;
  settings?: PlatformSettings | null;
}

/**
 * Home page — assembles all landing page sections in order
 */
export default function HomePage({ content, settings }: HomePageProps) {
  // Try to find sections
  const heroSection = content?.homepageSections.find(s => s.id === 'hero');
  const propertiesSection = content?.homepageSections.find(s => s.id === 'featured');

  return (
    <>
      {(!heroSection || heroSection.active) && <HeroSection title={heroSection?.title} subtitle={heroSection?.subtitle} />}
      <StatsSection />
      <HowItWorksSection />
      <BenefitsSection />
      {(!propertiesSection || propertiesSection.active) && <PropertiesSection title={propertiesSection?.title} />}
      <DifferentialsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTAFinalSection />
    </>
  )
}
