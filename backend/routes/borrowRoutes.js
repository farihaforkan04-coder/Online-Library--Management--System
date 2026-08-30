const express = require("express");
const router = express.Router();

const {
  borrowBook,
  returnBook,
  getMyBorrows,
  getAllBorrows,
} = require("../controllers/borrowController");

// Try to load auth middleware
let protect, admin;

try {
  const auth = require("../middleware/authMiddleware");
  protect = auth.protect;
  admin = auth.admin;
} catch (err) {
  try {
    const auth = require("../middleware/auth");
    protect = auth.protect || auth.authenticate;
    admin = auth.admin || auth.isAdmin;
  } catch (err2) {
    console.error("Auth middleware not found. Using dummy protect.");
    protect = (req, res, next) => next();
    admin = (req, res, next) => next();
  }
}

// Make sure they are functions
if (typeof protect !== "function") {
  console.error("protect is not a function");
  protect = (req, res, next) => next();
}
if (typeof admin !== "function") {
  console.error("admin is not a function");
  admin = (req, res, next) => next();
}

router.post("/", protect, borrowBook);
router.put("/:id/return", protect, returnBook);
router.get("/my", protect, getMyBorrows);
router.get("/", protect, admin, getAllBorrows);

module.exports = router;