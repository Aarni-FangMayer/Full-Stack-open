import React from "react";

import BlogInfo from "./BlogInfo";
import "./blogsList.css"

const BlogsList = ({ blogs }) => {
  return (
    <div className="blogsList">
      <ul>
        {blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <BlogInfo
                author={blog.author}
                name={blog.name}
                url={blog.url}
                reviews={blog.reviews}
                likes={blog.likes}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlogsList;
