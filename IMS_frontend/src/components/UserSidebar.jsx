import React from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import userSidebarData from "../data/userSidebarData";
import { toast } from "react-toastify";

function UserSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
  };

  return (
    <div className="w-56 min-h-screen bg-gray-100 border-r border-gray-300 flex flex-col">
      {/* Menu items */}
      <div className="flex-1 pt-4">
        {userSidebarData.map((item, index) => {
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

      <Link to="/">
        <div className="border-t border-b border-gray-300 mb-12 cursor-pointer">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-4 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </Link>
    </div>
  );
}

export default UserSidebar;
