// src/utils/getTenant.js

export const getTenant = () => {
  const host = window.location.hostname;
  const parts = host.split(".");

  if (host === "localhost") {
    return "default"; // fallback for local testing
  }

  return parts[0]; // return subdomain (e.g., "osp" from "osp.localhost")
};

export const getCompanyIdByTenant = async (token, tenant) => {
  try {
    const response = await fetch(`/api/companies/tenant`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Tenant': tenant, // if needed
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch company ID: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching company ID by tenant:", error);
    return null; // or throw error if you want to handle it upstream
  }
};



