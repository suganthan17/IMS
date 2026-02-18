import React, { useEffect, useState } from "react";
import { List, Trash2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function ManageStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/staff`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStaff(data.staff || []);
    } catch {
      toast.error("Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setAdding(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/add-staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStaff((prev) => [...prev, data.staff]);
        setFormData({ name: "", email: "", password: "" });
        toast.success("Staff added successfully");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Server error");
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteStaff = async (id) => {
    if (!window.confirm("Delete this staff?")) return;

    setDeletingId(id);

    try {
      const res = await fetch(`${API_URL}/api/admin/staff/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        setStaff((prev) => prev.filter((s) => s._id !== id));
        toast.success("Staff deleted successfully");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Server error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <Navbar />
      <AdminSidebar />

      <div className="mt-14 p-4 sm:p-6 min-h-screen bg-gray-100 md:ml-56">
        <h1 className="text-xl font-bold mb-4">Manage Maintenance Staff</h1>

        <div className="bg-white border border-slate-500 rounded-sm mb-6">
          <div className="bg-slate-500 text-white px-4 py-2 font-medium flex items-center gap-2">
            <List size={18} />
            <span>Manage Maintenance Staff</span>
            <span className="ml-auto bg-white text-slate-600 text-xs px-2 rounded">
              {staff.length}
            </span>
          </div>

          <div className="p-4 sm:p-6 border-b border-gray-300">
            <form
              onSubmit={handleAddStaff}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="border border-gray-300 px-3 py-2 rounded w-full"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="border border-gray-300 px-3 py-2 rounded w-full"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="border border-gray-300 px-3 py-2 rounded w-full"
                required
              />

              <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end">
                <button
                  type="submit"
                  disabled={adding}
                  className={`px-6 py-2 rounded flex items-center cursor-pointer gap-2 transition ${
                    adding
                      ? "bg-slate-400 text-white cursor-not-allowed"
                      : "bg-slate-600 text-white hover:bg-slate-700"
                  }`}
                >
                  {adding && (
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
                  )}
                  {adding ? "Adding..." : "Add Staff"}
                </button>
              </div>
            </form>
          </div>

          <div className="overflow-x-auto">
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
              <table className="w-full text-sm border border-gray-300 border-collapse min-w-[700px]">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-5 text-left">
                      #
                    </th>
                    <th className="border border-gray-300 px-4 py-5 text-left">
                      Name
                    </th>
                    <th className="border border-gray-300 px-4 py-5 text-left">
                      Email
                    </th>
                    <th className="border border-gray-300 px-4 py-5 text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {staff.map((s, index) => (
                    <tr key={s._id}>
                      <td className="border border-gray-300 px-4 py-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">
                        {s.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        {s.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <button
                          disabled={deletingId === s._id}
                          onClick={() => handleDeleteStaff(s._id)}
                          className={`${
                            deletingId === s._id
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-600 hover:text-red-700 cursor-pointer"
                          }`}
                        >
                          {deletingId === s._id ? (
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageStaff;
