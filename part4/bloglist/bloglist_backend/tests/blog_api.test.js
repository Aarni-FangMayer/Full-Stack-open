const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

if (process.env.NODE_ENV !== "test") {
  throw new Error(
    "Tests must run with NODE_ENV=test! Otherwise you risk modifying the main database."
  );
}

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

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("password123", 10);
  const user = new User({
    username: "existinguser",
    name: "Existing User",
    passwordHash,
  });
  await user.save();

  const loginResponse = await api
    .post("/api/login")
    .send({ username: "existinguser", password: "password123" });

  token = loginResponse.body.token;

  await Blog.insertMany(
    initialBlogs.map((blog) => ({ ...blog, user: user._id }))
  );
});

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
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const names = response.body.map((r) => r.name);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  assert(names.includes("Test blog name 3"));
});

test("adding a blog fails with 401 if token is not provided", async () => {
  const newBlog = {
    author: "Unauthorized User",
    name: "Blog Without Token",
    url: "http://unauth.com",
    reviews: 1,
    likes: 0
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401);
});

test("blog without title(name) is not added", async () => {
  const newBlog = {
    author: "Madina Fiat",
    url: "http://test-5.com",
    reviews: 3,
    likes: 0,
  };

  await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(400);
});

test("blog without url is not added", async () => {
  const newBlog = {
    author: "Pekka Suomalainen",
    name: "Test blog name 6",
    reviews: 5,
    likes: 0,
  };

  await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(400);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await api.get("/api/blogs");
  const blogToDelete = blogsAtStart.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).set("Authorization", `Bearer ${token}`).expect(204);

  const blogsAtEnd = await api.get("/api/blogs");

  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1);

  const names = blogsAtEnd.body.map((r) => r.name);
  assert(!names.includes(blogToDelete.name));
});

after(async () => {
  await mongoose.connection.close();
});
