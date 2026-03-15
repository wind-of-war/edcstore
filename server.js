const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const products = [
  {
    id: 'custom-flashlight-mk1',
    name: 'Custom Flashlight MK1',
    description: 'Đèn pin custom 18650, beam cân bằng, thân titanium.',
    price: 189,
    image:
      'https://images.unsplash.com/photo-1612043790974-97f478f24c8a?auto=format&fit=crop&w=1200&q=80',
    variantId: process.env.VARIANT_FLASHLIGHT,
  },
  {
    id: 'deep-carry-clip-ti',
    name: 'Deep Carry Clip Ti',
    description: 'Pocket clip titanium siêu nhẹ cho EDC setup.',
    price: 39,
    image:
      'https://images.unsplash.com/photo-1621784563330-caee0b138a00?auto=format&fit=crop&w=1200&q=80',
    variantId: process.env.VARIANT_CLIP,
  },
  {
    id: 'edc-pouch-mini',
    name: 'EDC Pouch Mini',
    description: 'Túi mini đựng tool, patch panel, chống nước nhẹ.',
    price: 59,
    image:
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
    variantId: process.env.VARIANT_POUCH,
  },
];

app.get('/api/products', (_req, res) => {
  res.json({ products });
});

const checkoutSchema = z.object({
  productId: z.string().min(1),
  email: z.string().email().optional(),
});

app.post('/api/checkout', async (req, res) => {
  const parsed = checkoutSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Payload không hợp lệ.' });
  }

  const { productId, email } = parsed.data;
  const selected = products.find((item) => item.id === productId);

  if (!selected) {
    return res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
  }

  if (!selected.variantId) {
    return res.status(500).json({
      error: `Thiếu LemonSqueezy variant id cho sản phẩm ${selected.id}.`,
    });
  }

  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const fallbackUrl = process.env.FALLBACK_CHECKOUT_URL;

  if (!apiKey || !storeId) {
    if (fallbackUrl) {
      return res.json({ url: fallbackUrl, mode: 'fallback' });
    }
    return res.status(500).json({
      error: 'Thiếu LEMONSQUEEZY_API_KEY hoặc LEMONSQUEEZY_STORE_ID trong .env',
    });
  }

  try {
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
            checkout_data: {
              email,
              custom: {
                productId,
              },
            },
            checkout_options: {
              embed: false,
              media: true,
              logo: true,
            },
            product_options: {
              redirect_url: `http://localhost:${port}/success.html`,
              receipt_button_text: 'Quay về cửa hàng',
              receipt_link_url: `http://localhost:${port}`,
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: String(storeId),
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: String(selected.variantId),
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      return res.status(502).json({
        error: 'LemonSqueezy API lỗi.',
        details,
      });
    }

    const payload = await response.json();
    const checkoutUrl = payload?.data?.attributes?.url;

    if (!checkoutUrl) {
      return res.status(502).json({ error: 'Không lấy được checkout URL.' });
    }

    return res.json({ url: checkoutUrl, mode: 'live' });
  } catch (error) {
    return res.status(500).json({ error: `Checkout failed: ${error.message}` });
  }
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`EDC Store chạy tại http://localhost:${port}`);
});
