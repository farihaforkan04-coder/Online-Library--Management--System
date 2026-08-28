const Book = require("../models/Book");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, isbn, category, quantity, publishedYear, description } = req.body;

    const bookExists = await Book.findOne({ isbn });
    if (bookExists) {
      return res.status(400).json({ message: "Book with this ISBN already exists" });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      quantity,
      available: quantity,
      publishedYear,
      description,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.category = req.body.category || book.category;
    book.quantity = req.body.quantity || book.quantity;
    book.available = req.body.available || book.available;
    book.publishedYear = req.body.publishedYear || book.publishedYear;
    book.description = req.body.description || book.description;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.deleteOne();
    res.json({ message: "Book removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};