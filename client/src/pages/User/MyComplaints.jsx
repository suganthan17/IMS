import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";
import { useNavigate } from "react-router-dom";
import { Info, Trash2 } from "lucide-react";
import {
  Building2,
  Zap,
  Wifi,
  FlaskConical,
  Droplets,
  Trash,
  ArrowRight,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const PriorityBadge = ({ priority }) => {
  const config = {
    Critical: {
      bar: "bg-red-500",
      text: "text-red-700",
      bg: "bg-red-50 border-red-300",
      pulse: "animate-pulse",
    },
    High: {
      bar: "bg-orange-400",
      text: "text-orange-700",
      bg: "bg-orange-50 border-orange-300",
      pulse: "",
    },
    Medium: {
      bar: "bg-yellow-400",
      text: "text-yellow-700",
      bg: "bg-yellow-50 border-yellow-300",
      pulse: "",
    },
    Low: {
      bar: "bg-green-400",
      text: "text-green-700",
      bg: "bg-green-50 border-green-300",
      pulse: "",
    },
  };

  const c = config[priority] || config["Low"];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border ${c.bg} ${c.text}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${c.bar} ${c.pulse} inline-block`}
      />
      <span className="text-xs font-semibold tracking-wide">{priority}</span>
    </div>
  );
};
const CategoryIcon = ({ category }) => {
  const iconClass = "text-slate-900";

  switch (category) {
    case "Civil & Building":
      return <Building2 size={22} className={iconClass} />;

    case "Electrical":
      return <Zap size={22} className={iconClass} />;

    case "IT & Network":
      return <Wifi size={22} className={iconClass} />;

    case "Laboratory & Equipment":
      return <FlaskConical size={22} className={iconClass} />;

    case "Drainage":
      return <Droplets size={22} className={iconClass} />;

    case "Waste":
      return <Trash size={22} className={iconClass} />;

    default:
      return <Building2 size={22} className={iconClass} />;
  }
};
function MyComplaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/complaints`, {
      headers: { Authorization: `Bearer ${token}` },
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?"))
      return;
    setDeletingId(id);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/complaints/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setComplaints((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(data.message);
      }
    } catch {
      alert("Failed to delete complaint");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <Navbar />
      <UserSidebar />

      <div className="mt-14 p-4 sm:p-6 min-h-screen bg-gray-100 md:ml-56">
        <h1 className="text-xl font-bold mb-6 text-black">My Complaints</h1>

        {loading ? (
          <div className="text-center py-10">Loading complaints...</div>
        ) : complaints.length === 0 ? (
          <div className="bg-white border border-slate-300 rounded-md p-6">
            <p className="text-gray-600">No complaints found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {complaints.map((c) => (
              <div
                key={c._id}
                className="
                bg-white
                border
                border-slate-300
                rounded-lg
                shadow-sm
                hover:shadow-md
                transition-all
                duration-200
              "
              >
                {/* Header */}
                <div className="p-4 flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-md bg-slate-100">
                      <CategoryIcon category={c.category} />
                    </div>

                    <div>
                      <h2 className="font-bold text-lg text-slate-900">
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

                <div className="border-t border-gray-200"></div>

                {/* Details */}
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Date Submitted</p>

                      <p className="font-medium text-slate-800">
                        {new Date(c.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">Priority</p>

                      <div className="mt-1">
                        <PriorityBadge priority={c.priority} />
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-500">Resolved Date</p>

                      <p className="font-medium text-slate-800">
                        {c.status === "Resolved"
                          ? new Date(c.updatedAt).toLocaleDateString("en-GB")
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={() => {
                        setActiveId(c._id);
                        navigate(`/user/complaints/${c._id}`);
                      }}
                      disabled={activeId === c._id}
                      className={`
                      flex-1
                      py-2.5
                      rounded-md
                      text-sm
                      font-medium
                      transition
                      ${
                        activeId === c._id
                          ? "bg-slate-400 text-white"
                          : "bg-slate-700 text-white hover:bg-slate-900"
                      }
                    `}
                    >
                      {activeId === c._id ? "Loading..." : "View Details"}
                    </button>

                    {c.status !== "Resolved" && (
                      <button
                        onClick={() => handleDelete(c._id)}
                        disabled={deletingId === c._id}
                        className={`
                        px-4
                        py-2.5
                        rounded-md
                        border
                        transition
                        ${
                          deletingId === c._id
                            ? "bg-slate-400 text-white"
                            : "border-red-300 text-red-600 hover:bg-red-50"
                        }
                      `}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComplaints;
