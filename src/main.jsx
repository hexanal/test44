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
import Viewports from "./pages/Viewports";
import VectorOperations from "./pages/VectorOperations";
import ControllersDebug from "./pages/ControllersDebug";

import { Sandbox3 } from "./pages/Sandbox3";
import { Sandbox4 } from "./pages/Sandbox4";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/vector-operations",
    element: <VectorOperations />
  },
  {
    path: "/sandbox1",
    element: <SandboxOne />
  },
  {
    path: "/viewports",
    element: <Viewports />
  },
  {
    path: "/sandbox2",
    element: <SandboxTwo />
  },
  {
    path: "/sandbox3",
    element: <Sandbox3 />
  },
  {
    path: "/sandbox4",
    element: <Sandbox4 />
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
