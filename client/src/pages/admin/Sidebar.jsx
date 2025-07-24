import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
    <div className="hidden sticky top-0  lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5  h-screen">
      {/* fixed top-0 left-0  w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 z-50" */}
      <div className="space-y-4 mt-20">
        <Link to={'dashboard'} className="flex items-center gap-2  hover:bg-slate-200 text-lg rounded-xl" >
          <ChartNoAxesColumn size={22}  className="mt-1"/>
          <h1>Dashboard</h1>
        </Link>
        <Link to={'course'} className="flex items-center gap-2  hover:bg-slate-200 text-lg rounded-xl">
          <SquareLibrary size={22} className="mt-1" />
          <h1>Courses</h1>
        </Link>
      </div>
    </div>
      <div className=" flex-1 md:p-20  bg-white">
    <Outlet/>
      </div>
    </div>
  );
};

export default Sidebar;
