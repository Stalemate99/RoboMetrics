import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { ChildrenProps } from "../types/DefaultProps";

export const ProtectedRoute = ({ children }: ChildrenProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};
