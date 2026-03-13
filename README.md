# EDC Store (Next.js runtime)

Website bán đồ EDC theo phong cách thương mại (dark minimal), chạy **chuẩn runtime Next.js**.

## Stack
- Next.js App Router
- Tailwind CSS
- Supabase (catalog + inventory + order sync)
- LemonSqueezy checkout + webhook

## Features
- Product catalog với ảnh lớn
- Advanced filters + sort
- Product detail page với technical specs
- Cart drawer + checkout redirect LemonSqueezy
- Webhook order sync + inventory decrement trong Supabase

## Run (Next.js)
```bash
cp .env.example .env
npm install
npm run dev
```

Mở `http://localhost:3000`.

> Ghi chú: Runtime chính là Next.js, không dùng static demo server cho production.

## Supabase setup
1. Run SQL trong `supabase/schema.sql`.
2. Seed bảng `products` với `lemon_variant_id` tương ứng.
3. Cấu hình webhook URL tới `/api/webhooks/lemonsqueezy`.
