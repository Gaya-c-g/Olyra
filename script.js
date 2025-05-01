function addToCart(title, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.title === title);

  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ title, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("تمت إضافة المنتج إلى السلة!");
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tbody = document.getElementById("cart-body");
  const totalEl = document.getElementById("total-price");
  if (!tbody || !totalEl) return;

  if (cart.length === 0) {
    tbody.innerHTML = "<tr><td colspan='3'>سلتك فارغة</td></tr>";
    totalEl.textContent = "";
    return;
  }

  let total = 0;
  tbody.innerHTML = "";

  cart.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.title}</td>
      <td>${item.price}</td>
      <td>${item.quantity}</td>
    `;
    tbody.appendChild(row);
    total += item.price * item.quantity;
  });

  totalEl.textContent = `المجموع: ${total} دينار`;
}

function clearCart() {
  localStorage.removeItem("cart");
  location.reload();
}

// تنفيذ تلقائي إذا كنا في صفحة السلة
if (window.location.pathname.includes("cart.html")) {
  renderCart();
}
function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("السلة فارغة. لا يمكن إتمام الطلب.");
    return;
  }

  // يمكنك هنا إرسال الطلب إلى الخادم (في المستقبل)
  alert("✅ تم إرسال طلبك بنجاح! سيتم التواصل معك قريبًا.");

  // تفريغ السلة
  clearCart();
}
