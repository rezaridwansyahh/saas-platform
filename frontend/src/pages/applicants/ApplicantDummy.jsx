// src/pages/applicants/ApplicantsDummy.jsx
import Table from "./Table";

const ApplicantsDummy = () => {
  // Generate 30 dummy applicants
  const testData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Applicant ${i + 1}`,
    department: ["HR", "IT", "Finance", "Marketing"][i % 4],
    age: 20 + (i % 15),
    email: `applicant${i + 1}@example.com`,
    phone: `+62-81234${(1000 + i).toString().slice(-4)}`,
    address: `Street ${i + 1}, City ${(i % 5) + 1}`,
    position: ["Intern", "Junior", "Senior", "Manager"][i % 4],
    status: ["Active", "On Leave", "Resigned"][i % 3],
    dateApplied: new Date(
      2025,
      i % 12,
      (i % 28) + 1
    ).toLocaleDateString("en-GB"),
    experience: `${i % 10} years`,
    skills: ["React", "Node.js", "SQL", "Python", "Java"][i % 5],
    salaryExpectation: `$${2000 + i * 50}`,
    interviewDate: new Date(
      2025,
      (i % 12),
      ((i + 5) % 28) + 1
    ).toLocaleDateString("en-GB"),
    hired: i % 2 === 0 ? "Yes" : "No",
  }));

  return <Table fetchedData={testData} />;
};

export default ApplicantsDummy;


// import Table from "./Table";

// const DummyData = () => {
//     // Dummy data disini
//     // Generate 100 dummy applicants dengan 5 kolom
//     const dummyApplicants = Array.from({ length: 100 }, (_, i) => ({
//         id: i + 1,
//         name: `Applicant ${i + 1}`,
//         position: ["Developer", "Designer", "Manager", "Tester"][i % 4],
//         age: 20 + (i % 15),
//         gender: "sigma",
//     }));
//     return (
//         <div className="">
//             <h2 className="text-lg font-semibold mb-4">Dummy Applicants Table</h2>
//             <Table
//                 data={dummyApplicants}

//             />
//         </div>
//     );
// };

// export default DummyData;
