// const express = require("express");
// const config = require("./utils/config")
// const logger = require("./utils/logger")
// const blogsRouter = require("./controllers/blogs")

// const app = express();

// app.use(express.json());
// app.use(express.static("dist"));

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

// app.use(requestLogger);

// app.use("/api/blogs", blogsRouter)

// app.get("/api/blogs", (request, response, next) => {
//   Blog.find({})
//     .then((blogs) => {
//       if (blogs && blogs.length > 0) {
//         response.json(blogs);
//       } else {
//         response.status(404).json({ error: "No blogs found" });
//       }
//     })
//     .catch((error) => next(error));
// });

// app.get("/api/blogs/:id", (request, response, next) => {
//   Blog.findById(request.params.id)
//     .then((blog) => {
//       if (blog) {
//         response.json(blog);
//       } else {
//         response.status(404).json({ error: "Blog not found" });
//       }
//     })
//     .catch((error) => next(error));
// });

// app.post("/api/blogs", (request, response) => {
//   const body = request.body;

//   if (!body) {
//     return response.status(400).json({ error: "content missing" });
//   }

//   const blog = new Blog({
//     author: body.author,
//     name: body.name,
//     url: body.url,
//     reviews: Math.floor(Math.random() * 11),
//     likes: 0,
//   });

//   blog.save().then((savedBlog) => {
//     response.json(savedBlog);
//   });
// });

// app.put("/api/blogs/:id", (request, response, next) => {
//   const { likes } = request.body;

//   Blog.findByIdAndUpdate(
//     request.params.id,
//     { likes },
//     { new: true, runValidators: true, context: "query" }
//   )
//     .then((updatedBlog) => {
//       if (updatedBlog) {
//         response.json(updatedBlog);
//       } else {
//         response.status(404).json({ error: "Blog not found" });
//       }
//     })
//     .catch((error) => next(error));
// });

// app.put("/api/blogs/:id", (request, response) => {
//   const id = request.params.id;
//   const blogData = request.body;
//   const blogIndex = blogs.findIndex((blog) => String(blog.id) === String(id));

//   if (blogIndex === -1) {
//     return response.status(404).json({ error: "Blog not found" });
//   }

//   const updatedBlog = {
//     ...blogs[blogIndex],
//     likes: blogData.likes,
//   };

//   blogs[blogIndex] = updatedBlog;
//   response.json(updatedBlog);
// });

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };
// const errorHandler = (error, request, response, next) => {
//   console.error(error.message);

//   if (error.name === "CastError") {
//     return response.status(400).send({ error: "malformatted id" });
//   }

//   response.status(500).json({ error: "Something went wrong" });
// };

// app.use(unknownEndpoint);
// app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
