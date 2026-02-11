import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "lucide-react";
import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";

function StatusTable({ title, data, navigate }) {
  const statusBadge = (status) => {
    if (status === "Resolved") return "bg-green-200 text-green-800";
    if (status === "In Progress") return "bg-yellow-200 text-yellow-800";
    return "bg-orange-200 text-orange-800";
  };

  return (
    <div className="bg-white border border-slate-500 rounded-sm mb-6">
      {/* Section Header */}
      <div className="bg-slate-500 text-white px-4 py-2 font-medium flex items-center gap-2">
        <List size={18} />
        <span>{title}</span>
        <span className="ml-auto bg-white text-slate-600 text-xs px-2 rounded">
          {data.length}
        </span>
      </div>

      {data.length === 0 ? (
        <p className="p-4 text-sm text-gray-600">No records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Summary
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Location
                </th>
                <th className="border border-gray-300 px-3 py-2 text-center">
                  Status
                </th>
                <th className="border border-gray-300 px-3 py-2 text-center">
                  Updated
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((c, index) => (
                <tr
                  key={c._id}
                  onClick={() => navigate(`/user/complaints/${c._id}`)}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-slate-100`}
                >
                  <td className="border border-gray-300 px-3 py-2">
                    {c.category}
                  </td>

                  <td className="border border-gray-300 px-3 py-2 font-medium text-slate-700">
                    {c.summary}
                  </td>

                  <td className="border border-gray-300 px-3 py-2">
                    {c.location}
                  </td>

                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${statusBadge(
                        c.status,
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {new Date(c.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Status() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/complaints", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ REQUIRED
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComplaints(data.complaints);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  const pendingIssues = complaints.filter((c) => c.status !== "Resolved");
  const resolvedIssues = complaints.filter((c) => c.status === "Resolved");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <UserSidebar />

        <div className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-6 text-black">
            Complaint Status
          </h1>

          {loading ? (
            <p>Loading status...</p>
          ) : (
            <>
              <StatusTable
                title="Pending & In Progress Issues"
                data={pendingIssues}
                navigate={navigate}
              />

              <StatusTable
                title="Resolved Issues"
                data={resolvedIssues}
                navigate={navigate}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Status;
