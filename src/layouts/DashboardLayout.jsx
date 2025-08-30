import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex relative">
      {/* Sidebar */}
      <div className="z-10">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* TopBar */}
        <div className="z-0">
          <Header />
        </div>

        {/* Page content */}
        <main className="flex-1  bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
