const STORAGE_KEY = 'edcstore_products_v1';
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80';

const form = document.getElementById('productForm');
const productsWrap = document.getElementById('products');
const template = document.getElementById('productCardTemplate');
const emptyState = document.getElementById('emptyState');
const clearBtn = document.getElementById('clearBtn');
const aiSuggestBtn = document.getElementById('aiSuggestBtn');
const aiBox = document.getElementById('aiBox');
const aiResult = document.getElementById('aiResult');
const useSuggestionBtn = document.getElementById('useSuggestion');
const closeSuggestionBtn = document.getElementById('closeSuggestion');
const totalProductsEl = document.getElementById('totalProducts');
const avgPriceEl = document.getElementById('avgPrice');

let products = loadProducts();
let pendingSuggestion = '';

function formatCurrency(value) {
  return Number(value || 0).toLocaleString('vi-VN') + '₫';
}

function loadProducts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function updateStats() {
  totalProductsEl.textContent = String(products.length);
  const avg =
    products.length > 0
      ? products.reduce((sum, p) => sum + Number(p.price || 0), 0) / products.length
      : 0;
  avgPriceEl.textContent = formatCurrency(Math.round(avg));
}

function renderProducts() {
  productsWrap.innerHTML = '';
  emptyState.classList.toggle('hidden', products.length > 0);

  products.forEach((product, index) => {
    const node = template.content.cloneNode(true);
    const img = node.querySelector('img');
    img.src = product.image || FALLBACK_IMAGE;
    img.alt = product.name;

    node.querySelector('h3').textContent = product.name;
    node.querySelector('.price').textContent = formatCurrency(product.price);
    node.querySelector('.meta').textContent = product.category || 'Chưa phân loại';
    node.querySelector('.desc').textContent = product.description || 'Chưa có mô tả';

    node.querySelector('.delete-btn').addEventListener('click', () => {
      products.splice(index, 1);
      saveProducts();
      renderProducts();
      updateStats();
    });

    productsWrap.appendChild(node);
  });
}

function generateSuggestion({ name, category, price }) {
  const priceTag = Number(price) > 700000 ? 'phân khúc cao cấp' : 'giá dễ tiếp cận';
  const cat = category || 'đời sống';

  return `${name} thuộc nhóm ${cat}, phù hợp với khách hàng cần sản phẩm ${priceTag}. Thiết kế chú trọng tính ứng dụng hằng ngày, chất liệu bền và cảm giác thoải mái khi sử dụng. Đây là lựa chọn hợp lý để nâng tầm trải nghiệm mà vẫn tối ưu ngân sách.`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById('name').value.trim(),
    price: Number(document.getElementById('price').value),
    category: document.getElementById('category').value.trim(),
    image: document.getElementById('image').value.trim(),
    description: document.getElementById('description').value.trim()
  };

  if (!product.name || Number.isNaN(product.price)) {
    alert('Vui lòng nhập tên và giá hợp lệ.');
    return;
  }

  products.unshift(product);
  saveProducts();
  renderProducts();
  updateStats();
  form.reset();
});

aiSuggestBtn.addEventListener('click', () => {
  const data = {
    name: document.getElementById('name').value.trim(),
    category: document.getElementById('category').value.trim(),
    price: document.getElementById('price').value
  };

  if (!data.name) {
    alert('Hãy nhập tên sản phẩm trước khi dùng AI gợi ý.');
    return;
  }

  pendingSuggestion = generateSuggestion(data);
  aiResult.textContent = pendingSuggestion;
  aiBox.classList.remove('hidden');
});

useSuggestionBtn.addEventListener('click', () => {
  document.getElementById('description').value = pendingSuggestion;
  aiBox.classList.add('hidden');
});

closeSuggestionBtn.addEventListener('click', () => {
  aiBox.classList.add('hidden');
});

clearBtn.addEventListener('click', () => {
  if (!products.length) return;
  if (!confirm('Bạn chắc chắn muốn xóa toàn bộ sản phẩm?')) return;
  products = [];
  saveProducts();
  renderProducts();
  updateStats();
});

renderProducts();
updateStats();
