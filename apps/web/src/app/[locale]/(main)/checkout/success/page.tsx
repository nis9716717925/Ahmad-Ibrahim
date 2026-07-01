import { Suspense } from 'react';
import CheckoutSuccessContent from './CheckoutSuccessContent';

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="container-page py-20 text-center text-slate-500">Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
