import { NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  items: z.array(z.object({ variantId: z.number().int().positive(), quantity: z.number().int().positive() })).min(1),
});

export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid checkout payload' }, { status: 400 });
  }

  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  if (!apiKey || !storeId) {
    return NextResponse.json({ error: 'Missing LemonSqueezy credentials' }, { status: 500 });
  }

  const firstItem = parsed.data.items[0];

  const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          checkout_options: { embed: false, logo: true, media: true },
          checkout_data: {
            custom: { cart: parsed.data.items },
          },
          product_options: {
            redirect_url: process.env.LEMONSQUEEZY_SUCCESS_URL,
            receipt_button_text: 'Back to EDC Store',
            receipt_link_url: process.env.NEXT_PUBLIC_SITE_URL,
          },
        },
        relationships: {
          store: { data: { type: 'stores', id: String(storeId) } },
          variant: { data: { type: 'variants', id: String(firstItem.variantId) } },
        },
      },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    return NextResponse.json({ error: 'LemonSqueezy checkout failed', details }, { status: 502 });
  }

  const payload = await response.json();
  return NextResponse.json({ url: payload?.data?.attributes?.url });
}
