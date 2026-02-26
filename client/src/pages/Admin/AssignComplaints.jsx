import React, { useEffect, useState } from "react";
import { List, Trash2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";
import { sendEmail } from "../../utils/emailService.js";

const API_URL = import.meta.env.VITE_API_URL;

function AssignComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res1 = await fetch(`${API_URL}/api/complaints`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data1 = await res1.json();
      setComplaints(data1.complaints || []);

      const res2 = await fetch(`${API_URL}/api/admin/staff`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data2 = await res2.json();
      setStaff(data2.staff || []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const assignStaff = async (complaintId, staffId) => {
    setProcessingId(complaintId);

    try {
      const res = await fetch(`${API_URL}/api/admin/assign/${complaintId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          staffId: staffId || null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const updatedComplaint = complaints.find((c) => c._id === complaintId);

        setComplaints((prev) =>
          prev.map((c) =>
            c._id === complaintId
              ? {
                  ...c,
                  assignedTo: staffId
                    ? staff.find((s) => s._id === staffId)
                    : null,
                }
              : c,
          )
        );

        toast.success("Updated successfully");

        if (staffId) {
          const selectedStaff = staff.find((s) => s._id === staffId);

          if (selectedStaff) {
            try {
              await sendEmail(
                selectedStaff.email,
                selectedStaff.name,
                "New Complaint Assigned 🛠",
                `A new complaint has been assigned to you.
Issue: ${updatedComplaint?.summary}

Please login to IMS dashboard to view full details.`
              );
            } catch (emailError) {
              console.error("Email failed:", emailError);
            }
          }
        }
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Server error");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      <Navbar />
      <AdminSidebar />

      <div className="mt-14 p-4 sm:p-6 min-h-screen bg-gray-100 md:ml-56">
        <h1 className="text-xl font-bold mb-4">Assign Complaints</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <svg
              className="animate-spin h-6 w-6 text-slate-600"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        ) : (
          <div className="bg-white border border-slate-500 rounded-sm">
            <div className="bg-slate-500 text-white px-4 py-3 font-medium flex items-center gap-2">
              <List size={18} />
              <span>Assign Complaints</span>
              <span className="ml-auto bg-white text-slate-600 text-xs px-2 py-1 rounded">
                {complaints.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-300 border-collapse min-w-[700px]">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-5 text-left">
                      Issue
                    </th>
                    <th className="border border-gray-300 px-4 py-5 text-center">
                      Staff
                    </th>
                    <th className="border border-gray-300 px-4 py-5 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((c, index) => (
                    <tr
                      key={c._id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-slate-100`}
                    >
                      <td className="border border-gray-300 px-4 py-3 font-medium text-slate-700">
                        {c.summary}
                        {c.status === "Resolved" && (
                          <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                            Resolved
                          </span>
                        )}
                      </td>

                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {processingId === c._id ? (
                          <div className="flex justify-center">
                            <svg
                              className="animate-spin h-4 w-4 text-slate-600"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              />
                            </svg>
                          </div>
                        ) : c.assignedTo ? (
                          <span className="font-medium text-slate-700">
                            {c.assignedTo.name}
                          </span>
                        ) : (
                          <select
                            disabled={c.status === "Resolved"}
                            className={`border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-slate-500 ${
                              c.status === "Resolved"
                                ? "bg-gray-200 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
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

                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {c.assignedTo && (
                          <button
                            disabled={
                              processingId === c._id ||
                              c.status === "Resolved"
                            }
                            onClick={() => assignStaff(c._id, null)}
                            className={`${
                              processingId === c._id ||
                              c.status === "Resolved"
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-red-600 hover:text-red-700 cursor-pointer"
                            }`}
                          >
                            {processingId === c._id ? (
                              <svg
                                className="animate-spin h-4 w-4"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                />
                              </svg>
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignComplaints;