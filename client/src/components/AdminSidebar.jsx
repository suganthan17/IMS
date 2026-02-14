import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import adminSidebarData from "../data/adminSidebarData";
import { toast } from "react-toastify";

function AdminSidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  if (role !== "admin") return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="fixed top-14 left-0 w-56 h-[calc(100vh-56px)] bg-gray-100 border-r border-gray-300 flex flex-col">
      <div className="flex-1 pt-4 overflow-y-auto">
        {adminSidebarData.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-4 text-sm transition-colors
                ${
                  isActive
                    ? "bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 text-blue-800 font-semibold"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="border-t border-gray-300">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-4 text-sm cursor-pointer text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
