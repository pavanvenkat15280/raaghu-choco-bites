// ==========================================
// Raaghu's Choco Bites - Main Logic
// ==========================================

// ---------------------------
// Dark Mode Toggle
// ---------------------------
const themeToggle = document.querySelector("#theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  if (themeToggle) themeToggle.textContent = "☀️ Light Mode";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙 Dark Mode";
    }
  });
}

// ---------------------------
// Cart System
// ---------------------------
const buttons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector("#cart-count");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render initial state
renderCart();

// Add event listeners to product buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existingItem = cart.find((product) => product.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: 1
      });
    }

    saveCart();
    renderCart();

    // Visual button feedback
    const originalText = button.innerHTML;
    button.innerHTML = "✅ Added!";
    setTimeout(() => {
      button.innerHTML = originalText;
    }, 1000);
  });
});

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<li style="text-align:center; opacity:0.7;">Your cart is empty</li>`;
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      count += item.quantity;

      const li = document.createElement("li");
      li.className = "cart-item-row";

      li.innerHTML = `
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <p>₹${item.price} × ${item.quantity} = <strong>₹${item.price * item.quantity}</strong></p>
        </div>
        <div class="cart-item-actions">
          <button class="cart-btn minus">−</button>
          <span>${item.quantity}</span>
          <button class="cart-btn plus">+</button>
          <button class="cart-btn remove">🗑️</button>
        </div>
      `;

      li.querySelector(".plus").onclick = () => {
        item.quantity++;
        saveCart();
        renderCart();
      };

      li.querySelector(".minus").onclick = () => {
        item.quantity--;
        if (item.quantity <= 0) {
          cart.splice(index, 1);
        }
        saveCart();
        renderCart();
      };

      li.querySelector(".remove").onclick = () => {
        cart.splice(index, 1);
        saveCart();
        renderCart();
      };

      cartItems.appendChild(li);
    });
  }

  if (cartCount) cartCount.textContent = count;
  if (cartTotal) cartTotal.textContent = total;
}

// ---------------------------
// WhatsApp Checkout Logic
// ---------------------------
const checkoutBtn = document.querySelector("#checkout-btn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Please add items before checking out.");
      return;
    }

    const nameInput = document.querySelector("#customer-name");
    const phoneInput = document.querySelector("#customer-phone");
    const addressInput = document.querySelector("#customer-address");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";

    if (!name || !phone || !address) {
      alert("Please fill in your Name, Phone Number, and Delivery Address.");
      return;
    }

    // Phone validation (10 digits)
    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    let message = `🍫 *Raaghu's Choco Bites Order*\n\n`;
    message += `👤 *Customer:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `📍 *Address:* ${address}\n\n`;
    message += `📦 *Order Details:*\n`;

    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      message += `${index + 1}. ${item.name} (x${item.quantity}) - ₹${itemTotal}\n`;
    });

    message += `\n💰 *Total Amount:* ₹${total}\n\n`;
    message += `Please confirm my order!`;

    const whatsappURL = `https://wa.me/917892156866?text=${encodeURIComponent(message)}`;

    // Save order locally for admin history
    const orderData = {
      name: name,
      phone: phone,
      address: address,
      items: cart.map((item) => `${item.name} x${item.quantity}`).join(", "),
      total: total,
      date: new Date().toLocaleString()
    };

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    savedOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(savedOrders));

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // Clear cart after placing order
    cart = [];
    saveCart();
    renderCart();

    // Clear input fields
    if (nameInput) nameInput.value = "";
    if (phoneInput) phoneInput.value = "";
    if (addressInput) addressInput.value = "";

    alert("🎉 Order placed! Opening WhatsApp to send your details.");
  });
}

// ---------------------------
// Loading Screen Fade-out
// ---------------------------
window.addEventListener("load", () => {
  const loader = document.querySelector("#loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 600);
  }
});

// ---------------------------
// Image Lightbox Preview
// ---------------------------
const productImages = document.querySelectorAll(".product-image");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");

if (lightbox && lightboxImg) {
  productImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

// ---------------------------
// Payment Confirmation Button
// ---------------------------
const paymentBtn = document.querySelector("#payment-done");

if (paymentBtn) {
  paymentBtn.addEventListener("click", () => {
    alert("✅ Payment marked completed. Thank you for ordering from Raaghu's Choco Bites 🍫");
  });
}
