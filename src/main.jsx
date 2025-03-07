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
//doar de test test
const router = createBrowserRouter([
  {
    path: "/gymapp",
    element: (
      <ProtectedRoute allowedRoles="ADMIN">
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />, // Dashboard routed to Dashboard component
      },
      {
        path: "tasks",
        element: <Tasks />, // Tasks routed to the Tasks component
      },
      
    ],
  },
  {
    path: "/gymapp/login",
    element: <LoginPage />,
  },
  {
    path: "/gymapp/signup",
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
