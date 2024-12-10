import { PropsWithChildren } from "react";
import { useAuth, User } from "./AuthProvider";
import React from "react";
import LoginPage from "../pages/LoginPage";
import UnauthorizedPage from "./UnauthorizedPage";

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
    return <UnauthorizedPage />;
  }

  return children;
}
