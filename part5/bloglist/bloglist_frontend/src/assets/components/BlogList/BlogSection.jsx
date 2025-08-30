import React from "react";
import BlogsList from "./BlogsList";
import "./blogSection.css";

const BlogSection = ({ blogs, addLike, deleteBlog, username }) => {
  return (
    <div className="blogSection">
      <h2>List of favourite blogs</h2>
      <BlogsList blogs={blogs} addLike={addLike} deleteBlog={deleteBlog} username={username} />
    </div>
  );
};

export default BlogSection;
