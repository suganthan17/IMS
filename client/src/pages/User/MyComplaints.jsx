import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function MyComplaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/api/complaints`, {
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

  const statusStyle = (status) => {
    if (status === "Resolved")
      return "bg-green-100 text-green-700 border-green-300";

    if (status === "Assigned" || status === "In Progress")
      return "bg-blue-100 text-blue-700 border-blue-300";

    return "bg-orange-100 text-orange-700 border-orange-300";
  };

  return (
    <div>
      <Navbar />
      <UserSidebar />

      <div className="ml-56 mt-14 p-6 min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold mb-6">My Complaints</h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3 text-slate-600">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              Loading complaints...
            </div>
          </div>
        ) : complaints.length === 0 ? (
          <p className="text-slate-600">No complaints found.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {complaints.map((c) => (
              <div
                key={c._id}
                className="w-full md:w-[48%] bg-white border border-gray-300 rounded-xl shadow-sm p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <Info size={18} className="text-slate-500 mt-1" />
                    <div>
                      <h2 className="font-semibold text-slate-900">
                        {c.category}
                      </h2>
                      <p className="text-sm text-slate-600 mt-1">{c.summary}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full border font-medium ${statusStyle(
                      c.status,
                    )}`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="border-t border-gray-300 my-4"></div>

                <div className="flex justify-between text-sm text-slate-700">
                  <div>
                    <p className="text-xs text-slate-500">Date Submitted</p>
                    <p className="font-medium">
                      {new Date(c.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Resolved Date</p>
                    <p className="font-medium">
                      {c.status === "Resolved"
                        ? new Date(c.updatedAt).toLocaleDateString("en-GB")
                        : "-"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveId(c._id);
                    navigate(`/user/complaints/${c._id}`);
                  }}
                  disabled={activeId === c._id}
                  className={`mt-4 w-full rounded-lg py-2 text-sm font-medium transition flex items-center justify-center gap-2 ${
                    activeId === c._id
                      ? "bg-slate-400 text-white cursor-not-allowed"
                      : "border border-gray-300 text-slate-700 hover:bg-slate-600 hover:text-white cursor-pointer"
                  }`}
                >
                  {activeId === c._id ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
                      Loading...
                    </>
                  ) : (
                    "View Details"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComplaints;
