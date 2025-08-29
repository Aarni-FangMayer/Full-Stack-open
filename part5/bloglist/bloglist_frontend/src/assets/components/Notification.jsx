/* eslint-disable react/prop-types */
import React from "react";

const Notification = ({ message, type }) => {
  if (!message) return null;

  const baseStyle = {
    padding: 10,
    marginBottom: 10,
    border: "1px solid",
    borderRadius: 5,
    fontWeight: "bold",
    maxWidth: 600,
    margin: "10px auto",
    textAlign: "center",
  };

  const successStyle = {
    ...baseStyle,
    color: "green",
    backgroundColor: "#e0f8e0",
    borderColor: "green",
  };

  const errorStyle = {
    ...baseStyle,
    color: "red",
    backgroundColor: "#fde0e0",
    borderColor: "red",
  };

  const warningStyle = {
    ...baseStyle,
    color: "orange",
    backgroundColor: "#fff4e0",
    borderColor: "orange",
  };

  const style =
    type === "error"
      ? errorStyle
      : type === "warning"
      ? warningStyle
      : successStyle;

  return <div style={style}>{message}</div>;
};

export default Notification;
