import { useEffect, useState } from "react";
import { getTenant, getCompanyIdByTenant } from "../utils/getTenant";

export function useApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const tenant = getTenant();
        const companyData = await getCompanyIdByTenant(token, tenant);
        const companyId = companyData?.company?.id;
        if (!companyId) throw new Error("Company ID not found");

        // Fetch employees
        const resApplicants = await fetch(`/api/employees/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataApplicants = await resApplicants.json();
        const employees = dataApplicants.employees || [];
        const formattedApplicants = Array.isArray(employees)
          ? employees.map((user) => ({
              id: user.employee_id,
              name: user.name,
              position: user.position_id,
            }))
          : [];
        setApplicants(formattedApplicants);

        // Fetch positions
        const resPositions = await fetch(`/api/positions/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataPositions = await resPositions.json();
        setPositions(
          Array.isArray(dataPositions.positions) ? dataPositions.positions : []
        );
      } catch (error) {
        console.error("Error fetching applicants/positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { applicants, positions, loading, setApplicants };
}
