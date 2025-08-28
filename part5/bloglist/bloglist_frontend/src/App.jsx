import React, { useState, useEffect } from "react";

import BlogForm from "./assets/components/BlogForm/BlogForm";
import BlogSection from "./assets/components/BlogList/BlogSection";
import blogService from "./services/blogs";

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

  useEffect(() => {
    blogService.getAll().then((data) => {
      console.log("Полученные данные: ", data);
      setBlogs(data);
    });
  }, []);

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
    blogService.create(newBlog).then((response) => {
      setBlogs([...blogs, response.data]);
      setFormData({
        author: "",
        name: "",
        url: "",
        reviews: "",
        likes: "",
      });
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

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      blogService.deleteBlog(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      });
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome to The Blog List Project</h1>
      <BlogForm
        addBlog={addBlog}
        formData={formData}
        setFormData={setFormData}
      />
      <br />
      <BlogSection blogs={blogs} addLike={handleAddLike} deleteBlog={handleDeleteBlog}/>
    </>
  );
};

export default App;
