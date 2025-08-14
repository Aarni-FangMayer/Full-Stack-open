import React from "react";

import BlogInfo from "./BlogInfo";

const BlogsList = ({ blogs }) => {
  return (
    <>
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
    </>
  );
};

export default BlogsList;
