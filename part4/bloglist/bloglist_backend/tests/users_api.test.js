const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const initialUser = new User({
    username: "existinguser",
    name: "Existing User",
    passwordHash: await bcrypt.hash("password123", 10),
  });
  await initialUser.save();
});

test("fails if username is missing", async () => {
  const newUser = { name: "NoUsername", password: "validpass" };

  const result = await api.post("/api/users").send(newUser).expect(400);
  assert(result.body.error.includes("username and password are required"));

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, 1);
});

test("fails if password is missing", async () => {
  const newUser = { username: "nouserpass", name: "NoPassword" };

  const result = await api.post("/api/users").send(newUser).expect(400);
  assert(result.body.error.includes("username and password are required"));

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, 1);
});

test("fails if username is too short", async () => {
  const newUser = {
    username: "ab",
    name: "ShortUsername",
    password: "validpass",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);
  assert(
    result.body.error.includes("username must be at least 3 characters long")
  );

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, 1);
});

test("fails if password is too short", async () => {
  const newUser = {
    username: "validusername",
    name: "ShortPassword",
    password: "12",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);
  assert(
    result.body.error.includes("password must be at least 3 characters long")
  );

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, 1);
});

test("fails if username already exists", async () => {
  const newUser = {
    username: "existinguser",
    name: "DuplicateUser",
    password: "anotherpass",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);
  assert(result.body.error.includes("username must be unique"));

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, 1);
});

test("succeeds with valid username and password", async () => {
  const newUser = {
    username: "newuser",
    name: "New User",
    password: "strongpassword",
  };

  await api.post("/api/users").send(newUser).expect(201);

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, 2);

  const usernames = usersAtEnd.map((u) => u.username);
  assert(usernames.includes("newuser"));
});

after(async () => {
  await mongoose.connection.close();
});
