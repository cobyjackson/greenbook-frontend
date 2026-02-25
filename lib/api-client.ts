"use client";

export const PROXY_PREFIX = "/api/proxy";

const TOKEN_STORAGE_KEY = "greenbook.auth.token";

type RequestOptions = {
  auth?: boolean;
  body?: unknown;
  headers?: HeadersInit;
};

export class ApiError extends Error {
  status: number;
  responseBody: unknown;

  constructor(message: string, status: number, responseBody: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.responseBody = responseBody;
  }
}

type LoginResponse = {
  token: string;
  expiresAt?: string;
};

function hasWindow() {
  return typeof window !== "undefined";
}

export function getAuthToken(): string | null {
  if (!hasWindow()) return null;

  try {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string) {
  if (!hasWindow()) return;

  try {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    // Ignore storage access errors in dev environments with restricted storage.
  }
}

export function clearAuthToken() {
  if (!hasWindow()) return;

  try {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // Ignore storage access errors in dev environments with restricted storage.
  }
}

function buildUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${PROXY_PREFIX}${normalizedPath}`;
}

async function parseResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text;
}

async function apiRequest<T>(
  method: "GET" | "POST",
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth !== false) {
    const token = getAuthToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiError(`API request failed with status ${response.status}`, response.status, responseBody);
  }

  return responseBody as T;
}

export function apiGet<T>(path: string, options?: Omit<RequestOptions, "body">) {
  return apiRequest<T>("GET", path, options);
}

export function apiPost<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) {
  return apiRequest<T>("POST", path, { ...options, body });
}

export async function login(username: string, password: string) {
  const response = await apiPost<LoginResponse>(
    "/auth/authenticate",
    {
      emailOrUsername: username,
      password,
    },
    { auth: false },
  );

  if (!response.token) {
    throw new Error("Authentication succeeded but no token was returned.");
  }

  setAuthToken(response.token);
  return response;
}
