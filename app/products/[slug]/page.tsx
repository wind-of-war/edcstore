import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/catalog';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl gap-8 px-6 py-10 md:grid-cols-2">
      <div className="space-y-4">
        <p className="text-xs text-muted">
          <Link href="/" className="hover:text-accent">Catalog</Link> / <span className="text-white">{product.name}</span>
        </p>
        <div className="relative h-[560px] overflow-hidden rounded-2xl border border-white/10 shadow-gear">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-accent">{product.brand}</p>
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-muted">{product.description}</p>

        <div className="panel p-4">
          <h2 className="mb-3 text-lg font-semibold">Technical Specs</h2>
          <dl className="space-y-2 text-sm">
            {Object.entries(product.specs).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-white/5 pb-2">
                <dt className="text-muted">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="panel space-y-3 p-4">
          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-sm text-muted">Inventory: {product.inStock} available</p>
          <p className="text-sm text-muted">Material: {product.material}</p>
          <p className="text-xs text-muted">Authenticity guaranteed • Secure checkout via LemonSqueezy</p>
        </div>
      </div>
    </main>
  );
}
