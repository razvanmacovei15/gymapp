
import { StrictMode } from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./components/AuthProvider.tsx";
import SignUpPage from "./pages/SignUp.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { PopupProvider } from "./components/popups/PopupContext";

import UnderDevelopment from "./pages/UnderDevelopment.jsx"; // Import UnderDevelopment page
import Tasks from "./components/Tasks.jsx"; // Import Tasks component
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles="ADMIN">
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <UnderDevelopment />, // Dashboard routed to Dashboard component
      },
      {
        path: "tasks",
        element: <Tasks />, // Tasks routed to the Tasks component
      },
      {
        path: "schedule",
        element: <UnderDevelopment />, // Schedule routed to UnderDevelopment
      },
      {
        path: "equipment",
        element: <UnderDevelopment />, // Equipment routed to UnderDevelopment
      },
      {
        path: "front-desk",
        element: <UnderDevelopment />, // Front Desk routed to UnderDevelopment
      },
      {
        path: "future-events",
        element: <UnderDevelopment />, // Front Desk routed to UnderDevelopment
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PopupProvider>
      <RouterProvider router={router} />
    </PopupProvider>
  </AuthProvider>
);
