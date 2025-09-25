import { useEffect, useState } from "react";
import { getTenant, getCompanyIdByTenant } from "../utils/getTenant";

export function useDepartments() {
  const [departments, setDepartments] = useState([]);
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

        // Fetch Departments
        const resDepartments = await fetch(`/api/departments/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataDepartments = await resDepartments.json();
        const departments = dataDepartments.departments || [];
        const formattedDepartments = Array.isArray(departments)
          ? departments.map((user) => ({
              id: user.employee_id,
              name: user.name,
            }))
          : [];
        setDepartments(formattedDepartments);

        // Fetch positions
        const resPositions = await fetch(`/api/positions/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataPositions = await resPositions.json();
        setPositions(
          Array.isArray(dataPositions.positions) ? dataPositions.positions : []
        );
      } catch (error) {
        console.error("Error fetching departments/positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { departments, positions, loading, setDepartments };
}
