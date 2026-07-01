import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { AboutSection } from '@/components/home/AboutSection';
import { Services } from '@/components/home/Services';
import { IndustriesSection } from '@/components/home/IndustriesSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { AISection } from '@/components/home/AISection';
import { AuditPlatformSection } from '@/components/home/AuditPlatformSection';
import { AcademySection } from '@/components/home/AcademySection';
import { ProcessTimeline } from '@/components/home/ProcessTimeline';
import { CertificationsSection } from '@/components/home/CertificationsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { ContactSection } from '@/components/home/ContactSection';
import { MembershipSection } from '@/components/home/MembershipSection';
import { CTA } from '@/components/home/CTA';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Stats />
      <AboutSection />
      <Services />
      <IndustriesSection />
      <WhyChooseUs />
      <AISection />
      <AuditPlatformSection />
      <AcademySection />
      <ProcessTimeline />
      <CertificationsSection />
      <TestimonialsSection />
      <NewsSection />
      <MembershipSection />
      <ContactSection />
      <CTA />
    </>
  );
}
