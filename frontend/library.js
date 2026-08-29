// ==========================================
// ONLINE LIBRARY - SHARED BOOK DATA
// ==========================================


// ==========================================
// DEFAULT BOOKS
// ==========================================

const defaultBooks = [
    {
        id: 1,
        isbn: "978001",
        title: "Clean Code",
        author: "Robert Martin",
        category: "Programming",
        publisher: "Prentice Hall",
        year: 2008,
        quantity: 10,
        available: 10
    },

    {
        id: 2,
        isbn: "978002",
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        publisher: "Avery",
        year: 2018,
        quantity: 8,
        available: 8
    },

    {
        id: 3,
        isbn: "978003",
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        publisher: "HarperOne",
        year: 1988,
        quantity: 5,
        available: 0
    }
];


// ==========================================
// GET BOOKS
// ==========================================

function getBooks() {

    const savedBooks = localStorage.getItem("libraryBooks");

    if (savedBooks) {

        const books = JSON.parse(savedBooks);

        // Fix old books that don't have an ID
        return books.map(function(book, index) {

            if (!book.id) {
                book.id = index + 1;
            }

            return book;

        });

    }

    localStorage.setItem(
        "libraryBooks",
        JSON.stringify(defaultBooks)
    );

    return defaultBooks;
}


// ==========================================
// SAVE BOOKS
// ==========================================

function saveBooks(books) {

    localStorage.setItem(
        "libraryBooks",
        JSON.stringify(books)
    );

}


// ==========================================
// GET ONE BOOK
// ==========================================

function getBookById(id) {

    const books = getBooks();

    return books.find(function(book) {

        return Number(book.id) === Number(id);

    });

}


// ==========================================
// ADD BOOK
// ==========================================

function addBook(book) {

    const books = getBooks();

    const newBook = {

        id: Date.now(),

        isbn: book.isbn,

        title: book.title,

        author: book.author,

        category: book.category,

        publisher: book.publisher,

        year: Number(book.year),

        quantity: Number(book.quantity),

        available: Number(book.quantity)

    };

    books.push(newBook);

    saveBooks(books);

    return newBook;

}


// ==========================================
// UPDATE BOOK
// ==========================================

function updateBook(id, updatedData) {

    const books = getBooks();

    const index = books.findIndex(function(book) {

        return Number(book.id) === Number(id);

    });


    if (index === -1) {

        return false;

    }


    books[index] = {

        ...books[index],

        isbn: updatedData.isbn,

        title: updatedData.title,

        author: updatedData.author,

        category: updatedData.category,

        publisher: updatedData.publisher,

        year: Number(updatedData.year),

        quantity: Number(updatedData.quantity),

        available: Number(updatedData.quantity)

    };


    saveBooks(books);

    return true;

}


// ==========================================
// DELETE BOOK
// ==========================================

function deleteBookById(id) {

    let books = getBooks();

    books = books.filter(function(book) {

        return Number(book.id) !== Number(id);

    });

    saveBooks(books);

}


// ==========================================
// GET BOOK STATUS
// ==========================================

function getBookStatus(book) {

    if (Number(book.available) > 0) {

        return "Available";

    }

    return "Not Available";

}