import React from "react";
import { useState } from "react";

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  const buttonStyle = {
    width: "250px",
    backgroundColor: "#97c6f1",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid black",
    color: "black",
    marginTop: "10px",
    cursor: "pointer",
    marginLeft: "40px",
  };

  const buttonStyleRed = {
    width: "250px",
    backgroundColor: "#f1979cff",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid black",
    color: "black",
    marginTop: "10px",
    cursor: "pointer",
    marginLeft: "40px",
  };
  return (
    <>
      <div style={hideWhenVisible}>
        <button style={buttonStyle} onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button style={buttonStyleRed} onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  );
};

export default Togglable;
