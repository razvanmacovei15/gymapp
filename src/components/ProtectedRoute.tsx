import { PropsWithChildren } from "react";
import { useAuth, User } from "./AuthProvider";
import React from "react";
import LoginPage from "../pages/LoginPage";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles: User["role"];
};

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { authState } = useAuth();

  const currentUser = authState.currentUser;

  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  if (
    currentUser === null ||
    (allowedRoles && !allowedRoles.includes(currentUser.role))
  ) {
    alert("You are not allowed to access this page");
    return <LoginPage />;
  }

  return children;
}
