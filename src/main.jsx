import { StrictMode } from "react";
import App from "./App.jsx";
import "./index.css";
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/AuthProvider.tsx";
import SignUpPage from "./pages/SignUp.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { PopupProvider } from "./components/popups/PopupContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles="ADMIN">
        <App />
      </ProtectedRoute>
    ),
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
