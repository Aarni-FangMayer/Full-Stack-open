import React from "react";
import "./blogInfo.css"

const BlogInfo = ({ author, name, url, reviews, likes }) => {
  return (
    <div className="blogInfo">
      <h3>Author: {author} </h3>
      <p>Title: {name} </p>
      <a>{url}</a>
      <p>Reviews: {reviews}</p>
      <button>Likes count {likes}</button>
    </div>
  );
};

export default BlogInfo;
