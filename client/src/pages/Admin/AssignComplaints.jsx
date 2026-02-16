import React, { useEffect, useState } from "react";
import { List, Trash2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function AssignComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
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
    loadData();
  }, []);

  const assignStaff = async (complaintId, staffId) => {
    setProcessingId(complaintId);
    try {
      const res = await fetch(`${API_URL}/api/admin/assign/${complaintId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ staffId }),
      });

      const data = await res.json();

      if (data.success) {
        setComplaints((prev) =>
          prev.map((c) => (c._id === complaintId ? data.complaint : c)),
        );
        toast.success("Updated successfully");
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      <Navbar />
      <AdminSidebar />

      <div className="ml-56 mt-14 p-6 min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold mb-4">Assign Complaints to Staff</h1>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="bg-white border border-slate-500 rounded-sm">
            <div className="bg-slate-500 text-white px-4 py-3 font-medium flex items-center gap-2">
              <List size={18} />
              Assign Complaints
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-300 border-collapse">
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
                  {complaints.map((c) => (
                    <tr key={c._id}>
                      <td className="border border-gray-300 px-4 py-3">
                        {c.summary}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {c.assignedTo ? (
                          c.assignedTo.name
                        ) : (
                          <select
                            className="border border-gray-300 px-2 py-1 rounded"
                            disabled={processingId === c._id}
                            onChange={(e) => assignStaff(c._id, e.target.value)}
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
                            disabled={processingId === c._id}
                            onClick={() => assignStaff(c._id, null)}
                            className="text-red-600"
                          >
                            {processingId === c._id ? (
                              "Updating..."
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
