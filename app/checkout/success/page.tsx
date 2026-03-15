import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="text-4xl font-bold">Order placed 🎉</h1>
      <p className="mt-4 text-muted">Thanks for your purchase. Your order was synced to Supabase inventory.</p>
      <Link href="/" className="mt-8 inline-block rounded-full border border-accent px-5 py-2 text-accent">Back to catalog</Link>
    </main>
  );
}
