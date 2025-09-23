// // src/hooks/useCompanyLogo.js
// import { useEffect, useState } from "react";
// import { getTenant, getCompanyIdByTenant } from "../utils/getTenant";

// const useCompanyLogo = () => {
//   const [logoUrl, setLogoUrl] = useState(null);

//   useEffect(() => {
//     const fetchLogo = async () => {
//       const tenant = getTenant();
//       const token = localStorage.getItem("token");
//       const companyId = await getCompanyIdByTenant(token, tenant);
//       console.log("companyId result:", companyId);
//       try {
//         const response = await fetch(
//           `/api/images/company/${companyId.companyByTenant.company_id}/logo`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) throw new Error("Failed to load logo");

//         const blob = await response.blob();
//         const imageUrl = URL.createObjectURL(blob);
//         setLogoUrl(imageUrl);
//       } catch (error) {
//         console.error("Logo fetch error:", error);
//         setLogoUrl("/default-logo.png"); // fallback
//       }
//     };

//     fetchLogo();
//   }, []);

//   return logoUrl;
// };

// export default useCompanyLogo;


// src/hooks/useCompanyLogo.js
import { useEffect, useState } from "react";
import { getTenant } from "../utils/getTenant";

const useCompanyLogo = () => {
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const tenant = getTenant(); // e.g., "ptap" or "osp"
        if (!tenant) throw new Error("Tenant not found");

        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token found");

        // 1. Fetch all companies
        const companiesRes = await fetch(`/api/companies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!companiesRes.ok) throw new Error("Failed to fetch companies");
        const companiesData = await companiesRes.json();

        // 2. Find the company matching the tenant
        const company = companiesData.companies.find(c => c.tenant_name === tenant);
        if (!company) throw new Error("Company for tenant not found");

        // 3. Fetch the logo from backend
        const logoRes = await fetch(
          `/api/images/company/${company.id}/logo`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!logoRes.ok) throw new Error("Failed to fetch logo");

        // 4. Convert to usable URL
        const blob = await logoRes.blob();
        const imageUrl = URL.createObjectURL(blob);
        setLogoUrl(imageUrl);
      } catch (error) {
        console.error("Logo fetch error:", error);
        setLogoUrl("/default-logo.png"); // fallback logo
      }
    };

    fetchLogo();
  }, []);

  return logoUrl;
};

export default useCompanyLogo;
