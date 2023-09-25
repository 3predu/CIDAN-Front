import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";

import {
  createBrowserRouter, //criação de rotas
  RouterProvider, //provedor das rotas
} from "react-router-dom";

import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Unities from "./pages/Unities";
import Requirements from "./pages/Requirements";
import RequirementUnities from "./pages/RequirimentsUnities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/unities",
    element: <Unities />,
  },
  {
    path: "/requirements",
    element: <Requirements />,
  },
  {
    path: "/unities/:id/requirements",
    element: <RequirementUnities />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
