import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EDC Store | Commercial Grade Next.js',
  description: 'Dark minimal EDC ecommerce with commercial storefront UX and LemonSqueezy checkout.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <header className="border-b border-white/10 bg-black/40 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
            <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-accent">
              EDC STORE
            </Link>
            <nav className="flex items-center gap-5 text-sm text-muted">
              <Link href="/" className="hover:text-white">Catalog</Link>
              <Link href="/cart" className="hover:text-white">Cart</Link>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs">Runtime: Next.js</span>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
