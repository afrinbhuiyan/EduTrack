import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routes";
import { RouterProvider } from "react-router";
import { HeadProvider } from "react-head"; 
import AuthProvider from "./contexts/AuthProvider";

const headTags = [];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeadProvider headTags={headTags}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HeadProvider>
  </StrictMode>
);
