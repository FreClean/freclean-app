import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api.js";
import { useAuth, type Role } from "../lib/auth.js";

interface LoginResponse {
  accessToken: string;
  user: { id: string; roles: Role[] };
}

export function isLoginResponse(value: unknown): value is LoginResponse {
  if (!value || typeof value !== "object") return false;
  const response = value as Partial<LoginResponse>;
  return typeof response.accessToken === "string"
    && response.accessToken.length > 0
    && typeof response.user?.id === "string"
    && Array.isArray(response.user.roles)
    && response.user.roles.every((role) => ["CUSTOMER", "STAFF", "MANAGER", "ADMIN", "OWNER"].includes(role));
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setSession } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await apiFetch<unknown>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!isLoginResponse(result)) throw new Error("The authentication response was invalid.");
      setSession({ accessToken: result.accessToken, userId: result.user.id, roles: result.user.roles });
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to log in.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Log in</h1>
      {error && <p role="alert">{error}</p>}
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}