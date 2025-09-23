//src/components/cards/DashboardCard.jsx
const colorMap = {
  red: {
    border: "border-red-600",
    text: "text-red-600",
  },
  blue: {
    border: "border-blue-600",
    text: "text-blue-600",
  },
  purple: {
    border: "border-purple-600",
    text: "text-purple-600",
  },
};

const DashboardCard = ({ title, value, icon, themeColor = "red" }) => {
  const colors = colorMap[themeColor] || colorMap.red;

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 flex justify-between items-center border-l-4 ${colors.border}`}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`text-2xl ${colors.text}`}>{icon}</div>
    </div>
  );
};

export default DashboardCard;
