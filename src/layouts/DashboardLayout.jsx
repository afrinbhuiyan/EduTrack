import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0">
        <Header />
      </div>

     <div className="flex w-full">
       {/* Sidebar */}
      <div className="sticky mt-14 top-6">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="mt-16 w-full overflow-y-scroll">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
     </div>
    </div>
  );
};

export default DashboardLayout;
