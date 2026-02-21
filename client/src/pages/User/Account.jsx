import React, { useState } from "react";
import { User, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";

function Account() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const savedName = localStorage.getItem("realName") || "";
  const savedPassword = localStorage.getItem("password") || "";

  const [realName, setRealName] = useState(savedName);
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdate = () => {
    localStorage.setItem("realName", realName.trim());
    toast.success("User details updated successfully!");
  };

  return (
    <div>
      <Navbar />
      <UserSidebar />

      <div className="mt-14 p-4 sm:p-6 min-h-screen bg-gray-100 md:ml-56">
        <h1 className="text-xl font-bold mb-4">Account Settings</h1>

        <div className="bg-white border border-slate-500 rounded-sm mt-5 max-w-6xl w-full overflow-x-auto">
          {/* Header */}
          <div className="bg-slate-500 text-white px-4 py-4 font-medium flex items-center gap-2">
            <User size={18} />
            Edit Account Details
          </div>

          {/* Table */}
          <table className="w-full text-sm border-t border-gray-300">
            <tbody className="divide-y divide-gray-300">
              {/* Email */}
              <tr className="flex flex-col md:table-row">
                <td className="bg-gray-100 px-4 py-3 font-medium md:w-1/4 md:border-r border-gray-300">
                  E-mail
                </td>
                <td className="px-4 py-3 break-all">{email}</td>
              </tr>

              {/* Password */}
              <tr className="flex flex-col md:table-row">
                <td className="bg-gray-100 px-4 py-3 font-medium md:border-r border-gray-300">
                  Password
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={savedPassword}
                      readOnly
                      className="w-full md:w-64 border border-gray-300 px-2 py-1 text-sm bg-gray-50 rounded"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-600 cursor-pointer hover:text-slate-800 transition"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </td>
              </tr>

              {/* Username */}
              <tr className="flex flex-col md:table-row">
                <td className="bg-gray-100 px-4 py-3 font-medium md:border-r border-gray-300">
                  Username
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    placeholder="Enter your real name"
                    className="w-full md:w-80 border border-gray-300 px-2 py-1 text-sm rounded"
                  />
                </td>
              </tr>

              {/* Role */}
              <tr className="flex flex-col md:table-row">
                <td className="bg-gray-100 px-4 py-3 font-medium md:border-r border-gray-300">
                  Project Access Level
                </td>
                <td className="px-4 py-3 capitalize">{role} / reporter</td>
              </tr>
            </tbody>
          </table>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-300 bg-gray-100">
            <button
              onClick={handleUpdate}
              className="px-6 py-2 text-sm cursor-pointer rounded bg-slate-700 text-white hover:bg-slate-800 transition"
            >
              Update User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
