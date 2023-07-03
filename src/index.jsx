import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";

import {
  createBrowserRouter, //criação de rotas
  RouterProvider, //provedor das rotas
} from "react-router-dom";

import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RouterProvider
    router={router}
  />
);
