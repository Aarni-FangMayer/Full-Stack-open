/* eslint-disable react/prop-types */
import React from "react";
import "./blogForm.css";

const BlogForm = ({ addBlog, formData, setFormData }) => {
  return (
    <div className="formSection">
      <h2>Add new blog here</h2>
      <form onSubmit={addBlog}>
        <label>
          Author: <input type="text" placeholder="who is the author?" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
        </label>
        <label>
          Blog Name: <input type="text" placeholder="do blog have name?" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </label>
        <label>
          Link: <input type="text" placeholder="where you can read it?" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} />
        </label>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
