import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./components/Topbar";


const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-60"}`}>
        <Topbar />
        <main className="pt-20 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
