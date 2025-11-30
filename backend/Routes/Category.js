const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../Controller/CategoryController");
const { requireSignin, isAdmin } = require("../Middleware/Auth");

// Category routes
router.post("/category", requireSignin, isAdmin, createCategory);
router.get("/categories", isAdmin, getAllCategories);
router.get("/category/:id", isAdmin, getCategoryById);
router.put("/category/:id", requireSignin, isAdmin, updateCategory);
router.delete("/category/:id", requireSignin, isAdmin, deleteCategory);

module.exports = router;
