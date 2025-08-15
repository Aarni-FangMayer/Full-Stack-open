/* eslint-disable react/prop-types */
import React from "react";

import BlogInfo from "./BlogInfo";
import "./blogsList.css";

const BlogsList = ({ blogs, addLike }) => {
  if (!blogs || blogs.length === 0) {
    return <p>Блоги не найдены...</p>
  }
  return (
    <div className="blogsList">
      <ul>
        {blogs.map((blog) => {
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
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlogsList;
