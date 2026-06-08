const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

/**
 * Authenticate with the backend and store tokens in sessionStorage.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{access_token: string, refresh_token: string, token_type: string}>}
 */
export async function login(username, password) {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail ?? 'Invalid username or password');
  }

  const data = await response.json();
  sessionStorage.setItem('access_token', data.access_token);
  sessionStorage.setItem('refresh_token', data.refresh_token);
  return data;
}

/**
 * Remove tokens from sessionStorage (logout).
 */
export function logout() {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
}

/**
 * Returns true if a session token exists.
 */
export function isAuthenticated() {
  return Boolean(sessionStorage.getItem('access_token'));
}

/**
 * Get the stored access token.
 */
export function getAccessToken() {
  return sessionStorage.getItem('access_token');
}
