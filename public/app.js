const productsEl = document.getElementById('products');
const statusEl = document.getElementById('status');
const emailEl = document.getElementById('email');

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

const setStatus = (message, isError = false) => {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#fda4af' : '#c4b5fd';
};

const checkout = async (productId) => {
  setStatus('Đang tạo checkout...');

  const payload = {
    productId,
    email: emailEl.value || undefined,
  };

  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Không thể tạo checkout.');
    }

    setStatus(
      data.mode === 'fallback'
        ? 'Không có API key, đang chuyển qua link demo.'
        : 'Đang chuyển tới LemonSqueezy...',
    );

    window.location.href = data.url;
  } catch (error) {
    setStatus(error.message, true);
  }
};

const renderProducts = (products) => {
  productsEl.innerHTML = '';

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="card__body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="card__meta">
          <strong>${formatPrice(product.price)}</strong>
          <button data-id="${product.id}">Buy with LemonSqueezy</button>
        </div>
      </div>
    `;

    card.querySelector('button').addEventListener('click', () => checkout(product.id));

    productsEl.appendChild(card);
  });
};

const init = async () => {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Không thể tải danh sách sản phẩm.');
    }

    renderProducts(data.products);
    setStatus('Sẵn sàng checkout.');
  } catch (error) {
    setStatus(error.message, true);
  }
};

init();
