import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root/root.tsx";
import ErrorPage from "./error-page.tsx";
import "./index.css";
import "./App.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Task from "./routes/task/task.tsx";
import Header from "./components/Header/Header.tsx";
import taskLoader from "./routes/task/loader.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Root />,
      },

      {
        path: "problem/:problemId",
        element: <Task />,
        loader: taskLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
