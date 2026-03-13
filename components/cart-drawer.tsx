'use client';

import { useState } from 'react';
import type { Product } from '@/data/products';

type CartItem = Product & { qty: number };

export function CartDrawer({ items }: { items: CartItem[] }) {
  const [busy, setBusy] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkout = async () => {
    setBusy(true);
    const response = await fetch('/api/cart/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map((i) => ({ variantId: i.lemonVariantId, quantity: i.qty })) }),
    });

    const data = await response.json();
    if (response.ok && data.url) {
      window.location.href = data.url;
      return;
    }

    setBusy(false);
    alert(data.error || 'Checkout failed');
  };

  return (
    <aside className="panel sticky top-6 h-fit p-4">
      <h2 className="text-lg font-semibold">Cart</h2>
      <p className="text-sm text-muted">{items.length} item types</p>
      <ul className="my-4 space-y-2 text-sm">
        {items.length === 0 && <li className="text-muted">No items yet.</li>}
        {items.map((item) => (
          <li key={item.id} className="flex justify-between rounded-lg border border-white/10 px-2 py-1.5">
            <span>{item.name} x{item.qty}</span>
            <span>${item.price * item.qty}</span>
          </li>
        ))}
      </ul>
      <div className="mb-3 flex justify-between border-t border-white/10 pt-3 font-semibold">
        <span>Total</span>
        <span>${total}</span>
      </div>
      <button disabled={!items.length || busy} onClick={checkout} className="w-full rounded-full bg-accent py-2 font-semibold text-black transition hover:bg-accentSoft disabled:opacity-50">
        {busy ? 'Redirecting...' : 'Checkout with LemonSqueezy'}
      </button>
    </aside>
  );
}
