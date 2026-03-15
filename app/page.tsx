import { CatalogScreen } from '@/components/catalog-screen';
import { getProducts } from '@/lib/catalog';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="grid-overlay min-h-screen px-5 py-6 md:px-10 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="panel overflow-hidden">
          <div className="grid gap-6 p-6 md:grid-cols-[1.25fr_0.75fr] md:p-10">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">Commercial EDC Experience</p>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">Custom Flashlights & Premium EDC Tools</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                Giao diện chuẩn các site EDC thương mại: cấu trúc rõ ràng, ảnh lớn, trust blocks,
                filter nâng cao và checkout flow sẵn cho production.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted">
                <span className="rounded-full border border-white/15 px-3 py-1">Small-batch makers</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Verified stock</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Secure LemonSqueezy checkout</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="panel p-4 text-center"><p className="text-2xl font-semibold">{products.length}+</p><p className="text-muted">Listings</p></div>
              <div className="panel p-4 text-center"><p className="text-2xl font-semibold">24h</p><p className="text-muted">Dispatch</p></div>
              <div className="panel p-4 text-center"><p className="text-2xl font-semibold">98%</p><p className="text-muted">Satisfaction</p></div>
              <div className="panel p-4 text-center"><p className="text-2xl font-semibold">Next.js</p><p className="text-muted">Runtime</p></div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="panel p-4"><p className="text-xs uppercase tracking-wider text-accent">Drop</p><p className="mt-1 font-semibold">New titanium lights weekly</p><p className="subtle">Cập nhật listing mới đều đặn, ưu tiên dòng custom.</p></div>
          <div className="panel p-4"><p className="text-xs uppercase tracking-wider text-accent">Authenticity</p><p className="mt-1 font-semibold">Specs & material minh bạch</p><p className="subtle">Thông tin cấu hình rõ theo từng sản phẩm.</p></div>
          <div className="panel p-4"><p className="text-xs uppercase tracking-wider text-accent">Checkout</p><p className="mt-1 font-semibold">Hosted checkout ổn định</p><p className="subtle">Thanh toán qua LemonSqueezy, webhook sync về Supabase.</p></div>
        </section>

        <CatalogScreen initialProducts={products} />
      </div>
    </main>
  );
}
