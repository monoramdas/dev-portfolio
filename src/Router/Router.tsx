import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import React from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Registration from "../Pages/Registration/Registration";
import Login from "@/Pages/Login/Login";
import Profile from "@/Pages/Profile/Profile";
import Explore from "@/Pages/Explore/Explore";
import ProtectedRoute from "@/Components/ProtectedRoute/ProtectedRoute";
import UserDetailsForm from "@/Pages/UserDetailsForm/userDetailsForm";
import ProjectDetailsForm from "@/Pages/ProjectDetailsForm/ProjectDetailsForm";
import UsersProfile from "@/Pages/Explore/UsersProfile/UsersProfile";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/register",
          element: <Registration />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/additional-details",
          element: (
            <ProtectedRoute>
              <UserDetailsForm/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/project-details",
          element: (
            <ProtectedRoute>
              <ProjectDetailsForm/>
            </ProtectedRoute>
          ),
        },
        {
          path: "/explore",
          element: (
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          ),
        },
        {
          path: "/explore-users",
          element: (
            <ProtectedRoute>
              <UsersProfile/>
            </ProtectedRoute>
          ),
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
