const express = require("express");
const router = express.Router();
const {
  issueBook,
  returnBook,
  getAllTransactions,
  getMyTransactions,
} = require("../controllers/issueController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, authorize("admin", "librarian"), issueBook);
router.put("/return/:id", protect, authorize("admin", "librarian"), returnBook);
router.get("/", protect, authorize("admin", "librarian"), getAllTransactions);
router.get("/my", protect, getMyTransactions);

module.exports = router;