'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/product-card';
import { FilterPanel } from '@/components/filter-panel';
import { CartDrawer } from '@/components/cart-drawer';
import type { Product } from '@/data/products';
import { applyFilters, type ProductFilter } from '@/lib/catalog';

type SortMode = 'featured' | 'price-asc' | 'price-desc' | 'stock-desc';

export function CatalogScreen({ initialProducts }: { initialProducts: Product[] }) {
  const [filter, setFilter] = useState<ProductFilter>({ category: 'All', material: 'All', inStockOnly: true });
  const [sort, setSort] = useState<SortMode>('featured');
  const [cart, setCart] = useState<Record<string, number>>({});

  const filtered = useMemo(() => applyFilters(initialProducts, filter), [initialProducts, filter]);

  const products = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'price-asc') arr.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') arr.sort((a, b) => b.price - a.price);
    if (sort === 'stock-desc') arr.sort((a, b) => b.inStock - a.inStock);
    return arr;
  }, [filtered, sort]);

  const cartItems = useMemo(
    () =>
      initialProducts
        .filter((product) => cart[product.id])
        .map((product) => ({ ...product, qty: cart[product.id] })),
    [cart, initialProducts],
  );

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <FilterPanel products={initialProducts} value={filter} onChange={setFilter} />

        <div className="panel flex flex-col gap-3 p-4 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-muted">
            Showing <span className="font-semibold text-ink">{products.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-muted">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="rounded-lg border border-white/15 bg-black/30 px-3 py-2"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock-desc">Stock: Most Available</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="space-y-2">
              <ProductCard product={product} />
              <button
                className="w-full rounded-xl border border-white/20 py-2 text-sm transition hover:border-accent hover:text-accent"
                onClick={() => setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }))}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <CartDrawer items={cartItems} />
    </section>
  );
}
