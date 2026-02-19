import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const API_URL = import.meta.env.VITE_API_URL;

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

    fetch(`${API_URL}/api/users`, {
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
      });

    fetch(`${API_URL}/api/complaints`, {
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
      });
  }, []);

  const chartData = {
    labels: [
      "Total Users",
      "Maintenance Staff",
      "Total Complaints",
      "Pending",
      "Assigned",
      "Resolved",
    ],
    datasets: [
      {
        data: [
          totalUsers,
          maintenanceStaff,
          totalComplaints,
          pendingComplaints,
          assignedComplaints,
          resolvedComplaints,
        ],
        backgroundColor: [
          "#94a3b8",
          "#64748b",
          "#475569",
          "#334155",
          "#1e293b",
          "#0f172a",
        ],
        borderRadius: 3,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "#334155",
          font: {
            size: 11,
          },
        },
        grid: {
          color: "#e2e8f0",
        },
      },
      y: {
        ticks: {
          color: "#334155",
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <Navbar />
      <AdminSidebar />

      <div className="mt-14 p-4 sm:p-6 min-h-screen bg-gray-100 md:ml-56">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

        <div className="flex flex-wrap gap-4 mt-6 mb-6">
          <div className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 flex justify-between items-center">
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

          <div className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Pending Complaints</p>
              <p className="text-2xl font-bold">{pendingComplaints}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>

          <div className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Resolved Complaints</p>
              <p className="text-2xl font-bold">{resolvedComplaints}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>
        </div>

        <div className=" cursor-pointer border-gray-300 rounded  mt-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4" >
            System Overview
          </h2>

          <div className="h-[300px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
