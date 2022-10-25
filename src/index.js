import { BrowserRouter } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
// import TestRedBlackTree from "./core/RedBlackTree/TestRedBlackTree";

ReactDOM.render(
  <BrowserRouter>
    {/* <BinarySearchTree /> */}
    <App />
    {/* <TestRedBlackTree /> */}
  </BrowserRouter>,
  document.getElementById("root")
);
