import React, { useState } from "react";
import logo from "../assets/logo.svg";
import {
  ChevronDown,
  Phone,
  LogOut,
  Pencil,
  Handshake,
  OctagonAlert,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const realName = localStorage.getItem("realName");

  const displayName =
    role === "admin"
      ? "Admin"
      : realName && realName.trim() !== ""
        ? realName
        : email;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("realName");

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-14 bg-slate-800 text-white flex items-center px-4 shadow-md z-50">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="IMS Logo"
          className="w-9 h-9 filter invert brightness-0"
        />
        <span className="text-lg font-semibold tracking-wide">
          University IMS
        </span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {role === "user" && (
          <button
            onClick={() => navigate("/user/raise-complaint")}
            className="hidden sm:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1.5 rounded-md text-sm font-medium transition cursor-pointer"
          >
            <Pencil size={18} />
            Report
          </button>
        )}

        {role === "admin" && (
          <button
            onClick={() => navigate("/admin/assign-complaints")}
            className="hidden sm:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1.5 rounded-md text-sm font-medium transition cursor-pointer"
          >
            <Handshake size={18} />
            Assign Staff
          </button>
        )}

        {role === "maintenance" && (
          <button
            onClick={() => navigate("/staff/assigned-complaints")}
            className="hidden sm:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1.5 rounded-md text-sm font-medium transition cursor-pointer"
          >
            <OctagonAlert size={18} />
            Complaints
          </button>
        )}

        <div className="relative border-l border-r px-3">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <User size={20} />
            <span className="text-sm font-medium">{displayName}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-52 bg-white text-gray-800 border border-gray-300 rounded-md shadow-lg">
              <ul className="text-sm">
                {role === "user" && (
                  <li
                    onClick={() => {
                      setOpen(false);
                      navigate("/user/account");
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-400 cursor-pointer"
                  >
                    <User size={16} />
                    My Account
                  </li>
                )}

                <li className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-400 border-b border-gray-200 cursor-pointer">
                  <Phone size={16} />
                  Support
                </li>

                <li
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-red-400 cursor-pointer text-red-600 hover:text-black"
                >
                  <LogOut size={16} />
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
