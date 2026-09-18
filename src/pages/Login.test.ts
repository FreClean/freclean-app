import { describe, expect, it } from "vitest";
import { isLoginResponse } from "./Login";

describe("isLoginResponse", () => {
  it("accepts a server response with a known role", () => {
    expect(isLoginResponse({
      accessToken: "signed-token",
      user: { id: "user-1", roles: ["STAFF"] },
    })).toBe(true);
  });

  it("rejects missing roles instead of assigning a client default", () => {
    expect(isLoginResponse({
      accessToken: "signed-token",
      user: { id: "user-1" },
    })).toBe(false);
  });

  it("rejects unknown roles", () => {
    expect(isLoginResponse({
      accessToken: "signed-token",
      user: { id: "user-1", roles: ["SUPERUSER"] },
    })).toBe(false);
  });
});