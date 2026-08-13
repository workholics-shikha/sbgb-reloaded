export type LoginType = "admin" | "utthan_manager" | "sbgbp_manager" | "member";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  loginType: LoginType;
  myRole: number;
  status: string;
  organizationId?: number;
};

type AuthSession = {
  token: string;
  user: AuthUser;
};

const AUTH_STORAGE_KEY = "sbgbt-auth-session";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

function isBrowser() {
  return typeof window !== "undefined";
}

export function readAuthSession(): AuthSession | null {
  if (!isBrowser()) return null;

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.token || !parsed?.user) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeAuthSession(session: AuthSession) {
  if (!isBrowser()) return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function getAuthSession() {
  return readAuthSession();
}

export async function loginWithCredentials(input: {
  email: string;
  password: string;
  loginType: LoginType;
}) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const result = (await response.json().catch(() => null)) as
    | { token: string; user: AuthUser; message?: string }
    | { message?: string }
    | null;

  if (!response.ok || !result || !("token" in result) || !result.token || !result.user) {
    throw new Error(result?.message || "Login failed");
  }

  writeAuthSession({ token: result.token, user: result.user });
  return { token: result.token, user: result.user };
}

export async function logoutUser() {
  const session = readAuthSession();

  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: session?.token ? { Authorization: `Bearer ${session.token}` } : undefined,
    });
  } catch {
    // Stateless auth logout is best-effort.
  } finally {
    if (isBrowser()) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }
}

function toBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
}

function getDefaultAdminAppUrl() {
  if (!isBrowser()) {
    return "http://localhost:5174/admin";
  }

  const envUrl = import.meta.env.VITE_ADMIN_APP_URL as string | undefined;
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  const { origin } = window.location;
  return `${origin}/admin`;
}

export function getDashboardPath(loginType: LoginType) {
  if (loginType === "utthan_manager") return "registered-students";
  if (loginType === "sbgbp_manager") return "registered-spgbp";
  return "";
}

export function redirectToAdminDashboard(session: AuthSession) {
  if (!isBrowser()) return;

  const encodedSession = toBase64(JSON.stringify(session));
  const adminAppUrl = `${getDefaultAdminAppUrl().replace(/\/+$/, "")}/`;
  const dashboardPath = getDashboardPath(session.user.loginType);
  const target = new URL(dashboardPath || ".", adminAppUrl);
  target.searchParams.set("authSession", encodedSession);
  window.location.href = target.toString();
}
