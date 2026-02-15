import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { List, ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";

const API_URL = import.meta.env.VITE_API_URL;


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

    fetch(`${API_URL}/api/complaints/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
      : complaint.status === "Assigned" || complaint.status === "In Progress"
        ? "bg-blue-200 text-blue-800"
        : "bg-orange-200 text-orange-800";

  return (
    <div>
      <Navbar />
      <UserSidebar />

      <div className="ml-56 mt-14 p-6 min-h-screen bg-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-xl font-bold text-black">Complaint Details</h1>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center cursor-pointer gap-1 text-sm text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>

          <div className="bg-white border mt-3 border-slate-500 rounded-sm overflow-hidden">
            <div className="flex items-center gap-2 bg-slate-500 text-white px-4 py-2 font-medium">
              <List size={18} />
              <span>View Issue Details</span>
            </div>

            <table className="w-full text-sm border-collapse table-fixed">
              <tbody>
                <tr>
                  <td className="w-1/4 border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Category
                  </td>
                  <td className="w-1/4 border border-gray-300 px-3 py-2">
                    {complaint.category}
                  </td>
                  <td className="w-1/4 border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Status
                  </td>
                  <td className="w-1/4 border border-gray-300 px-3 py-2">
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
                    {complaint.assignedTo?.name || "Not Assigned"}
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
                    {new Date(complaint.createdAt).toLocaleString("en-GB")}
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                    Resolved Date
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {complaint.status === "Resolved"
                      ? new Date(complaint.updatedAt).toLocaleString("en-GB")
                      : "-"}
                  </td>
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

                {(complaint.beforeImage || complaint.afterImage) && (
                  <tr>
                    <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium align-top">
                      Before Image
                    </td>

                    <td className="border border-gray-300 px-4 py-4 text-center">
                      {complaint.beforeImage ? (
                        <img
                          src={complaint.beforeImage}
                          alt="Before"
                          className="max-w-55 h-70 object-contain mx-auto rounded border shadow-sm"
                          onClick={() =>
                            window.open(complaint.beforeImage, "_blank")
                          }
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium align-top">
                      Resolved Image
                    </td>

                    <td className="border border-gray-300 px-4 py-4 text-center">
                      {complaint.afterImage ? (
                        <img
                          src={complaint.afterImage}
                          alt="Resolved"
                          className="max-w-55 h-70 object-contain mx-auto rounded border shadow-sm"
                          onClick={() =>
                            window.open(complaint.afterImage, "_blank")
                          }
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
