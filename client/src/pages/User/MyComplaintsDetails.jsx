import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { List, ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetch(`http://localhost:5000/api/complaints/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ REQUIRED
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.success) {
          setComplaint(data.complaint);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!complaint) return <p className="p-6">Complaint not found</p>;

  const statusColor =
    complaint.status === "Resolved"
      ? "bg-green-200 text-green-800"
      : complaint.status === "In Progress"
        ? "bg-yellow-200 text-yellow-800"
        : "bg-orange-200 text-orange-800";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <UserSidebar />

        <div className="flex-1 p-6">
          <h1 className="text-xl font-bold text-black">Complaint Details</h1>

          <div className="flex items-center gap-3 mt-10">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-sm cursor-pointer text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>

          <div className="bg-white border mt-3 border-slate-500 rounded-sm">
            <div className="flex items-center gap-2 bg-slate-500 text-white px-4 py-2 font-medium">
              <List size={18} />
              <span>View Issue Details</span>
            </div>

            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr>
                  <td className="w-1/6 border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Category
                  </td>
                  <td className="w-1/3 border border-gray-300 px-3 py-2">
                    {complaint.category}
                  </td>

                  <td className="w-1/6 border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Status
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Reporter
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-blue-600">
                    {userEmail}
                  </td>

                  <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Assigned To
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-blue-600">
                    Admin - IMS
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Location
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {complaint.location}
                  </td>

                  <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Date Submitted
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {new Date(complaint.createdAt).toLocaleString()}
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Last Updated
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {new Date(complaint.updatedAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300"></td>
                  <td className="border border-gray-300"></td>
                </tr>

                <tr>
                  <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Summary
                  </td>
                  <td
                    colSpan="3"
                    className="border border-gray-300 px-3 py-2 font-medium"
                  >
                    {complaint.summary}
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium align-top">
                    Description
                  </td>
                  <td
                    colSpan="3"
                    className="border border-gray-300 px-3 py-2 whitespace-pre-line"
                  >
                    {complaint.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
