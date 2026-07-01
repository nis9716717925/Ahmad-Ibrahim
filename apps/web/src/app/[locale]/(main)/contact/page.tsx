import { PageHeader } from '@/components/layout/PageHeader';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your compliance needs"
        description="Request a consultation or demo of the platform. We'll get back to you within one business day."
      />
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">Get in touch</h2>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li>
                <p className="font-medium text-slate-900">Email</p>
                <a href="mailto:info@ahmadibrahim.com" className="text-brand-600 hover:underline">
                  info@ahmadibrahim.com
                </a>
              </li>
              <li>
                <p className="font-medium text-slate-900">Phone</p>
                <p>+971 4 000 0000</p>
              </li>
              <li>
                <p className="font-medium text-slate-900">Hours</p>
                <p>Mon – Fri, 9:00 – 18:00 GST</p>
              </li>
            </ul>
          </div>
          <form className="card space-y-5 lg:col-span-3">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field">First name</label>
                <input type="text" className="input-field" placeholder="John" />
              </div>
              <div>
                <label className="label-field">Last name</label>
                <input type="text" className="input-field" placeholder="Smith" />
              </div>
            </div>
            <div>
              <label className="label-field">Email</label>
              <input type="email" className="input-field" placeholder="you@company.com" />
            </div>
            <div>
              <label className="label-field">Company</label>
              <input type="text" className="input-field" placeholder="Your organization" />
            </div>
            <div>
              <label className="label-field">Message</label>
              <textarea rows={4} className="input-field resize-y min-h-[120px]" placeholder="Tell us about your needs..." />
            </div>
            <button type="submit" className="btn-primary w-full sm:w-auto">
              Send message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
