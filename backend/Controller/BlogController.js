const Blog = require("../Models/Blog");
const { errorHandler } = require("../Helper/ErrorHandler");

const createBlog = async (req, res) => {
  try {
    const { title, slug, content, category } = req.body;
    const author = req.auth._id;
    const newBlog = new Blog({
      title,
      slug,
      content,
      author,
      category,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (err) {
    return res.status(400).json({
      err: errorHandler(err),
    });
  }
};

// Get all blog posts with pagination
const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);

    const blogs = await Blog.find()
      .populate("author")
      .populate("category")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: blogs.length,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
      },
      blogs,
    });
  } catch (err) {
    return res.status(400).json({
      err: errorHandler(err),
    });
  }
};

// Get a single blog post by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author")
      .populate("category");
    if (!blog) {
      return res.status(400).json({
        err: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    return res.status(400).json({
      err: errorHandler(err),
    });
  }
};

// Update a blog post by ID
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(400).json({
        err: "Blog not found",
      });
    }

    if (blog.author.toString() !== req.auth._id) {
      return res.status(403).json({
        err: "You are not authorized to perform this action",
      });
    }

    const { title, content, category } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

// Delete a blog post by ID
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(400).json({
        err: "Blog not found",
      });
    }

    if (blog.author.toString() !== req.auth._id) {
      return res.status(403).json({
        err: "You are not authorized to perform this action",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

const getBlogsByUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const totalBlogs = await Blog.countDocuments({ author: req.params.userId });
    const totalPages = Math.ceil(totalBlogs / limit);

    const blogs = await Blog.find({ author: req.params.userId })
      .populate("author")
      .populate("category")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: blogs.length,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
      },
      blogs,
    });
  } catch (err) {
    return res.status(400).json({
      err: errorHandler(err),
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByUser,
};
