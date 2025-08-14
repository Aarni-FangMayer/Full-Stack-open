import React from "react";

const BlogInfo = ({ author, name, url, reviews, likes }) => {
  return (
    <>
      <h3>Author: {author} </h3>
      <p>Title: {name} </p>
      <a>{url}</a>
      <p>Reviews: {reviews}</p>
      <button>Likes count {likes}</button>
    </>
  );
};

export default BlogInfo;
