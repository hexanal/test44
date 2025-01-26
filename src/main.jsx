import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import SandboxOne from "./pages/SandboxOne";
import SandboxTwo from "./pages/SandboxTwo";
import ControllersDebug from "./pages/ControllersDebug";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/sandbox1",
    element: <SandboxOne />
  },
  {
    path: "/sandbox2",
    element: <SandboxTwo />
  },
  {
    path: "/debug/controllers",
    element: <ControllersDebug />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
