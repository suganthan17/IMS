import React, { useEffect, useState } from "react";
import { List, Trash2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;


function ManageStaff() {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  const fetchStaff = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/staff`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStaff(data.staff || []);
    } catch (error) {
      toast.error("Failed to load staff", error);
    }
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/staff`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStaff(data.staff || []);
      } catch (error) {
        toast.error("Failed to load staff", error);
      }
    };

    fetchStaff();
  }, []);

  const handleAddStaff = async (e) => {
    e.preventDefault();

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
      toast.success("Staff added successfully");
      setFormData({ name: "", email: "", password: "" });
      fetchStaff();
    } else {
      toast.error(data.message);
    }
  };

  const handleDeleteStaff = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff?",
    );
    if (!confirmDelete) return;

    const res = await fetch(`${API_URL}/api/admin/staff/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Staff deleted successfully");
      fetchStaff();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <AdminSidebar />

      <div className="ml-56 mt-14 p-6 min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold mb-4">Manage Maintenance Staff</h1>

        <div className="bg-white border border-slate-500 rounded-sm mb-6">
          <div className="bg-slate-500 text-white px-4 py-2 font-medium flex items-center gap-2">
            <List size={18} />
            <span>Manage Maintenance Staff</span>
            <span className="ml-auto bg-white text-slate-600 text-xs px-2 rounded">
              {staff.length}
            </span>
          </div>

          <div className="p-6 border-b border-gray-300">
            <form onSubmit={handleAddStaff} className="grid grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border border-gray-300 px-3 py-2 rounded"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border border-gray-300 px-3 py-2 rounded"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="border border-gray-300 px-3 py-2 rounded"
                required
              />

              <div className="col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-slate-600 text-white px-6 py-2 rounded hover:bg-slate-700 cursor-pointer"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-gray-300 px-3 py-5 text-left">
                    #
                  </th>
                  <th className="border border-gray-300 px-3 py-5 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-3 py-5 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 px-3 py-5 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {staff.map((s, index) => (
                  <tr
                    key={s._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-slate-100`}
                  >
                    <td className="border border-gray-300 px-3 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 font-medium text-slate-700">
                      {s.name}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {s.email}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <button
                        onClick={() => handleDeleteStaff(s._id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
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
