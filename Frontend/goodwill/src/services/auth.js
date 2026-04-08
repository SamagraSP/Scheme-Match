export const getStoredToken = () => localStorage.getItem('schemeMatch_token');

export const getStoredUser = () => {
  const rawUser = localStorage.getItem('schemeMatch_user');

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getStoredToken());

export const clearAuthStorage = () => {
  localStorage.removeItem('schemeMatch_token');
  localStorage.removeItem('schemeMatch_refresh');
  localStorage.removeItem('schemeMatch_user');
};
