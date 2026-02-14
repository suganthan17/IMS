import React, { useEffect, useState } from "react";
import { List, Trash2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";

function AssignComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [staff, setStaff] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res1 = await fetch("http://localhost:5000/api/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data1 = await res1.json();
        setComplaints(data1.complaints || []);

        const res2 = await fetch("http://localhost:5000/api/admin/staff", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data2 = await res2.json();
        setStaff(data2.staff || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, [token]);

  const assignStaff = async (complaintId, staffId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/assign/${complaintId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ staffId }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Updated successfully");
        setComplaints((prev) =>
          prev.map((c) => (c._id === complaintId ? data.complaint : c))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeStaff = async (complaintId, status) => {
    if (status === "Resolved") {
      toast.error("Cannot modify a resolved complaint");
      return;
    }
    await assignStaff(complaintId, null);
  };

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
        <h1 className="text-xl font-bold mb-4">
          Assign Complaints to Staff
        </h1>

        {/* FILTER */}
        <div className="mb-4 flex items-center gap-3">
          <label className="text-sm font-medium text-slate-700">
            Filter by Status:
          </label>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 cursor-pointer rounded-md px-3 py-1 text-sm"
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
            <span>Assign Complaints</span>
            <span className="ml-auto bg-white text-slate-600 text-xs px-2 rounded">
              {filteredComplaints.length}
            </span>
          </div>

          {filteredComplaints.length === 0 ? (
            <p className="p-4 text-sm text-gray-600">
              No complaints found for selected filter.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-3 text-left">
                      Issue
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-center">
                      Status
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-center">
                      Staff
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredComplaints.map((c, index) => {
                    const displayStatus = c.assignedTo
                      ? c.status
                      : "Pending";

                    return (
                      <tr
                        key={c._id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-slate-100`}
                      >
                        <td className="border border-gray-300 px-3 py-2 font-medium text-slate-700">
                          {c.summary}
                        </td>

                        <td className="border border-gray-300 px-3 py-2 text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${statusBadge(
                              displayStatus
                            )}`}
                          >
                            {displayStatus}
                          </span>
                        </td>

                        <td className="border border-gray-300 px-3 py-2 text-center">
                          {c.assignedTo ? (
                            <span className="font-medium text-slate-700">
                              {c.assignedTo.name}
                            </span>
                          ) : (
                            <select
                              className="border border-gray-300 px-2 py-1 rounded cursor-pointer"
                              onChange={(e) =>
                                assignStaff(c._id, e.target.value)
                              }
                            >
                              <option value="">Select staff</option>
                              {staff.map((s) => (
                                <option key={s._id} value={s._id}>
                                  {s.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>

                        <td className="border border-gray-300 px-3 py-2 text-center">
                          {c.assignedTo && (
                            <button
                              onClick={() =>
                                removeStaff(c._id, displayStatus)
                              }
                              disabled={displayStatus === "Resolved"}
                              className={`${
                                displayStatus === "Resolved"
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-600 hover:text-red-700 cursor-pointer"
                              }`}
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
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

export default AssignComplaints;
