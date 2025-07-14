const Topbar = () => {
  return (
    <header className="w-full h-16 bg-white shadow fixed top-0 left-60 flex items-center justify-between px-6 z-10">
      <div>
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <span className="text-sm text-gray-700">Recruiter</span>
      </div>
    </header>
  );
};

export default Topbar;
