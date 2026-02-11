import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";

function ManageStaff() {
  const [complaints, setComplaints] = useState([]);
  const [staff, setStaff] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // fetch complaints
    fetch("http://localhost:5000/api/complaints", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setComplaints(data.complaints || []));

    // fetch staff
    fetch("http://localhost:5000/api/admin/staff", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setStaff(data.staff || []));
  }, []);

  const assignStaff = async (complaintId, staffId) => {
    const res = await fetch(
      `http://localhost:5000/api/admin/assign-staff/${complaintId}`,
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
      toast.success("Staff assigned");
      setComplaints(prev =>
        prev.map(c =>
          c._id === complaintId ? data.complaint : c
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-6">
            Assign Staff to Complaints
          </h1>

          <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-slate-400">
                <tr>
                  <th className="border border-gray-300 px-4 py-3">Issue</th>
                  <th className="border border-gray-300 px-4 py-3">Status</th>
                  <th className="border border-gray-300 px-4 py-3">Assign Staff</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map(c => (
                  <tr key={c._id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="border border-gray-300 px-4 py-2">
                      {c.summary}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {c.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        className="border border-gray-300 px-2 py-1 rounded"
                        value={c.assignedTo?._id || ""}
                        onChange={(e) =>
                          assignStaff(c._id, e.target.value)
                        }
                      >
                        <option value="">Select staff</option>
                        {staff.map(s => (
                          <option key={s._id} value={s._id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ManageStaff;
