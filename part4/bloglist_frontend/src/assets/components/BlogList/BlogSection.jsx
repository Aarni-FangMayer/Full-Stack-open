import React from "react";
import BlogsList from "./BlogsList";
import "./blogSection.css";

const BlogSection = () => {
  const blogs = [
    { id: 1, author: "JJ", name: "jj11", url: "jj.com", reviews: 5, likes: 0 },
    { id: 2, author: "LL", name: "ll22", url: "ll.com", reviews: 3, likes: 0 },
    { id: 3, author: "KK", name: "kk33", url: "kk.com", reviews: 0, likes: 0 },
    { id: 4, author: "XX", name: "xx44", url: "xx.com", reviews: 10, likes: 0 },
  ];

  return (
    <div className="blogSection">
      <h2>List of favourite blogs</h2>
      <BlogsList blogs={blogs} />
    </div>
  );
};

export default BlogSection;
