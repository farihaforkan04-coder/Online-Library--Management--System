// ==========================================
// BOOKS.JS
// ==========================================

// Get books from localStorage
let books = JSON.parse(localStorage.getItem("books")) || [];


// ==========================================
// DEFAULT BOOKS
// ==========================================

if (books.length === 0) {

    books = [

        {
            id: 1,
            isbn: "978001",
            title: "Clean Code",
            author: "Robert Martin",
            category: "Programming",
            publisher: "",
            publicationYear: "",
            quantity: 1
        },

        {
            id: 2,
            isbn: "978002",
            title: "Atomic Habits",
            author: "James Clear",
            category: "Self Help",
            publisher: "",
            publicationYear: "",
            quantity: 1
        },

        {
            id: 3,
            isbn: "978003",
            title: "The Alchemist",
            author: "Paulo Coelho",
            category: "Fiction",
            publisher: "",
            publicationYear: "",
            quantity: 0
        }

    ];

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );
}


// ==========================================
// GET STATUS
// ==========================================

function getStatus(book) {

    const quantity =
        Number(book.quantity) || 0;

    if (quantity > 0) {
        return "Available";
    }

    return "Not Available";
}


// ==========================================
// STATUS DESIGN
// ==========================================

function getStatusHTML(book) {

    const status = getStatus(book);

    if (status === "Available") {

        return `
            <span class="inline-block
                         bg-green-100
                         text-green-700
                         px-3 py-1
                         rounded-full
                         text-sm
                         font-medium">
                Available
            </span>
        `;

    }

    return `
        <span class="inline-block
                     bg-red-100
                     text-red-700
                     px-3 py-1
                     rounded-full
                     text-sm
                     font-medium">
            Not Available
        </span>
    `;
}


// ==========================================
// DISPLAY BOOKS
// ==========================================

function displayBooks(bookList) {

    const desktopTable =
        document.getElementById("desktopBooksTable");

    const mobileList =
        document.getElementById("mobileBooksList");


    desktopTable.innerHTML = "";
    mobileList.innerHTML = "";


    if (bookList.length === 0) {

        desktopTable.innerHTML = `
            <tr>
                <td colspan="6"
                    class="px-6 py-10 text-center text-gray-500">
                    No books found.
                </td>
            </tr>
        `;

        mobileList.innerHTML = `
            <div class="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                No books found.
            </div>
        `;

        return;
    }


    bookList.forEach(function(book) {

        // ==================================
        // DESKTOP ROW
        // ==================================

        const row =
            document.createElement("tr");

        row.className =
            "hover:bg-gray-50";


        row.innerHTML = `

            <td class="px-6 py-4">
                ${book.isbn || ""}
            </td>

            <td class="px-6 py-4 font-semibold text-gray-800">
                ${book.title || ""}
            </td>

            <td class="px-6 py-4">
                ${book.author || ""}
            </td>

            <td class="px-6 py-4">
                ${book.category || ""}
            </td>

            <td class="px-6 py-4">
                ${getStatusHTML(book)}
            </td>

            <td class="px-6 py-4">

                <a
                    href="edit-book.html?id=${book.id}"
                    class="text-blue-600 hover:underline mr-4 font-medium">

                    Edit

                </a>

                <button
                    type="button"
                    onclick="deleteBook(${book.id})"
                    class="text-red-600 hover:underline font-medium">

                    Delete

                </button>

            </td>
        `;


        desktopTable.appendChild(row);


        // ==================================
        // MOBILE CARD
        // ==================================

        const card =
            document.createElement("div");

        card.className =
            "bg-white rounded-lg shadow p-5";


        card.innerHTML = `

            <div class="flex items-start justify-between gap-3">

                <div>

                    <h3 class="text-lg font-bold text-gray-800">
                        ${book.title || ""}
                    </h3>

                    <p class="text-sm text-gray-500 mt-1">
                        ISBN: ${book.isbn || ""}
                    </p>

                </div>

                ${getStatusHTML(book)}

            </div>


            <div class="mt-4 space-y-3">

                <div class="flex justify-between gap-4">

                    <span class="text-gray-500">
                        Author
                    </span>

                    <span class="font-medium text-gray-800 text-right">
                        ${book.author || ""}
                    </span>

                </div>


                <div class="flex justify-between gap-4">

                    <span class="text-gray-500">
                        Category
                    </span>

                    <span class="font-medium text-gray-800 text-right">
                        ${book.category || ""}
                    </span>

                </div>


                <div class="flex justify-between gap-4">

                    <span class="text-gray-500">
                        Quantity
                    </span>

                    <span class="font-medium text-gray-800">
                        ${Number(book.quantity) || 0}
                    </span>

                </div>

            </div>


            <div class="flex gap-3 mt-5 pt-4 border-t">

                <a
                    href="edit-book.html?id=${book.id}"
                    class="flex-1 text-center
                           bg-blue-600
                           text-white
                           px-4 py-2
                           rounded-lg
                           hover:bg-blue-700
                           font-medium">

                    Edit

                </a>


                <button
                    type="button"
                    onclick="deleteBook(${book.id})"
                    class="flex-1
                           bg-red-600
                           text-white
                           px-4 py-2
                           rounded-lg
                           hover:bg-red-700
                           font-medium">

                    Delete

                </button>

            </div>

        `;


        mobileList.appendChild(card);

    });

}


// ==========================================
// DELETE BOOK
// ==========================================

function deleteBook(id) {

    const book =
        books.find(function(item) {

            return Number(item.id) === Number(id);

        });


    if (!book) {
        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to delete " +
            book.title +
            "?"
        );


    if (!confirmed) {
        return;
    }


    books =
        books.filter(function(item) {

            return Number(item.id) !== Number(id);

        });


    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );


    displayBooks(books);

}


// ==========================================
// SEARCH
// ==========================================

document
    .getElementById("searchInput")
    .addEventListener("input", function() {

        const search =
            this.value
                .toLowerCase()
                .trim();


        const filtered =
            books.filter(function(book) {

                return (

                    String(book.title || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(book.author || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(book.isbn || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(book.category || "")
                        .toLowerCase()
                        .includes(search)

                );

            });


        displayBooks(filtered);

    });


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayBooks(books);