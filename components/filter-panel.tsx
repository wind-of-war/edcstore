'use client';

import { useMemo } from 'react';
import type { Product } from '@/data/products';
import type { ProductFilter } from '@/lib/catalog';

type Props = {
  products: Product[];
  value: ProductFilter;
  onChange: (next: ProductFilter) => void;
};

export function FilterPanel({ products, value, onChange }: Props) {
  const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category))], [products]);
  const materials = useMemo(() => ['All', ...new Set(products.map((p) => p.material.split(' ')[0]))], [products]);

  return (
    <div className="panel grid gap-3 p-4 md:grid-cols-6">
      <input
        className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 md:col-span-2"
        placeholder="Search brand or product..."
        value={value.q ?? ''}
        onChange={(e) => onChange({ ...value, q: e.target.value })}
      />
      <select className="rounded-lg border border-white/10 bg-black/30 px-3 py-2" value={value.category ?? 'All'} onChange={(e) => onChange({ ...value, category: e.target.value })}>
        {categories.map((item) => <option key={item}>{item}</option>)}
      </select>
      <select className="rounded-lg border border-white/10 bg-black/30 px-3 py-2" value={value.material ?? 'All'} onChange={(e) => onChange({ ...value, material: e.target.value })}>
        {materials.map((item) => <option key={item}>{item}</option>)}
      </select>
      <input type="number" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2" placeholder="Min $" value={value.minPrice ?? ''} onChange={(e) => onChange({ ...value, minPrice: e.target.value ? Number(e.target.value) : undefined })} />
      <input type="number" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2" placeholder="Max $" value={value.maxPrice ?? ''} onChange={(e) => onChange({ ...value, maxPrice: e.target.value ? Number(e.target.value) : undefined })} />
      <label className="flex items-center gap-2 text-sm text-muted md:col-span-2">
        <input type="checkbox" checked={value.inStockOnly ?? false} onChange={(e) => onChange({ ...value, inStockOnly: e.target.checked })} />
        In stock only
      </label>
    </div>
  );
}
