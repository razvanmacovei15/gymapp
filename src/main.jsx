import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./components/AuthProvider.tsx";
import SignUpPage from "./pages/SignUp.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { PopupProvider } from "./components/popups/PopupContext";

import Tasks from "./components/Tasks.jsx";
import Dashboard from "./pages/Dashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PopupProvider>
        <HashRouter>
          <Routes>
            {/* Protected routes under /gymapp */}
            <Route
              path="/gymapp"
              element={
                <ProtectedRoute allowedRoles="ADMIN">
                  <App />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
            </Route>

            {/* Public routes */}
            <Route path="/gymapp/login" element={<LoginPage />} />
            <Route path="/gymapp/signup" element={<SignUpPage />} />
          </Routes>
        </HashRouter>
      </PopupProvider>
    </AuthProvider>
  </StrictMode>
);
