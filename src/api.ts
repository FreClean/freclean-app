const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";
const REQUEST_TIMEOUT_MS = 15_000;

export async function apiFetch<T>(path: string, opts: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, ...rest } = opts;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...rest,
      signal: rest.signal ?? controller.signal,
      headers: {
        Accept: "application/json",
        ...(rest.body && !(rest.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...rest.headers,
      },
    });
    const body = await res.json().catch(() => undefined);
    if (!res.ok) {
      const message = body && typeof body === "object" && "error" in body && typeof body.error === "string"
        ? body.error
        : `Request failed: ${res.status}`;
      throw new Error(message);
    }
    return body as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("The request timed out. Please try again.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}