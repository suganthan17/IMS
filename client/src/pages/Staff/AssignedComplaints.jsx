import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StaffSidebar from "../../components/StaffSidebar";
import { List } from "lucide-react";
import { toast } from "react-toastify";

function StaffAssignedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const staffId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://localhost:5000/api/complaints", {
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

  const updateStatus = async (complaintId, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/complaints/update-status/${complaintId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Status updated successfully");

        setComplaints((prev) =>
          prev.map((c) =>
            c._id === complaintId ? data.complaint : c
          )
        );
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Server error",err);
    }
  };

  const statusBadge = (status) => {
    if (status === "Resolved")
      return "bg-green-200 text-green-800";
    if (status === "In Progress")
      return "bg-yellow-200 text-yellow-800";
    if (status === "Assigned")
      return "bg-blue-200 text-blue-800";
    return "bg-orange-200 text-orange-800";
  };

  return (
    <div>
      <Navbar />
      <StaffSidebar />

      <div className="ml-56 mt-14 p-6 min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold mb-4">
          My Assigned Complaints
        </h1>

        <div className="bg-white border border-slate-500 rounded-sm">
          <div className="bg-slate-500 text-white px-4 py-3 font-medium flex items-center gap-2">
            <List size={18} />
            <span>Assigned Complaints</span>
            <span className="ml-auto bg-white text-slate-600 text-xs px-2 rounded">
              {complaints.length}
            </span>
          </div>

          {loading ? (
            <p className="p-4 text-sm text-gray-600">
              Loading...
            </p>
          ) : complaints.length === 0 ? (
            <p className="p-4 text-sm text-gray-600">
              No assigned complaints.
            </p>
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
                    <th className="border border-gray-300 px-3 py-2 text-center">
                      Status
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-center">
                      Update Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((c, index) => (
                    <tr
                      key={c._id}
                      className={`${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      } hover:bg-slate-100`}
                    >
                      <td className="border border-gray-300 px-3 py-2">
                        {c.category}
                      </td>

                      <td className="border border-gray-300 px-3 py-2 font-medium">
                        {c.summary}
                      </td>

                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${statusBadge(
                            c.status
                          )}`}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <select
                          value={c.status}
                          onChange={(e) =>
                            updateStatus(
                              c._id,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 px-2 py-1 rounded cursor-pointer text-sm"
                        >
                          <option value="Assigned">
                            Assigned
                          </option>
                          <option value="In Progress">
                            In Progress
                          </option>
                          <option value="Resolved">
                            Resolved
                          </option>
                        </select>
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

export default StaffAssignedComplaints;
