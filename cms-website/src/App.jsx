// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./Components/PostList";
import PostDetail from "./Components/PostDetail";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetail />} />
    </Routes>
  </Router>
);

export default App;
