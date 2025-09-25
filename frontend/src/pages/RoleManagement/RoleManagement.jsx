import { useState } from "react";
import TableDynamic from "../../components/layout/TableDynamic";
import RoleManagementTable from "./RoleManagementTable";

const RoleManagement = () => {
    const [editRoleOpen, SeteditRoleOpen] = useState(false);
    // Dummy data disini
    // Generate 100 dummy applicants dengan 5 kolom
    const dummyApplicants = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        Name: `Applicant ${i + 1}`,
        Position: ["Developer", "Designer", "Manager", "Tester"][i % 4],
        Roles: 20 + (i % 15),
        gender: "sigma",
    }));
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Role Management</h2>
            <TableDynamic
                data={dummyApplicants}
                ShowEdit={true}
                ShowDelete={false}
                onEdit={(row) => SeteditRoleOpen(row)}
            />

            {editRoleOpen && (
                <div className="p-4"> 
                    <RoleManagementTable 

                    />
                </div>    
            )}
        </div>
    );
};

export default RoleManagement;
