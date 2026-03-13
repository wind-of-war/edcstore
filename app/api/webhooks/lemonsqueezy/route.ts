import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase';

type LemonOrder = {
  data: {
    id: string;
    attributes: {
      order_number: number;
      total: number;
      user_email: string;
      custom_data?: { cart?: Array<{ variantId: number; quantity: number }> };
    };
  };
};

function validSignature(payload: string, signature: string | null, secret: string) {
  if (!signature) return false;
  const digest = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('x-signature');
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret || !validSignature(payload, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(payload) as LemonOrder;
  const supabase = createServiceSupabase();
  const cart = event.data.attributes.custom_data?.cart ?? [];

  await supabase.from('orders').insert({
    lemon_order_id: event.data.id,
    order_number: event.data.attributes.order_number,
    total: event.data.attributes.total,
    customer_email: event.data.attributes.user_email,
    raw_payload: event,
  });

  for (const line of cart) {
    await supabase.rpc('decrement_inventory_by_variant', {
      p_variant_id: line.variantId,
      p_qty: line.quantity,
    });
  }

  return NextResponse.json({ ok: true });
}
