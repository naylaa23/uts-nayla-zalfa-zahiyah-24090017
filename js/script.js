// ========= DATA DUMMY =========
const summary = {
  totalProducts: 120,
  totalSales: 85,
  totalRevenue: 12500000
};

const products = [
  { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
  { id: 2, name: "Teh Hitan", price: 18000, stock: 30 },
  { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];

// ========= ROUTING PER HALAMAN =========
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "login") initLoginPage();
  if (page === "dashboard") initDashboardPage();
  if (page === "products") initProductsPage();
});

// ========= LOGIN =========
function initLoginPage() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Email dan password tidak boleh kosong.");
      return;
    }

    alert("Login berhasil!");
    window.location.href = "dashboard.html";
  });
}

// ========= DASHBOARD =========
function initDashboardPage() {
  const elProducts = document.getElementById("sum-products");
  const elSales = document.getElementById("sum-sales");
  const elRevenue = document.getElementById("sum-revenue");

  if (elProducts) elProducts.textContent = summary.totalProducts;
  if (elSales) elSales.textContent = summary.totalSales;
  if (elRevenue) {
    elRevenue.textContent = "Rp " + summary.totalRevenue.toLocaleString("id-ID");
  }
}

// ========= PRODUCTS =========
function initProductsPage() {
  const table = document.getElementById("product-table");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  products.forEach((product, index) => {
    const tr = document.createElement("tr");

    // kolom No
    const tdNo = document.createElement("td");
    tdNo.textContent = index + 1;
    tr.appendChild(tdNo);

    // kolom Nama
    const tdName = document.createElement("td");
    tdName.textContent = product.name;
    tr.appendChild(tdName);

    // kolom Harga
    const tdPrice = document.createElement("td");
    tdPrice.textContent = product.price.toString();
    tr.appendChild(tdPrice);

    // kolom Stock + tombol
    const tdStock = document.createElement("td");
    tdStock.className = "stock-cell";

    const spanStock = document.createElement("span");
    spanStock.className = "stock-value";
    spanStock.textContent = product.stock.toString();

    const spanActions = document.createElement("span");
    spanActions.className = "row-actions";

    const btnEdit = document.createElement("button");
    btnEdit.className = "btn-icon";
    btnEdit.title = "Edit";
    btnEdit.innerHTML = "&#9998;";
    btnEdit.addEventListener("click", () => {
      alert("Edit produk: " + product.name);
    });

    const btnDelete = document.createElement("button");
    btnDelete.className = "btn-icon delete";
    btnDelete.title = "Delete";
    btnDelete.innerHTML = "&#128465;";
    btnDelete.addEventListener("click", () => {
      if (confirm("Yakin hapus produk ini?")) {
        tr.remove();
      }
    });

    spanActions.appendChild(btnEdit);
    spanActions.appendChild(btnDelete);

    tdStock.appendChild(spanStock);
    tdStock.appendChild(spanActions);
    tr.appendChild(tdStock);

    tbody.appendChild(tr);
  });
}
