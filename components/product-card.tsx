import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-gear transition hover:-translate-y-0.5 hover:border-accent/50">
      <div className="relative h-72 w-full">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
        <div className="absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-1 text-xs text-accentSoft">{product.category}</div>
      </div>
      <div className="space-y-3 p-4">
        <p className="text-xs uppercase tracking-widest text-muted">{product.brand}</p>
        <h3 className="line-clamp-2 text-xl font-semibold">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted">{product.description}</p>
        <div className="flex items-center justify-between text-sm text-muted">
          <span>Stock: {product.inStock}</span>
          {product.lumens ? <span>{product.lumens} lm</span> : <span>EDC Utility</span>}
        </div>
        <div className="flex items-center justify-between pt-1">
          <strong className="text-lg">${product.price}</strong>
          <Link href={`/products/${product.slug}`} className="rounded-full border border-accent px-4 py-2 text-sm text-accent transition hover:bg-accent hover:text-black">
            View Specs
          </Link>
        </div>
      </div>
    </article>
  );
}
