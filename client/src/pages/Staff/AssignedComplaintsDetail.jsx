import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { List, ArrowLeft,Trash2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import StaffSidebar from "../../components/StaffSidebar";
import { toast } from "react-toastify";

function AssignedComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:5000/api/complaints/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComplaint(data.complaint);
        }
        setLoading(false);
      });
  }, [id, token]);

  const updateStatus = async () => {
    const formData = new FormData();
    formData.append("status", "Resolved");

    if (afterImage) {
      formData.append("image", afterImage);
    }

    const res = await fetch(
      `http://localhost:5000/api/complaints/update-status/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const data = await res.json();

    if (data.success) {
      toast.success("Complaint resolved successfully");
      setComplaint(data.complaint);
      setAfterImage(null);
      setPreview(null);
    } else {
      toast.error(data.message || "Update failed");
    }
  };

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
      <StaffSidebar />

      <div className="ml-56 mt-14 p-6 min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold text-black">Complaint Details</h1>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="bg-white border mt-3 border-slate-500 rounded-sm">
          <div className="flex items-center gap-2 bg-slate-500 text-white px-4 py-2 font-medium">
            <List size={18} />
            <span>Assigned Complaint Details</span>
          </div>

          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
                  Category
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {complaint.category}
                </td>

                <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium">
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

              {/* Combined Image Row */}
              <tr>
                <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium align-top">
                  Before Image
                </td>

                <td className="border border-gray-300 px-3 py-4 align-top">
                  {complaint.beforeImage ? (
                    <img
                      src={complaint.beforeImage}
                      alt="Before"
                      className="w-56 rounded border shadow-sm cursor-pointer hover:scale-105 transition"
                      onClick={() =>
                        window.open(complaint.beforeImage, "_blank")
                      }
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="border border-gray-300 bg-slate-100 px-3 py-2 font-medium align-top">
                  {complaint.status === "Resolved"
                    ? "Resolved Image"
                    : "Upload Resolved Image"}
                </td>

                <td className="border border-gray-300 px-3 py-4 align-top">
                  {complaint.status === "Resolved" ? (
                    complaint.afterImage ? (
                      <img
                        src={complaint.afterImage}
                        alt="After"
                        className="w-56 rounded border shadow-sm cursor-pointer hover:scale-105 transition"
                        onClick={() =>
                          window.open(complaint.afterImage, "_blank")
                        }
                      />
                    ) : (
                      "-"
                    )
                  ) : (
                    <div className="space-y-3">
                      {/* Button + Trash Row */}
                      <div className="flex items-center gap-3">
                        {/* Choose File Button */}
                        <label className="inline-block cursor-pointer bg-slate-600 text-white px-4 py-1.5 text-sm rounded hover:bg-slate-700 transition">
                          Choose File
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setAfterImage(file);
                              if (file) {
                                setPreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                        </label>

                        {/* Trash Icon */}
                        {afterImage && (
                          <button
                            type="button"
                            onClick={() => {
                              setAfterImage(null);
                              setPreview(null);
                            }}
                            className="p-2  text-red-600 cursor-pointer rounded transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      {/* Preview */}
                      {preview && (
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-40 rounded border"
                        />
                      )}

                      {/* Resolve Button */}
                      <button
                        onClick={updateStatus}
                        className="bg-lime-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition"
                      >
                        Mark as Resolved
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssignedComplaintDetails;
