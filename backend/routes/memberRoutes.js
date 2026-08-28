const express = require("express");
const router = express.Router();
const {
  getMembers,
  getMemberById,
  updateMember,
} = require("../controllers/memberController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, authorize("admin", "librarian"), getMembers);
router.get("/:id", protect, authorize("admin", "librarian"), getMemberById);
router.put("/:id", protect, authorize("admin", "librarian"), updateMember);

module.exports = router;