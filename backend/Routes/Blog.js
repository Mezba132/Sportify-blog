const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  getBlogById,
  deleteBlog,
  getBlogsByUser,
} = require("../Controller/BlogController");
const { requireSignin } = require("../Middleware/Auth");
const { userById } = require("../Controller/UserController");

// Blog routes
router.post("/blog", requireSignin, createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.put("/blog/:id", requireSignin, updateBlog);
router.delete("/blog/:id", requireSignin, deleteBlog);
router.get("/blogs/:userId", requireSignin, getBlogsByUser);

router.param("userId", userById);

module.exports = router;
