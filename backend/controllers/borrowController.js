const Borrow = require("../models/Borrow");
const Book = require("../models/Book"); // make sure this path is correct

// @desc    Borrow a book
// @route   POST /api/borrow
exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ message: "Book is not available" });
    }

    // Check if already borrowed and not returned
    const alreadyBorrowed = await Borrow.findOne({
      book: bookId,
      user: userId,
      returned: false,
    });

    if (alreadyBorrowed) {
      return res.status(400).json({ message: "You already borrowed this book" });
    }

    // Due date = 7 days from now
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const borrow = await Borrow.create({
      book: bookId,
      user: userId,
      dueDate,
    });

    // Decrease quantity
    book.quantity -= 1;
    await book.save();

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Return a book
// @route   PUT /api/borrow/:id/return
exports.returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id).populate("book");

    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    if (borrow.returned) {
      return res.status(400).json({ message: "Book already returned" });
    }

    // Calculate fine (10 taka per late day)
    const today = new Date();
    let lateDays = 0;
    let fine = 0;

    if (today > borrow.dueDate) {
      lateDays = Math.ceil((today - borrow.dueDate) / (1000 * 60 * 60 * 24));
      fine = lateDays * 10;
    }

    borrow.returned = true;
    borrow.returnedAt = today;
    borrow.lateDays = lateDays;
    borrow.fine = fine;
    await borrow.save();

    // Increase quantity
    const book = await Book.findById(borrow.book._id);
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res.json({
      message: "Book returned successfully",
      fine,
      lateDays,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get my borrows
// @route   GET /api/borrow/my
exports.getMyBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user._id })
      .populate("book", "title author category")
      .sort({ createdAt: -1 });

    res.json(borrows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all borrows (Admin)
// @route   GET /api/borrow
exports.getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find()
      .populate("book", "title author category")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(borrows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};