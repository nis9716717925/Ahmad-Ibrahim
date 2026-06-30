import { PageHeader } from '@/components/layout/PageHeader';
import { Services } from '@/components/home/Services';

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="End-to-end compliance solutions"
        description="Flexible audit and consulting services with configurable standards, checklists, scoring, and follow-up."
      />
      <Services />
    </>
  );
}
