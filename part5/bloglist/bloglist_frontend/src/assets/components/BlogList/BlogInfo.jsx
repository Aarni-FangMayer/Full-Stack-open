/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./blogInfo.css";

const BlogInfo = ({ id, author, name, url, reviews, likes, addLike, deleteBlog, username }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const shortInfo = () => {
    return (
      <div className="blogInfo">
        <h3 className="titleHide">{name}</h3>
        <button id="showMoreButton" onClick={() => setShowMoreInfo(true)}>Show more info</button>
      </div>
    )
  };

  const deleteButton = () => {
    return (
      <button id="deleteButton" onClick={() => deleteBlog(id)}>Delete</button>
    )
  }

  const fullInfo = () => {
    return (
      <div className="blogInfo">
      <h3>Author: {author} </h3>
      <p>Title: {name} </p>
      <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
      <p>Reviews: {reviews}</p>
      <p>Likes: {likes}</p>
      <button onClick={() => addLike(id)}>Like</button>
      {author === username ? deleteButton() : ""}
      <button id="hideInfoButton" onClick={()=> setShowMoreInfo(null)}>hide info</button>
    </div>
    )
  }
  return (
    <>
      {showMoreInfo ? fullInfo() : shortInfo()}
    </>
    
  );
};

export default BlogInfo;
