import { PropsWithChildren } from "react";
import { useAuth, User } from "./AuthProvider";
import React from "react";
import NoUserPage from "../pages/NoUserPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";

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

  if (currentUser === null) {
    return <NoUserPage />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <UnauthorizedPage />;
  }

  return children;
}
