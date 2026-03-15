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

## Push code lên GitHub (để deploy Vercel)
Nếu repo local của bạn chưa có remote, chạy theo thứ tự:

```bash
git init
git add .
git commit -m "feat: edc store ready for vercel"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Nếu đã có remote sẵn:

```bash
git add .
git commit -m "chore: update edc store"
git push
```

> Lưu ý: không commit file `.env` thật (chỉ commit `.env.example`).

## Deploy Vercel nhanh
1. Import repo từ GitHub vào Vercel.
2. Set Environment Variables theo `.env.example`.
3. Deploy và cấu hình LemonSqueezy webhook về:

```text
https://<your-domain>/api/webhooks/lemonsqueezy
```
