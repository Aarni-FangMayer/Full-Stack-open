/* eslint-disable react/prop-types */
import React from "react";
import "./blogInfo.css";

const BlogInfo = ({ id, author, name, url, reviews, likes, addLike }) => {
  return (
    <div className="blogInfo">
      <h3>Author: {author} </h3>
      <p>Title: {name} </p>
      <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
      <p>Reviews: {reviews}</p>
      <button onClick={() => addLike(id)}>Likes count {likes}</button>
    </div>
  );
};

export default BlogInfo;
