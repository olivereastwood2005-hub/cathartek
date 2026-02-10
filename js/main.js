/**
 * TechVault PC — Store JS
 * Cart in localStorage, nav cart count, add-to-cart handlers
 */

const CART_KEY = 'techvault_cart';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = total;
}

function addToCart(productId, name, price, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === String(productId));
  if (existing) {
    existing.qty = (existing.qty || 1) + qty;
  } else {
    cart.push({
      id: String(productId),
      name: name || 'Product',
      price: parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0,
      qty,
    });
  }
  saveCart(cart);
}

// Update cart count on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Add to cart buttons (use data-add-cart="id" and optionally data-name, data-price)
  document.querySelectorAll('[data-add-cart]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-add-cart');
      const name = btn.getAttribute('data-name') || btn.closest('.product-card')?.querySelector('h3')?.textContent || 'Product';
      const priceText = btn.getAttribute('data-price') || btn.closest('.product-card')?.querySelector('.price')?.textContent || '0';
      const price = priceText.replace(/[^0-9.]/g, '');
      addToCart(id, name, price);
      // Optional: brief feedback
      const label = btn.textContent;
      btn.textContent = 'Added!';
      setTimeout(() => { btn.textContent = label; }, 1200);
    });
  });
});
