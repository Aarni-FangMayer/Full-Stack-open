/* eslint-disable react/prop-types */
import React, { useState } from "react";

import BlogInfo from "./BlogInfo";
import "./blogsList.css";

const BlogsList = ({ blogs, addLike, deleteBlog }) => {
  const [sortByLikesCount, setSortByLikesCount] = useState(false);

  if (!blogs || blogs.length === 0) {
    return <p>Loading information about saved blogs...</p>;
  }

  const sortFavoriteBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  const sortDislikedBlogs = [...blogs].sort((a, b) => a.likes - b.likes);

  const favoriteBlogs = () => {
    return (
      <div className="blogsList">
        <button
          style={{ marginLeft: "40px", cursor: "pointer" }}
          onClick={() => setSortByLikesCount(!sortByLikesCount)}
        >
          Show blogs with less likes first
        </button>
        <ul>
          {sortFavoriteBlogs.map((blog) => {
            return (
              <li key={blog.id}>
                <BlogInfo
                  id={blog.id}
                  author={blog.author}
                  name={blog.name}
                  url={blog.url}
                  reviews={blog.reviews}
                  likes={blog.likes}
                  addLike={addLike}
                  deleteBlog={deleteBlog}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const dislikedBlogs = () => {
    return (
      <div className="blogsList">
        <button
          style={{ marginLeft: "40px", cursor: "pointer" }}
          onClick={() => setSortByLikesCount(!sortByLikesCount)}
        >
          Show blogs with most likes first
        </button>
        <ul>
          {sortDislikedBlogs.map((blog) => {
            return (
              <li key={blog.id}>
                <BlogInfo
                  id={blog.id}
                  author={blog.author}
                  name={blog.name}
                  url={blog.url}
                  reviews={blog.reviews}
                  likes={blog.likes}
                  addLike={addLike}
                  deleteBlog={deleteBlog}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <>{sortByLikesCount ? favoriteBlogs() : dislikedBlogs()}</>

    // <div className="blogsList">
    //   <ul>
    //     {blogs.map((blog) => {
    //       return (
    //         <li key={blog.id}>
    //           <BlogInfo
    //             id={blog.id}
    //             author={blog.author}
    //             name={blog.name}
    //             url={blog.url}
    //             reviews={blog.reviews}
    //             likes={blog.likes}
    //             addLike={addLike}
    //             deleteBlog={deleteBlog}
    //           />
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
  );
};

export default BlogsList;
