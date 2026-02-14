import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";

function AdminDashboard() {
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [maintenanceStaff, setMaintenanceStaff] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);
  const [resolvedComplaints, setResolvedComplaints] = useState(0);
  const [assignedComplaints, setAssignedComplaints] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const users = data.users;

          setTotalUsers(users.filter((u) => u.role === "user").length);

          setMaintenanceStaff(
            users.filter((u) => u.role === "maintenance").length,
          );
        }
      })
      .catch((err) => console.error(err));

    fetch("http://localhost:5000/api/complaints", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const complaints = data.complaints;

          setTotalComplaints(complaints.length);

          setPendingComplaints(
            complaints.filter((c) => c.status === "Pending").length,
          );

          setResolvedComplaints(
            complaints.filter((c) => c.status === "Resolved").length,
          );

          setAssignedComplaints(
            complaints.filter((c) => c.status === "Assigned").length,
          );
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <AdminSidebar />

      <div className="ml-56 mt-14 p-6 min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

        <div className="flex flex-wrap gap-4 mt-6 mb-6">
          <div className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>

          <div
            onClick={() => navigate("/admin/complaints")}
            className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-600">Total Complaints</p>
              <p className="text-2xl font-bold">{totalComplaints}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>

          <div
            onClick={() => navigate("/admin/manage-staff")}
            className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-600">Maintenance Staff</p>
              <p className="text-2xl font-bold">{maintenanceStaff}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>

          <div
            onClick={() => navigate("/admin/assign-complaints")}
            className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-600">Total Assigned</p>
              <p className="text-2xl font-bold">{assignedComplaints}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>

          <div
            onClick={() => navigate("/admin/complaints")}
            className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-600">Pending Complaints</p>
              <p className="text-2xl font-bold">{pendingComplaints}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>

          <div
            onClick={() => navigate("/admin/complaints")}
            className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-600">Resolved Complaints</p>
              <p className="text-2xl font-bold">{resolvedComplaints}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );  
}

export default AdminDashboard;
