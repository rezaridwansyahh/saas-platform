// hooks/useAuth.js
export const getUser = () => {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
};

export const logout = () => {
  localStorage.removeItem('user');
};
