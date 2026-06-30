import { PageHeader } from '@/components/layout/PageHeader';
import { ChatWidget } from '@/components/ai/ChatWidget';

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        dark
        eyebrow="AI Assistant"
        title="Your compliance co-pilot"
        description="Get help with audits, training, certificates, live sessions, and corrective actions."
      />
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <ChatWidget />
        </div>
      </div>
    </>
  );
}
