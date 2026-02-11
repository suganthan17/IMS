import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { User, ChevronDown, Phone, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setOpen(false);

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <nav className="relative w-full h-12 bg-slate-800 text-white flex items-center px-5">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="IMS Logo"
          className="w-11 h-11 filter invert brightness-0"
        />
        <span className="text-lg font-semibold tracking-wide">
          𝚄𝚗𝚒𝚟𝚎𝚛𝚜𝚒𝚝𝚢 𝙸𝙼𝚂
        </span>
      </div>

      <div className="ml-auto border-l border-r relative">
        <div
          onClick={toggleDropdown}
          className="flex items-center gap-2 cursor-pointer px-2 py-1 select-none"
        >
          <User size={25} />
          <span className="text-md font-mono truncate max-w-[140px]">
            {role === "admin" ? "Admin" : email}
          </span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {open && (
          <div className="absolute right-2 shadow-lg shadow-gray-400  mt-2 w-50 bg-white text-gray-800 border border-gray-400 rounded  z-50">
            <ul className="text-sm">
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-200 cursor-pointer">
                <User size={14} />
                My Account
              </li>
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-200 border-b border-gray-300 cursor-pointer">
                <Phone size={14} />
                Support
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 hover:bg-red-200 cursor-pointer text-red-600"
              >
                <LogOut size={14} />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
