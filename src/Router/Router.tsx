import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import React from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Dashboard/>,
        },
        {
          path: "/people",
          element: <h1>people</h1>,
        },
        {
          path: "/update-student",
          element: <h1>home</h1>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
