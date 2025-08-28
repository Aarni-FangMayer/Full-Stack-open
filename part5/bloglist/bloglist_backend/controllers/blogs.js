const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", (request, response, next) => {
  Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .then((blogs) => {
      if (blogs && blogs.length > 0) {
        response.json(blogs);
      } else {
        response.status(404).json({ error: "No blogs found" });
      }
    })
    .catch((error) => next(error));
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .populate("user", { username: 1, name: 1 })
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).json({ error: "Blog not found" });
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const body = request.body;
    const user = request.user;

    if (!body || !body.name || !body.url) {
      return response.status(400).json({ error: "name or url missing" });
    }

    if (!user) {
      return response
        .status(400)
        .json({ error: "userId missing or not valid" });
    }

    const blog = new Blog({
      author: body.author,
      name: body.name,
      url: body.url,
      reviews: body.reviews || 0,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", (request, response, next) => {
  const { likes } = request.body;

  Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true, context: "query" }
  )
    .populate("user", { username: 1, name: 1 })
    .then((updatedBlog) => {
      if (updatedBlog) {
        response.json(updatedBlog);
      } else {
        response.status(404).json({ error: "Blog not found" });
      }
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (!user || blog.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: "not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
