// src/hooks/useCompanyLogo.js
import { useEffect, useState } from "react";
import { getTenant, getCompanyIdByTenant } from "../utils/getTenant";

const useCompanyLogo = () => {
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      const tenant = getTenant();
      const token = localStorage.getItem("token");
      const companyId = await getCompanyIdByTenant(token, tenant);
      try {
        const response = await fetch(
          `/api/images/company/${companyId.companyByTenant.company_id}/logo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to load logo");

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setLogoUrl(imageUrl);
      } catch (error) {
        console.error("Logo fetch error:", error);
        setLogoUrl("/default-logo.png"); // fallback
      }
    };

    fetchLogo();
  }, []);

  return logoUrl;
};

export default useCompanyLogo;
