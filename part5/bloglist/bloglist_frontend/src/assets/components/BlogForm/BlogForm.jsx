/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import "../../../services/blogs";
import "./blogForm.css";

const BlogForm = ({ addBlog }) => {
  const [author, setAuthor] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!author || !name || !url) {
      alert("All fields need to be filled");
      return;
    }

    const defaultReviews = Math.floor(Math.random() * 11);

    const newBlog = {
      author,
      name,
      url,
      reviews: defaultReviews,
      likes: 0,
    };

    addBlog(newBlog);

    setAuthor("");
    setName("");
    setUrl("");
  };

  return (
    <div className="formSection">
      <h2>Add new blog here</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Author:{" "}
          <input
            type="text"
            placeholder="who is the author?"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Blog Name:{" "}
          <input
            type="text"
            placeholder="do blog have name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Link:{" "}
          <input
            type="text"
            placeholder="where you can read it?"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
