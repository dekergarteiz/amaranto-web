// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

// --- Cart System ---

let cart = JSON.parse(localStorage.getItem('amaranto_cart')) || [];

function saveCart() {
  localStorage.setItem('amaranto_cart', JSON.stringify(cart));
  updateCartUI();
}

export function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  openCart();
}

export function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

export function toggleCart() {
  const drawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  if (drawer && overlay) {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
  }
}

export function openCart() {
  const drawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
  }
}

function updateCartUI() {
  const countElements = document.querySelectorAll('.cart-count');
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  countElements.forEach(el => el.textContent = totalItems);

  const cartItemsContainer = document.querySelector('.cart-items');
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Tu carrito está vacío.</p>';
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div style="flex-grow:1">
          <h4 style="font-family: 'Playfair Display', serif; font-size: 1rem;">${item.name}</h4>
          <p style="font-size: 0.85rem; color: var(--text-light);">$ ${item.price} x ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart('${item.id}')" style="background:none; border:none; color: var(--accent-wine); cursor:pointer; font-size: 1.2rem;">&times;</button>
      </div>
    `).join('');
  }

  const totalAmount = cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/[$,]/g, ''));
    return acc + (isNaN(priceNum) ? 0 : priceNum * item.quantity);
  }, 0);
  
  const totalElements = document.querySelectorAll('.total-amount');
  totalElements.forEach(el => {
    el.textContent = `$ ${totalAmount.toLocaleString()}`;
  });
}

// Initial UI Update
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  // Global listeners for drawer
  const cartIcons = document.querySelectorAll('.nav-cart');
  const closeCart = document.querySelector('.close-cart');
  const overlay = document.querySelector('.cart-overlay');

  cartIcons.forEach(icon => icon.addEventListener('click', toggleCart));
  if (closeCart) closeCart.addEventListener('click', toggleCart);
  if (overlay) overlay.addEventListener('click', toggleCart);

  // Expose functions to window for inline onclicks
  window.removeFromCart = (id) => {
    removeFromCart(id);
    updateCartUI();
  };
  
  window.addToCart = (id, name, price, image) => {
    addToCart({ id, name, price, image });
  };
});

// Forzar carga desde el inicio (Hero)
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
