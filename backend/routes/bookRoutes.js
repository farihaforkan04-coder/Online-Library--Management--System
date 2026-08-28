const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, getBooks);
router.get("/:id", protect, getBookById);
router.post("/", protect, authorize("admin", "librarian"), createBook);
router.put("/:id", protect, authorize("admin", "librarian"), updateBook);
router.delete("/:id", protect, authorize("admin"), deleteBook);

module.exports = router;