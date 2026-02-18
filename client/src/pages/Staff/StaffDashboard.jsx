import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import StaffSidebar from "../../components/StaffSidebar";

const API_URL = import.meta.env.VITE_API_URL;

function StaffDashboard() {
  const navigate = useNavigate();

  const [totalAssigned, setTotalAssigned] = useState(0);
  const [resolved, setResolved] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const staffId = localStorage.getItem("userId");

    fetch(`${API_URL}/api/complaints`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const complaints = data.complaints;

          const myComplaints = complaints.filter((c) => {
            if (!c.assignedTo) return false;

            const assignedId =
              typeof c.assignedTo === "object"
                ? c.assignedTo._id
                : c.assignedTo;

            return assignedId?.toString() === staffId;
          });

          setTotalAssigned(myComplaints.length);

          setResolved(
            myComplaints.filter((c) => c.status === "Resolved").length,
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <Navbar />
      <StaffSidebar />

      <div className="mt-14 p-4 sm:p-6 min-h-screen bg-gray-100 md:ml-56">
        <h1 className="text-xl font-bold mb-6">Maintenance Dashboard</h1>

        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Assigned</p>
              <p className="text-2xl font-bold">{totalAssigned}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>

          <div
            onClick={() => navigate("/staff/my-complaints")}
            className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-black">{resolved}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
