// ==========================================
// BOOKS.JS  (connected to backend)
// ==========================================

import { request, getLoggedInUser } from "./api.js";   // adjust path if needed

let books = [];

// ==========================================
// GET STATUS
// ==========================================
function getStatus(book) {
  const quantity = Number(book.quantity) || 0;
  return quantity > 0 ? "Available" : "Not Available";
}

function getStatusHTML(book) {
  const status = getStatus(book);

  if (status === "Available") {
    return `
      <span class="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
        Available
      </span>`;
  }

  return `
    <span class="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
      Not Available
    </span>`;
}

// ==========================================
// DISPLAY BOOKS
// ==========================================
function displayBooks(bookList) {
  const desktopTable = document.getElementById("desktopBooksTable");
  const mobileList = document.getElementById("mobileBooksList");

  if (!desktopTable || !mobileList) return;

  desktopTable.innerHTML = "";
  mobileList.innerHTML = "";

  if (bookList.length === 0) {
    desktopTable.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-10 text-center text-gray-500">
          No books found.
        </td>
      </tr>`;
    mobileList.innerHTML = `
      <div class="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No books found.
      </div>`;
    return;
  }

  bookList.forEach(function (book) {
    // Desktop row
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50";
    row.innerHTML = `
      <td class="px-6 py-4">${book.isbn || ""}</td>
      <td class="px-6 py-4 font-semibold text-gray-800">${book.title || ""}</td>
      <td class="px-6 py-4">${book.author || ""}</td>
      <td class="px-6 py-4">${book.category || ""}</td>
      <td class="px-6 py-4">${getStatusHTML(book)}</td>
      <td class="px-6 py-4">
        <a href="edit-book.html?id=${book._id || book.id}" class="text-blue-600 hover:underline mr-4 font-medium">Edit</a>
        <button type="button" onclick="deleteBook('${book._id || book.id}')" class="text-red-600 hover:underline font-medium">Delete</button>
      </td>`;
    desktopTable.appendChild(row);

    // Mobile card
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow p-5";
    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-lg font-bold text-gray-800">${book.title || ""}</h3>
          <p class="text-sm text-gray-500 mt-1">ISBN: ${book.isbn || ""}</p>
        </div>
        ${getStatusHTML(book)}
      </div>
      <div class="mt-4 space-y-3">
        <div class="flex justify-between gap-4">
          <span class="text-gray-500">Author</span>
          <span class="font-medium text-gray-800 text-right">${book.author || ""}</span>
        </div>
        <div class="flex justify-between gap-4">
          <span class="text-gray-500">Category</span>
          <span class="font-medium text-gray-800 text-right">${book.category || ""}</span>
        </div>
        <div class="flex justify-between gap-4">
          <span class="text-gray-500">Quantity</span>
          <span class="font-medium text-gray-800">${Number(book.quantity) || 0}</span>
        </div>
      </div>
      <div class="flex gap-3 mt-5 pt-4 border-t">
        <a href="edit-book.html?id=${book._id || book.id}" class="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">Edit</a>
        <button type="button" onclick="deleteBook('${book._id || book.id}')" class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium">Delete</button>
      </div>`;
    mobileList.appendChild(card);
  });
}

// ==========================================
// LOAD BOOKS FROM BACKEND
// ==========================================
async function loadBooks() {
  try {
    const data = await request("/books");   // → GET http://127.0.0.1:5000/api/books
    books = Array.isArray(data) ? data : data.books || [];
    displayBooks(books);
  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to load books. Are you logged in?");
    displayBooks([]);
  }
}

// ==========================================
// DELETE BOOK
// ==========================================
window.deleteBook = async function (id) {
  if (!confirm("Are you sure you want to delete this book?")) return;

  try {
    await request(`/books/${id}`, { method: "DELETE" });
    // remove from local list and re-render
    books = books.filter((b) => (b._id || b.id) !== id);
    displayBooks(books);
  } catch (err) {
    alert(err.message || "Failed to delete book");
  }
};

// ==========================================
// SEARCH
// ==========================================
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const search = this.value.toLowerCase().trim();
    const filtered = books.filter((book) =>
      String(book.title || "").toLowerCase().includes(search) ||
      String(book.author || "").toLowerCase().includes(search) ||
      String(book.isbn || "").toLowerCase().includes(search) ||
      String(book.category || "").toLowerCase().includes(search)
    );
    displayBooks(filtered);
  });
}

// ==========================================
// START
// ==========================================
loadBooks();