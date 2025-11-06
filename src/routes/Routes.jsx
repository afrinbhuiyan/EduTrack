import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Schedule from "../pages/dashboard/Schedule";
import Budget from "../pages/dashboard/Budget";
import ExamPlanner from "../pages/dashboard/ExamPlanner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, Component: Home }],
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    path: "*",
    element: (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
      </div>
    ),
  },
  {
    path: "dashboard", 
    element: <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute> ,
    children: [
      {
        index: true,
        element: (
          <div className="p-4">
            <h2 className="text-2xl font-bold">Dashboard Home</h2>
            <p>Welcome to your dashboard!</p>
          </div>
        ),
      },
      {
        path: "schedule",
        Component: Schedule,
      },
      {
        path: "budget",
        Component: Budget,
      },
      {
        path: "exam",
        Component: ExamPlanner,
      }
    ],
  }
]);
