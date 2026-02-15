import React, { useEffect, useState } from "react";
import { List } from "lucide-react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";

function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/complaints", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setComplaints(data.complaints);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const statusBadge = (status) => {
    if (status === "Resolved") return "bg-green-200 text-green-800";
    if (status === "In Progress") return "bg-yellow-200 text-yellow-800";
    if (status === "Assigned") return "bg-blue-200 text-blue-800";
    return "bg-orange-200 text-orange-800";
  };

  const filteredComplaints =
    filterStatus === "All"
      ? complaints
      : complaints.filter((c) => {
          const displayStatus = c.assignedTo ? c.status : "Pending";
          return displayStatus === filterStatus;
        });

  return (
    <div>
      <Navbar />
      <AdminSidebar />

      <div className="ml-56 mt-14 p-6 min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold mb-4">All Complaints</h1>

        <div className="mb-4 flex items-center gap-3">
          <label className="text-sm font-medium text-slate-700">
            Filter by Status:
          </label>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 cursor-pointer text-sm"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="bg-white border border-slate-500 rounded-sm">
          <div className="bg-slate-500 text-white px-4 py-3 font-medium flex items-center gap-2">
            <List size={18} />
            <span>All Complaints</span>
            <span className="ml-auto bg-white text-slate-600 text-xs px-2 rounded">
              {filteredComplaints.length}
            </span>
          </div>

          {loading ? (
            <p className="p-4 text-sm text-gray-600">Loading complaints...</p>
          ) : filteredComplaints.length === 0 ? (
            <p className="p-4 text-sm text-gray-600">
              No complaints found for selected filter.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-5 text-left">
                      #
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-left">
                      Category
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-left">
                      Summary
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-left">
                      Location
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-center">
                      Status
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-center">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredComplaints.map((c, index) => {
                    const displayStatus = c.assignedTo ? c.status : "Pending";

                    return (
                      <tr
                        key={c._id}
                        className={`cursor-pointer ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-slate-100`}
                      >
                        <td className="border border-gray-300 px-3 py-3">
                          {index + 1}
                        </td>

                        <td className="border border-gray-300 px-3 py-3">
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
                              displayStatus,
                            )}`}
                          >
                            {displayStatus}
                          </span>
                        </td>

                        <td className="border border-gray-300 px-3 py-2 text-center">
                          {new Date(c.createdAt).toLocaleDateString("en-GB")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllComplaints;
