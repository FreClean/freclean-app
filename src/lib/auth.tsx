import React, { createContext, useContext, useState } from "react";

export type Role = "CUSTOMER" | "STAFF" | "MANAGER" | "ADMIN" | "OWNER";

interface Session {
  accessToken: string;
  userId: string;
  roles: Role[];
}

interface AuthContextValue {
  session: Session | null;
  setSession: (s: Session | null) => void;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const ROLE_RANK: Record<Role, number> = { CUSTOMER: 0, STAFF: 1, MANAGER: 2, ADMIN: 3, OWNER: 4 };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  const hasRole = (role: Role) => {
    if (!session) return false;
    const maxRank = Math.max(...session.roles.map((r) => ROLE_RANK[r]));
    return maxRank >= ROLE_RANK[role];
  };

  return (
    <AuthContext.Provider value={{ session, setSession, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}