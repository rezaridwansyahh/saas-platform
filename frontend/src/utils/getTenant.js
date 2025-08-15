// src/utils/getTenant.js
export const getTenant = () => {
  const host = window.location.hostname;
  const parts = host.split('.');

  if (host === 'localhost') {
    return 'default'; // fallback for localhost without subdomain
  }

  return parts[0]; // return subdomain (e.g., 'ptap' from 'ptap.localhost')
};
