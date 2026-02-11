import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";

function UserDashboard() {
  const navigate = useNavigate();

  const [totalComplaints, setTotalComplaints] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);
  const [inProgressComplaints, setInProgressComplaints] = useState(0);
  const [resolvedComplaints, setResolvedComplaints] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/complaints", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const complaints = data.complaints;

          setTotalComplaints(complaints.length);

          setPendingComplaints(
            complaints.filter((c) => c.status === "Pending").length,
          );

          setInProgressComplaints(
            complaints.filter((c) => c.status === "Pending").length,
          );

          setResolvedComplaints(
            complaints.filter((c) => c.status === "Resolved").length,
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching complaints:", err);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <UserSidebar />

        <div className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-4">Dashboard</h1>

          <div className="flex flex-wrap gap-4 mt-6 mb-6">
            {/* Total Complaints */}
            <div
              onClick={() => navigate("/user/my-complaints")}
              className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-600">Total Complaints</p>
                <p className="text-2xl font-bold">{totalComplaints}</p>
              </div>
              <ArrowUpRight size={18} className="text-gray-500" />
            </div>

            {/* Pending */}
            <div
              onClick={() => navigate("/user/status")}
              className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-600">Pending Complaints</p>
                <p className="text-2xl font-bold">{pendingComplaints}</p>
              </div>
              <ArrowUpRight size={18} className="text-gray-500" />
            </div>

            {/* In Progress */}
            <div
              onClick={() => navigate("/user/status")}
              className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{inProgressComplaints}</p>
              </div>
              <ArrowUpRight size={18} className="text-gray-500" />
            </div>

            {/* Resolved */}
            <div
              onClick={() => navigate("/user/status")}
              className="w-full sm:w-[48%] lg:w-[23%] bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold">{resolvedComplaints}</p>
              </div>
              <ArrowUpRight size={18} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
