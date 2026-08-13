export type AdminAuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  loginType: string;
  myRole: number;
  status: string;
  organizationId?: number;
};

export type AdminAuthSession = {
  token: string;
  user: AdminAuthUser;
};

const ADMIN_AUTH_STORAGE_KEY = 'sbgbt-admin-auth-session';
const PUBLIC_AUTH_STORAGE_KEY = 'sbgbt-auth-session';

export function getPublicAppUrl() {
  const envUrl = import.meta.env.VITE_PUBLIC_APP_URL as string | undefined;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }

  if (typeof window === 'undefined') {
    return 'http://localhost:5174';
  }

  return window.location.origin.replace(/\/admin\/?$/, '');
}

function decodeBase64(value: string) {
  const binary = window.atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function readAdminAuthSession(): AdminAuthSession | null {
  const raw = window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AdminAuthSession;
    if (!parsed?.token || !parsed?.user) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeAdminAuthSession(session: AdminAuthSession) {
  window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearAdminAuthSession() {
  window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
}

export function clearPublicAuthSession() {
  window.localStorage.removeItem(PUBLIC_AUTH_STORAGE_KEY);
}

export function consumeAuthSessionFromUrl() {
  const url = new URL(window.location.href);
  const encodedSession = url.searchParams.get('authSession');
  if (!encodedSession) return null;

  try {
    const session = JSON.parse(decodeBase64(encodedSession)) as AdminAuthSession;
    if (!session?.token || !session?.user) {
      throw new Error('Invalid auth session');
    }

    writeAdminAuthSession(session);
    url.searchParams.delete('authSession');
    window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
    return session;
  } catch {
    return null;
  }
}

export function getPublicLoginUrl(loginType?: string) {
  const loginPath =
    loginType === 'utthan_manager'
      ? '/utthan-manager-login'
      : loginType === 'sbgbp_manager'
      ? '/sbgbp-manager-login'
      : loginType === 'member'
      ? '/member-login'
      : '/admin-login';

  return `${getPublicAppUrl()}${loginPath}`;
}
