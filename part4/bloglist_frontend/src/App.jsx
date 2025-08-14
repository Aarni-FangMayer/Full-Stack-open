import React, { useState } from "react";

import BlogForm from "./assets/components/BlogForm/BlogForm";
import BlogSection from "./assets/components/BlogList/BlogSection";

const App = () => {
  const [blogs, setBlogs] = useState([
    { id: 1, author: "Billboard", name: "WorldWide News", url: "https://www.billboard.com/", reviews: 5, likes: 0 },
    { id: 2, author: "Business Insider", name: "Economics Articles", url: "https://www.businessinsider.com/", reviews: 3, likes: 0 },
    { id: 3, author: "TMZ", name: "Podcasts, interviews, videos", url: "https://www.tmz.com/", reviews: 0, likes: 0 },
    { id: 4, author: "Yahoo! Sports", name: "Sport News", url: "https://sports.yahoo.com/", reviews: 10, likes: 0 },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    author: "",
    name: "",
    url: "",
    reviews: "",
    likes: "",
  });

  const addBlog = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const newId = Date.now();
    const defaultReviews = Math.floor(Math.random() * 11);
    const newBlog = {
      id: newId,
      author: formData.author,
      name: formData.name,
      url: formData.url,
      reviews: defaultReviews,
      likes: 0,
    };
    setBlogs([...blogs, newBlog]);
    console.log(formData);
    setFormData({
      id: "",
      author: "",
      name: "",
      url: "",
      reviews: "",
      likes: "",
    });
  };

  const handleAddLike = (id) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    );
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
      <BlogSection blogs={blogs} addLike={handleAddLike} />
    </>
  );
};

export default App;
