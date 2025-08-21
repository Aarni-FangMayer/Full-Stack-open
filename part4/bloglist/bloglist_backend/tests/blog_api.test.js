const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    author: "Andey Goldman",
    name: "Test blog name 1",
    url: "http://test.com",
    reviews: 5,
    likes: 0,
  },
  {
    author: "Petr Romanov",
    name: "Test blog name 2",
    url: "http://test-2.com",
    reviews: 2,
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

/*
TEST REQUEST WITH PROMISE
*/
// test("all blogs are returned", () => {
//   api.get("/api/blogs").then((response) => {
//     assert.strictEqual(response.statusCode, 200);
//     assert.strictEqual(response.body.length, 2);
//   });
// });

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs").expect(200);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("unique identifier property is named id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  blogs.forEach((blog) => {
    assert(blog.id, "id property is missing");
    assert.strictEqual(blog._id, undefined);
  });
});

test("a valid blog can be added", async () => {
  const newBlog = {
    author: "Lee Hong",
    name: "Test blog name 3",
    url: "http://test-3.com",
    reviews: 5,
    likes: 0
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const names = response.body.map((r) => r.name);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  assert(names.includes("Test blog name 3"));
});

// test("if likes are missing, it is 0 by default", async () => {
//   const newBlog = {
//     author: "JJ.",
//     name: "Test blog name 4",
//     url: "http://test-4.com",
//     reviews: 3,
//   };

//   const response = await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .expect(201)
//     .expect("Content-Type", /application\/json/);

//   assert.strictEqual(response.body.likes, 0);
// });

test("blog without title(name) is not added", async () => {
  const newBlog = {
    author: "Madina Fiat",
    url: "http://test-5.com",
    reviews: 3,
    likes: 0
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400);
});

test("blog without url is not added", async () => {
  const newBlog = {
    author: "Pekka Suomalainen",
    name: "Test blog name 6",
    reviews: 5,
    likes: 0
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400);
});

after(async () => {
  await mongoose.connection.close();
});
