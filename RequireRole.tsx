import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, type Role } from "../lib/auth.js";

export function RequireRole({ role, children }: { role: Role; children: React.ReactNode }) {
  const { session, hasRole } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  if (!hasRole(role)) return <Navigate to="/" replace />;
  return <>{children}</>;
}
