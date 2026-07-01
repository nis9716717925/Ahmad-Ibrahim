import { Suspense } from 'react';
import CheckoutContent from './CheckoutContent';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container-page py-20 text-center text-slate-500">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
