import React from "react";

import BlogForm from "./assets/components/BlogForm/BlogForm";
import BlogSection from "./assets/components/BlogList/BlogSection";

const App = () => {
  return (
    <>
      <h1>Welcome to The Blog List Project</h1>
      <BlogForm />
      <br />
      <BlogSection />
    </>
  );
};

export default App;
