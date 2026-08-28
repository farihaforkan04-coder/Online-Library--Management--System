const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const User = require("../models/User");
const calculateFine = require('../utils/calculateFine');

const issueBook = async (req, res) => {
  try {
    const { bookId, memberId, days = 14 } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.available <= 0) {
      return res.status(400).json({ message: "Book is not available" });
    }

    const member = await User.findById(memberId);
    if (!member || member.role !== "member") {
      return res.status(404).json({ message: "Member not found" });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(days));

    const transaction = await Transaction.create({
      book: bookId,
      member: memberId,
      dueDate,
      status: "issued",
    });

    book.available -= 1;
    await book.save();

    const populated = await Transaction.findById(transaction._id)
      .populate("book", "title author isbn")
      .populate("member", "name email");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    const returnDate = new Date();
       const fine = calculateFine(transaction.dueDate, returnDate);

    transaction.returnDate = returnDate;
    transaction.fine = fine;
    transaction.status = "returned";
    await transaction.save();

    const book = await Book.findById(transaction.book);
    if (book) {
      book.available += 1;
      await book.save();
    }

    const populated = await Transaction.findById(transaction._id)
      .populate("book", "title author isbn")
      .populate("member", "name email");

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("book", "title author isbn")
      .populate("member", "name email")
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ member: req.user._id })
      .populate("book", "title author isbn")
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  issueBook,
  returnBook,
  getAllTransactions,
  getMyTransactions,
};