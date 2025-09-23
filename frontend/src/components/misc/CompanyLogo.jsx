// src/components/misc/CompanyLogo.jsx

import { useEffect, useState } from "react";
import { getTenant, getCompanyIdByTenant } from "../utils/getTenant";

const CompanyLogo = () => {
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const tenant = getTenant();
    const companyId = getCompanyIdByTenant(tenant);
    const url = `/api/images/companies/${companyId}/logo`;
    setLogoUrl(url);
  }, []);

  return (
    <div className="p-4 flex justify-center items-center">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Company Logo"
          className="h-12 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-logo.png"; // fallback image
          }}
        />
      ) : (
        <div className="h-12" />
      )}
    </div>
  );
};

export default CompanyLogo