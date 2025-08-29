import React, { useState, useEffect } from "react";

import LoginForm from "./assets/components/LoginForm/LoginForm";
import BlogForm from "./assets/components/BlogForm/BlogForm";
import BlogSection from "./assets/components/BlogList/BlogSection";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./assets/components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    author: "",
    name: "",
    url: "",
    reviews: "",
    likes: "",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    blogService.getAll().then((data) => {
      console.log("Полученные данные: ", data);
      setBlogs(data);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message, type = "success", duration = 5000) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, duration);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      showNotification(`Welcome ${user.name}!`, "success");
    } catch (error) {
      console.error("full error:", error);
      showNotification(
        `Failed login: ${error.response?.data?.error || error.message}`,
        "error"
      );
    }
  };

  const addBlog = (event) => {
    event.preventDefault();

    const defaultReviews = Math.floor(Math.random() * 11);

    if (!formData.author && !formData.name && !formData.url) {
      alert("All field need to be filled");
      return;
    }

    const newBlog = {
      author: formData.author,
      name: formData.name,
      url: formData.url,
      reviews: defaultReviews,
      likes: 0,
    };
    blogService
      .create(newBlog)
      .then((addedBlog) => {
        setBlogs([...blogs, addedBlog]);
        setFormData({
          author: "",
          name: "",
          url: "",
          reviews: "",
          likes: "",
        });
        showNotification(
          `A new blog "${addedBlog.name}" by ${addedBlog.author} added successfully`,
          "success"
        );
      })
      .catch((error) => {
        console.error("Failed to add blog:", error);
        showNotification(
          `Failed to add blog: ${error.response?.data?.error || error.message}`,
          "error"
        );
      });
  };

  const handleAddLike = (id) => {
    const url = `http://localhost:3001/blogs/${id}`;
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    blogService.addLike(id, updatedBlog).then((response) => {
      setBlogs(blogs.map((blog) => (blog.id === id ? response.data : blog)));
    });
  };

  const handleDeleteBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    if (!blogToDelete) return;

    if (
      !window.confirm(
        `Are you sure you want to delete "${blogToDelete.name}" by ${blogToDelete.author}?`
      )
    ) {
      return;
    }

    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      showNotification(
        `Blog "${blogToDelete.name}" deleted successfully`,
        "warning"
      );
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert(`Failed to delete blog "${blogToDelete.name}". Please try again.`);
      showNotification(
        `Failed to delete blog "${blogToDelete.name}": ${
          error.response?.data?.error || error.message
        }`,
        "error"
      );
    }
  };

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );

  const personalBlogs = () => (
    <>
      <h2>Hi, {user.name} welcome to your personal blogs page!</h2>
      <button
        onClick={() => {
          window.localStorage.clear();
          setUser(null);
          showNotification("Logged out successfully", "warning");
        }}
      >
        Log out
      </button>
      <BlogForm
        addBlog={addBlog}
        formData={formData}
        setFormData={setFormData}
      />
      <BlogSection
        blogs={blogs}
        addLike={handleAddLike}
        deleteBlog={handleDeleteBlog}
      />
    </>
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome to The Blog List Project</h1>
      <Notification message={notification.message} type={notification.type} />
      {!user && loginForm()}
      {user && personalBlogs()}
    </>
  );
};

export default App;
