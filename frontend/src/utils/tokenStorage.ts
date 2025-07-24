const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

/* ------------------------------------------------------------------ */
/* getters                                                            */
/* ------------------------------------------------------------------ */
export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_KEY);

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_KEY);

/* ------------------------------------------------------------------ */
/* setters                                                            */
/* ------------------------------------------------------------------ */
export const setTokens = (access: string, refresh: string): void => {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
};

/* ------------------------------------------------------------------ */
/* clear everything                                                   */
/* ------------------------------------------------------------------ */
export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};
