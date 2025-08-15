const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

const cors = require("cors");
app.use(cors());

let blogs = [
  {
    id: "1",
    author: "Billboard",
    name: "WorldWide News",
    url: "https://www.billboard.com/",
    reviews: 5,
    likes: 5,
  },
  {
    id: "2",
    author: "Business Insider",
    name: "Economics Articles",
    url: "https://www.businessinsider.com/",
    reviews: 3,
    likes: 4,
  },
  {
    id: "3",
    author: "TMZ",
    name: "Podcasts, interviews, videos",
    url: "https://www.tmz.com/",
    reviews: 0,
    likes: 4,
  },
  {
    id: "4",
    author: "Yahoo! Sports",
    name: "Sport News",
    url: "https://sports.yahoo.com/",
    reviews: 10,
    likes: 3,
  },
];

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(requestLogger);

app.get("/api/blogs", (request, response) => {
  response.json(blogs);
});

app.get("/api/blogs/:id", (request, response) => {
  const id = request.params.id;
  const blog = blogs.find((blog) => blog.id === id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

app.post("/api/blogs", (request, response) => {
  const blog = request.body;
  blog.id = Date.now();
  blogs = blogs.concat(blog);
  response.status(201).json(blog);
});

app.put("/api/blogs/:id", (request, response) => {
  const id = request.params.id;
  const blogData = request.body;
  const blogIndex = blogs.findIndex((blog) => String(blog.id) === String(id));

  if (blogIndex === -1) {
    return response.status(404).json({ error: "Blog not found" });
  }

  const updatedBlog = {
    ...blogs[blogIndex],
    likes: blogData.likes,
  };

  blogs[blogIndex] = updatedBlog;
  response.json(updatedBlog);
});

const path = require("path");

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
