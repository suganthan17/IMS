import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StaffSidebar from "../../components/StaffSidebar";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function AssignedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const staffId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/complaints`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const myComplaints = data.complaints.filter((c) => {
            if (!c.assignedTo) return false;

            const assignedId =
              typeof c.assignedTo === "object"
                ? c.assignedTo._id
                : c.assignedTo;

            return assignedId?.toString() === staffId;
          });

          setComplaints(myComplaints);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token, staffId]);

  const statusBadge = (status) => {
    if (status === "Resolved") return "bg-green-200 text-green-800";
    if (status === "In Progress") return "bg-yellow-200 text-yellow-800";
    if (status === "Assigned") return "bg-blue-200 text-blue-800";
    return "bg-orange-200 text-orange-800";
  };

  return (
    <div>
      <Navbar />
      <StaffSidebar />

      <div className="mt-14 p-4 sm:p-6 min-h-screen bg-gray-100 md:ml-56">
        <h1 className="text-xl font-bold mb-4">My Assigned Complaints</h1>

        <div className="bg-white border border-slate-500 rounded-sm">
          <div className="bg-slate-500 text-white px-4 py-3 font-medium flex items-center gap-2">
            <List size={18} />
            <span>Assigned Complaints</span>
            <span className="ml-auto bg-white text-slate-600 text-xs px-2 rounded">
              {complaints.length}
            </span>
          </div>

          {loading ? (
            <p className="p-4 text-sm text-gray-600">Loading...</p>
          ) : complaints.length === 0 ? (
            <p className="p-4 text-sm text-gray-600">No assigned complaints.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[600px]">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-5 text-left">
                      Category
                    </th>
                    <th className="border border-gray-300 px-3 py-5 text-left">
                      Summary
                    </th>
                    <th className="border border-gray-300 px-3 py-5 text-center">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((c, index) => (
                    <tr
                      key={c._id}
                      onClick={() => navigate(`/staff/complaints/${c._id}`)}
                      className={`cursor-pointer ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-slate-100`}
                    >
                      <td className="border border-gray-300 px-3 py-3">
                        {c.category}
                      </td>

                      <td className="border border-gray-300 px-3 py-3 font-medium">
                        {c.summary}
                      </td>

                      <td className="border border-gray-300 px-3 py-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${statusBadge(
                            c.status,
                          )}`}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignedComplaints;
