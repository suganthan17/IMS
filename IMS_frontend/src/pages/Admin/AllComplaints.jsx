import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";

function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
  }, []);

  const statusBadge = (status) => {
    if (status === "Resolved") return "bg-green-100 text-green-700";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-6">All Complaints</h1>

          {loading ? (
            <p>Loading complaints...</p>
          ) : complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-slate-400">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left">#</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">
                      Category
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left">
                      Summary
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left">
                      Status
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((c, index) => (
                    <tr
                      key={c._id}
                      className="hover:bg-gray-100 cursor-pointer border-t border-gray-300 transition"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {c.category}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {c.summary}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                            c.status
                          )}`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(c.createdAt).toLocaleDateString()}
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

export default AllComplaints;
