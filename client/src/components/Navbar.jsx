import React, { useState } from "react";
import logo from "../assets/logo.svg";
import {
  ChevronDown,
  Phone,
  LogOut,
  Pencil,
  Handshake,
  OctagonAlert,
} from "lucide-react";
import { UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-14 bg-slate-800 text-white flex items-center px-3 sm:px-5 shadow-md z-50">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="IMS Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 filter invert brightness-0"
        />
        <span className="text-sm sm:text-lg font-semibold tracking-wide truncate max-w-[120px] sm:max-w-none">
          𝚄𝚗𝚒𝚟𝚎𝚛𝚜𝚒𝚝𝚢 𝙸𝙼𝚂
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        {role === "user" && (
          <button
            onClick={() => navigate("/user/raise-complaint")}
            className="hidden sm:flex items-center gap-1 bg-yellow-500 cursor-pointer text-black px-3 py-1.5 rounded-md hover:bg-yellow-600 transition text-sm font-medium"
          >
            <Pencil size={18} />
            Report
          </button>
        )}

        {role === "admin" && (
          <button
            onClick={() => navigate("/admin/assign-complaints")}
            className="hidden sm:flex items-center gap-1 bg-yellow-500 cursor-pointer text-black px-3 py-1.5 rounded-md hover:bg-yellow-600 transition text-sm font-medium"
          >
            <Handshake size={18} />
            Assign Staff
          </button>
        )}

        {role === "maintenance" && (
          <button
            onClick={() => navigate("/staff/assigned-complaints")}
            className="hidden sm:flex items-center gap-1 bg-yellow-500 cursor-pointer text-black px-3 py-1.5 rounded-md hover:bg-yellow-600 transition text-sm font-medium"
          >
            <OctagonAlert size={18} />
            Complaints
          </button>
        )}

        <div className="border-l border-r relative px-2 sm:px-3">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 sm:gap-2 cursor-pointer py-1"
          >
            <UserIcon className="w-5 h-5 text-white" />

            <span className="text-xs sm:text-sm font-mono truncate max-w-[80px] sm:max-w-[160px]">
              {role === "admin" ? "Admin" : email}
            </span>

            <ChevronDown
              size={16}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-44 sm:w-52 bg-white text-gray-800 border border-gray-300 rounded-md shadow-lg z-50">
              <ul className="text-sm">
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-400 cursor-pointer">
                  <UserIcon className="w-4 h-4 text-gray-700" />
                  My Account
                </li>

                <li className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-400 border-b border-gray-200 cursor-pointer">
                  <Phone size={14} />
                  Support
                </li>

                <li
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-red-400 cursor-pointer text-red-600"
                >
                  <LogOut size={14} />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
