/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import BlogsList from "./BlogsList";
import "./blogSection.css";

const BlogSection = ({ blogs, addLike, deleteBlog }) => {
  return (
    <div className="blogSection">
      <h2>List of favourite blogs</h2>
      <BlogsList blogs={blogs} addLike={addLike} deleteBlog={deleteBlog} />
    </div>
  );
};

export default BlogSection;
