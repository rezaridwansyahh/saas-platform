const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center border-l-4 border-red-600">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="text-red-600 text-2xl">{icon}</div>
    </div>
  );
};

export default DashboardCard;
