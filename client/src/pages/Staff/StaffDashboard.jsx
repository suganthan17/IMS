import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import StaffSidebar from "../../components/StaffSidebar";

function StaffDashboard() {
  const navigate = useNavigate();

  const [totalAssigned, setTotalAssigned] = useState(0);
  const [resolved, setResolved] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const staffId = localStorage.getItem("userId");

    fetch("http://localhost:5000/api/complaints", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const complaints = data.complaints;

          const myComplaints = complaints.filter(
            (c) => c.assignedTo && c.assignedTo._id === staffId,
          );

          setTotalAssigned(myComplaints.length);

          setResolved(
            myComplaints.filter((c) => c.status === "Resolved").length,
          );
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <StaffSidebar />

      <div className="ml-56 mt-14 p-6 min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold mb-6">Maintenance Dashboard</h1>

        <div className="flex flex-wrap gap-4">
          {/* Total Assigned */}
          <div
            onClick={() => navigate("/staff/my-complaints")}
            className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-600">Total Assigned</p>
              <p className="text-2xl font-bold">{totalAssigned}</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>

          {/* Resolved */}
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
