const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response, next) => {
  Blog.find({})
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
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).json({ error: "Blog not found" });
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body || !body.name || !body.url) {
      return response.status(400).json({ error: "name or url missing" });
    }

    const blog = new Blog({
      author: body.author,
      name: body.name,
      url: body.url,
      reviews: body.reviews || 0,
      likes: body.likes
    });

    const savedBlog = await blog.save();
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
    .then((updatedBlog) => {
      if (updatedBlog) {
        response.json(updatedBlog);
      } else {
        response.status(404).json({ error: "Blog not found" });
      }
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id);

    if (deletedBlog) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
